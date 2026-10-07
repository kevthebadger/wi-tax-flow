import { describe, it, expect } from 'vitest';
import {
  RETURN_ON_DOLLAR_THRESHOLDS,
  getLegendThresholds,
  getColorForMetric,
  getColorStopIndex,
  getCategoryForMetric,
  getScalePosition,
  getMetricUnitLabel,
  getMetricDescription,
} from '../src/utils/colorScale';
import type { MetricType } from '../src/types/taxFlow';

describe('colorScale Unit & Boundary Test Suite', () => {
  describe('9-Step Return on Tax Dollar Scale Constants', () => {
    it('has exactly 9 thresholds', () => {
      expect(RETURN_ON_DOLLAR_THRESHOLDS.length).toBe(9);
    });

    it('matches exact authoritative color tokens', () => {
      const colors = RETURN_ON_DOLLAR_THRESHOLDS.map((t) => t.color);
      expect(colors).toEqual([
        '#991b1b', // Bin 0: < $0.50
        '#c2410c', // Bin 1: $0.50-$0.69
        '#ea580c', // Bin 2: $0.70-$0.84
        '#fb923c', // Bin 3: $0.85-$0.98
        '#f1f5f9', // Bin 4: $0.99-$1.02 (Neutral Slate)
        '#5eead4', // Bin 5: $1.03-$1.25
        '#14b8a6', // Bin 6: $1.26-$1.60
        '#0f766e', // Bin 7: $1.61-$2.00
        '#134e4a', // Bin 8: >= $2.00
      ]);
    });

    it('partitions categories into 4 donors, 1 neutral, 4 recipients', () => {
      const categories = RETURN_ON_DOLLAR_THRESHOLDS.map((t) => t.category);
      expect(categories).toEqual([
        'donor',
        'donor',
        'donor',
        'donor',
        'neutral',
        'recipient',
        'recipient',
        'recipient',
        'recipient',
      ]);
    });

    it('specifies appropriate text contrast per swatch', () => {
      expect(RETURN_ON_DOLLAR_THRESHOLDS[0].textContrast).toBe('light'); // #991b1b
      expect(RETURN_ON_DOLLAR_THRESHOLDS[3].textContrast).toBe('dark');  // #fb923c
      expect(RETURN_ON_DOLLAR_THRESHOLDS[4].textContrast).toBe('dark');  // #f1f5f9
      expect(RETURN_ON_DOLLAR_THRESHOLDS[5].textContrast).toBe('dark');  // #5eead4
      expect(RETURN_ON_DOLLAR_THRESHOLDS[8].textContrast).toBe('light'); // #134e4a
    });
  });

  describe('getColorForMetric: returnOnDollar', () => {
    it('maps donor values to correct vermilion/orange swatches', () => {
      expect(getColorForMetric(0.198, 'returnOnDollar')).toBe('#991b1b'); // Waukesha
      expect(getColorForMetric(0.49, 'returnOnDollar')).toBe('#991b1b');
      expect(getColorForMetric(0.50, 'returnOnDollar')).toBe('#c2410c');
      expect(getColorForMetric(0.5404, 'returnOnDollar')).toBe('#c2410c'); // Milwaukee
      expect(getColorForMetric(0.69, 'returnOnDollar')).toBe('#c2410c');
      expect(getColorForMetric(0.70, 'returnOnDollar')).toBe('#ea580c');
      expect(getColorForMetric(0.84, 'returnOnDollar')).toBe('#ea580c');
      expect(getColorForMetric(0.85, 'returnOnDollar')).toBe('#fb923c');
      expect(getColorForMetric(0.98, 'returnOnDollar')).toBe('#fb923c');
    });

    it('handles exact boundary transitions for returnOnDollar scale', () => {
      expect(getColorForMetric(0.499, 'returnOnDollar')).toBe('#991b1b');
      expect(getColorForMetric(0.50, 'returnOnDollar')).toBe('#c2410c');
      expect(getColorForMetric(0.699, 'returnOnDollar')).toBe('#c2410c');
      expect(getColorForMetric(0.70, 'returnOnDollar')).toBe('#ea580c');
      expect(getColorForMetric(0.849, 'returnOnDollar')).toBe('#ea580c');
      expect(getColorForMetric(0.85, 'returnOnDollar')).toBe('#fb923c');
    });

    it('maps parity / neutral values around $1.00 to neutral slate', () => {
      expect(getColorForMetric(0.99, 'returnOnDollar')).toBe('#f1f5f9');
      expect(getColorForMetric(1.00, 'returnOnDollar')).toBe('#f1f5f9');
      expect(getColorForMetric(1.01, 'returnOnDollar')).toBe('#f1f5f9');
      expect(getColorForMetric(1.02, 'returnOnDollar')).toBe('#f1f5f9');
    });

    it('maps recipient values to correct teal swatches', () => {
      expect(getColorForMetric(1.03, 'returnOnDollar')).toBe('#5eead4');
      expect(getColorForMetric(1.25, 'returnOnDollar')).toBe('#5eead4');
      expect(getColorForMetric(1.26, 'returnOnDollar')).toBe('#14b8a6');
      expect(getColorForMetric(1.376, 'returnOnDollar')).toBe('#14b8a6'); // Adams Post-Act 12
      expect(getColorForMetric(1.60, 'returnOnDollar')).toBe('#14b8a6');
      expect(getColorForMetric(1.61, 'returnOnDollar')).toBe('#0f766e');
      expect(getColorForMetric(1.99, 'returnOnDollar')).toBe('#0f766e');
      expect(getColorForMetric(2.00, 'returnOnDollar')).toBe('#134e4a');
      expect(getColorForMetric(2.251, 'returnOnDollar')).toBe('#134e4a'); // Menominee
      expect(getColorForMetric(4.50, 'returnOnDollar')).toBe('#134e4a');
    });

    it('handles non-finite and negative inputs defensively', () => {
      expect(getColorForMetric(NaN, 'returnOnDollar')).toBe('#f1f5f9');
      expect(getColorForMetric(-0.5, 'returnOnDollar')).toBe('#991b1b');
      expect(getColorForMetric(Infinity, 'returnOnDollar')).toBe('#134e4a');
      expect(getColorForMetric(-Infinity, 'returnOnDollar')).toBe('#991b1b');
    });
  });

  describe('getColorForMetric: netFlowPerCapita', () => {
    it('maps negative per-capita donor flows to orange/rust and positive to teal', () => {
      expect(getColorForMetric(-3291, 'netFlowPerCapita')).toBe('#991b1b'); // Waukesha
      expect(getColorForMetric(-1174, 'netFlowPerCapita')).toBe('#c2410c'); // Milwaukee
      expect(getColorForMetric(-720, 'netFlowPerCapita')).toBe('#ea580c');
      expect(getColorForMetric(-100, 'netFlowPerCapita')).toBe('#fb923c');
      expect(getColorForMetric(0, 'netFlowPerCapita')).toBe('#f1f5f9');     // Parity
      expect(getColorForMetric(200, 'netFlowPerCapita')).toBe('#5eead4');
      expect(getColorForMetric(667, 'netFlowPerCapita')).toBe('#14b8a6');   // Adams
      expect(getColorForMetric(1382, 'netFlowPerCapita')).toBe('#0f766e');  // Menominee
      expect(getColorForMetric(2500, 'netFlowPerCapita')).toBe('#134e4a');
    });

    it('handles extreme and parity boundaries for netFlowPerCapita', () => {
      expect(getColorForMetric(-2001, 'netFlowPerCapita')).toBe('#991b1b');
      expect(getColorForMetric(-25, 'netFlowPerCapita')).toBe('#f1f5f9');
      expect(getColorForMetric(25, 'netFlowPerCapita')).toBe('#f1f5f9');
      expect(getColorForMetric(2001, 'netFlowPerCapita')).toBe('#134e4a');
    });

    it('handles metric alias strings like perCapita and perCapitaNetFlow', () => {
      expect(getColorForMetric(-3000, 'perCapita')).toBe('#991b1b');
      expect(getColorForMetric(500, 'perCapitaNetFlow')).toBe('#14b8a6');
    });
  });

  describe('getColorForMetric: totalNetFlow', () => {
    it('maps large donor dollar deficits to rust/orange and surpluses to teal', () => {
      expect(getColorForMetric(-1_339_500_000, 'totalNetFlow')).toBe('#991b1b'); // Waukesha
      expect(getColorForMetric(-1_103_000_000, 'totalNetFlow')).toBe('#991b1b'); // Milwaukee
      expect(getColorForMetric(-250_000_000, 'totalNetFlow')).toBe('#c2410c');
      expect(getColorForMetric(-80_000_000, 'totalNetFlow')).toBe('#ea580c');
      expect(getColorForMetric(-10_000_000, 'totalNetFlow')).toBe('#fb923c');
      expect(getColorForMetric(0, 'totalNetFlow')).toBe('#f1f5f9');              // Parity
      expect(getColorForMetric(5_880_000, 'totalNetFlow')).toBe('#5eead4');      // Menominee
      expect(getColorForMetric(14_100_000, 'totalNetFlow')).toBe('#14b8a6');     // Adams
      expect(getColorForMetric(40_000_000, 'totalNetFlow')).toBe('#0f766e');
      expect(getColorForMetric(75_000_000, 'totalNetFlow')).toBe('#134e4a');
    });

    it('handles totalNet alias and zero net flow', () => {
      expect(getColorForMetric(-600_000_000, 'totalNet')).toBe('#991b1b');
      expect(getColorForMetric(0, 'totalNet')).toBe('#f1f5f9');
      expect(getColorForMetric(100_000_000, 'totalNet')).toBe('#134e4a');
    });
  });

  describe('getColorStopIndex & getCategoryForMetric', () => {
    it('returns correct 0..8 index and category for returnOnDollar', () => {
      expect(getColorStopIndex(0.40, 'returnOnDollar')).toBe(0);
      expect(getCategoryForMetric(0.40, 'returnOnDollar')).toBe('donor');

      expect(getColorStopIndex(1.00, 'returnOnDollar')).toBe(4);
      expect(getCategoryForMetric(1.00, 'returnOnDollar')).toBe('neutral');

      expect(getColorStopIndex(2.25, 'returnOnDollar')).toBe(8);
      expect(getCategoryForMetric(2.25, 'returnOnDollar')).toBe('recipient');
    });

    it('falls back to neutral index 4 on non-finite value', () => {
      expect(getColorStopIndex(NaN, 'returnOnDollar')).toBe(4);
      expect(getCategoryForMetric(NaN, 'returnOnDollar')).toBe('neutral');
    });

    it('handles Infinity and -Infinity in getColorStopIndex', () => {
      expect(getColorStopIndex(Infinity, 'returnOnDollar')).toBe(8);
      expect(getColorStopIndex(-Infinity, 'returnOnDollar')).toBe(0);
    });
  });

  describe('getScalePosition (Dynamic Pin Marker Position)', () => {
    it('returns around 50% for neutral parity ($1.00 return)', () => {
      const pos = getScalePosition(1.00, 'returnOnDollar');
      expect(pos).toBeGreaterThanOrEqual(45);
      expect(pos).toBeLessThanOrEqual(55);
    });

    it('returns low percentage for deep donor values', () => {
      const posWaukesha = getScalePosition(0.20, 'returnOnDollar');
      expect(posWaukesha).toBeLessThan(15);
      expect(posWaukesha).toBeGreaterThanOrEqual(2);
    });

    it('returns high percentage for extreme recipient values', () => {
      const posMenominee = getScalePosition(2.25, 'returnOnDollar');
      expect(posMenominee).toBeGreaterThan(85);
      expect(posMenominee).toBeLessThanOrEqual(98);
    });

    it('safely clamps to [2, 98] range to prevent UI cutoff', () => {
      expect(getScalePosition(-100, 'returnOnDollar')).toBe(2);
      expect(getScalePosition(100, 'returnOnDollar')).toBe(98);
      expect(getScalePosition(NaN, 'returnOnDollar')).toBe(50);
      expect(getScalePosition(Infinity, 'returnOnDollar')).toBe(50);
    });
  });

  describe('getLegendThresholds and Descriptions', () => {
    it('returns 9 thresholds for all valid metrics', () => {
      expect(getLegendThresholds('returnOnDollar').length).toBe(9);
      expect(getLegendThresholds('netFlowPerCapita').length).toBe(9);
      expect(getLegendThresholds('totalNetFlow').length).toBe(9);
    });

    it('returns descriptive titles and explainer text', () => {
      expect(getMetricUnitLabel('returnOnDollar')).toBe('Return per $1.00 Paid');
      expect(getMetricUnitLabel('netFlowPerCapita')).toBe('Net Flow per Resident');
      expect(getMetricUnitLabel('totalNetFlow')).toBe('Total Net Tax Flow');

      expect(getMetricDescription('returnOnDollar')).toContain('state aids returned');
      expect(getMetricDescription('netFlowPerCapita')).toContain('Net state dollars returned');
      expect(getMetricDescription('totalNetFlow')).toContain('Aggregate county fiscal balance');
    });

    it('maintains contiguous intervals across all thresholds', () => {
      const metrics: MetricType[] = ['returnOnDollar', 'netFlowPerCapita', 'totalNetFlow'];
      metrics.forEach((m) => {
        const thresholds = getLegendThresholds(m);
        expect(thresholds.length).toBe(9);
        for (let i = 1; i < thresholds.length; i++) {
          expect(thresholds[i].min).toBeCloseTo(thresholds[i - 1].max, 4);
          expect(thresholds[i].color).toMatch(/^#[0-9a-fA-F]{6}$/);
          expect(thresholds[i].label.length).toBeGreaterThan(0);
        }
      });
    });
  });
});
