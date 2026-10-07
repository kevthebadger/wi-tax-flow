export interface CurrencyOptions {
  compact?: boolean;
  decimals?: number;
  showSign?: boolean;
}

export interface CentsOptions {
  isRatio?: boolean;
  decimals?: number;
  includeSuffix?: boolean;
}

export interface PercentOptions {
  isRatio?: boolean;
  showSign?: boolean;
}

/**
 * Formats a numeric value into US currency format.
 * Supports compact notation ($1.2B, $450M) and explicit sign display (+ / -).
 *
 * @param amount Numeric dollar amount
 * @param options Formatting options: compact, decimals, showSign
 */
export function formatCurrency(amount: number, options: CurrencyOptions = {}): string {
  if (!Number.isFinite(amount)) return '$0';

  const { compact = false, decimals, showSign = false } = options;
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const signPrefix = showSign ? (amount > 0 ? '+' : isNegative ? '-' : '') : isNegative ? '-' : '';

  if (compact) {
    if (absAmount >= 1_000_000_000) {
      const d = decimals !== undefined ? decimals : 2;
      return `${signPrefix}$${(absAmount / 1_000_000_000).toFixed(d)}B`;
    }
    if (absAmount >= 1_000_000) {
      const d = decimals !== undefined ? decimals : 1;
      return `${signPrefix}$${(absAmount / 1_000_000).toFixed(d)}M`;
    }
    if (absAmount >= 1_000) {
      const d = decimals !== undefined ? decimals : 1;
      return `${signPrefix}$${(absAmount / 1_000).toFixed(d)}K`;
    }
    const d = decimals !== undefined ? decimals : 0;
    return `${signPrefix}$${absAmount.toFixed(d)}`;
  }

  const d = decimals !== undefined ? decimals : 0;
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(absAmount);

  return `${signPrefix}$${formatted}`;
}

/**
 * Formats Return on Tax Dollar into citizen-friendly cents representation (e.g. 54.0¢).
 *
 * @param value Return value either as ratio (0.54) or in cents (54.0)
 * @param options Formatting options: isRatio, decimals, includeSuffix
 */
export function formatCentsPerDollar(value: number, options: CentsOptions = {}): string {
  if (!Number.isFinite(value)) return '0.0¢';

  const { isRatio = false, decimals = 1, includeSuffix = false } = options;
  const cents = isRatio ? value * 100 : value;
  const formatted = cents.toFixed(decimals);

  if (includeSuffix) {
    return `${formatted}¢ per $1.00`;
  }
  return `${formatted}¢`;
}

/**
 * Formats a value as a percentage (e.g. 20.7% or +20.7%).
 *
 * @param value Percentage number
 * @param decimals Number of decimal places (default 1)
 * @param options isRatio (whether value is 0.207 vs 20.7), showSign
 */
export function formatPercent(
  value: number,
  decimals = 1,
  options: PercentOptions = {}
): string {
  if (!Number.isFinite(value)) return '0.0%';

  const { isRatio = false, showSign = false } = options;
  const pct = isRatio ? value * 100 : value;
  const signPrefix = showSign && pct > 0 ? '+' : '';

  return `${signPrefix}${pct.toFixed(decimals)}%`;
}

/**
 * Formats raw numbers with thousand separators.
 *
 * @param value Numeric value
 * @param decimals Number of decimal digits (default 0)
 */
export function formatNumber(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return '0';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formats population counts with thousand separators.
 *
 * @param population County population count
 */
export function formatPopulation(population: number): string {
  if (!Number.isFinite(population) || population < 0) return '0';
  return new Intl.NumberFormat('en-US').format(Math.round(population));
}

/**
 * Formats Return on Tax Dollar ratio string (e.g. "$0.54 per $1.00").
 */
export function formatReturnRatio(returnOnDollar: number): string {
  if (!Number.isFinite(returnOnDollar)) return '$0.00 per $1.00';
  return `$${returnOnDollar.toFixed(2)} per $1.00`;
}

/**
 * Formats per-capita net flow with explicit sign and "/ resident" label.
 */
export function formatNetFlowPerCapita(amount: number): string {
  if (!Number.isFinite(amount)) return '$0 / resident';
  const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
  const abs = Math.abs(Math.round(amount));
  return `${sign}$${formatNumber(abs)} / resident`;
}
