import React, { useState, useId } from 'react';
import { MapPin, ArrowDown, Check } from 'lucide-react';
import type { MetricType, BaselineYear, CountyRecord } from '../types/taxFlow';
import {
  getLegendThresholds,
  getScalePosition,
  getColorStopIndex,
  getMetricUnitLabel,
  getMetricDescription,
} from '../utils/colorScale';
import {
  formatCurrency,
  formatCentsPerDollar,
  formatNetFlowPerCapita,
} from '../utils/formatters';

export interface MapLegendProps {
  /** Active visualization metric */
  metric: MetricType;
  /** Currently selected/inspected county record (or null if none selected) */
  selectedCounty?: CountyRecord | null;
  /** Active legislative baseline ('postAct12' | 'preAct12') */
  activeBaseline?: BaselineYear;
  /** Currently active/hovered bin index (0..8) from parent, if controlled */
  activeBinIndex?: number | null;
  /** Callback when user hovers or unhovers a bin swatch */
  onHoverBin?: (binIndex: number | null) => void;
  /** Callback when user clicks to lock/toggle filtering on a bin */
  onSelectBin?: (binIndex: number | null) => void;
  /** Optional custom CSS classes for container */
  className?: string;
  /** Optional compact mode for tight sidebars */
  compact?: boolean;
}

/**
 * Accessible, interactive 9-step diverging choropleth legend for the Wisconsin Tax Flow map.
 *
 * Features:
 * 1. 9-step vermilion-to-teal diverging bar centered at $1.00 ($100¢ / $0 net flow).
 * 2. Dynamic pin/arrow location indicator showing the exact position of the inspected county.
 * 3. Interactive category & bin highlight on hover and keyboard focus.
 * 4. WCAG 2.1 AA accessible contrast, ARIA roles, and screen-reader announcements.
 */
export const MapLegend: React.FC<MapLegendProps> = ({
  metric,
  selectedCounty = null,
  activeBaseline = 'postAct12',
  activeBinIndex: controlledBinIndex = null,
  onHoverBin,
  onSelectBin,
  className = '',
}) => {
  const [internalHoveredBin, setInternalHoveredBin] = useState<number | null>(null);
  const [lockedBin, setLockedBin] = useState<number | null>(null);
  const legendId = useId();

  const thresholds = getLegendThresholds(metric);
  const activeHover = controlledBinIndex !== undefined && controlledBinIndex !== null
    ? controlledBinIndex
    : internalHoveredBin;
  const currentActiveBin = lockedBin !== null ? lockedBin : activeHover;

  // Extract selected county metric value and position along scale
  let selectedCountyValue: number | null = null;
  let selectedCountyLabel = '';
  let pinPosition = 50;
  let selectedCountyBinIndex: number | null = null;

  if (selectedCounty) {
    const eraData = selectedCounty[activeBaseline] ?? selectedCounty.postAct12;
    if (metric === 'returnOnDollar') {
      selectedCountyValue = eraData.metrics.returnOnDollar;
      selectedCountyLabel = formatCentsPerDollar(selectedCountyValue, { isRatio: true });
    } else if (metric === 'netFlowPerCapita') {
      selectedCountyValue = eraData.metrics.netFlowPerCapita;
      selectedCountyLabel = formatNetFlowPerCapita(selectedCountyValue);
    } else {
      selectedCountyValue = eraData.metrics.netFlow;
      selectedCountyLabel = formatCurrency(selectedCountyValue, { compact: true, showSign: true });
    }

    pinPosition = getScalePosition(selectedCountyValue, metric);
    selectedCountyBinIndex = getColorStopIndex(selectedCountyValue, metric);
  }

  const handleBinMouseEnter = (index: number) => {
    setInternalHoveredBin(index);
    onHoverBin?.(index);
  };

  const handleBinMouseLeave = () => {
    setInternalHoveredBin(null);
    onHoverBin?.(null);
  };

  const handleBinClick = (index: number) => {
    const nextLocked = lockedBin === index ? null : index;
    setLockedBin(nextLocked);
    onSelectBin?.(nextLocked);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBinClick(index);
    }
  };

  const unitLabel = getMetricUnitLabel(metric);
  const description = getMetricDescription(metric);

  return (
    <nav
      aria-label="Map color legend and scale filter"
      className={`bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm text-slate-800 transition-all ${className}`}
    >
      {/* Legend Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-500">
              Choropleth Legend
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
              {unitLabel}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1" title={description}>
            {description}
          </p>
        </div>

        {lockedBin !== null && (
          <button
            type="button"
            onClick={() => handleBinClick(lockedBin)}
            className="text-[11px] text-slate-500 hover:text-slate-800 underline flex items-center gap-1 focus:outline-none"
            aria-label="Clear active bin filter"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Dynamic Pin Indicator Track & Callout */}
      <div className="relative w-full h-8 mb-1">
        {selectedCounty && selectedCountyValue !== null && (
          <div
            className="absolute top-0 flex flex-col items-center pointer-events-none transition-all duration-300 ease-out z-20"
            style={{
              left: `${pinPosition}%`,
              transform: 'translateX(-50%)',
            }}
            aria-live="polite"
          >
            {/* County Value Badge */}
            <div className="px-2 py-0.5 bg-slate-900 text-white text-[11px] font-mono font-semibold rounded-md shadow-md flex items-center gap-1 whitespace-nowrap">
              <MapPin className="w-3 h-3 text-teal-400 shrink-0" aria-hidden="true" />
              <span>{selectedCounty.name}:</span>
              <span className="text-teal-300">{selectedCountyLabel}</span>
            </div>
            {/* Downward Pointer Arrow */}
            <ArrowDown className="w-3.5 h-3.5 text-slate-900 -mt-1 drop-shadow-sm animate-bounce" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* 9-Step Diverging Color Bar Swatches */}
      <div
        role="group"
        aria-label="9-step diverging color scale"
        className="relative flex w-full h-7 rounded-lg overflow-hidden border border-slate-300 shadow-inner p-0.5 bg-slate-200 gap-0.5"
      >
        {thresholds.map((threshold, idx) => {
          const isHovered = currentActiveBin === idx;
          const isSelectedCountyBin = selectedCountyBinIndex === idx;
          const isOtherDimmed = currentActiveBin !== null && !isHovered;

          return (
            <button
              key={`${legendId}-bin-${threshold.index}`}
              type="button"
              tabIndex={0}
              aria-pressed={lockedBin === idx}
              aria-label={`${threshold.category} bin ${threshold.label}: ${threshold.ariaDescription}${lockedBin === idx ? ' (Selected)' : ''}`}
              onMouseEnter={() => handleBinMouseEnter(idx)}
              onMouseLeave={handleBinMouseLeave}
              onClick={() => handleBinClick(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{ backgroundColor: threshold.color }}
              className={`
                relative flex-1 h-full transition-all duration-150 rounded-sm flex items-center justify-center
                focus:outline-none focus:ring-2 focus:ring-slate-900 focus:z-20
                ${isHovered ? 'scale-y-110 z-10 shadow-md ring-2 ring-slate-900' : ''}
                ${isOtherDimmed ? 'opacity-40 grayscale-[20%]' : 'opacity-100'}
                ${isSelectedCountyBin && !isHovered ? 'ring-2 ring-white/80 ring-offset-1' : ''}
                ${threshold.category === 'neutral' ? 'border border-slate-300/80' : ''}
              `}
              title={`${threshold.label} (${threshold.category})`}
            >
              {lockedBin === idx && (
                <Check
                  className={`w-3.5 h-3.5 ${
                    threshold.textContrast === 'light' ? 'text-white' : 'text-slate-900'
                  }`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Threshold Labels */}
      <div className="flex justify-between items-center mt-1.5 px-0.5 text-[10px] text-slate-500 font-mono">
        <span className="flex items-center gap-1 font-medium text-amber-800" title="Donor threshold">
          {thresholds[0].shortLabel}
        </span>
        <span
          className="flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200"
          title="Balanced Parity ($1.00 return)"
        >
          {thresholds[4].shortLabel}
        </span>
        <span className="flex items-center gap-1 font-medium text-teal-800" title="Recipient threshold">
          {thresholds[8].shortLabel}
        </span>
      </div>

      {/* Macro Civic Polarity Categories */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-3 text-center text-xs">
        <div className="flex flex-col items-center">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-800">
            <span className="w-2 h-2 rounded-full bg-[#c2410c]" aria-hidden="true" />
            Donor
          </span>
          <span className="text-[10px] text-slate-500">Sends &gt; Returns</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-300 border border-slate-400" aria-hidden="true" />
            Balanced
          </span>
          <span className="text-[10px] text-slate-500">~1:1 Ratio</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="inline-flex items-center gap-1 font-semibold text-teal-800">
            <span className="w-2 h-2 rounded-full bg-[#14b8a6]" aria-hidden="true" />
            Recipient
          </span>
          <span className="text-[10px] text-slate-500">Returns &gt; Sends</span>
        </div>
      </div>

      {/* Active Hover / Focus Explainer Pill */}
      {currentActiveBin !== null && (
        <div
          role="status"
          aria-live="polite"
          className="mt-2 p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-slate-300 shrink-0"
              style={{ backgroundColor: thresholds[currentActiveBin].color }}
            />
            <span className="font-semibold text-slate-800">
              {thresholds[currentActiveBin].label}
            </span>
            <span className="text-slate-400">&bull;</span>
            <span className="capitalize text-slate-600 font-medium">
              {thresholds[currentActiveBin].category}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {lockedBin === currentActiveBin ? 'Filter Locked' : 'Click to Filter'}
          </span>
        </div>
      )}
    </nav>
  );
};

export default MapLegend;
