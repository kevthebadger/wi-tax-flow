import React, { useState, useMemo } from 'react';
import type { CountyRecord, BaselineYear } from '../types/taxFlow';
import {
  formatCurrency,
  formatReturnRatio,
  formatPopulation,
  formatNetFlowPerCapita,
} from '../utils/formatters';
import { downloadCountyCSV } from '../utils/csvExport';
import { Search, Download, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

export interface CountyDataTableProps {
  counties: CountyRecord[];
  baseline: BaselineYear;
  selectedFips: string | null;
  onSelectCounty: (fips: string) => void;
  className?: string;
}

type SortField = 'name' | 'population' | 'taxes' | 'aids' | 'returnOnDollar' | 'netFlow' | 'netFlowPerCapita';
type SortDirection = 'asc' | 'desc';

export const CountyDataTable: React.FC<CountyDataTableProps> = ({
  counties,
  baseline,
  selectedFips,
  onSelectCounty,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('returnOnDollar');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedCounties = useMemo(() => {
    return counties
      .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
      .sort((a, b) => {
        const eraA = a[baseline];
        const eraB = b[baseline];
        let valA: number | string = 0;
        let valB: number | string = 0;

        switch (sortField) {
          case 'name':
            valA = a.name;
            valB = b.name;
            break;
          case 'population':
            valA = a.population;
            valB = b.population;
            break;
          case 'taxes':
            valA = eraA.taxes.totalTaxes;
            valB = eraB.taxes.totalTaxes;
            break;
          case 'aids':
            valA = eraA.aids.totalAids;
            valB = eraB.aids.totalAids;
            break;
          case 'returnOnDollar':
            valA = eraA.metrics.returnOnDollar;
            valB = eraB.metrics.returnOnDollar;
            break;
          case 'netFlow':
            valA = eraA.metrics.netFlow;
            valB = eraB.metrics.netFlow;
            break;
          case 'netFlowPerCapita':
            valA = eraA.metrics.netFlowPerCapita;
            valB = eraB.metrics.netFlowPerCapita;
            break;
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        return sortDirection === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [counties, baseline, searchTerm, sortField, sortDirection]);

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-slate-900" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-slate-900" />
    );
  };

  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col ${className}`}
      data-testid="county-data-table"
    >
      {/* Table Header Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Complete 72-County Data Table
          </h3>
          <p className="text-xs text-slate-500">
            Search, sort, and export certified Wisconsin Department of Revenue figures.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search county name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={() => downloadCountyCSV(counties, baseline)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto max-h-[460px]">
        <table className="min-w-full divide-y divide-slate-200 text-xs">
          <thead className="bg-slate-100 text-slate-700 sticky top-0 z-10 shadow-xs">
            <tr>
              <th
                scope="col"
                onClick={() => handleSort('name')}
                className="py-3 px-3 text-left font-bold cursor-pointer group hover:bg-slate-200/80 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>County</span>
                  {renderSortIndicator('name')}
                </div>
              </th>

              <th
                scope="col"
                onClick={() => handleSort('population')}
                className="py-3 px-3 text-right font-bold cursor-pointer group hover:bg-slate-200/80 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Population</span>
                  {renderSortIndicator('population')}
                </div>
              </th>

              <th
                scope="col"
                onClick={() => handleSort('taxes')}
                className="py-3 px-3 text-right font-bold cursor-pointer group hover:bg-slate-200/80 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Taxes Sent</span>
                  {renderSortIndicator('taxes')}
                </div>
              </th>

              <th
                scope="col"
                onClick={() => handleSort('aids')}
                className="py-3 px-3 text-right font-bold cursor-pointer group hover:bg-slate-200/80 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Aids Returned</span>
                  {renderSortIndicator('aids')}
                </div>
              </th>

              <th
                scope="col"
                onClick={() => handleSort('returnOnDollar')}
                className="py-3 px-3 text-right font-bold cursor-pointer group hover:bg-slate-200/80 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Return / $1</span>
                  {renderSortIndicator('returnOnDollar')}
                </div>
              </th>

              <th
                scope="col"
                onClick={() => handleSort('netFlow')}
                className="py-3 px-3 text-right font-bold cursor-pointer group hover:bg-slate-200/80 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Net Flow</span>
                  {renderSortIndicator('netFlow')}
                </div>
              </th>

              <th
                scope="col"
                onClick={() => handleSort('netFlowPerCapita')}
                className="py-3 px-3 text-right font-bold cursor-pointer group hover:bg-slate-200/80 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Per Resident</span>
                  {renderSortIndicator('netFlowPerCapita')}
                </div>
              </th>

              <th scope="col" className="py-3 px-3 text-center font-bold">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px] bg-white">
            {filteredAndSortedCounties.map((c) => {
              const era = c[baseline];
              const isSelected = selectedFips === c.fips;
              const isRecipient = era.metrics.classification === 'recipient';

              return (
                <tr
                  key={c.fips}
                  onClick={() => onSelectCounty(c.fips)}
                  className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                    isSelected ? 'bg-teal-50/70 font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-sans font-medium text-slate-900 flex items-center gap-1.5">
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({c.seat})</span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-600">
                    {formatPopulation(c.population)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-800">
                    {formatCurrency(era.taxes.totalTaxes, { compact: true })}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-800">
                    {formatCurrency(era.aids.totalAids, { compact: true })}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right font-bold ${
                      isRecipient ? 'text-teal-700' : 'text-amber-800'
                    }`}
                  >
                    {formatReturnRatio(era.metrics.returnOnDollar)}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right font-bold ${
                      era.metrics.netFlow >= 0 ? 'text-teal-700' : 'text-amber-800'
                    }`}
                  >
                    {formatCurrency(era.metrics.netFlow, { showSign: true, compact: true })}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right ${
                      era.metrics.netFlowPerCapita >= 0 ? 'text-teal-700' : 'text-amber-800'
                    }`}
                  >
                    {formatNetFlowPerCapita(era.metrics.netFlowPerCapita)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        isRecipient
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isRecipient ? 'Recipient' : 'Donor'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountyDataTable;
