import React from 'react';
import type { CountyRecord, BaselineYear } from '../types/taxFlow';
import { formatCurrency } from '../utils/formatters';

export interface StackedBarBreakdownProps {
  county: CountyRecord;
  baseline: BaselineYear;
  className?: string;
}

export const StackedBarBreakdown: React.FC<StackedBarBreakdownProps> = ({
  county,
  baseline,
  className = '',
}) => {
  const era = county[baseline];
  const { taxes, aids } = era;

  // Tax shares
  const incomePct = taxes.totalTaxes > 0 ? (taxes.individualIncomeTax / taxes.totalTaxes) * 100 : 0;
  const salesPct = taxes.totalTaxes > 0 ? (taxes.stateSalesTax / taxes.totalTaxes) * 100 : 0;

  // Aid shares
  const sharedPct = aids.totalAids > 0 ? (aids.sharedRevenue / aids.totalAids) * 100 : 0;
  const schoolPct = aids.totalAids > 0 ? (aids.schoolAids / aids.totalAids) * 100 : 0;
  const roadPct = aids.totalAids > 0 ? (aids.transportationAids / aids.totalAids) * 100 : 0;
  const creditPct = aids.totalAids > 0 ? (aids.schoolLevyTaxCredit / aids.totalAids) * 100 : 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Taxes Sent Breakdown */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline text-xs">
          <span className="font-semibold text-slate-700">Taxes Sent to State</span>
          <span className="font-mono font-bold text-slate-900">
            {formatCurrency(taxes.totalTaxes, { compact: false })}
          </span>
        </div>

        {/* Stacked bar */}
        <div className="h-4 w-full rounded-md overflow-hidden flex bg-slate-100 border border-slate-200">
          <div
            style={{ width: `${incomePct}%` }}
            className="bg-amber-700 hover:brightness-110 transition-all"
            title={`Individual Income Tax: ${formatCurrency(taxes.individualIncomeTax)} (${incomePct.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${salesPct}%` }}
            className="bg-amber-500 hover:brightness-110 transition-all"
            title={`State 5% Sales Tax: ${formatCurrency(taxes.stateSalesTax)} (${salesPct.toFixed(1)}%)`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-700 shrink-0" aria-hidden="true" />
            <span className="truncate">Income: {formatCurrency(taxes.individualIncomeTax, { compact: true })}</span>
            <span className="text-slate-400 font-mono text-[10px]">({incomePct.toFixed(0)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shrink-0" aria-hidden="true" />
            <span className="truncate">Sales: {formatCurrency(taxes.stateSalesTax, { compact: true })}</span>
            <span className="text-slate-400 font-mono text-[10px]">({salesPct.toFixed(0)}%)</span>
          </div>
        </div>
      </div>

      {/* Aids Returned Breakdown */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline text-xs">
          <span className="font-semibold text-slate-700">Aids Returned to County</span>
          <span className="font-mono font-bold text-teal-800">
            {formatCurrency(aids.totalAids, { compact: false })}
          </span>
        </div>

        {/* Stacked bar */}
        <div className="h-4 w-full rounded-md overflow-hidden flex bg-slate-100 border border-slate-200">
          <div
            style={{ width: `${schoolPct}%` }}
            className="bg-teal-700 hover:brightness-110 transition-all"
            title={`K-12 School Aids: ${formatCurrency(aids.schoolAids)} (${schoolPct.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${sharedPct}%` }}
            className="bg-teal-500 hover:brightness-110 transition-all"
            title={`Shared Revenue: ${formatCurrency(aids.sharedRevenue)} (${sharedPct.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${roadPct}%` }}
            className="bg-emerald-500 hover:brightness-110 transition-all"
            title={`Roads (WisDOT GTA): ${formatCurrency(aids.transportationAids)} (${roadPct.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${creditPct}%` }}
            className="bg-cyan-400 hover:brightness-110 transition-all"
            title={`School Levy Tax Credit: ${formatCurrency(aids.schoolLevyTaxCredit)} (${creditPct.toFixed(1)}%)`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-600 pt-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-teal-700 shrink-0" aria-hidden="true" />
            <span className="truncate">Schools: {formatCurrency(aids.schoolAids, { compact: true })}</span>
            <span className="text-slate-400 font-mono text-[10px]">({schoolPct.toFixed(0)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-teal-500 shrink-0" aria-hidden="true" />
            <span className="truncate">Shared Rev: {formatCurrency(aids.sharedRevenue, { compact: true })}</span>
            <span className="text-slate-400 font-mono text-[10px]">({sharedPct.toFixed(0)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shrink-0" aria-hidden="true" />
            <span className="truncate">Roads (GTA): {formatCurrency(aids.transportationAids, { compact: true })}</span>
            <span className="text-slate-400 font-mono text-[10px]">({roadPct.toFixed(0)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shrink-0" aria-hidden="true" />
            <span className="truncate">Levy Credit: {formatCurrency(aids.schoolLevyTaxCredit, { compact: true })}</span>
            <span className="text-slate-400 font-mono text-[10px]">({creditPct.toFixed(0)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedBarBreakdown;
