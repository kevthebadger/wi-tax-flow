import type { CountyRecord, BaselineYear } from '../types/taxFlow';
import { formatReturnRatio } from './formatters';

/**
 * Converts the 72-county dataset into a standard RFC-4180 compliant CSV string.
 */
export function generateCountyCSV(
  counties: CountyRecord[],
  baseline: BaselineYear = 'postAct12'
): string {
  const headers = [
    'FIPS',
    'County Name',
    'County Seat',
    'Population',
    'Baseline Era',
    'Individual Income Tax ($)',
    'State 5% Sales Tax ($)',
    'Total State Taxes Paid ($)',
    'Shared Revenue / CMA ($)',
    'K-12 School Aids ($)',
    'Transportation Aids / GTA ($)',
    'School Levy Tax Credit ($)',
    'Total State Aids Returned ($)',
    'Return on Dollar ($)',
    'Return in Cents (¢)',
    'Total Net Flow ($)',
    'Net Flow Per Capita ($)',
    'Classification',
  ];

  const rows = counties.map((c) => {
    const era = c[baseline];
    return [
      `"${c.fips}"`,
      `"${c.name}"`,
      `"${c.seat}"`,
      c.population,
      `"${baseline === 'postAct12' ? 'Post-Act 12 (Current 2024+)' : 'Pre-Act 12 (Historic)'}"`,
      era.taxes.individualIncomeTax,
      era.taxes.stateSalesTax,
      era.taxes.totalTaxes,
      era.aids.sharedRevenue,
      era.aids.schoolAids,
      era.aids.transportationAids,
      era.aids.schoolLevyTaxCredit,
      era.aids.totalAids,
      formatReturnRatio(era.metrics.returnOnDollar),
      era.metrics.returnCents.toFixed(2),
      era.metrics.netFlow,
      era.metrics.netFlowPerCapita.toFixed(2),
      `"${era.metrics.classification}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

/**
 * Triggers a browser download of the generated CSV file.
 */
export function downloadCountyCSV(
  counties: CountyRecord[],
  baseline: BaselineYear = 'postAct12'
): void {
  const csvContent = generateCountyCSV(counties, baseline);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `wisconsin_county_tax_flow_${baseline}_${new Date().toISOString().split('T')[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
