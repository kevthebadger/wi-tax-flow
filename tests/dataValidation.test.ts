import { describe, it, expect } from 'vitest';
import {
  WI_COUNTIES,
  STATEWIDE_SUMMARY,
  getCountyByFips,
  getCountyByName,
  COUNTY_BY_FIPS,
  COUNTY_BY_NAME,
} from '../src/data/wiTaxData';

describe('dataValidation Invariant Test Suite', () => {
  describe('72-County Geographic & Demographic Invariants', () => {
    it('INV-1: contains exactly 72 Wisconsin county records', () => {
      expect(WI_COUNTIES).toBeDefined();
      expect(Array.isArray(WI_COUNTIES)).toBe(true);
      expect(WI_COUNTIES.length).toBe(72);
    });

    it('INV-2: every record has a unique, valid 5-digit Wisconsin FIPS code (55xxx)', () => {
      const fipsSet = new Set<string>();

      for (const county of WI_COUNTIES) {
        expect(county.fips).toBeDefined();
        expect(typeof county.fips).toBe('string');
        expect(county.fips).toMatch(/^55\d{3}$/);
        expect(fipsSet.has(county.fips)).toBe(false); // No duplicates
        fipsSet.add(county.fips);
      }

      expect(fipsSet.size).toBe(72);
    });

    it('INV-3: Menominee County FIPS 55078 is explicitly present', () => {
      const menominee = WI_COUNTIES.find((c) => c.fips === '55078');
      expect(menominee).toBeDefined();
      expect(menominee?.name).toBe('Menominee');
      expect(menominee?.seat).toBe('Keshena');
      expect(menominee?.population).toBeGreaterThan(4000);
      expect(menominee?.population).toBeLessThan(6000);
    });

    it('INV-4: every county has a non-empty name and county seat', () => {
      for (const county of WI_COUNTIES) {
        expect(county.name.trim().length).toBeGreaterThan(0);
        expect(county.seat.trim().length).toBeGreaterThan(0);
      }
    });

    it('INV-5 & INV-6: all counties have positive population and aggregate to statewide baseline', () => {
      let totalPop = 0;

      for (const county of WI_COUNTIES) {
        expect(county.population).toBeGreaterThan(0);
        expect(Number.isInteger(county.population)).toBe(true);
        totalPop += county.population;
      }

      // Expected Wisconsin population ~5,892,539
      expect(totalPop).toBe(STATEWIDE_SUMMARY.population);
      expect(totalPop).toBeGreaterThan(5800000);
      expect(totalPop).toBeLessThan(6000000);
    });
  });

  describe('Tax Revenue & Collections Invariants', () => {
    it('INV-7: every county has strictly positive income tax and sales tax in both baselines', () => {
      for (const county of WI_COUNTIES) {
        // Pre-Act 12
        expect(county.preAct12.taxes.individualIncomeTax).toBeGreaterThan(0);
        expect(county.preAct12.taxes.stateSalesTax).toBeGreaterThan(0);
        expect(county.preAct12.taxes.totalTaxes).toBeGreaterThan(0);

        // Post-Act 12
        expect(county.postAct12.taxes.individualIncomeTax).toBeGreaterThan(0);
        expect(county.postAct12.taxes.stateSalesTax).toBeGreaterThan(0);
        expect(county.postAct12.taxes.totalTaxes).toBeGreaterThan(0);
      }
    });

    it('INV-8: totalTaxes strictly equals individualIncomeTax + stateSalesTax', () => {
      for (const county of WI_COUNTIES) {
        const preSum =
          county.preAct12.taxes.individualIncomeTax + county.preAct12.taxes.stateSalesTax;
        expect(county.preAct12.taxes.totalTaxes).toBeCloseTo(preSum, 2);

        const postSum =
          county.postAct12.taxes.individualIncomeTax + county.postAct12.taxes.stateSalesTax;
        expect(county.postAct12.taxes.totalTaxes).toBeCloseTo(postSum, 2);
      }
    });
  });

  describe('Intergovernmental Aids & Act 12 Expansion Invariants', () => {
    it('INV-9: all four aid streams are strictly positive for all 72 counties', () => {
      for (const county of WI_COUNTIES) {
        for (const era of ['preAct12', 'postAct12'] as const) {
          const aids = county[era].aids;
          expect(aids.sharedRevenue).toBeGreaterThan(0);
          expect(aids.schoolAids).toBeGreaterThan(0);
          expect(aids.transportationAids).toBeGreaterThan(0);
          expect(aids.schoolLevyTaxCredit).toBeGreaterThan(0);
          expect(aids.totalAids).toBeGreaterThan(0);
        }
      }
    });

    it('INV-10: totalAids strictly equals sum of all 4 individual aid components', () => {
      for (const county of WI_COUNTIES) {
        for (const era of ['preAct12', 'postAct12'] as const) {
          const aids = county[era].aids;
          const expectedSum =
            aids.sharedRevenue +
            aids.schoolAids +
            aids.transportationAids +
            aids.schoolLevyTaxCredit;
          expect(aids.totalAids).toBeCloseTo(expectedSum, 2);
        }
      }
    });

    it('INV-11: Post-Act 12 shared revenue is at least 20% higher than Pre-Act 12 for every county', () => {
      for (const county of WI_COUNTIES) {
        const preShared = county.preAct12.aids.sharedRevenue;
        const postShared = county.postAct12.aids.sharedRevenue;
        const minimumRequired = preShared * 1.20 - 0.01; // Allow 1 cent rounding tolerance

        expect(
          postShared,
          `County ${county.name} (${county.fips}) failed Act 12 minimum 20% increase: Pre=${preShared}, Post=${postShared}`
        ).toBeGreaterThanOrEqual(minimumRequired);
      }
    });

    it('INV-12: Post-Act 12 total aids exceed Pre-Act 12 total aids for every county', () => {
      for (const county of WI_COUNTIES) {
        expect(county.postAct12.aids.totalAids).toBeGreaterThan(county.preAct12.aids.totalAids);
      }
    });
  });

  describe('Metric Formula & Precomputation Invariants', () => {
    it('INV-13, INV-14, INV-15: precomputed metrics exactly match formula results', () => {
      for (const county of WI_COUNTIES) {
        for (const era of ['preAct12', 'postAct12'] as const) {
          const { taxes, aids, metrics } = county[era];

          // Return on Dollar
          const expectedReturn = aids.totalAids / taxes.totalTaxes;
          expect(metrics.returnOnDollar).toBeCloseTo(expectedReturn, 4);

          // Return Cents
          expect(metrics.returnCents).toBeCloseTo(metrics.returnOnDollar * 100, 1);

          // Net Flow
          const expectedNetFlow = aids.totalAids - taxes.totalTaxes;
          expect(metrics.netFlow).toBeCloseTo(expectedNetFlow, 2);

          // Per-Capita Net Flow
          const expectedPerCapita = expectedNetFlow / county.population;
          expect(metrics.netFlowPerCapita).toBeCloseTo(expectedPerCapita, 2);
        }
      }
    });

    it('INV-16: classification accurately partitions counties into donor (<1.0) and recipient (>=1.0)', () => {
      for (const county of WI_COUNTIES) {
        for (const era of ['preAct12', 'postAct12'] as const) {
          const { metrics } = county[era];
          if (metrics.returnOnDollar >= 1.0) {
            expect(metrics.classification).toBe('recipient');
            expect(metrics.netFlow).toBeGreaterThanOrEqual(0);
          } else {
            expect(metrics.classification).toBe('donor');
            expect(metrics.netFlow).toBeLessThan(0);
          }
        }
      }
    });
  });

  describe('Statewide Summary Aggregate Invariants', () => {
    it('INV-17: statewide totals reconcile with county summations', () => {
      let sumPreIncome = 0;
      let sumPreSales = 0;
      let sumPreShared = 0;
      let sumPreSchool = 0;
      let sumPreGta = 0;
      let sumPreSltc = 0;

      let sumPostShared = 0;

      for (const county of WI_COUNTIES) {
        sumPreIncome += county.preAct12.taxes.individualIncomeTax;
        sumPreSales += county.preAct12.taxes.stateSalesTax;
        sumPreShared += county.preAct12.aids.sharedRevenue;
        sumPreSchool += county.preAct12.aids.schoolAids;
        sumPreGta += county.preAct12.aids.transportationAids;
        sumPreSltc += county.preAct12.aids.schoolLevyTaxCredit;

        sumPostShared += county.postAct12.aids.sharedRevenue;
      }

      // Check Pre-Act 12
      expect(STATEWIDE_SUMMARY.preAct12.taxes.individualIncomeTax).toBeCloseTo(sumPreIncome, 2);
      expect(STATEWIDE_SUMMARY.preAct12.taxes.stateSalesTax).toBeCloseTo(sumPreSales, 2);
      expect(STATEWIDE_SUMMARY.preAct12.aids.sharedRevenue).toBeCloseTo(sumPreShared, 2);
      expect(STATEWIDE_SUMMARY.preAct12.aids.schoolAids).toBeCloseTo(sumPreSchool, 2);
      expect(STATEWIDE_SUMMARY.preAct12.aids.transportationAids).toBeCloseTo(sumPreGta, 2);
      expect(STATEWIDE_SUMMARY.preAct12.aids.schoolLevyTaxCredit).toBeCloseTo(sumPreSltc, 2);

      // Check Post-Act 12 Shared Revenue Boost
      expect(STATEWIDE_SUMMARY.postAct12.aids.sharedRevenue).toBeCloseTo(sumPostShared, 2);
      expect(STATEWIDE_SUMMARY.postAct12.aids.totalAids).toBeGreaterThan(
        STATEWIDE_SUMMARY.preAct12.aids.totalAids
      );
    });

    it('INV-18: donor and recipient counts sum to 72 in both baselines', () => {
      expect(
        STATEWIDE_SUMMARY.preAct12.donorCount + STATEWIDE_SUMMARY.preAct12.recipientCount
      ).toBe(72);
      expect(
        STATEWIDE_SUMMARY.postAct12.donorCount + STATEWIDE_SUMMARY.postAct12.recipientCount
      ).toBe(72);
    });
  });

  describe('Empirical Macroeconomic & Archetype Benchmarks', () => {
    it('INV-19: verifies key county archetype fiscal classifications', () => {
      const milwaukee = WI_COUNTIES.find((c) => c.fips === '55079')!;
      const waukesha = WI_COUNTIES.find((c) => c.fips === '55133')!;
      const dane = WI_COUNTIES.find((c) => c.fips === '55025')!;
      const menominee = WI_COUNTIES.find((c) => c.fips === '55078')!;
      const forest = WI_COUNTIES.find((c) => c.fips === '55041')!;

      // Milwaukee is an urban donor (around 50¢ to 55¢ per dollar)
      expect(milwaukee.postAct12.metrics.classification).toBe('donor');
      expect(milwaukee.postAct12.metrics.returnOnDollar).toBeGreaterThan(0.48);
      expect(milwaukee.postAct12.metrics.returnOnDollar).toBeLessThan(0.60);

      // Waukesha is a suburban donor (< 25¢ per dollar)
      expect(waukesha.postAct12.metrics.classification).toBe('donor');
      expect(waukesha.postAct12.metrics.returnOnDollar).toBeLessThan(0.25);

      // Dane is a capital / high-wealth donor (< 30¢ per dollar)
      expect(dane.postAct12.metrics.classification).toBe('donor');
      expect(dane.postAct12.metrics.returnOnDollar).toBeLessThan(0.30);

      // Menominee is a high-need rural recipient (> $2.00 per dollar)
      expect(menominee.postAct12.metrics.classification).toBe('recipient');
      expect(menominee.postAct12.metrics.returnOnDollar).toBeGreaterThan(2.0);

      // Forest is a rural recipient (> $1.20 per dollar)
      expect(forest.postAct12.metrics.classification).toBe('recipient');
      expect(forest.postAct12.metrics.returnOnDollar).toBeGreaterThan(1.2);
    });
  });

  describe('Dictionary Lookup & Prototype Hardening Invariants', () => {
    it('INV-20: guards getCountyByFips against prototype collisions and non-string inputs', () => {
      expect(getCountyByFips('toString')).toBeUndefined();
      expect(getCountyByFips('constructor')).toBeUndefined();
      expect(getCountyByFips(null as unknown as string)).toBeUndefined();
      expect(getCountyByFips(undefined as unknown as string)).toBeUndefined();
      expect(getCountyByFips(123 as unknown as string)).toBeUndefined();
      expect(getCountyByFips('55078')?.name).toBe('Menominee');
    });

    it('INV-21: guards getCountyByName against prototype collisions, non-strings, and whitespace', () => {
      expect(getCountyByName('toString')).toBeUndefined();
      expect(getCountyByName('constructor')).toBeUndefined();
      expect(getCountyByName(null as unknown as string)).toBeUndefined();
      expect(getCountyByName(undefined as unknown as string)).toBeUndefined();
      expect(getCountyByName(123 as unknown as string)).toBeUndefined();
      expect(getCountyByName('   ')).toBeUndefined();
      expect(getCountyByName('  milwaukee  ')?.fips).toBe('55079');
      expect(getCountyByName('DANE')?.fips).toBe('55025');
    });

    it('INV-22: ensures COUNTY_BY_FIPS and COUNTY_BY_NAME have null prototype preventing property inheritance', () => {
      expect(COUNTY_BY_FIPS['toString']).toBeUndefined();
      expect(COUNTY_BY_FIPS['constructor']).toBeUndefined();
      expect(COUNTY_BY_NAME['constructor']).toBeUndefined();
      expect(COUNTY_BY_NAME['toString']).toBeUndefined();
      expect(COUNTY_BY_FIPS['55079']?.name).toBe('Milwaukee');
      expect(COUNTY_BY_NAME['milwaukee']?.fips).toBe('55079');
    });
  });
});
