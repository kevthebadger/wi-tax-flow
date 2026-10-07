import React, { useState, useMemo } from 'react';
import type { MetricType, BaselineYear } from './types/taxFlow';
import { WI_COUNTIES, STATEWIDE_SUMMARY } from './data/wiTaxData';
import { formatCurrency, formatReturnRatio, formatCentsPerDollar } from './utils/formatters';
import MetricControls from './components/MetricControls';
import CountyMap from './components/CountyMap';
import MapLegend from './components/MapLegend';
import CountyInspector from './components/CountyInspector';
import CountyComparison from './components/CountyComparison';
import EducationalModules from './components/EducationalModules';
import CountyDataTable from './components/CountyDataTable';
import MethodologyFooter from './components/MethodologyFooter';
import { Landmark, ShieldCheck, ArrowRightLeft } from 'lucide-react';

export const App: React.FC = () => {
  // State variables
  const [activeMetric, setActiveMetric] = useState<MetricType>('returnOnDollar');
  const [activeBaseline, setActiveBaseline] = useState<BaselineYear>('postAct12');
  const [selectedFips, setSelectedFips] = useState<string>('55079'); // Milwaukee County default
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [compareFipsB, setCompareFipsB] = useState<string>('55001'); // Adams County default
  const [hoveredBinIndex, setHoveredBinIndex] = useState<number | null>(null);

  // Selected county record
  const selectedCounty = useMemo(() => {
    return WI_COUNTIES.find((c) => c.fips === selectedFips) || WI_COUNTIES[0];
  }, [selectedFips]);

  // Statewide summary under active baseline
  const statewideEra = STATEWIDE_SUMMARY[activeBaseline];

  const handleOpenCompare = (fips: string) => {
    if (fips === '55079') {
      // If Milwaukee selected, compare against Adams or another county
      setCompareFipsB('55001');
    } else {
      setCompareFipsB(fips);
    }
    setIsCompareOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Application Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-900 text-white rounded-lg shadow-xs">
              <Landmark className="w-5 h-5 text-teal-400" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  Wisconsin Tax Flow
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                  All 72 Counties
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                State Taxes Collected vs. Intergovernmental Aids Returned
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleOpenCompare(selectedFips)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Compare Counties</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden md:inline">Nonpartisan Civic Data</span>
              <span className="md:hidden">Verified</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Statewide Macro Summary Banner */}
        <section
          aria-label="Statewide Public Finance Overview"
          className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Total Taxes Sent */}
            <div className="pt-2 md:pt-0 md:px-3 first:px-0">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Total State Taxes (72 Counties)
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-1 block">
                {formatCurrency(statewideEra.taxes.totalTaxes, { compact: true })}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Net Income & 5% State Sales Tax
              </span>
            </div>

            {/* Total Aids Returned */}
            <div className="pt-2 md:pt-0 md:px-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Core State Aids Returned
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-teal-700 mt-1 block">
                {formatCurrency(statewideEra.aids.totalAids, { compact: true })}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Schools, Shared Revenue, Roads
              </span>
            </div>

            {/* Statewide Return Ratio */}
            <div className="pt-2 md:pt-0 md:px-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Statewide Aid Return Ratio
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-1 block">
                {formatReturnRatio(statewideEra.metrics.returnOnDollar)}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {formatCentsPerDollar(statewideEra.metrics.returnOnDollar, { isRatio: true })} returned in core aid
              </span>
            </div>

            {/* Donor vs Recipient County Balance */}
            <div className="pt-2 md:pt-0 md:px-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                County Balance Count
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {statewideEra.recipientCount} Recipients
                </span>
                <span className="text-sm font-bold font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {statewideEra.donorCount} Donors
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Out of 72 total counties
              </span>
            </div>
          </div>
        </section>

        {/* Metric and Baseline Controls */}
        <MetricControls
          activeMetric={activeMetric}
          onMetricChange={setActiveMetric}
          activeBaseline={activeBaseline}
          onBaselineChange={setActiveBaseline}
        />

        {/* Map & County Inspector Grid */}
        <section
          aria-label="Interactive County Map and Inspector"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* Left Column: Interactive Map & Legend (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Wisconsin County Choropleth
                </h2>
                <p className="text-xs text-slate-500">
                  Click on any county to inspect detailed fiscal collections and aid streams.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-800">
                  {activeBaseline === 'postAct12' ? 'Post-Act 12' : 'Pre-Act 12'}
                </span>
              </div>
            </div>

            {/* SVG Choropleth Map */}
            <div className="py-2 flex justify-center">
              <CountyMap
                counties={WI_COUNTIES}
                activeMetric={activeMetric}
                activeBaseline={activeBaseline}
                selectedFips={selectedFips}
                onSelectCounty={setSelectedFips}
              />
            </div>

            {/* Diverging Color Scale Legend */}
            <MapLegend
              metric={activeMetric}
              selectedCounty={selectedCounty}
              activeBaseline={activeBaseline}
              activeBinIndex={hoveredBinIndex}
              onHoverBin={setHoveredBinIndex}
            />
          </div>

          {/* Right Column: County Inspector & Breakdowns (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <CountyInspector
              county={selectedCounty}
              baseline={activeBaseline}
              onOpenCompare={handleOpenCompare}
            />
          </div>
        </section>

        {/* Educational Modules: Wisconsin Public Finance 101 */}
        <section aria-label="Educational Public Finance Modules">
          <EducationalModules />
        </section>

        {/* Complete 72-County Data Table & Search */}
        <section aria-label="72-County Data Table">
          <CountyDataTable
            counties={WI_COUNTIES}
            baseline={activeBaseline}
            selectedFips={selectedFips}
            onSelectCounty={setSelectedFips}
          />
        </section>
      </main>

      {/* Side-by-side County Comparison Modal */}
      <CountyComparison
        counties={WI_COUNTIES}
        initialCountyAFips="55079" // Milwaukee County
        initialCountyBFips={compareFipsB}
        baseline={activeBaseline}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Methodology & Citations Footer */}
      <MethodologyFooter />
    </div>
  );
};

export default App;
