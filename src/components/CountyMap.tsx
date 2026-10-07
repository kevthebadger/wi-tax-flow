import React, { useState, useRef, useMemo, useCallback } from 'react';
import type { CountyRecord, MetricType, BaselineYear } from '../types/taxFlow';
import { WI_COUNTY_PATHS, CountyGeoBoundary } from '../data/wiCountySvgPaths';
import { getColorForMetric } from '../utils/colorScale';
import {
  formatCurrency,
  formatReturnRatio,
  formatPopulation,
  formatCentsPerDollar,
} from '../utils/formatters';

export interface CountyMapProps {
  counties: CountyRecord[];
  activeMetric: MetricType;
  activeBaseline: BaselineYear;
  selectedFips: string | null;
  comparisonFips?: string | null;
  onSelectCounty: (fips: string) => void;
  onHoverCounty?: (fips: string | null) => void;
  className?: string;
}

interface TooltipData {
  county: CountyRecord;
  geo: CountyGeoBoundary;
  x: number;
  y: number;
}

export const CountyMap: React.FC<CountyMapProps> = ({
  counties,
  activeMetric,
  activeBaseline,
  selectedFips,
  comparisonFips,
  onSelectCounty,
  onHoverCounty,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFips, setHoveredFips] = useState<string | null>(null);
  const [focusedFips, setFocusedFips] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Fast O(1) lookup dictionary of county data records by FIPS
  const countyMap = useMemo(() => {
    const map = new Map<string, CountyRecord>();
    for (const county of counties) {
      map.set(county.fips, county);
    }
    return map;
  }, [counties]);

  // Active county for tooltip display (prefers hovered, falls back to keyboard focused)
  const activeTooltipFips = hoveredFips || focusedFips;

  const tooltipData = useMemo<TooltipData | null>(() => {
    if (!activeTooltipFips) return null;
    const county = countyMap.get(activeTooltipFips);
    const geo = WI_COUNTY_PATHS[activeTooltipFips];
    if (!county || !geo) return null;

    let x = 0;
    let y = 0;

    if (mousePos && hoveredFips) {
      x = mousePos.x;
      y = mousePos.y;
    } else if (containerRef.current) {
      // Map SVG viewBox coordinates (0..600, 0..650) to container pixel coordinates
      const rect = containerRef.current.getBoundingClientRect();
      x = (geo.centroid[0] / 600) * rect.width;
      y = (geo.centroid[1] / 650) * rect.height;
    }

    return { county, geo, x, y };
  }, [activeTooltipFips, countyMap, mousePos, hoveredFips]);

  // Coordinate tracking for mouse hover
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnterCounty = useCallback(
    (fips: string, e: React.MouseEvent<SVGPathElement>) => {
      setHoveredFips(fips);
      onHoverCounty?.(fips);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [onHoverCounty]
  );

  const handleMouseLeaveCounty = useCallback(() => {
    setHoveredFips(null);
    setMousePos(null);
    onHoverCounty?.(null);
  }, [onHoverCounty]);

  const handleKeyDownCounty = useCallback(
    (fips: string, e: React.KeyboardEvent<SVGPathElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelectCounty(fips);
      }
    },
    [onSelectCounty]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[640px] mx-auto select-none ${className}`}
      data-testid="county-map-container"
    >
      {/* Screen-reader status announcement */}
      <div className="sr-only" aria-live="polite">
        {selectedFips && countyMap.has(selectedFips)
          ? `Selected ${countyMap.get(selectedFips)?.name} County. Showing fiscal breakdown.`
          : 'Wisconsin choropleth map. Select a county to view financial flow metrics.'}
      </div>

      <svg
        viewBox="0 0 600 650"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto overflow-visible filter drop-shadow-sm"
        onMouseMove={handleMouseMove}
        role="region"
        aria-label="Wisconsin 72-County Choropleth Map"
      >
        <defs>
          <filter id="map-selection-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e3a8a" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Base Layer: All 72 County Fills */}
        <g id="county-base-layer">
          {Object.entries(WI_COUNTY_PATHS).map(([fips, geo]) => {
            const county = countyMap.get(fips);
            if (!county) return null;

            const metrics = county[activeBaseline].metrics;
            const metricValue =
              activeMetric === 'returnOnDollar'
                ? metrics.returnOnDollar
                : activeMetric === 'netFlowPerCapita'
                ? metrics.netFlowPerCapita
                : metrics.netFlow;

            const fillColor = getColorForMetric(metricValue, activeMetric);
            const isSelected = selectedFips === fips;
            const isHovered = hoveredFips === fips;
            const isFocused = focusedFips === fips;

            const ariaLabel = `${county.name} County: ${formatReturnRatio(
              metrics.returnOnDollar
            )} (${formatCentsPerDollar(metrics.returnOnDollar, {
              isRatio: true,
            })}), ${
              metrics.classification === 'recipient' ? 'Recipient' : 'Donor'
            } status, net flow ${formatCurrency(metrics.netFlow, {
              compact: true,
              showSign: true,
            })}, population ${formatPopulation(county.population)}.`;

            return (
              <path
                key={fips}
                id={`county-${fips}`}
                d={geo.path}
                data-fips={fips}
                data-name={county.name}
                fill={fillColor}
                stroke="#ffffff"
                strokeWidth={1}
                strokeLinejoin="round"
                strokeLinecap="round"
                role="button"
                tabIndex={0}
                aria-label={ariaLabel}
                aria-pressed={isSelected}
                className={`transition-colors duration-200 cursor-pointer outline-none ${
                  isHovered || isFocused ? 'brightness-105' : ''
                }`}
                onClick={() => onSelectCounty(fips)}
                onMouseEnter={(e) => handleMouseEnterCounty(fips, e)}
                onMouseLeave={handleMouseLeaveCounty}
                onFocus={() => setFocusedFips(fips)}
                onBlur={() => setFocusedFips(null)}
                onKeyDown={(e) => handleKeyDownCounty(fips, e)}
              />
            );
          })}
        </g>

        {/* Overlay Highlight Layer (Guarantees borders render over neighbor polygons) */}
        <g id="county-overlay-layer" className="pointer-events-none">
          {/* Comparison County Highlight */}
          {comparisonFips && WI_COUNTY_PATHS[comparisonFips] && (
            <path
              d={WI_COUNTY_PATHS[comparisonFips].path}
              fill="none"
              stroke="#0284c7"
              strokeWidth={3}
              strokeDasharray="4 2"
              strokeLinejoin="round"
            />
          )}

          {/* Hovered / Focused County Highlight */}
          {(hoveredFips || focusedFips) &&
            activeTooltipFips &&
            activeTooltipFips !== selectedFips &&
            WI_COUNTY_PATHS[activeTooltipFips] && (
              <path
                d={WI_COUNTY_PATHS[activeTooltipFips].path}
                fill="none"
                stroke="#0f172a"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />
            )}

          {/* Active Selected County Primary Highlight */}
          {selectedFips && WI_COUNTY_PATHS[selectedFips] && (
            <path
              d={WI_COUNTY_PATHS[selectedFips].path}
              fill="none"
              stroke="#1e3a8a"
              strokeWidth={3.5}
              strokeLinejoin="round"
              filter="url(#map-selection-glow)"
            />
          )}
        </g>
      </svg>

      {/* Rich Interactive Floating Tooltip */}
      {tooltipData && (
        <div
          role="tooltip"
          className="absolute z-20 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: `${Math.min(
              Math.max(tooltipData.x + 12, 10),
              (containerRef.current?.clientWidth || 500) - 240
            )}px`,
            top: `${Math.max(tooltipData.y - 120, 10)}px`,
          }}
        >
          <div className="bg-slate-900/95 text-white backdrop-blur-sm px-3.5 py-2.5 rounded-lg shadow-xl border border-slate-700/80 text-xs w-[220px] pointer-events-none space-y-1.5">
            {/* Header: Name and Status Badge */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
              <span className="font-bold text-sm tracking-tight text-white">
                {tooltipData.county.name} County
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${
                  tooltipData.county[activeBaseline].metrics.classification === 'recipient'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {tooltipData.county[activeBaseline].metrics.classification}
              </span>
            </div>

            {/* Metric Rows */}
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans text-[11px]">Return on $1:</span>
                <span className="font-bold text-teal-300">
                  {formatReturnRatio(
                    tooltipData.county[activeBaseline].metrics.returnOnDollar
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans text-[11px]">Return in ¢:</span>
                <span className="text-slate-200">
                  {formatCentsPerDollar(
                    tooltipData.county[activeBaseline].metrics.returnOnDollar,
                    { isRatio: true, decimals: 1 }
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans text-[11px]">Net Flow:</span>
                <span
                  className={
                    tooltipData.county[activeBaseline].metrics.netFlow >= 0
                      ? 'text-teal-300'
                      : 'text-amber-300'
                  }
                >
                  {formatCurrency(tooltipData.county[activeBaseline].metrics.netFlow, {
                    compact: true,
                    showSign: true,
                  })}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span className="font-sans text-[10px]">Population:</span>
                <span className="text-[10px] font-mono">
                  {formatPopulation(tooltipData.county.population)}
                </span>
              </div>
            </div>

            {/* Footer Prompt */}
            <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-400 text-center font-sans">
              Click or press Enter to inspect
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountyMap;
