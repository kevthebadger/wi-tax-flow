/**
 * Core TypeScript type definitions and interfaces for the Wisconsin Tax Flow Web Application.
 * Aligns strictly with PROJECT.md Interface Contracts.
 */

export type BaselineYear = 'preAct12' | 'postAct12';
export type MetricType = 'returnOnDollar' | 'netFlowPerCapita' | 'totalNetFlow';
export type ClassificationType = 'donor' | 'recipient';

/**
 * State tax collections generated within a county boundary.
 */
export interface TaxCollections {
  individualIncomeTax: number;
  stateSalesTax: number;
  totalTaxes: number;
}

/**
 * State intergovernmental aids returned to jurisdictions within a county.
 */
export interface AidDistributions {
  sharedRevenue: number;
  schoolAids: number;
  transportationAids: number;
  schoolLevyTaxCredit: number;
  totalAids: number;
}

/**
 * Derived fiscal flow metrics and donor/recipient classification.
 */
export interface CountyMetrics {
  returnOnDollar: number;     // Total Aids / Total Taxes (e.g. 0.540417)
  returnCents: number;        // returnOnDollar * 100 (e.g. 54.04)
  netFlow: number;            // Total Aids - Total Taxes
  netFlowPerCapita: number;   // Net Flow / Population
  classification: ClassificationType;
}

/**
 * Complete record for a single Wisconsin county under Pre- and Post-Act 12 baselines.
 */
export interface CountyRecord {
  fips: string;               // 5-digit FIPS code ('55001' - '55141', Menominee '55078')
  name: string;               // County name (e.g. 'Milwaukee', 'Dane', 'Menominee')
  seat: string;               // County seat
  population: number;         // Baseline county population (e.g. 939489)
  preAct12: {
    taxes: TaxCollections;
    aids: AidDistributions;
    metrics: CountyMetrics;
  };
  postAct12: {
    taxes: TaxCollections;
    aids: AidDistributions;
    metrics: CountyMetrics;
  };
}

/**
 * Statewide aggregate summary across all 72 Wisconsin counties.
 */
export interface StatewideSummary {
  population: number;
  preAct12: {
    taxes: TaxCollections;
    aids: AidDistributions;
    metrics: CountyMetrics;
    donorCount: number;
    recipientCount: number;
  };
  postAct12: {
    taxes: TaxCollections;
    aids: AidDistributions;
    metrics: CountyMetrics;
    donorCount: number;
    recipientCount: number;
  };
}

/**
 * Metadata citation for official state agencies and statutory authorities.
 */
export interface AgencyCitation {
  id: string;
  agency: string;
  program: string;
  statutoryAuthority: string;
  description: string;
  reportUrl: string;
}
