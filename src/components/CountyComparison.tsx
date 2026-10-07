import React, { useState } from 'react';
import type { CountyRecord, BaselineYear } from '../types/taxFlow';
import {
  formatCurrency,
  formatReturnRatio,
  formatPopulation,
  formatCentsPerDollar,
  formatNetFlowPerCapita,
} from '../utils/formatters';
import StackedBarBreakdown from './StackedBarBreakdown';
import { X, ArrowRightLeft, CheckCircle2 } from 'lucide-react';

export interface CountyComparisonProps {
  counties: CountyRecord[];
  initialCountyAFips?: string;
  initialCountyBFips?: string;
  baseline: BaselineYear;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const CountyComparison: React.FC<CountyComparisonProps> = ({
  counties,
  initialCountyAFips = '55079', // Milwaukee County default
  initialCountyBFips = '55001', // Adams County default
  baseline,
  isOpen,
  onClose,
}) => {
  const [fipsA, setFipsA] = useState<string>(initialCountyAFips);
  const [fipsB, setFipsB] = useState<string>(initialCountyBFips);

  if (!isOpen) return null;

  const countyA = counties.find((c) => c.fips === fipsA) || counties[0];
  const countyB = counties.find((c) => c.fips === fipsB) || counties[1];

  const eraA = countyA[baseline];
  const eraB = countyB[baseline];

  const ratioA = eraA.metrics.returnOnDollar;
  const ratioB = eraB.metrics.returnOnDollar;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <ArrowRightLeft className="w-4 h-4 text-teal-400" aria-hidden="true" />
            </div>
            <div>
              <h2 id="comparison-title" className="text-base sm:text-lg font-bold text-slate-900">
                County Balance of Payments Comparison
              </h2>
              <p className="text-xs text-slate-500">
                Direct side-by-side analysis under{' '}
                <span className="font-semibold text-slate-700">
                  {baseline === 'postAct12' ? 'Post-Act 12 (Current Law)' : 'Pre-Act 12 (Historic)'}
                </span>{' '}
                statutory baseline.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            aria-label="Close comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* County Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* County A Selector */}
            <div className="space-y-1.5">
              <label htmlFor="county-a-select" className="block text-xs font-bold text-slate-700 uppercase">
                County A (Primary Reference)
              </label>
              <select
                id="county-a-select"
                value={fipsA}
                onChange={(e) => setFipsA(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {counties.map((c) => (
                  <option key={`a-${c.fips}`} value={c.fips}>
                    {c.name} County (Pop: {formatPopulation(c.population)})
                  </option>
                ))}
              </select>
            </div>

            {/* County B Selector */}
            <div className="space-y-1.5">
              <label htmlFor="county-b-select" className="block text-xs font-bold text-slate-700 uppercase">
                County B (Comparison)
              </label>
              <select
                id="county-b-select"
                value={fipsB}
                onChange={(e) => setFipsB(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {counties.map((c) => (
                  <option key={`b-${c.fips}`} value={c.fips}>
                    {c.name} County (Pop: {formatPopulation(c.population)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Key Metric Comparison Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-100 text-xs text-slate-700 font-semibold">
                <tr>
                  <th scope="col" className="py-3 px-4 text-left">Fiscal Metric</th>
                  <th scope="col" className="py-3 px-4 text-right bg-slate-50/50">{countyA.name} County</th>
                  <th scope="col" className="py-3 px-4 text-right">{countyB.name} County</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {/* Population */}
                <tr>
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-700">Population</td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900 bg-slate-50/50">
                    {formatPopulation(countyA.population)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                    {formatPopulation(countyB.population)}
                  </td>
                </tr>

                {/* Return on Tax Dollar */}
                <tr className="bg-slate-50/80">
                  <td className="py-3 px-4 font-sans font-bold text-slate-900">
                    Return on $1.00 Sent
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-base bg-slate-100/50">
                    <span className={ratioA >= 1 ? 'text-teal-700' : 'text-amber-800'}>
                      {formatReturnRatio(ratioA)}
                    </span>
                    <span className="block text-[10px] font-sans font-normal text-slate-500">
                      ({formatCentsPerDollar(ratioA, { isRatio: true, decimals: 1 })})
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-base">
                    <span className={ratioB >= 1 ? 'text-teal-700' : 'text-amber-800'}>
                      {formatReturnRatio(ratioB)}
                    </span>
                    <span className="block text-[10px] font-sans font-normal text-slate-500">
                      ({formatCentsPerDollar(ratioB, { isRatio: true, decimals: 1 })})
                    </span>
                  </td>
                </tr>

                {/* Net Dollar Balance */}
                <tr>
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-700">Total Net Balance</td>
                  <td className={`py-2.5 px-4 text-right font-bold bg-slate-50/50 ${eraA.metrics.netFlow >= 0 ? 'text-teal-700' : 'text-amber-800'}`}>
                    {formatCurrency(eraA.metrics.netFlow, { showSign: true, compact: true })}
                  </td>
                  <td className={`py-2.5 px-4 text-right font-bold ${eraB.metrics.netFlow >= 0 ? 'text-teal-700' : 'text-amber-800'}`}>
                    {formatCurrency(eraB.metrics.netFlow, { showSign: true, compact: true })}
                  </td>
                </tr>

                {/* Net Flow Per Capita */}
                <tr>
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-700">Net Flow per Resident</td>
                  <td className={`py-2.5 px-4 text-right font-bold bg-slate-50/50 ${eraA.metrics.netFlowPerCapita >= 0 ? 'text-teal-700' : 'text-amber-800'}`}>
                    {formatNetFlowPerCapita(eraA.metrics.netFlowPerCapita)}
                  </td>
                  <td className={`py-2.5 px-4 text-right font-bold ${eraB.metrics.netFlowPerCapita >= 0 ? 'text-teal-700' : 'text-amber-800'}`}>
                    {formatNetFlowPerCapita(eraB.metrics.netFlowPerCapita)}
                  </td>
                </tr>

                {/* Total State Taxes Paid */}
                <tr>
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-700">Total State Taxes Sent</td>
                  <td className="py-2.5 px-4 text-right text-slate-900 bg-slate-50/50">
                    {formatCurrency(eraA.taxes.totalTaxes, { compact: false })}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-900">
                    {formatCurrency(eraB.taxes.totalTaxes, { compact: false })}
                  </td>
                </tr>

                {/* Total State Aids Returned */}
                <tr>
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-700">Total State Aids Returned</td>
                  <td className="py-2.5 px-4 text-right text-slate-900 bg-slate-50/50">
                    {formatCurrency(eraA.aids.totalAids, { compact: false })}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-900">
                    {formatCurrency(eraB.aids.totalAids, { compact: false })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Breakdown Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                {countyA.name} County Breakdown
              </h4>
              <StackedBarBreakdown county={countyA} baseline={baseline} />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                {countyB.name} County Breakdown
              </h4>
              <StackedBarBreakdown county={countyB} baseline={baseline} />
            </div>
          </div>

          {/* Factual Takeaway Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white text-xs leading-relaxed space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-teal-300">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Civic Fiscal Takeaway</span>
            </div>
            <p className="text-slate-200">
              {countyA.name} County contributes{' '}
              <span className="font-mono font-semibold text-white">{formatCurrency(eraA.taxes.totalTaxes, { compact: true })}</span>{' '}
              in individual income and sales taxes to the state general fund, and receives back{' '}
              <span className="font-mono font-semibold text-white">{formatCurrency(eraA.aids.totalAids, { compact: true })}</span>{' '}
              in intergovernmental aids ({formatCentsPerDollar(ratioA, { isRatio: true, decimals: 1 })} per dollar sent), resulting in a net{' '}
              <span className="font-semibold">{eraA.metrics.netFlow >= 0 ? 'surplus' : 'contribution'}</span> of{' '}
              <span className="font-mono font-semibold text-white">{formatCurrency(Math.abs(eraA.metrics.netFlow), { compact: true })}</span>.
            </p>
            <p className="text-slate-300 pt-1">
              {countyB.name} County contributes{' '}
              <span className="font-mono font-semibold text-white">{formatCurrency(eraB.taxes.totalTaxes, { compact: true })}</span>{' '}
              and receives{' '}
              <span className="font-mono font-semibold text-white">{formatCurrency(eraB.aids.totalAids, { compact: true })}</span>{' '}
              ({formatCentsPerDollar(ratioB, { isRatio: true, decimals: 1 })} per dollar sent).
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountyComparison;
