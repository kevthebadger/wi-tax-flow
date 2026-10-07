import { describe, it, expect } from 'vitest';
import {
  RETURN_ON_DOLLAR_THRESHOLDS,
  PER_CAPITA_NET_FLOW_THRESHOLDS,
  TOTAL_NET_FLOW_THRESHOLDS,
  getLegendThresholds,
  getColorForMetric,
  getColorStopIndex,
  getCategoryForMetric,
  getScalePosition,
  getMetricUnitLabel,
  getMetricDescription,
} from '../src/utils/colorScale';
import { WI_COUNTIES } from '../src/data/wiTaxData';
import type { MetricType } from '../src/types/taxFlow';

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

describe('colorScale Adversarial Bounds & Stress Suite (Challenger M2-1)', () => {
  describe('Threshold Constant Integrity & Completeness', () => {
    it('validates exported threshold constants and helper labels', () => {
      expect(RETURN_ON_DOLLAR_THRESHOLDS.length).toBe(9);
      expect(PER_CAPITA_NET_FLOW_THRESHOLDS.length).toBe(9);
      expect(TOTAL_NET_FLOW_THRESHOLDS.length).toBe(9);

      expect(getLegendThresholds('returnOnDollar')).toHaveLength(9);
      expect(getMetricUnitLabel('returnOnDollar')).toBe('Return per $1.00 Paid');
      expect(getMetricDescription('returnOnDollar')).toContain('state aids returned');
    });
  });

  describe('Exact Interval Transitions & Boundary Values', () => {
    it('accurately transitions at returnOnDollar bin boundaries', () => {
      // 0.499 vs 0.500
      expect(getColorForMetric(0.499, 'returnOnDollar')).toBe('#991b1b');
      expect(getColorStopIndex(0.499, 'returnOnDollar')).toBe(0);
      expect(getColorForMetric(0.500, 'returnOnDollar')).toBe('#c2410c');
      expect(getColorStopIndex(0.500, 'returnOnDollar')).toBe(1);

      // 0.699 vs 0.700
      expect(getColorForMetric(0.699, 'returnOnDollar')).toBe('#c2410c');
      expect(getColorForMetric(0.700, 'returnOnDollar')).toBe('#ea580c');
      expect(getColorStopIndex(0.700, 'returnOnDollar')).toBe(2);

      // 0.849 vs 0.850
      expect(getColorForMetric(0.849, 'returnOnDollar')).toBe('#ea580c');
      expect(getColorForMetric(0.850, 'returnOnDollar')).toBe('#fb923c');
      expect(getColorStopIndex(0.850, 'returnOnDollar')).toBe(3);

      // 0.980 vs 0.989 vs 0.990
      expect(getColorForMetric(0.980, 'returnOnDollar')).toBe('#fb923c');
      expect(getColorForMetric(0.989, 'returnOnDollar')).toBe('#fb923c');
      expect(getColorForMetric(0.990, 'returnOnDollar')).toBe('#f1f5f9');
      expect(getColorStopIndex(0.990, 'returnOnDollar')).toBe(4);

      // 1.000 Neutral Parity Exact
      expect(getColorForMetric(1.000, 'returnOnDollar')).toBe('#f1f5f9');
      expect(getColorStopIndex(1.000, 'returnOnDollar')).toBe(4);
      expect(getCategoryForMetric(1.000, 'returnOnDollar')).toBe('neutral');

      // 1.020 vs 1.025 vs 1.030
      expect(getColorForMetric(1.020, 'returnOnDollar')).toBe('#f1f5f9');
      expect(getColorForMetric(1.0249, 'returnOnDollar')).toBe('#f1f5f9');
      expect(getColorForMetric(1.025, 'returnOnDollar')).toBe('#5eead4');
      expect(getColorStopIndex(1.025, 'returnOnDollar')).toBe(5);
      expect(getColorForMetric(1.030, 'returnOnDollar')).toBe('#5eead4');

      // 1.254 vs 1.255
      expect(getColorForMetric(1.254, 'returnOnDollar')).toBe('#5eead4');
      expect(getColorForMetric(1.255, 'returnOnDollar')).toBe('#14b8a6');
      expect(getColorStopIndex(1.255, 'returnOnDollar')).toBe(6);

      // 1.604 vs 1.605
      expect(getColorForMetric(1.604, 'returnOnDollar')).toBe('#14b8a6');
      expect(getColorForMetric(1.605, 'returnOnDollar')).toBe('#0f766e');
      expect(getColorStopIndex(1.605, 'returnOnDollar')).toBe(7);

      // 1.999 vs 2.000
      expect(getColorForMetric(1.999, 'returnOnDollar')).toBe('#0f766e');
      expect(getColorStopIndex(1.999, 'returnOnDollar')).toBe(7);
      expect(getColorForMetric(2.000, 'returnOnDollar')).toBe('#134e4a');
      expect(getColorStopIndex(2.000, 'returnOnDollar')).toBe(8);
      expect(getCategoryForMetric(2.000, 'returnOnDollar')).toBe('recipient');
    });

    it('accurately transitions at netFlowPerCapita bin boundaries', () => {
      expect(getColorForMetric(-2001, 'netFlowPerCapita')).toBe('#991b1b');
      expect(getColorForMetric(-2000, 'netFlowPerCapita')).toBe('#c2410c');
      expect(getColorForMetric(-1001, 'netFlowPerCapita')).toBe('#c2410c');
      expect(getColorForMetric(-1000, 'netFlowPerCapita')).toBe('#ea580c');
      expect(getColorForMetric(-351, 'netFlowPerCapita')).toBe('#ea580c');
      expect(getColorForMetric(-350, 'netFlowPerCapita')).toBe('#fb923c');
      expect(getColorForMetric(-51, 'netFlowPerCapita')).toBe('#fb923c');
      expect(getColorForMetric(-50, 'netFlowPerCapita')).toBe('#f1f5f9');
      expect(getColorForMetric(0, 'netFlowPerCapita')).toBe('#f1f5f9');
      expect(getColorForMetric(49, 'netFlowPerCapita')).toBe('#f1f5f9');
      expect(getColorForMetric(50, 'netFlowPerCapita')).toBe('#5eead4');
      expect(getColorForMetric(349, 'netFlowPerCapita')).toBe('#5eead4');
      expect(getColorForMetric(350, 'netFlowPerCapita')).toBe('#14b8a6');
      expect(getColorForMetric(999, 'netFlowPerCapita')).toBe('#14b8a6');
      expect(getColorForMetric(1000, 'netFlowPerCapita')).toBe('#0f766e');
      expect(getColorForMetric(1999, 'netFlowPerCapita')).toBe('#0f766e');
      expect(getColorForMetric(2000, 'netFlowPerCapita')).toBe('#134e4a');
      expect(getColorForMetric(2001, 'netFlowPerCapita')).toBe('#134e4a');
    });

    it('accurately transitions at totalNetFlow bin boundaries', () => {
      expect(getColorForMetric(-500_000_001, 'totalNetFlow')).toBe('#991b1b');
      expect(getColorForMetric(-500_000_000, 'totalNetFlow')).toBe('#c2410c');
      expect(getColorForMetric(-150_000_000, 'totalNetFlow')).toBe('#ea580c');
      expect(getColorForMetric(-40_000_000, 'totalNetFlow')).toBe('#fb923c');
      expect(getColorForMetric(-2_000_000, 'totalNetFlow')).toBe('#f1f5f9');
      expect(getColorForMetric(0, 'totalNetFlow')).toBe('#f1f5f9');
      expect(getColorForMetric(2_000_000, 'totalNetFlow')).toBe('#5eead4');
      expect(getColorForMetric(10_000_000, 'totalNetFlow')).toBe('#14b8a6');
      expect(getColorForMetric(25_000_000, 'totalNetFlow')).toBe('#0f766e');
      expect(getColorForMetric(60_000_000, 'totalNetFlow')).toBe('#134e4a');
    });
  });

  describe('Extreme Outliers & Outlier Counties', () => {
    it('handles Menominee County high-ratio returns without degradation', () => {
      expect(getColorForMetric(4.55, 'returnOnDollar')).toBe('#134e4a');
      expect(getColorStopIndex(4.55, 'returnOnDollar')).toBe(8);
      expect(getCategoryForMetric(4.55, 'returnOnDollar')).toBe('recipient');
      expect(getScalePosition(4.55, 'returnOnDollar')).toBe(98);

      expect(getColorForMetric(2.251, 'returnOnDollar')).toBe('#134e4a');
      expect(getColorForMetric(2.176, 'returnOnDollar')).toBe('#134e4a');
    });

    it('handles extreme negative per-capita flows and statewide dollar deficits', () => {
      expect(getColorForMetric(-5000, 'netFlowPerCapita')).toBe('#991b1b');
      expect(getColorForMetric(-50000, 'netFlowPerCapita')).toBe('#991b1b');
      expect(getScalePosition(-5000, 'netFlowPerCapita')).toBe(2);

      expect(getColorForMetric(-10_000_000_000, 'totalNetFlow')).toBe('#991b1b');
      expect(getScalePosition(-10_000_000_000, 'totalNetFlow')).toBe(2);
    });

    it('handles negative and astronomical returnOnDollar ratios defensively', () => {
      expect(getColorForMetric(-0.01, 'returnOnDollar')).toBe('#991b1b');
      expect(getColorForMetric(-1.0, 'returnOnDollar')).toBe('#991b1b');
      expect(getColorForMetric(-1000.0, 'returnOnDollar')).toBe('#991b1b');
      expect(getCategoryForMetric(-10.0, 'returnOnDollar')).toBe('donor');

      expect(getColorForMetric(100.0, 'returnOnDollar')).toBe('#134e4a');
      expect(getColorForMetric(10000.0, 'returnOnDollar')).toBe('#134e4a');
    });
  });

  describe('Defensive Sanitation for Non-Finite & Subnormal Values', () => {
    it('safely normalizes NaN to neutral parity across all functions', () => {
      const metrics: MetricType[] = ['returnOnDollar', 'netFlowPerCapita', 'totalNetFlow'];
      for (const m of metrics) {
        expect(getColorForMetric(NaN, m)).toBe('#f1f5f9');
        expect(getColorStopIndex(NaN, m)).toBe(4);
        expect(getCategoryForMetric(NaN, m)).toBe('neutral');
        expect(getScalePosition(NaN, m)).toBe(50.0);
      }
    });

    it('safely handles +Infinity and -Infinity without crashing', () => {
      const metrics: MetricType[] = ['returnOnDollar', 'netFlowPerCapita', 'totalNetFlow'];
      for (const m of metrics) {
        expect(getColorForMetric(Infinity, m)).toBe('#134e4a');
        expect(getColorStopIndex(Infinity, m)).toBe(8);
        expect(getCategoryForMetric(Infinity, m)).toBe('recipient');
        expect(getScalePosition(Infinity, m)).toBe(50.0);

        expect(getColorForMetric(-Infinity, m)).toBe('#991b1b');
        expect(getColorStopIndex(-Infinity, m)).toBe(0);
        expect(getCategoryForMetric(-Infinity, m)).toBe('donor');
        expect(getScalePosition(-Infinity, m)).toBe(50.0);
      }
    });

    it('handles -0, Number.MIN_VALUE, and MAX_SAFE_INTEGER cleanly', () => {
      expect(getColorForMetric(-0, 'returnOnDollar')).toBe('#991b1b');
      expect(getColorForMetric(Number.MIN_VALUE, 'returnOnDollar')).toBe('#991b1b');
      expect(getColorForMetric(-0, 'netFlowPerCapita')).toBe('#f1f5f9');
      expect(getColorForMetric(Number.MAX_SAFE_INTEGER, 'totalNetFlow')).toBe('#134e4a');
    });

    it('defaults unknown metric strings safely to returnOnDollar', () => {
      expect(getColorForMetric(0.5, 'bogusMetric' as any)).toBe('#c2410c');
      expect(getColorForMetric(1.0, '' as any)).toBe('#f1f5f9');
    });
  });

  describe('getScalePosition Clamping within [2, 98]', () => {
    it('strictly clamps to [2, 98] across extreme domain ranges', () => {
      const testValues = [
        -1e15, -1e10, -5000, -2000, -350, -50, 0, 0.5, 1.0, 1.025, 2.0, 4.55, 100, 1e15,
      ];
      const metrics: MetricType[] = ['returnOnDollar', 'netFlowPerCapita', 'totalNetFlow'];

      for (const m of metrics) {
        for (const val of testValues) {
          const pos = getScalePosition(val, m);
          expect(Number.isFinite(pos)).toBe(true);
          expect(pos).toBeGreaterThanOrEqual(2.0);
          expect(pos).toBeLessThanOrEqual(98.0);
        }
      }
    });

    it('centers neutral parity pin marker between 45% and 55%', () => {
      expect(getScalePosition(1.00, 'returnOnDollar')).toBeGreaterThanOrEqual(45);
      expect(getScalePosition(1.00, 'returnOnDollar')).toBeLessThanOrEqual(55);

      expect(getScalePosition(0, 'netFlowPerCapita')).toBeGreaterThanOrEqual(45);
      expect(getScalePosition(0, 'netFlowPerCapita')).toBeLessThanOrEqual(55);

      expect(getScalePosition(0, 'totalNetFlow')).toBeGreaterThanOrEqual(45);
      expect(getScalePosition(0, 'totalNetFlow')).toBeLessThanOrEqual(55);
    });
  });

  describe('72-County Dataset Validation', () => {
    it('evaluates all 72 Wisconsin counties without invalid colors or crash', () => {
      expect(WI_COUNTIES.length).toBe(72);

      for (const county of WI_COUNTIES) {
        for (const baseline of ['preAct12', 'postAct12'] as const) {
          const data = county[baseline];
          const tests: Array<{ key: MetricType; val: number }> = [
            { key: 'returnOnDollar', val: data.metrics.returnOnDollar },
            { key: 'netFlowPerCapita', val: data.metrics.netFlowPerCapita },
            { key: 'totalNetFlow', val: data.metrics.netFlow },
          ];

          for (const t of tests) {
            const color = getColorForMetric(t.val, t.key);
            const idx = getColorStopIndex(t.val, t.key);
            const cat = getCategoryForMetric(t.val, t.key);
            const pos = getScalePosition(t.val, t.key);

            expect(color).toMatch(HEX_COLOR_REGEX);
            expect(idx).toBeGreaterThanOrEqual(0);
            expect(idx).toBeLessThanOrEqual(8);
            expect(['donor', 'neutral', 'recipient']).toContain(cat);
            expect(pos).toBeGreaterThanOrEqual(2.0);
            expect(pos).toBeLessThanOrEqual(98.0);
          }
        }
      }
    });
  });

  describe('Fuzzing & Invariant Preservation', () => {
    it('preserves valid hex strings and bounded scale positions over 10,000 randomized trials', () => {
      const metrics: MetricType[] = ['returnOnDollar', 'netFlowPerCapita', 'totalNetFlow'];

      for (let i = 0; i < 10_000; i++) {
        const metric = metrics[i % 3];
        const val =
          i % 10 === 0
            ? NaN
            : i % 10 === 1
            ? Infinity
            : i % 10 === 2
            ? -Infinity
            : (Math.random() - 0.5) * 1e8;

        const color = getColorForMetric(val, metric);
        const idx = getColorStopIndex(val, metric);
        const cat = getCategoryForMetric(val, metric);
        const pos = getScalePosition(val, metric);

        expect(color).toMatch(HEX_COLOR_REGEX);
        expect(Number.isInteger(idx)).toBe(true);
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThanOrEqual(8);
        expect(['donor', 'neutral', 'recipient']).toContain(cat);
        expect(pos).toBeGreaterThanOrEqual(2.0);
        expect(pos).toBeLessThanOrEqual(98.0);
      }
    });
  });
});
