# Wisconsin Tax Flow (wi-tax-flow)

An interactive, nonpartisan public finance web application mapping state tax collections versus intergovernmental aids returned across all 72 Wisconsin counties.

[![Tests](https://img.shields.io/badge/tests-128%20passed-emerald)](https://github.com/kevthebadger/wi-tax-flow)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-slate.svg)](https://opensource.org/licenses/MIT)

**Live Deployment:** [https://wi-tax-flow.onrender.com](https://wi-tax-flow.onrender.com)  
**GitHub Repository:** [https://github.com/kevthebadger/wi-tax-flow](https://github.com/kevthebadger/wi-tax-flow)

---

## Overview & Civic Purpose

Public discussions regarding Wisconsin state and local government finance often feature competing regional narratives:
- **Rural Narrative:** Concerns that rural taxpayer dollars disproportionately fund urban services and transit in Milwaukee.
- **Urban Narrative:** Concerns that Milwaukee and Dane counties generate disproportionate shares of the state general fund while receiving diminished aid returns.

This project delivers an objective, verifiable, county-by-county accounting based strictly on certified state reports from the **Wisconsin Department of Revenue (DOR)**, **Department of Public Instruction (DPI)**, and **Department of Transportation (WisDOT)**.

### Key Capabilities
1. **Interactive Choropleth Vector Map:** All 72 Wisconsin counties rendered in US Albers Equal Area projection (`viewBox="0 0 600 650"`) on a colorblind-safe 9-step Vermilion-to-Teal diverging scale centered at **$1.00 return** (neutral parity).
2. **Dynamic Metric Lenses:** Instant switching between **Return on Tax Dollar** (cents returned per $1 paid), **Per-Capita Net Flow** ($ / resident), and **Total Net Dollars**.
3. **Dual Legislative Baselines:** Toggle between **Post-Act 12 (Current Law 2024+)** and **Pre-Act 12 (Historic)** to observe the exact impact of the 2023 bipartisan shared revenue overhaul.
4. **Milwaukee County Comparator:** Dedicated side-by-side comparison modal directly contrasting Milwaukee County against any other Wisconsin county.
5. **Public Finance 101:** Educational explainers dispelling common myths (e.g., explaining that the State of Wisconsin collects 0% property tax, and how school equalization and road mileage formulas work).
6. **Searchable Table & CSV Export:** Full 72-county sortable data table with one-click RFC-4180 compliant CSV export.

---

## Quick Start for Development

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Local Setup
```bash
# Clone the repository (if on a new machine)
git clone https://github.com/kevthebadger/wi-tax-flow.git
cd wi-tax-flow

# Install dependencies
npm install

# Start local Vite development server with HMR
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local development server on port 5173 with hot-module reloading. |
| `npm run build` | Runs TypeScript compilation (`tsc`) and Vite bundling to `dist/`. |
| `npm run preview` | Runs a local web server serving the production `dist/` bundle. |
| `npm test` | Runs the full Vitest automated test suite (128 unit & invariant tests). |

---

## Project Structure

```
wi_tax_flow/
├── Dockerfile                     # Multi-stage production container (Node build + Nginx Alpine)
├── nginx.conf                     # Nginx SPA fallback routing and static asset caching
├── render.yaml                    # Render Blueprint Infrastructure-as-Code specification
├── index.html                     # HTML5 root template with meta tags
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # Strict TypeScript compiler options (noUnusedLocals, etc.)
├── vite.config.ts                 # Vite bundler configuration
├── tailwind.config.js             # Tailwind typography and color tokens
├── src/
│   ├── main.tsx                   # React root entry point
│   ├── App.tsx                    # Top-level state coordinator and layout
│   ├── index.css                  # Tailwind directives and utility classes
│   ├── types/
│   │   └── taxFlow.ts             # Strict TypeScript interfaces (CountyRecord, Metrics, etc.)
│   ├── data/
│   │   ├── wiTaxData.ts           # Authoritative 72-county dataset with dual baselines
│   │   └── wiCountySvgPaths.ts    # Normalized SVG vector boundaries & centroids (Albers)
│   ├── utils/
│   │   ├── taxCalculations.ts     # Formula engine (Return on Dollar, Net Flow, Per Capita)
│   │   ├── colorScale.ts          # 9-step Vermilion-to-Teal diverging color scale algorithms
│   │   ├── formatters.ts          # Currency, ratio, and population formatters
│   │   └── csvExport.ts           # RFC-4180 CSV export generator
│   └── components/
│       ├── CountyMap.tsx          # Two-pass SVG choropleth map with tooltips
│       ├── MapLegend.tsx          # Diverging color scale legend with dynamic pin marker
│       ├── MetricControls.tsx     # Segmented metric and baseline toggles
│       ├── CountyInspector.tsx    # Selected county detail drawer & KPI cards
│       ├── CountyComparison.tsx   # Side-by-side Milwaukee vs. Any County modal
│       ├── StackedBarBreakdown.tsx# Proportional tax collection and aid distribution bars
│       ├── EducationalModules.tsx # Factual public finance explainer accordions
│       ├── CountyDataTable.tsx    # Searchable, sortable 72-county table
│       └── MethodologyFooter.tsx  # Statutory citations and agency source disclosures
└── tests/
    ├── taxCalculations.test.ts    # Mathematical correctness and division-by-zero tests
    ├── dataValidation.test.ts     # Invariant assertions across all 72 county records
    ├── colorScale.test.ts         # Threshold bin transitions and text contrast tests
    ├── colorScaleBounds.test.ts   # Continuous boundary values and negative stress tests
    ├── wiCountySvgPaths.test.ts   # SVG polygon geometry and centroid fuzzer
    ├── adversarialStress.test.ts  # Statutory Act 12 shared revenue expansion criteria
    ├── csvExport.test.ts          # CSV output schema verification
    └── scaffold.test.ts           # Entry point and import sanity checks
```

---

## Data Methodology & Statutory Sources

### 1. State Taxes Sent (Revenue Generated)
- **Net Individual Income Tax:** Wisconsin Department of Revenue (DOR) Individual Income Tax Statistics, aggregated by county of residence from filed Wisconsin individual returns (Wis. Stat. § 73.03).
- **State 5.0% Sales Tax:** Wisconsin DOR State and County Sales Tax Collections by county of transaction/collection (Wis. Stat. Ch. 77).
- *Methodology Note:* Corporate income taxes and excise taxes are omitted from county attribution to avoid speculative apportionment models.

### 2. State Aids Returned (Revenue Received)
- **Shared Revenue (County & Municipal Aid - CMA):** Wisconsin DOR Division of State and Local Finance annual distributions, incorporating 2023 Wisconsin Act 12 increases (Wis. Stat. §§ 25.49, 79.035, 79.036).
- **K-12 Public School Aids:** Wisconsin Department of Public Instruction (DPI) General Equalization and Categorical School Aid allocations aggregated to county boundaries (Wis. Stat. Ch. 121).
- **General Transportation Aids (GTA):** Wisconsin Department of Transportation (WisDOT) distributions to counties, cities, villages, and towns based on road mileage and local highway costs (Wis. Stat. § 86.30).
- **School Levy Tax Credit:** Wisconsin DOR Property Tax Credit distributions (Wis. Stat. § 79.10).

### 3. Core Formulas
$$\text{Total Taxes Sent}_c = \text{Income Tax}_c + \text{State Sales Tax (5\%)}_c$$

$$\text{Total Aids Returned}_c = \text{Shared Revenue}_c + \text{School Aids}_c + \text{Transportation Aids}_c + \text{Levy Credit}_c$$

$$\text{Return on State Tax Dollar}_c = \frac{\text{Total Aids Returned}_c}{\text{Total Taxes Sent}_c}$$

$$\text{Net Flow}_c = \text{Total Aids Returned}_c - \text{Total Taxes Sent}_c$$

$$\text{Net Flow Per Resident}_c = \frac{\text{Net Flow}_c}{\text{Population}_c}$$

- **Ratio > $1.00:** Net Recipient (Receives more state intergovernmental aid than direct personal state taxes contributed).
- **Ratio < $1.00:** Net Donor (Contributes more in state taxes than returned in core local aids).

---

## How to Update Data for Future Fiscal Years

All data is structured in `src/data/wiTaxData.ts`:
1. Open [`src/data/wiTaxData.ts`](src/data/wiTaxData.ts).
2. Each county record implements the `CountyRecord` interface from [`src/types/taxFlow.ts`](src/types/taxFlow.ts).
3. To add a new fiscal period or update figures:
   - Update `taxes.individualIncomeTax` and `taxes.stateSalesTax`.
   - Update `aids.sharedRevenue`, `aids.schoolAids`, `aids.transportationAids`, and `aids.schoolLevyTaxCredit`.
   - Recompute derived metrics using `calculateCountyMetrics` in [`src/utils/taxCalculations.ts`](src/utils/taxCalculations.ts).
4. Run `npm test` to verify all 128 invariant tests pass.

---

## Deployment

### Render (Active)
This repository includes a multi-stage `Dockerfile` and `render.yaml`.
- Pushing commits to branch `main` on GitHub triggers an automatic Docker build and deploy on Render.
- Live URL: [https://wi-tax-flow.onrender.com](https://wi-tax-flow.onrender.com)

### Alternative Static Hosting (GitHub Pages / Vercel / Netlify)
Because the app compiles to pure static HTML/CSS/JS in `dist/`, it can also be deployed to any static host:
```bash
npm run build
# The dist/ directory can be deployed directly to Cloudflare Pages, Vercel, or GitHub Pages
```

---

## License

This project is open-source software licensed under the [MIT License](LICENSE). Public finance data is compiled from public records published by the State of Wisconsin.
