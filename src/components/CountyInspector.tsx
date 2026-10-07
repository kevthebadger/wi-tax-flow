import React from 'react';
import type { CountyRecord, BaselineYear } from '../types/taxFlow';
import {
  formatCurrency,
  formatReturnRatio,
  formatPopulation,
  formatCentsPerDollar,
  formatNetFlowPerCapita,
  formatPercent,
} from '../utils/formatters';
import StackedBarBreakdown from './StackedBarBreakdown';
import { MapPin, Scale, ArrowRightLeft, TrendingUp } from 'lucide-react';

export interface CountyInspectorProps {
  county: CountyRecord | null;
  baseline: BaselineYear;
  onOpenCompare: (fips: string) => void;
  className?: string;
}

export const CountyInspector: React.FC<CountyInspectorProps> = ({
  county,
  baseline,
  onOpenCompare,
  className = '',
}) => {
  if (!county) {
    return (
      <div
        className={`bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-500 shadow-xs flex flex-col items-center justify-center min-h-[320px] ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <MapPin className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">No County Selected</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Click on any county on the map or select from the table below to inspect its detailed tax flow balance.
        </p>
      </div>
    );
  }

  const era = county[baseline];
  const { metrics } = era;
  const isRecipient = metrics.classification === 'recipient';

  // Calculate Act 12 change in shared revenue
  const preShared = county.preAct12.aids.sharedRevenue;
  const postShared = county.postAct12.aids.sharedRevenue;
  const sharedGrowthPct = preShared > 0 ? ((postShared - preShared) / preShared) * 100 : 0;

  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5 ${className}`}
      data-testid="county-inspector"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {county.name} County
            </h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase ${
                isRecipient
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {isRecipient ? 'Net Recipient' : 'Net Donor'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            County Seat: <span className="font-medium text-slate-700">{county.seat}</span> &bull; Population:{' '}
            <span className="font-mono font-medium text-slate-700">{formatPopulation(county.population)}</span>
          </p>
        </div>

        {/* Compare Button */}
        <button
          type="button"
          onClick={() => onOpenCompare(county.fips)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 shrink-0"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Compare vs. Milwaukee</span>
        </button>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Return Ratio */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
            Return on $1
          </span>
          <span
            className={`text-xl font-bold font-mono tracking-tight mt-1 block ${
              isRecipient ? 'text-teal-700' : 'text-amber-800'
            }`}
          >
            {formatReturnRatio(metrics.returnOnDollar)}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {formatCentsPerDollar(metrics.returnOnDollar, { isRatio: true, decimals: 1 })} returned
          </span>
        </div>

        {/* Net Flow */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
            Net Dollar Flow
          </span>
          <span
            className={`text-xl font-bold font-mono tracking-tight mt-1 block ${
              metrics.netFlow >= 0 ? 'text-teal-700' : 'text-amber-800'
            }`}
          >
            {formatCurrency(metrics.netFlow, { compact: true, showSign: true })}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {metrics.netFlow >= 0 ? 'Net state inflow' : 'Net contribution to state'}
          </span>
        </div>

        {/* Per Capita */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
            Per Resident
          </span>
          <span
            className={`text-xl font-bold font-mono tracking-tight mt-1 block ${
              metrics.netFlowPerCapita >= 0 ? 'text-teal-700' : 'text-amber-800'
            }`}
          >
            {formatNetFlowPerCapita(metrics.netFlowPerCapita)}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Per-capita balance
          </span>
        </div>
      </div>

      {/* Visual Breakdown of Collections & Aids */}
      <div className="pt-2">
        <h4 className="text-xs font-bold text-slate-900 tracking-wide uppercase mb-3 flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
          Revenue & Aid Stream Composition
        </h4>
        <StackedBarBreakdown county={county} baseline={baseline} />
      </div>

      {/* Act 12 Shared Revenue Impact Note */}
      <div className="pt-3 border-t border-slate-100 flex items-start gap-2.5 bg-blue-50/60 p-3 rounded-lg border border-blue-100 text-xs text-blue-900">
        <TrendingUp className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <span className="font-semibold text-blue-950">2023 Wis. Act 12 Impact: </span>
          <span>
            Shared Revenue aid for {county.name} County jurisdictions changed from{' '}
            <span className="font-mono font-semibold">{formatCurrency(preShared, { compact: true })}</span> (pre-Act 12) to{' '}
            <span className="font-mono font-semibold">{formatCurrency(postShared, { compact: true })}</span> (post-Act 12), a{' '}
            <span className="font-semibold text-emerald-700">+{formatPercent(sharedGrowthPct, 1)}</span> increase.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountyInspector;
