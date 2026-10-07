import { describe, it, expect } from 'vitest';
import {
  calculateTaxCollections,
  calculateAidDistributions,
  calculateCountyMetrics,
  calculateStatewideSummary,
} from '../src/utils/taxCalculations';
import {
  formatCurrency,
  formatCentsPerDollar,
  formatPercent,
  formatNumber,
  formatPopulation,
  formatReturnRatio,
  formatNetFlowPerCapita,
} from '../src/utils/formatters';
import { CountyRecord } from '../src/types/taxFlow';

describe('Adversarial Stress & Boundary Testing Suite', () => {
  describe('Category 1: Zero & Non-Finite Division Protection', () => {
    it('CRIT-1: returns finite 0 returnOnDollar when taxes.totalTaxes === 0 and aids > 0', () => {
      const taxes = calculateTaxCollections(0, 0);
      const aids = calculateAidDistributions(10_000_000, 50_000_000, 5_000_000, 10_000_000);
      const metrics = calculateCountyMetrics(taxes, aids, 50_000);

      expect(Number.isFinite(metrics.returnOnDollar)).toBe(true);
      expect(Number.isNaN(metrics.returnOnDollar)).toBe(false);
      expect(metrics.returnOnDollar).toBe(0);
      expect(metrics.returnCents).toBe(0);
      expect(metrics.classification).toBe('recipient');
    });

    it('CRIT-2: returns finite 0 netFlowPerCapita when population === 0', () => {
      const taxes = calculateTaxCollections(100_000, 50_000);
      const aids = calculateAidDistributions(20_000, 30_000, 10_000, 5_000);
      const metrics = calculateCountyMetrics(taxes, aids, 0);

      expect(Number.isFinite(metrics.netFlowPerCapita)).toBe(true);
      expect(Number.isNaN(metrics.netFlowPerCapita)).toBe(false);
      expect(metrics.netFlowPerCapita).toBe(0);
    });

    it('CRIT-3: safely handles degenerate case where taxes=0, aids=0, and population=0', () => {
      const taxes = calculateTaxCollections(0, 0);
      const aids = calculateAidDistributions(0, 0, 0, 0);
      const metrics = calculateCountyMetrics(taxes, aids, 0);

      expect(Number.isFinite(metrics.returnOnDollar)).toBe(true);
      expect(Number.isFinite(metrics.returnCents)).toBe(true);
      expect(Number.isFinite(metrics.netFlow)).toBe(true);
      expect(Number.isFinite(metrics.netFlowPerCapita)).toBe(true);

      expect(metrics.returnOnDollar).toBe(0);
      expect(metrics.returnCents).toBe(0);
      expect(metrics.netFlow).toBe(0);
      expect(metrics.netFlowPerCapita).toBe(0);
      expect(metrics.classification).toBe('recipient'); // 0 >= 0
    });

    it('CRIT-4: suppresses NaN and Infinity from calculations under non-finite inputs', () => {
      const taxes = calculateTaxCollections(NaN, Infinity);
      expect(taxes.individualIncomeTax).toBe(0);
      expect(taxes.stateSalesTax).toBe(0);
      expect(taxes.totalTaxes).toBe(0);

      const aids = calculateAidDistributions(-Infinity, NaN, Infinity, -Infinity);
      expect(aids.sharedRevenue).toBe(0);
      expect(aids.schoolAids).toBe(0);
      expect(aids.transportationAids).toBe(0);
      expect(aids.schoolLevyTaxCredit).toBe(0);
      expect(aids.totalAids).toBe(0);

      const metrics = calculateCountyMetrics(taxes, aids, NaN);
      expect(Number.isFinite(metrics.returnOnDollar)).toBe(true);
      expect(Number.isFinite(metrics.returnCents)).toBe(true);
      expect(Number.isFinite(metrics.netFlow)).toBe(true);
      expect(Number.isFinite(metrics.netFlowPerCapita)).toBe(true);
    });
  });

  describe('Category 2: Negative & Inverted Fiscal Flows', () => {
    it('CRIT-5: handles negative tax collections without producing Infinity or NaN', () => {
      // Negative tax (e.g. net state tax refund excess)
      const taxes = calculateTaxCollections(-500_000, 200_000);
      expect(taxes.totalTaxes).toBe(-300_000);

      const aids = calculateAidDistributions(100_000, 200_000, 50_000, 50_000);
      const metrics = calculateCountyMetrics(taxes, aids, 10_000);

      // Total taxes <= 0 triggers division-by-zero guard
      expect(metrics.returnOnDollar).toBe(0);
      expect(metrics.returnCents).toBe(0);
      // Net flow = Aids - Taxes = 400,000 - (-300,000) = 700,000
      expect(metrics.netFlow).toBe(700_000);
      expect(metrics.netFlowPerCapita).toBe(70);
      expect(metrics.classification).toBe('recipient');
    });

    it('CRIT-6: handles negative aid distributions (e.g. fiscal clawback)', () => {
      const taxes = calculateTaxCollections(1_000_000, 500_000);
      const aids = calculateAidDistributions(-200_000, 100_000, 50_000, 10_000);
      expect(aids.totalAids).toBe(-40_000);

      const metrics = calculateCountyMetrics(taxes, aids, 25_000);
      expect(metrics.returnOnDollar).toBeCloseTo(-40_000 / 1_500_000, 6);
      expect(metrics.returnCents).toBeCloseTo(-2.67, 2);
      expect(metrics.netFlow).toBe(-1_540_000);
      expect(metrics.netFlowPerCapita).toBeCloseTo(-61.6, 1);
      expect(metrics.classification).toBe('donor');
    });

    it('CRIT-7: handles negative population input defensively', () => {
      const taxes = calculateTaxCollections(1_000_000, 500_000);
      const aids = calculateAidDistributions(200_000, 300_000, 50_000, 50_000);
      const metrics = calculateCountyMetrics(taxes, aids, -5000);

      expect(Number.isFinite(metrics.netFlowPerCapita)).toBe(true);
      expect(metrics.netFlowPerCapita).toBe(0);
    });
  });

  describe('Category 3: Floating Point Precision & Penny Drift', () => {
    it('CRIT-8: eliminates IEEE 754 precision drift on fractional additions', () => {
      // 0.1 + 0.2 in standard JS equals 0.30000000000000004
      const taxes = calculateTaxCollections(0.1, 0.2);
      expect(taxes.totalTaxes).toBe(0.3);

      const aids = calculateAidDistributions(0.1, 0.2, 0.3, 0.4);
      expect(aids.totalAids).toBe(1.0);
    });

    it('CRIT-9: rounds half-cents accurately without multi-digit drift', () => {
      const taxes = calculateTaxCollections(1234.567, 8901.234);
      expect(taxes.totalTaxes).toBe(10135.8);

      const aids = calculateAidDistributions(100.005, 200.005, 300.005, 400.005);
      expect(aids.totalAids).toBe(1000.02);
    });

    it('CRIT-10: preserves exact cents across netFlow and netFlowPerCapita calculations', () => {
      const taxes = calculateTaxCollections(100_000.33, 50_000.67);
      const aids = calculateAidDistributions(25_000.12, 15_000.34, 10_000.56, 5_000.78);
      const metrics = calculateCountyMetrics(taxes, aids, 3);

      expect(taxes.totalTaxes).toBe(150_001);
      expect(aids.totalAids).toBe(55_001.8);
      expect(metrics.netFlow).toBe(-94_999.2);
      // -94,999.2 / 3 = -31,666.4 exactly
      expect(metrics.netFlowPerCapita).toBe(-31666.4);
    });
  });

  describe('Category 4: Extreme Scale & Macro Stress', () => {
    it('CRIT-11: safely handles multi-billion dollar and multi-trillion dollar inputs', () => {
      const largeTaxes = calculateTaxCollections(50_000_000_000, 30_000_000_000); // $80B
      const largeAids = calculateAidDistributions(
        10_000_000_000,
        25_000_000_000,
        5_000_000_000,
        15_000_000_000
      ); // $55B
      const metrics = calculateCountyMetrics(largeTaxes, largeAids, 6_000_000);

      expect(largeTaxes.totalTaxes).toBe(80_000_000_000);
      expect(largeAids.totalAids).toBe(55_000_000_000);
      expect(metrics.returnOnDollar).toBe(0.6875);
      expect(metrics.returnCents).toBe(68.75);
      expect(metrics.netFlow).toBe(-25_000_000_000);
      expect(metrics.netFlowPerCapita).toBeCloseTo(-4166.67, 2);
    });

    it('CRIT-12: remains finite up to Number.MAX_SAFE_INTEGER bounds', () => {
      const maxTaxes = calculateTaxCollections(1_000_000_000_000, 1_000_000_000_000);
      const maxAids = calculateAidDistributions(
        500_000_000_000,
        500_000_000_000,
        500_000_000_000,
        500_000_000_000
      );
      const metrics = calculateCountyMetrics(maxTaxes, maxAids, 100_000_000);

      expect(Number.isFinite(metrics.returnOnDollar)).toBe(true);
      expect(Number.isFinite(metrics.returnCents)).toBe(true);
      expect(Number.isFinite(metrics.netFlow)).toBe(true);
      expect(Number.isFinite(metrics.netFlowPerCapita)).toBe(true);
    });

    it('CRIT-13: statewide aggregation stress with 720 pseudo-counties', () => {
      const mockCounties: CountyRecord[] = [];
      for (let i = 0; i < 720; i++) {
        const taxes = calculateTaxCollections(10_000_000 + i * 1000, 5_000_000 + i * 500);
        const aids = calculateAidDistributions(
          2_000_000 + i * 200,
          6_000_000 + i * 600,
          1_000_000 + i * 100,
          1_000_000 + i * 100
        );
        const pop = 50_000 + i * 10;
        const metrics = calculateCountyMetrics(taxes, aids, pop);

        mockCounties.push({
          fips: `55${String(i).padStart(3, '0')}`,
          name: `County_${i}`,
          seat: `Seat_${i}`,
          population: pop,
          preAct12: { taxes, aids, metrics },
          postAct12: { taxes, aids, metrics },
        });
      }

      const summary = calculateStatewideSummary(mockCounties);
      expect(Number.isFinite(summary.population)).toBe(true);
      expect(Number.isFinite(summary.preAct12.taxes.totalTaxes)).toBe(true);
      expect(Number.isFinite(summary.preAct12.aids.totalAids)).toBe(true);
      expect(Number.isFinite(summary.preAct12.metrics.returnOnDollar)).toBe(true);
      expect(summary.preAct12.donorCount + summary.preAct12.recipientCount).toBe(720);
      expect(summary.postAct12.donorCount + summary.postAct12.recipientCount).toBe(720);
    });
  });

  describe('Category 5: Fuzzing & Monte Carlo Invariant Testing (10,000 cases)', () => {
    it('CRIT-14: 10,000 randomized iterations maintain zero NaN/Infinity invariants', () => {
      const testCases = [
        0,
        -0,
        1,
        -1,
        0.001,
        -0.001,
        0.01,
        0.1,
        0.99,
        1.0,
        1.01,
        100,
        10_000,
        1_000_000,
        1_000_000_000,
        NaN,
        Infinity,
        -Infinity,
      ];

      for (let i = 0; i < 10_000; i++) {
        // Pick random components
        const income =
          i < testCases.length
            ? testCases[i]
            : (Math.random() - 0.2) * (Math.random() < 0.1 ? 1e11 : 1e7);
        const sales = (Math.random() - 0.2) * (Math.random() < 0.1 ? 1e11 : 1e7);
        const shared = (Math.random() - 0.1) * (Math.random() < 0.1 ? 1e10 : 1e6);
        const school = Math.random() * (Math.random() < 0.1 ? 1e10 : 1e7);
        const gta = Math.random() * 1e6;
        const sltc = Math.random() * 1e6;
        const pop = Math.floor((Math.random() - 0.05) * 1_000_000);

        const taxes = calculateTaxCollections(income, sales);
        const aids = calculateAidDistributions(shared, school, gta, sltc);
        const metrics = calculateCountyMetrics(taxes, aids, pop);

        // Assert all computed properties are strictly finite numbers
        expect(Number.isFinite(taxes.totalTaxes)).toBe(true);
        expect(Number.isNaN(taxes.totalTaxes)).toBe(false);

        expect(Number.isFinite(aids.totalAids)).toBe(true);
        expect(Number.isNaN(aids.totalAids)).toBe(false);

        expect(Number.isFinite(metrics.returnOnDollar)).toBe(true);
        expect(Number.isNaN(metrics.returnOnDollar)).toBe(false);

        expect(Number.isFinite(metrics.returnCents)).toBe(true);
        expect(Number.isNaN(metrics.returnCents)).toBe(false);

        expect(Number.isFinite(metrics.netFlow)).toBe(true);
        expect(Number.isNaN(metrics.netFlow)).toBe(false);

        expect(Number.isFinite(metrics.netFlowPerCapita)).toBe(true);
        expect(Number.isNaN(metrics.netFlowPerCapita)).toBe(false);

        expect(['donor', 'recipient']).toContain(metrics.classification);
      }
    });
  });

  describe('Category 6: Formatter Boundary & Edge Case Hardening', () => {
    it('CRIT-15: formatCurrency never outputs NaN or raw undefined', () => {
      expect(formatCurrency(NaN)).toBe('$0');
      expect(formatCurrency(Infinity)).toBe('$0');
      expect(formatCurrency(-Infinity)).toBe('$0');
      expect(formatCurrency(0)).toBe('$0');
      expect(formatCurrency(-0)).toBe('$0');
    });

    it('CRIT-16: formatCurrency correctly formats compact boundaries', () => {
      // Thousands boundary
      expect(formatCurrency(999, { compact: true })).toBe('$999');
      expect(formatCurrency(1_000, { compact: true })).toBe('$1.0K');
      expect(formatCurrency(999_499, { compact: true })).toBe('$999.5K');

      // Millions boundary
      expect(formatCurrency(1_000_000, { compact: true })).toBe('$1.0M');
      expect(formatCurrency(999_499_999, { compact: true })).toBe('$999.5M');

      // Billions boundary
      expect(formatCurrency(1_000_000_000, { compact: true })).toBe('$1.00B');
      expect(formatCurrency(15_500_000_000, { compact: true })).toBe('$15.50B');
    });

    it('CRIT-17: formatCurrency displays negative signs correctly with compact and non-compact', () => {
      expect(formatCurrency(-500_000, { compact: true })).toBe('-$500.0K');
      expect(formatCurrency(-1_200_000_000, { compact: true, showSign: true })).toBe('-$1.20B');
      expect(formatCurrency(500_000, { compact: true, showSign: true })).toBe('+$500.0K');
      expect(formatCurrency(-54321)).toBe('-$54,321');
    });

    it('CRIT-18: formatCentsPerDollar handles zero, ratio mode, and non-finite inputs', () => {
      expect(formatCentsPerDollar(NaN)).toBe('0.0¢');
      expect(formatCentsPerDollar(Infinity)).toBe('0.0¢');
      expect(formatCentsPerDollar(0)).toBe('0.0¢');
      expect(formatCentsPerDollar(0, { isRatio: true })).toBe('0.0¢');
      expect(formatCentsPerDollar(1.0, { isRatio: true })).toBe('100.0¢');
      expect(formatCentsPerDollar(1.0, { isRatio: true, includeSuffix: true })).toBe(
        '100.0¢ per $1.00'
      );
      expect(formatCentsPerDollar(0.5404, { isRatio: true, decimals: 2 })).toBe('54.04¢');
    });

    it('CRIT-19: formatPercent handles ratios, signs, and zero values', () => {
      expect(formatPercent(NaN)).toBe('0.0%');
      expect(formatPercent(0)).toBe('0.0%');
      expect(formatPercent(0, 1, { showSign: true })).toBe('0.0%'); // No +0.0%
      expect(formatPercent(0.207, 1, { isRatio: true, showSign: true })).toBe('+20.7%');
      expect(formatPercent(-0.155, 1, { isRatio: true })).toBe('-15.5%');
    });

    it('CRIT-20: formatNumber and formatPopulation handle zero, negative, fractional, and non-finite values', () => {
      expect(formatNumber(NaN)).toBe('0');
      expect(formatNumber(Infinity)).toBe('0');
      expect(formatNumber(-Infinity)).toBe('0');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(1234.56, 2)).toBe('1,234.56');

      expect(formatPopulation(NaN)).toBe('0');
      expect(formatPopulation(Infinity)).toBe('0');
      expect(formatPopulation(-100)).toBe('0');
      expect(formatPopulation(0)).toBe('0');
      expect(formatPopulation(939489.4)).toBe('939,489');
      expect(formatPopulation(939489.6)).toBe('939,490');
    });

    it('CRIT-21: formatReturnRatio and formatNetFlowPerCapita handle negative and zero values', () => {
      expect(formatReturnRatio(NaN)).toBe('$0.00 per $1.00');
      expect(formatReturnRatio(Infinity)).toBe('$0.00 per $1.00');
      expect(formatReturnRatio(0)).toBe('$0.00 per $1.00');
      expect(formatReturnRatio(0.54)).toBe('$0.54 per $1.00');

      expect(formatNetFlowPerCapita(NaN)).toBe('$0 / resident');
      expect(formatNetFlowPerCapita(Infinity)).toBe('$0 / resident');
      expect(formatNetFlowPerCapita(0)).toBe('$0 / resident');
      expect(formatNetFlowPerCapita(1200)).toBe('+$1,200 / resident');
      expect(formatNetFlowPerCapita(-3291)).toBe('-$3,291 / resident');
    });
  });
});
