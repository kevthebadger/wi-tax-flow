import { describe, it, expect } from 'vitest';
import { generateCountyCSV } from '../src/utils/csvExport';
import { WI_COUNTIES } from '../src/data/wiTaxData';

describe('csvExport Utility', () => {
  it('generates non-empty CSV text with 73 lines (1 header + 72 counties)', () => {
    const csv = generateCountyCSV(WI_COUNTIES, 'postAct12');
    const lines = csv.split('\r\n');
    expect(lines.length).toBe(73);
  });

  it('contains essential columns in the header', () => {
    const csv = generateCountyCSV(WI_COUNTIES, 'postAct12');
    const header = csv.split('\r\n')[0];
    expect(header).toContain('FIPS');
    expect(header).toContain('County Name');
    expect(header).toContain('Total State Taxes Paid ($)');
    expect(header).toContain('Total State Aids Returned ($)');
    expect(header).toContain('Return on Dollar ($)');
  });

  it('includes Milwaukee County with accurate FIPS and numbers', () => {
    const csv = generateCountyCSV(WI_COUNTIES, 'postAct12');
    expect(csv).toContain('"55079"');
    expect(csv).toContain('"Milwaukee"');
  });

  it('supports pre-Act 12 baseline export', () => {
    const csv = generateCountyCSV(WI_COUNTIES, 'preAct12');
    expect(csv).toContain('Pre-Act 12 (Historic)');
  });
});
