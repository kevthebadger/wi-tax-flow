import type { MetricType } from '../types/taxFlow';

/**
 * Civic fiscal classification categories for Wisconsin county tax flows.
 */
export type BinCategory = 'donor' | 'neutral' | 'recipient';

/**
 * Contrast hint for text overlayed on swatch backgrounds.
 */
export type TextContrast = 'light' | 'dark';

/**
 * Structural definition for a single threshold step in the diverging color scale.
 */
export interface LegendThreshold {
  /** Index from 0 (deepest donor) to 8 (deepest recipient) */
  index: number;
  /** Display label for the range (e.g. "< $0.50", "$0.50–$0.69", "≥ $2.00") */
  label: string;
  /** Concise abbreviated label for tight mobile screens (e.g. "< 50¢", "Parity") */
  shortLabel: string;
  /** Hex color token */
  color: string;
  /** Lower bound of interval (inclusive, or -Infinity) */
  min: number;
  /** Upper bound of interval (exclusive, or Infinity) */
  max: number;
  /** Qualitative classification: 'donor' | 'neutral' | 'recipient' */
  category: BinCategory;
  /** Recommended text foreground color for contrast compliance */
  textContrast: TextContrast;
  /** Screen reader accessible description */
  ariaDescription: string;
}

/**
 * Authoritative 9-step accessible diverging color scale for Return on Tax Dollar.
 * Centered at neutral parity: $0.99 – $1.02 return per $1.00 sent.
 *
 * Donor Palette (Orange/Rust):
 * - Bin 0: < $0.50     (#991b1b) Deep Vermilion
 * - Bin 1: $0.50–$0.69  (#c2410c) Rust Orange
 * - Bin 2: $0.70–$0.84  (#ea580c) Warm Amber
 * - Bin 3: $0.85–$0.98  (#fb923c) Light Orange
 *
 * Neutral / Parity:
 * - Bin 4: $0.99–$1.02  (#f1f5f9) Slate 100
 *
 * Recipient Palette (Teal/Cyan):
 * - Bin 5: $1.03–$1.25  (#5eead4) Soft Teal
 * - Bin 6: $1.26–$1.60  (#14b8a6) Medium Vibrant Teal
 * - Bin 7: $1.61–$2.00  (#0f766e) Deep Teal
 * - Bin 8: ≥ $2.00      (#134e4a) Dark Spruce Teal
 */
export const RETURN_ON_DOLLAR_THRESHOLDS: readonly LegendThreshold[] = [
  {
    index: 0,
    label: '< $0.50',
    shortLabel: '< 50¢',
    color: '#991b1b',
    min: 0,
    max: 0.50,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Deep donor: returns less than 50 cents per tax dollar paid',
  },
  {
    index: 1,
    label: '$0.50 – $0.69',
    shortLabel: '50–69¢',
    color: '#c2410c',
    min: 0.50,
    max: 0.70,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Substantial donor: returns 50 to 69 cents per tax dollar paid',
  },
  {
    index: 2,
    label: '$0.70 – $0.84',
    shortLabel: '70–84¢',
    color: '#ea580c',
    min: 0.70,
    max: 0.85,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Moderate donor: returns 70 to 84 cents per tax dollar paid',
  },
  {
    index: 3,
    label: '$0.85 – $0.98',
    shortLabel: '85–98¢',
    color: '#fb923c',
    min: 0.85,
    max: 0.99,
    category: 'donor',
    textContrast: 'dark',
    ariaDescription: 'Slight donor: returns 85 to 98 cents per tax dollar paid',
  },
  {
    index: 4,
    label: '$0.99 – $1.02',
    shortLabel: 'Parity',
    color: '#f1f5f9',
    min: 0.99,
    max: 1.025,
    category: 'neutral',
    textContrast: 'dark',
    ariaDescription: 'Balanced parity: returns 99 to 102 cents per dollar paid (within ±2% of parity)',
  },
  {
    index: 5,
    label: '$1.03 – $1.25',
    shortLabel: '$1.03–$1.25',
    color: '#5eead4',
    min: 1.025,
    max: 1.255,
    category: 'recipient',
    textContrast: 'dark',
    ariaDescription: 'Slight recipient: returns $1.03 to $1.25 per tax dollar paid',
  },
  {
    index: 6,
    label: '$1.26 – $1.60',
    shortLabel: '$1.26–$1.60',
    color: '#14b8a6',
    min: 1.255,
    max: 1.605,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Moderate recipient: returns $1.26 to $1.60 per tax dollar paid',
  },
  {
    index: 7,
    label: '$1.61 – $2.00',
    shortLabel: '$1.61–$2.00',
    color: '#0f766e',
    min: 1.605,
    max: 2.00,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Substantial recipient: returns $1.61 to $2.00 per tax dollar paid',
  },
  {
    index: 8,
    label: '≥ $2.00',
    shortLabel: '≥ $2.00',
    color: '#134e4a',
    min: 2.00,
    max: Infinity,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Extreme recipient: returns $2.00 or more per tax dollar paid',
  },
];

/**
 * 9-step accessible diverging color scale for Per-Capita Net Flow ($ / resident).
 * Centered around neutral break-even (±$50 / resident).
 */
export const PER_CAPITA_NET_FLOW_THRESHOLDS: readonly LegendThreshold[] = [
  {
    index: 0,
    label: '< -$2,000',
    shortLabel: '< -$2K',
    color: '#991b1b',
    min: -Infinity,
    max: -2000,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Deep donor: net outflow exceeding $2,000 per resident',
  },
  {
    index: 1,
    label: '-$2,000 to -$1,000',
    shortLabel: '-$2K to -$1K',
    color: '#c2410c',
    min: -2000,
    max: -1000,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Substantial donor: net outflow of $1,000 to $2,000 per resident',
  },
  {
    index: 2,
    label: '-$1,000 to -$350',
    shortLabel: '-$1K to -$350',
    color: '#ea580c',
    min: -1000,
    max: -350,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Moderate donor: net outflow of $350 to $1,000 per resident',
  },
  {
    index: 3,
    label: '-$350 to -$50',
    shortLabel: '-$350 to -$50',
    color: '#fb923c',
    min: -350,
    max: -50,
    category: 'donor',
    textContrast: 'dark',
    ariaDescription: 'Slight donor: net outflow of $50 to $350 per resident',
  },
  {
    index: 4,
    label: '±$50',
    shortLabel: '±$50',
    color: '#f1f5f9',
    min: -50,
    max: 50,
    category: 'neutral',
    textContrast: 'dark',
    ariaDescription: 'Balanced parity: within ±$50 per resident net flow',
  },
  {
    index: 5,
    label: '+$50 to +$350',
    shortLabel: '+$50 to +$350',
    color: '#5eead4',
    min: 50,
    max: 350,
    category: 'recipient',
    textContrast: 'dark',
    ariaDescription: 'Slight recipient: net inflow of $50 to $350 per resident',
  },
  {
    index: 6,
    label: '+$350 to +$1,000',
    shortLabel: '+$350 to +$1K',
    color: '#14b8a6',
    min: 350,
    max: 1000,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Moderate recipient: net inflow of $350 to $1,000 per resident',
  },
  {
    index: 7,
    label: '+$1,000 to +$2,000',
    shortLabel: '+$1K to +$2K',
    color: '#0f766e',
    min: 1000,
    max: 2000,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Substantial recipient: net inflow of $1,000 to $2,000 per resident',
  },
  {
    index: 8,
    label: '≥ +$2,000',
    shortLabel: '≥ +$2K',
    color: '#134e4a',
    min: 2000,
    max: Infinity,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Extreme recipient: net inflow exceeding $2,000 per resident',
  },
];

/**
 * 9-step accessible diverging color scale for Total Net Dollars ($).
 * Centered around neutral break-even (±$2M total).
 */
export const TOTAL_NET_FLOW_THRESHOLDS: readonly LegendThreshold[] = [
  {
    index: 0,
    label: '< -$500M',
    shortLabel: '< -$500M',
    color: '#991b1b',
    min: -Infinity,
    max: -500_000_000,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Major donor: aggregate net outflow exceeding $500 million',
  },
  {
    index: 1,
    label: '-$500M to -$150M',
    shortLabel: '-$500M–$150M',
    color: '#c2410c',
    min: -500_000_000,
    max: -150_000_000,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Large donor: aggregate net outflow of $150M to $500M',
  },
  {
    index: 2,
    label: '-$150M to -$40M',
    shortLabel: '-$150M–$40M',
    color: '#ea580c',
    min: -150_000_000,
    max: -40_000_000,
    category: 'donor',
    textContrast: 'light',
    ariaDescription: 'Moderate donor: aggregate net outflow of $40M to $150M',
  },
  {
    index: 3,
    label: '-$40M to -$2M',
    shortLabel: '-$40M–$2M',
    color: '#fb923c',
    min: -40_000_000,
    max: -2_000_000,
    category: 'donor',
    textContrast: 'dark',
    ariaDescription: 'Small donor: aggregate net outflow of $2M to $40M',
  },
  {
    index: 4,
    label: '±$2M',
    shortLabel: '±$2M',
    color: '#f1f5f9',
    min: -2_000_000,
    max: 2_000_000,
    category: 'neutral',
    textContrast: 'dark',
    ariaDescription: 'Balanced parity: within ±$2 million aggregate net flow',
  },
  {
    index: 5,
    label: '+$2M to +$10M',
    shortLabel: '+$2M–$10M',
    color: '#5eead4',
    min: 2_000_000,
    max: 10_000_000,
    category: 'recipient',
    textContrast: 'dark',
    ariaDescription: 'Small recipient: aggregate net inflow of $2M to $10M',
  },
  {
    index: 6,
    label: '+$10M to +$25M',
    shortLabel: '+$10M–$25M',
    color: '#14b8a6',
    min: 10_000_000,
    max: 25_000_000,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Moderate recipient: aggregate net inflow of $10M to $25M',
  },
  {
    index: 7,
    label: '+$25M to +$60M',
    shortLabel: '+$25M–$60M',
    color: '#0f766e',
    min: 25_000_000,
    max: 60_000_000,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Substantial recipient: aggregate net inflow of $25M to $60M',
  },
  {
    index: 8,
    label: '≥ +$60M',
    shortLabel: '≥ +$60M',
    color: '#134e4a',
    min: 60_000_000,
    max: Infinity,
    category: 'recipient',
    textContrast: 'light',
    ariaDescription: 'Major recipient: aggregate net inflow exceeding $60 million',
  },
];

/**
 * Normalizes metric string aliases to canonical keys.
 */
function normalizeMetric(metric: MetricType | string): MetricType {
  if (metric === 'netFlowPerCapita' || metric === 'perCapita' || metric === 'perCapitaNetFlow') {
    return 'netFlowPerCapita';
  }
  if (metric === 'totalNetFlow' || metric === 'totalNet' || metric === 'total') {
    return 'totalNetFlow';
  }
  return 'returnOnDollar';
}

/**
 * Retrieves the 9 threshold stops for the specified metric.
 */
export function getLegendThresholds(metric: MetricType | string): LegendThreshold[] {
  const norm = normalizeMetric(metric);
  if (norm === 'netFlowPerCapita') {
    return [...PER_CAPITA_NET_FLOW_THRESHOLDS];
  }
  if (norm === 'totalNetFlow') {
    return [...TOTAL_NET_FLOW_THRESHOLDS];
  }
  return [...RETURN_ON_DOLLAR_THRESHOLDS];
}

/**
 * Maps a numeric metric value to its corresponding color token.
 */
export function getColorForMetric(value: number, metric: MetricType | string = 'returnOnDollar'): string {
  if (Number.isNaN(value)) {
    return '#f1f5f9'; // Safe neutral fallback
  }

  const thresholds = getLegendThresholds(metric);

  if (value === Infinity) {
    return thresholds[thresholds.length - 1].color;
  }
  if (value === -Infinity) {
    return thresholds[0].color;
  }

  for (let i = 0; i < thresholds.length; i++) {
    const t = thresholds[i];
    if (i === thresholds.length - 1) {
      if (value >= t.min) return t.color;
    } else {
      if (value < t.max) return t.color;
    }
  }

  return thresholds[thresholds.length - 1].color;
}

/**
 * Retrieves the 0-indexed bin index (0 to 8) for a given value.
 */
export function getColorStopIndex(value: number, metric: MetricType | string = 'returnOnDollar'): number {
  if (Number.isNaN(value)) {
    return 4; // Center neutral bin
  }

  const thresholds = getLegendThresholds(metric);

  if (value === Infinity) {
    return thresholds.length - 1;
  }
  if (value === -Infinity) {
    return 0;
  }

  for (let i = 0; i < thresholds.length; i++) {
    const t = thresholds[i];
    if (i === thresholds.length - 1) {
      if (value >= t.min) return i;
    } else {
      if (value < t.max) return i;
    }
  }

  return thresholds.length - 1;
}

/**
 * Resolves qualitative civic classification for a metric value.
 */
export function getCategoryForMetric(value: number, metric: MetricType | string = 'returnOnDollar'): BinCategory {
  const idx = getColorStopIndex(value, metric);
  const thresholds = getLegendThresholds(metric);
  return thresholds[idx]?.category ?? 'neutral';
}

/**
 * Computes the continuous horizontal marker pin position (0% to 100%)
 * along the 9-swatch legend bar for dynamic county indicator placement.
 */
export function getScalePosition(value: number, metric: MetricType | string = 'returnOnDollar'): number {
  if (!Number.isFinite(value)) {
    return 50.0;
  }

  const thresholds = getLegendThresholds(metric);
  const binCount = thresholds.length;
  const binWidth = 100 / binCount;

  const idx = getColorStopIndex(value, metric);
  const currentBin = thresholds[idx];

  let fraction = 0.5;

  if (idx === 0) {
    const lower = Number.isFinite(currentBin.min) ? currentBin.min : currentBin.max * 2;
    const range = currentBin.max - lower;
    if (range > 0) {
      fraction = (value - lower) / range;
    }
  } else if (idx === binCount - 1) {
    const upper = Number.isFinite(currentBin.max) ? currentBin.max : currentBin.min * 1.5;
    const range = upper - currentBin.min;
    if (range > 0) {
      fraction = (value - currentBin.min) / range;
    }
  } else {
    const range = currentBin.max - currentBin.min;
    if (range > 0) {
      fraction = (value - currentBin.min) / range;
    }
  }

  const clampedFraction = Math.max(0, Math.min(1, fraction));
  const rawPercentage = (idx + clampedFraction) * binWidth;

  return Math.max(2, Math.min(98, Math.round(rawPercentage * 10) / 10));
}

/**
 * Returns human-readable unit title for the active metric.
 */
export function getMetricUnitLabel(metric: MetricType | string): string {
  const norm = normalizeMetric(metric);
  if (norm === 'netFlowPerCapita') {
    return 'Net Flow per Resident';
  }
  if (norm === 'totalNetFlow') {
    return 'Total Net Tax Flow';
  }
  return 'Return per $1.00 Paid';
}

/**
 * Returns nonpartisan civic description for the active metric.
 */
export function getMetricDescription(metric: MetricType | string): string {
  const norm = normalizeMetric(metric);
  if (norm === 'netFlowPerCapita') {
    return 'Net state dollars returned (Aids − Taxes) divided by county population';
  }
  if (norm === 'totalNetFlow') {
    return 'Aggregate county fiscal balance (Total Aids − Total State Taxes)';
  }
  return 'Cents in state aids returned for every $1.00 in income & sales taxes sent';
}
