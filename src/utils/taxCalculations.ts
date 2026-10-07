import {
  TaxCollections,
  AidDistributions,
  CountyMetrics,
  CountyRecord,
  StatewideSummary,
  ClassificationType,
} from '../types/taxFlow';

/**
 * Safely aggregates Individual Income Tax and State Sales Tax collections.
 *
 * @param individualIncomeTax Net Individual Income Tax collected from residents
 * @param stateSalesTax 5% State Sales Tax collected within county borders
 * @returns TaxCollections with sanitized components and rounded total
 */
export function calculateTaxCollections(
  individualIncomeTax: number,
  stateSalesTax: number
): TaxCollections {
  const safeIncome = Number.isFinite(individualIncomeTax) ? individualIncomeTax : 0;
  const safeSales = Number.isFinite(stateSalesTax) ? stateSalesTax : 0;
  const totalTaxes = Math.round((safeIncome + safeSales) * 100) / 100;

  return {
    individualIncomeTax: safeIncome,
    stateSalesTax: safeSales,
    totalTaxes,
  };
}

/**
 * Safely aggregates all four primary state intergovernmental aid distribution streams:
 * 1. DOR Shared Revenue / County and Municipal Aid
 * 2. DPI K-12 General School Aids
 * 3. WisDOT General Transportation Aids
 * 4. DOR School Levy Tax Credits
 *
 * @returns AidDistributions with individual streams and rounded total
 */
export function calculateAidDistributions(
  sharedRevenue: number,
  schoolAids: number,
  transportationAids: number,
  schoolLevyTaxCredit: number
): AidDistributions {
  const safeShared = Number.isFinite(sharedRevenue) ? sharedRevenue : 0;
  const safeSchool = Number.isFinite(schoolAids) ? schoolAids : 0;
  const safeGta = Number.isFinite(transportationAids) ? transportationAids : 0;
  const safeSltc = Number.isFinite(schoolLevyTaxCredit) ? schoolLevyTaxCredit : 0;
  const totalAids = Math.round((safeShared + safeSchool + safeGta + safeSltc) * 100) / 100;

  return {
    sharedRevenue: safeShared,
    schoolAids: safeSchool,
    transportationAids: safeGta,
    schoolLevyTaxCredit: safeSltc,
    totalAids,
  };
}

/**
 * Calculates return on tax dollar, return in cents, net flow, per-capita net flow,
 * and donor/recipient classification.
 *
 * Includes defensive division-by-zero protection for total taxes and population.
 */
export function calculateCountyMetrics(
  taxes: TaxCollections,
  aids: AidDistributions,
  population: number
): CountyMetrics {
  const safeTaxes = Number.isFinite(taxes.totalTaxes) ? taxes.totalTaxes : 0;
  const safeAids = Number.isFinite(aids.totalAids) ? aids.totalAids : 0;
  const safePop = Number.isFinite(population) && population > 0 ? population : 0;

  // Division by zero protection: if total taxes are zero or negative, return 0
  const returnOnDollar = safeTaxes > 0 ? safeAids / safeTaxes : 0;
  const returnCents = Math.round(returnOnDollar * 10000) / 100;

  const netFlow = Math.round((safeAids - safeTaxes) * 100) / 100;
  const netFlowPerCapita = safePop > 0 ? Math.round((netFlow / safePop) * 100) / 100 : 0;

  // Donor vs Recipient classification
  // Recipient if net flow >= 0 (or return on dollar >= 1.0)
  const classification: ClassificationType = netFlow >= 0 ? 'recipient' : 'donor';

  return {
    returnOnDollar,
    returnCents,
    netFlow,
    netFlowPerCapita,
    classification,
  };
}

/**
 * Computes statewide summary across an array of county records for pre- and post-Act 12 baselines.
 * Reconciles component sums, calculates macro ratios, and counts donor and recipient counties.
 */
export function calculateStatewideSummary(counties: CountyRecord[]): StatewideSummary {
  if (!counties || counties.length === 0) {
    const emptyTaxes: TaxCollections = { individualIncomeTax: 0, stateSalesTax: 0, totalTaxes: 0 };
    const emptyAids: AidDistributions = {
      sharedRevenue: 0,
      schoolAids: 0,
      transportationAids: 0,
      schoolLevyTaxCredit: 0,
      totalAids: 0,
    };
    const emptyMetrics: CountyMetrics = {
      returnOnDollar: 0,
      returnCents: 0,
      netFlow: 0,
      netFlowPerCapita: 0,
      classification: 'donor',
    };
    return {
      population: 0,
      preAct12: {
        taxes: emptyTaxes,
        aids: emptyAids,
        metrics: emptyMetrics,
        donorCount: 0,
        recipientCount: 0,
      },
      postAct12: {
        taxes: emptyTaxes,
        aids: emptyAids,
        metrics: emptyMetrics,
        donorCount: 0,
        recipientCount: 0,
      },
    };
  }

  let totalPopulation = 0;

  // Pre-Act 12 accumulators
  let preIncome = 0;
  let preSales = 0;
  let preShared = 0;
  let preSchool = 0;
  let preGta = 0;
  let preSltc = 0;
  let preDonorCount = 0;
  let preRecipientCount = 0;

  // Post-Act 12 accumulators
  let postIncome = 0;
  let postSales = 0;
  let postShared = 0;
  let postSchool = 0;
  let postGta = 0;
  let postSltc = 0;
  let postDonorCount = 0;
  let postRecipientCount = 0;

  for (const county of counties) {
    totalPopulation += county.population || 0;

    // Pre-Act 12
    preIncome += county.preAct12.taxes.individualIncomeTax || 0;
    preSales += county.preAct12.taxes.stateSalesTax || 0;
    preShared += county.preAct12.aids.sharedRevenue || 0;
    preSchool += county.preAct12.aids.schoolAids || 0;
    preGta += county.preAct12.aids.transportationAids || 0;
    preSltc += county.preAct12.aids.schoolLevyTaxCredit || 0;
    if (county.preAct12.metrics.classification === 'recipient') {
      preRecipientCount++;
    } else {
      preDonorCount++;
    }

    // Post-Act 12
    postIncome += county.postAct12.taxes.individualIncomeTax || 0;
    postSales += county.postAct12.taxes.stateSalesTax || 0;
    postShared += county.postAct12.aids.sharedRevenue || 0;
    postSchool += county.postAct12.aids.schoolAids || 0;
    postGta += county.postAct12.aids.transportationAids || 0;
    postSltc += county.postAct12.aids.schoolLevyTaxCredit || 0;
    if (county.postAct12.metrics.classification === 'recipient') {
      postRecipientCount++;
    } else {
      postDonorCount++;
    }
  }

  const preTaxes = calculateTaxCollections(preIncome, preSales);
  const preAids = calculateAidDistributions(preShared, preSchool, preGta, preSltc);
  const preMetrics = calculateCountyMetrics(preTaxes, preAids, totalPopulation);

  const postTaxes = calculateTaxCollections(postIncome, postSales);
  const postAids = calculateAidDistributions(postShared, postSchool, postGta, postSltc);
  const postMetrics = calculateCountyMetrics(postTaxes, postAids, totalPopulation);

  return {
    population: totalPopulation,
    preAct12: {
      taxes: preTaxes,
      aids: preAids,
      metrics: preMetrics,
      donorCount: preDonorCount,
      recipientCount: preRecipientCount,
    },
    postAct12: {
      taxes: postTaxes,
      aids: postAids,
      metrics: postMetrics,
      donorCount: postDonorCount,
      recipientCount: postRecipientCount,
    },
  };
}
