# Project: Wisconsin Tax Flow Web Application

## Architecture
- **Framework & Build**: React 18/19, Vite, TypeScript 5 (strict mode), Tailwind CSS, Lucide React icons.
- **Data Engine**: In-memory static, typed dataset covering all 72 Wisconsin counties (`src/data/wiTaxData.ts`), precomputing Pre- and Post-Act 12 tax collections (Net Individual Income Tax, 5% State Sales Tax) and aid distributions (Shared Revenue / Act 12, DPI K-12 General School Aids, WisDOT General Transportation Aids, School Levy Tax Credits).
- **Map Engine**: Zero-external-dependency SVG vector choropleth map (`src/components/CountyMap.tsx`) using preprojected Albers Equal Area coordinates (`src/data/wiCountySvgPaths.ts`) normalized to `viewBox="0 0 600 650"`, rendered with an accessible 9-step Vermilion-to-Teal diverging color scale centered at $1.00 return.
- **Inspector & Comparison Engine**: Interactive drawer and side-by-side comparison view (`src/components/CountyInspector.tsx`, `src/components/CountyComparison.tsx`) featuring Milwaukee County comparison baseline, delta indicators, and stacked breakdown progress bars for taxes and aids.
- **Educational & Data Engine**: Factual public finance explainers (`src/components/EducationalModules.tsx`) for 0% state property tax, school equalization, transportation aids, and Act 12; searchable/sortable 72-county data table (`src/components/CountyDataTable.tsx`); RFC 4180 CSV export (`src/utils/csvExport.ts`); and agency citations (`src/components/MethodologyFooter.tsx`).
- **Testing Engine**: Vitest test suites verifying calculation formulas, 72-county schema invariants, interaction flows, and zero-warning production build.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | 72 County Verified Demographics & FIPS | Complete inventory of all 72 Wisconsin counties (55001-55141, including Menominee 55078) with populations and seats | M1 | Survey 1 & 3 |
| 2 | Wisconsin Department of Revenue Tax Collections | Individual Income Tax and 5% State Sales Tax collections per county | M1 | Survey 1 |
| 3 | State Intergovernmental Aid Streams | DOR Shared Revenue (Pre/Post Act 12), DPI School Aids, WisDOT GTA, and School Levy Tax Credits | M1 | Survey 1 |
| 4 | Mathematical Tax Flow Formulas | Invariant calculations for Return on Dollar, Net Tax Flow, and Per-Capita Net Flow | M1 | Survey 1 |
| 5 | Act 12 Dual Baseline Support | Pre-Act 12 baseline vs Post-Act 12 baseline comparisons with >=20% aid boost logic | M1 | Survey 1 |
| 6 | Project Tooling & Scaffolding | Vite, React, TypeScript strict mode, Tailwind CSS, and Vitest configuration | M1 | Survey 3 |
| 7 | Vector County Boundary Paths | Embedded SVG paths for all 72 counties in US Albers projection viewBox 0 0 600 650 | M2 | Survey 3 |
| 8 | Diverging Color Scale & Legend | 9-step Vermilion-to-Teal / PuOr colorblind-safe scale centered at neutral $1.00 return ($0 net flow) | M2 | Survey 2 & 3 |
| 9 | Metric Toggles | Switch map visualization between Return on Tax Dollar, Per-Capita Net Flow, and Total Net Dollars | M2 | Survey 2 |
| 10 | Baseline Toggles | Switch map and analytics between Pre-Act 12 and Post-Act 12 | M2 | Survey 2 |
| 11 | Map Interactivity & Accessibility | Hover tooltips, county selection, WCAG 2.1 AA keyboard navigation, aria-labels | M2 | Survey 2 & 3 |
| 12 | County Inspector Drawer | Detailed drawer displaying selected county financial metrics and source metadata | M3 | Survey 2 |
| 13 | Stacked Component Breakdowns | Stacked proportional and dollar breakdown bars for taxes (Income vs Sales) and aids (4 streams) | M3 | Survey 2 & 3 |
| 14 | Side-by-Side Comparison Mode | Compare Milwaukee County against any selected county (or any two counties) with delta indicators | M3 | Survey 2 |
| 15 | 0% State Property Tax Explainer | Objective explainer on 2017 Act 59 repeal of state forestry tax and local tax mechanics | M4 | Survey 2 |
| 16 | School Equalization Formula Explainer | Factual breakdown of the 3-tier guaranteed valuation formula and property wealth equalization | M4 | Survey 2 |
| 17 | Transportation Aid Explainer | Factual breakdown of WisDOT GTA cost-sharing vs rate-per-mile formulas | M4 | Survey 2 |
| 18 | Act 12 Shared Revenue Explainer | Factual breakdown of 2023 bipartisan compromise, 20% sales tax dedicate, and aid increases | M4 | Survey 2 |
| 19 | 72-County Searchable & Sortable Table | Table displaying all 72 counties with instant search filter, column sorting, and status badges | M4 | Survey 2 |
| 20 | RFC 4180 CSV Download | Client-side CSV export containing full 72-county dataset and computed metrics | M4 | Survey 2 |
| 21 | Agency Citations & Methodology | Direct source citations for DOR, DPI, WisDOT, and Legislative Fiscal Bureau | M4 | Survey 1 & 2 |
| 22 | Automated Calculation & Schema Unit Tests | Vitest suite validating all 72 counties, mathematical invariants, and zero NaN/null values | M5 | Survey 1 & 3 |
| 23 | E2E Testing Suite (Tiers 1-4) | Comprehensive opaque-box and UI integration test suite covering user flows and edge cases | M5 | Survey 3 |
| 24 | Adversarial Coverage Hardening (Tier 5) | Stress tests for edge cases (Menominee, Ozaukee, extreme ratios, empty search) | M5 | Survey 2 & 3 |
| 25 | Production Build Verification | Zero TypeScript errors, zero broken imports, clean `npm run build` output | M5 | Survey 3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Scaffolding, Data Ingestion & Math Engine | Features 1–6: Project setup, 72-county typed data, math calculations, schema invariants | none | DONE (65 tests passing, zero TS errors) |
| 2 | M2: Wisconsin Choropleth Map & Controls | Features 7–11: 72-county SVG map, diverging scale, metric/baseline toggles, tooltips | M1 | PLANNED (Next) |
| 3 | M3: Comparative County Inspector & Breakdowns | Features 12–14: Inspector drawer, Milwaukee vs any county comparison, stacked charts | M1, M2 | PLANNED |
| 4 | M4: Educational Modules, Data Table & Export | Features 15–21: 4 explainers, searchable/sortable table, CSV export, citations | M1, M2, M3 | PLANNED |
| 5 | M5: E2E Testing Suite, Build & Adversarial Hardening | Features 22–25: Full test suite (Tiers 1-5), clean build verification, forensic audit | M1, M2, M3, M4 | PLANNED |

## Interface Contracts
### `src/types/taxFlow.ts`
```typescript
export type BaselineYear = 'preAct12' | 'postAct12';
export type MetricType = 'returnOnDollar' | 'netFlowPerCapita' | 'totalNetFlow';
export type ClassificationType = 'donor' | 'recipient';

export interface TaxCollections {
  individualIncomeTax: number;
  stateSalesTax: number;
  totalTaxes: number;
}

export interface AidDistributions {
  sharedRevenue: number;
  schoolAids: number;
  transportationAids: number;
  schoolLevyTaxCredit: number;
  totalAids: number;
}

export interface CountyMetrics {
  returnOnDollar: number; // Aids / Taxes (e.g. 0.54)
  returnCents: number;    // returnOnDollar * 100 (e.g. 54.0)
  netFlow: number;        // Aids - Taxes
  netFlowPerCapita: number; // NetFlow / Population
  classification: ClassificationType;
}

export interface CountyRecord {
  fips: string;           // 5-digit FIPS code ('55001' - '55141')
  name: string;           // e.g. "Milwaukee", "Dane", "Menominee"
  seat: string;           // County seat
  population: number;     // e.g. 939489
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
```

### `src/utils/taxCalculations.ts`
- `calculateTaxCollections(income: number, sales: number): TaxCollections`
- `calculateAidDistributions(shared: number, school: number, gta: number, sltc: number): AidDistributions`
- `calculateCountyMetrics(taxes: TaxCollections, aids: AidDistributions, population: number): CountyMetrics`
- `calculateStatewideSummary(counties: CountyRecord[]): StatewideSummary`

### `src/utils/colorScale.ts`
- `getColorForMetric(value: number, metric: MetricType): string`
- `getLegendThresholds(metric: MetricType): { label: string; color: string; min: number; max: number }[]`

## Code Layout
```
wi_tax_flow/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── taxFlow.ts
│   ├── data/
│   │   ├── wiTaxData.ts
│   │   └── wiCountySvgPaths.ts
│   ├── utils/
│   │   ├── taxCalculations.ts
│   │   ├── colorScale.ts
│   │   ├── formatters.ts
│   │   └── csvExport.ts
│   └── components/
│       ├── Header.tsx
│       ├── MetricControls.tsx
│       ├── CountyMap.tsx
│       ├── MapLegend.tsx
│       ├── CountyInspector.tsx
│       ├── CountyComparison.tsx
│       ├── StackedBarBreakdown.tsx
│       ├── EducationalModules.tsx
│       ├── CountyDataTable.tsx
│       └── MethodologyFooter.tsx
├── tests/
│   ├── taxCalculations.test.ts
│   ├── dataValidation.test.ts
│   ├── colorScale.test.ts
│   └── csvExport.test.ts
└── .agents/teamwork/
```
