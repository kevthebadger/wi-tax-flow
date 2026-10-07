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

describe('taxCalculations Unit Tests', () => {
  describe('calculateTaxCollections', () => {
    it('correctly sums net individual income tax and state sales tax', () => {
      const result = calculateTaxCollections(1280000000, 1120000000);
      expect(result.individualIncomeTax).toBe(1280000000);
      expect(result.stateSalesTax).toBe(1120000000);
      expect(result.totalTaxes).toBe(2400000000);
    });

    it('handles zero values cleanly', () => {
      const result = calculateTaxCollections(0, 500000);
      expect(result.individualIncomeTax).toBe(0);
      expect(result.stateSalesTax).toBe(500000);
      expect(result.totalTaxes).toBe(500000);
    });

    it('handles decimal values without floating point precision corruption', () => {
      const result = calculateTaxCollections(100.1, 200.2);
      expect(result.totalTaxes).toBe(300.3);
    });

    it('defensively sanitizes NaN and non-finite inputs to zero', () => {
      const result = calculateTaxCollections(NaN as unknown as number, Infinity as unknown as number);
      expect(result.individualIncomeTax).toBe(0);
      expect(result.stateSalesTax).toBe(0);
      expect(result.totalTaxes).toBe(0);
    });
  });

  describe('calculateAidDistributions', () => {
    it('correctly consolidates all four state aid streams', () => {
      const result = calculateAidDistributions(350000000, 720000000, 72000000, 155000000);
      expect(result.sharedRevenue).toBe(350000000);
      expect(result.schoolAids).toBe(720000000);
      expect(result.transportationAids).toBe(72000000);
      expect(result.schoolLevyTaxCredit).toBe(155000000);
      expect(result.totalAids).toBe(1297000000);
    });

    it('handles zero aid allocations in one or more streams', () => {
      const result = calculateAidDistributions(1000000, 0, 500000, 0);
      expect(result.totalAids).toBe(1500000);
    });

    it('sanitizes NaN and infinite values to zero', () => {
      const result = calculateAidDistributions(NaN, 100, Infinity, -Infinity);
      expect(result.sharedRevenue).toBe(0);
      expect(result.schoolAids).toBe(100);
      expect(result.transportationAids).toBe(0);
      expect(result.schoolLevyTaxCredit).toBe(0);
      expect(result.totalAids).toBe(100);
    });
  });

  describe('calculateCountyMetrics', () => {
    it('calculates returnOnDollar, returnCents, netFlow, and netFlowPerCapita accurately', () => {
      const taxes = calculateTaxCollections(1000000, 1000000); // $2,000,000
      const aids = calculateAidDistributions(200000, 500000, 100000, 200000); // $1,000,000
      const population = 10000;

      const metrics = calculateCountyMetrics(taxes, aids, population);

      expect(metrics.returnOnDollar).toBe(0.5);
      expect(metrics.returnCents).toBe(50.0);
      expect(metrics.netFlow).toBe(-1000000);
      expect(metrics.netFlowPerCapita).toBe(-100);
      expect(metrics.classification).toBe('donor');
    });

    it('classifies counties with returnOnDollar >= 1.0 as recipient', () => {
      const taxes = calculateTaxCollections(500000, 500000); // $1,000,000
      const aids = calculateAidDistributions(400000, 600000, 100000, 100000); // $1,200,000
      const population = 2000;

      const metrics = calculateCountyMetrics(taxes, aids, population);

      expect(metrics.returnOnDollar).toBe(1.2);
      expect(metrics.returnCents).toBe(120.0);
      expect(metrics.netFlow).toBe(200000);
      expect(metrics.netFlowPerCapita).toBe(100);
      expect(metrics.classification).toBe('recipient');
    });

    it('correctly handles the boundary condition where Aids === Taxes (Parity)', () => {
      const taxes = calculateTaxCollections(500000, 500000); // $1,000,000
      const aids = calculateAidDistributions(300000, 400000, 200000, 100000); // $1,000,000
      const population = 5000;

      const metrics = calculateCountyMetrics(taxes, aids, population);

      expect(metrics.returnOnDollar).toBe(1.0);
      expect(metrics.returnCents).toBe(100.0);
      expect(metrics.netFlow).toBe(0);
      expect(metrics.netFlowPerCapita).toBe(0);
      expect(metrics.classification).toBe('recipient');
    });

    it('protects against division by zero when total taxes are zero', () => {
      const taxes = calculateTaxCollections(0, 0);
      const aids = calculateAidDistributions(100000, 200000, 50000, 50000);
      const population = 1000;

      const metrics = calculateCountyMetrics(taxes, aids, population);

      expect(Number.isFinite(metrics.returnOnDollar)).toBe(true);
      expect(metrics.returnOnDollar).toBe(0);
      expect(metrics.returnCents).toBe(0);
      expect(metrics.netFlow).toBe(400000);
      expect(metrics.classification).toBe('recipient');
    });

    it('protects against division by zero when population is zero', () => {
      const taxes = calculateTaxCollections(100000, 100000);
      const aids = calculateAidDistributions(50000, 50000, 10000, 10000);
      const population = 0;

      const metrics = calculateCountyMetrics(taxes, aids, population);

      expect(Number.isFinite(metrics.netFlowPerCapita)).toBe(true);
      expect(metrics.netFlowPerCapita).toBe(0);
    });

    it('matches Milwaukee County Post-Act 12 benchmark profile', () => {
      const taxes = calculateTaxCollections(1280000000, 1120000000); // $2.4B
      const aids = calculateAidDistributions(350000000, 720000000, 72000000, 155000000); // $1.297B
      const population = 939489;

      const metrics = calculateCountyMetrics(taxes, aids, population);

      expect(metrics.returnOnDollar).toBeCloseTo(0.5404, 3);
      expect(metrics.returnCents).toBeCloseTo(54.04, 1);
      expect(metrics.netFlow).toBe(-1103000000);
      expect(metrics.netFlowPerCapita).toBeCloseTo(-1174.04, 1);
      expect(metrics.classification).toBe('donor');
    });

    it('matches Menominee County Post-Act 12 benchmark profile (Extreme Recipient)', () => {
      const taxes = calculateTaxCollections(3200000, 1500000); // $4.7M
      const aids = calculateAidDistributions(1750000, 7800000, 650000, 380000); // $10.58M
      const population = 4255;

      const metrics = calculateCountyMetrics(taxes, aids, population);

      expect(metrics.returnOnDollar).toBeCloseTo(2.251, 2);
      expect(metrics.returnCents).toBeCloseTo(225.11, 1);
      expect(metrics.netFlow).toBe(5880000);
      expect(metrics.netFlowPerCapita).toBeCloseTo(1381.9, 1);
      expect(metrics.classification).toBe('recipient');
    });

    it('matches Waukesha County Post-Act 12 benchmark profile (Suburban Donor)', () => {
      const taxes = calculateTaxCollections(1150000000, 520000000); // $1.67B
      const aids = calculateAidDistributions(27500000, 160000000, 28000000, 115000000); // $330.5M
      const population = 406978;

      const metrics = calculateCountyMetrics(taxes, aids, population);

      expect(metrics.returnOnDollar).toBeCloseTo(0.1979, 3);
      expect(metrics.returnCents).toBeCloseTo(19.79, 1);
      expect(metrics.netFlow).toBe(-1339500000);
      expect(metrics.netFlowPerCapita).toBeCloseTo(-3291.33, 1);
      expect(metrics.classification).toBe('donor');
    });
  });

  describe('calculateStatewideSummary', () => {
    const mockCounty1: CountyRecord = {
      fips: '55079',
      name: 'Milwaukee',
      seat: 'Milwaukee',
      population: 939489,
      preAct12: {
        taxes: calculateTaxCollections(1280000000, 1120000000),
        aids: calculateAidDistributions(290000000, 720000000, 72000000, 155000000),
        metrics: calculateCountyMetrics(
          calculateTaxCollections(1280000000, 1120000000),
          calculateAidDistributions(290000000, 720000000, 72000000, 155000000),
          939489
        ),
      },
      postAct12: {
        taxes: calculateTaxCollections(1280000000, 1120000000),
        aids: calculateAidDistributions(350000000, 720000000, 72000000, 155000000),
        metrics: calculateCountyMetrics(
          calculateTaxCollections(1280000000, 1120000000),
          calculateAidDistributions(350000000, 720000000, 72000000, 155000000),
          939489
        ),
      },
    };

    const mockCounty2: CountyRecord = {
      fips: '55078',
      name: 'Menominee',
      seat: 'Keshena',
      population: 4255,
      preAct12: {
        taxes: calculateTaxCollections(3200000, 1500000),
        aids: calculateAidDistributions(1400000, 7800000, 650000, 380000),
        metrics: calculateCountyMetrics(
          calculateTaxCollections(3200000, 1500000),
          calculateAidDistributions(1400000, 7800000, 650000, 380000),
          4255
        ),
      },
      postAct12: {
        taxes: calculateTaxCollections(3200000, 1500000),
        aids: calculateAidDistributions(1750000, 7800000, 650000, 380000),
        metrics: calculateCountyMetrics(
          calculateTaxCollections(3200000, 1500000),
          calculateAidDistributions(1750000, 7800000, 650000, 380000),
          4255
        ),
      },
    };

    it('correctly aggregates multiple counties and maintains invariant donor/recipient count sums', () => {
      const summary = calculateStatewideSummary([mockCounty1, mockCounty2]);

      expect(summary.population).toBe(939489 + 4255);
      expect(summary.preAct12.taxes.totalTaxes).toBe(2400000000 + 4700000);
      expect(summary.postAct12.taxes.totalTaxes).toBe(2400000000 + 4700000);

      expect(summary.preAct12.aids.totalAids).toBe(1237000000 + 10230000);
      expect(summary.postAct12.aids.totalAids).toBe(1297000000 + 10580000);

      expect(summary.preAct12.donorCount + summary.preAct12.recipientCount).toBe(2);
      expect(summary.postAct12.donorCount + summary.postAct12.recipientCount).toBe(2);
      expect(summary.postAct12.donorCount).toBe(1); // Milwaukee
      expect(summary.postAct12.recipientCount).toBe(1); // Menominee
    });

    it('handles empty county array defensively without errors', () => {
      const summary = calculateStatewideSummary([]);

      expect(summary.population).toBe(0);
      expect(summary.preAct12.taxes.totalTaxes).toBe(0);
      expect(summary.preAct12.aids.totalAids).toBe(0);
      expect(summary.preAct12.donorCount).toBe(0);
      expect(summary.preAct12.recipientCount).toBe(0);
    });
  });

  describe('formatters Unit Tests', () => {
    it('formatCurrency renders standard and compact representations correctly', () => {
      expect(formatCurrency(15500000000, { compact: true })).toBe('$15.50B');
      expect(formatCurrency(720000000, { compact: true })).toBe('$720.0M');
      expect(formatCurrency(4700000, { compact: true })).toBe('$4.7M');
      expect(formatCurrency(500000, { compact: true })).toBe('$500.0K');
      expect(formatCurrency(1234567)).toBe('$1,234,567');
      expect(formatCurrency(-1103000000, { compact: true, showSign: true })).toBe('-$1.10B');
      expect(formatCurrency(5880000, { compact: true, showSign: true })).toBe('+$5.9M');
      expect(formatCurrency(NaN)).toBe('$0');
    });

    it('formatCentsPerDollar converts ratios and cents with ¢ symbol', () => {
      expect(formatCentsPerDollar(0.5404, { isRatio: true })).toBe('54.0¢');
      expect(formatCentsPerDollar(2.251, { isRatio: true })).toBe('225.1¢');
      expect(formatCentsPerDollar(54.0)).toBe('54.0¢');
      expect(formatCentsPerDollar(54.0, { includeSuffix: true })).toBe('54.0¢ per $1.00');
      expect(formatCentsPerDollar(NaN)).toBe('0.0¢');
    });

    it('formatPercent handles ratios and explicit signs', () => {
      expect(formatPercent(0.2069, 1, { isRatio: true, showSign: true })).toBe('+20.7%');
      expect(formatPercent(53.3, 1)).toBe('53.3%');
      expect(formatPercent(NaN)).toBe('0.0%');
    });

    it('formatNumber and formatPopulation handle integer grouping', () => {
      expect(formatNumber(5892539)).toBe('5,892,539');
      expect(formatPopulation(939489)).toBe('939,489');
      expect(formatPopulation(-10)).toBe('0');
      expect(formatPopulation(NaN)).toBe('0');
    });

    it('formatReturnRatio and formatNetFlowPerCapita display domain strings', () => {
      expect(formatReturnRatio(0.5404)).toBe('$0.54 per $1.00');
      expect(formatNetFlowPerCapita(1381.9)).toBe('+$1,382 / resident');
      expect(formatNetFlowPerCapita(-3291.33)).toBe('-$3,291 / resident');
    });
  });
});
