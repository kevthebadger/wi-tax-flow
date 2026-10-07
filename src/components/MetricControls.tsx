import React from 'react';
import type { MetricType, BaselineYear } from '../types/taxFlow';
import { TrendingUp, Users, DollarSign, CalendarCheck } from 'lucide-react';

export interface MetricControlsProps {
  activeMetric: MetricType;
  onMetricChange: (metric: MetricType) => void;
  activeBaseline: BaselineYear;
  onBaselineChange: (baseline: BaselineYear) => void;
  className?: string;
}

interface MetricConfig {
  id: MetricType;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const METRIC_CONFIGS: MetricConfig[] = [
  {
    id: 'returnOnDollar',
    label: 'Return on Tax Dollar',
    shortLabel: 'Return / $1',
    icon: TrendingUp,
    description: 'Aids returned per $1.00 taxes sent (breakeven at $1.00)',
  },
  {
    id: 'netFlowPerCapita',
    label: 'Per-Capita Net Flow',
    shortLabel: 'Per Capita',
    icon: Users,
    description: 'Net balance per county resident (Aids - Taxes) / Population',
  },
  {
    id: 'totalNetFlow',
    label: 'Total Net Dollars',
    shortLabel: 'Total Net',
    icon: DollarSign,
    description: 'Aggregate county net balance (Total Aids - Total Taxes)',
  },
];

interface BaselineConfig {
  id: BaselineYear;
  label: string;
  badge?: string;
  description: string;
}

const BASELINE_CONFIGS: BaselineConfig[] = [
  {
    id: 'postAct12',
    label: 'Post-Act 12',
    badge: 'Current 2024+',
    description: 'Reflects 2023 Wis. Act 12 shared revenue overhaul (>=20% aid boost)',
  },
  {
    id: 'preAct12',
    label: 'Pre-Act 12',
    badge: 'Historic',
    description: 'Prior statutory baseline before 2023 shared revenue reforms',
  },
];

export const MetricControls: React.FC<MetricControlsProps> = ({
  activeMetric,
  onMetricChange,
  activeBaseline,
  onBaselineChange,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4 ${className}`}
      data-testid="metric-controls"
    >
      {/* Metric Selector Group */}
      <div className="space-y-1.5 flex-1">
        <label
          id="metric-label"
          className="block text-xs font-semibold text-slate-700 tracking-tight"
        >
          Map Visualization Metric
        </label>
        <div
          role="radiogroup"
          aria-labelledby="metric-label"
          className="inline-flex w-full bg-slate-100 p-1 rounded-lg gap-1 border border-slate-200/60"
        >
          {METRIC_CONFIGS.map((config) => {
            const isSelected = activeMetric === config.id;
            const Icon = config.icon;
            return (
              <button
                key={config.id}
                role="radio"
                aria-checked={isSelected}
                onClick={() => onMetricChange(config.id)}
                title={config.description}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-md text-xs transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-300' : 'text-slate-500'}`} />
                <span className="hidden md:inline">{config.label}</span>
                <span className="md:hidden">{config.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Baseline Toggle Group */}
      <div className="space-y-1.5 sm:w-auto">
        <label
          id="baseline-label"
          className="block text-xs font-semibold text-slate-700 tracking-tight"
        >
          Statutory Baseline
        </label>
        <div
          role="radiogroup"
          aria-labelledby="baseline-label"
          className="inline-flex bg-slate-100 p-1 rounded-lg gap-1 border border-slate-200/60 w-full sm:w-auto"
        >
          {BASELINE_CONFIGS.map((config) => {
            const isSelected = activeBaseline === config.id;
            return (
              <button
                key={config.id}
                role="radio"
                aria-checked={isSelected}
                onClick={() => onBaselineChange(config.id)}
                title={config.description}
                className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  isSelected
                    ? 'bg-teal-700 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
                }`}
              >
                <CalendarCheck
                  className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-200' : 'text-slate-500'}`}
                />
                <span>{config.label}</span>
                {config.badge && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded font-normal ${
                      isSelected
                        ? 'bg-teal-800 text-teal-100 border border-teal-600'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {config.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetricControls;
