# E2E Test Infra: Wisconsin Tax Flow Web Application

## Test Philosophy
- Opaque-box, requirement-driven derived from `ORIGINAL_REQUEST.md`.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial + Real-World Workload Testing.
- Zero reliance on internal component implementations.

## Feature Inventory Test Coverage
| # | Feature | Source (Requirement) | Tier 1 (Isolated) | Tier 2 (Boundary/Edge) | Tier 3 (Cross-Feature) | Tier 4 (Real-World) |
|---|---------|---------------------|:-----------------:|:----------------------:|:----------------------:|:-------------------:|
| 1 | 72 County Invariant Schema | R1, AC | 5 | 5 | ✓ | ✓ |
| 2 | Tax Collections Calculation | R1, AC | 5 | 5 | ✓ | ✓ |
| 3 | Aid Distributions Calculation | R1, AC | 5 | 5 | ✓ | ✓ |
| 4 | Return on Dollar & Net Flow Math | R1, AC | 5 | 5 | ✓ | ✓ |
| 5 | Act 12 Dual Baseline Support | R1, AC | 5 | 5 | ✓ | ✓ |
| 6 | Diverging Color Scale & Legend | R2, AC | 5 | 5 | ✓ | ✓ |
| 7 | Metric & Baseline Toggles | R2, AC | 5 | 5 | ✓ | ✓ |
| 8 | County Selection & Inspector | R3, AC | 5 | 5 | ✓ | ✓ |
| 9 | Side-by-Side Comparison (Milwaukee vs Any) | R3, AC | 5 | 5 | ✓ | ✓ |
| 10 | Educational Modules (4 Topics) | R4, AC | 5 | 5 | ✓ | ✓ |
| 11 | Sortable/Searchable Data Table | R4, AC | 5 | 5 | ✓ | ✓ |
| 12 | CSV Download Export Format | R4, AC | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test runner: Vitest (`npm run test`)
- Assertion mechanism: Node assertion / Vitest `expect`
- Directory layout: `tests/`
  - `tests/taxCalculations.test.ts` (Tier 1 & 2 formulas)
  - `tests/dataValidation.test.ts` (72-county schema, invariants, Act 12 baseline)
  - `tests/colorScale.test.ts` (Diverging scale, edge bins, neutral midpoint)
  - `tests/csvExport.test.ts` (RFC 4180 CSV generation & parsing)
  - `tests/e2eUserScenarios.test.ts` (Tiers 3, 4, 5 cross-feature workflows & stress)

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Urban Core Donor Analysis: Milwaukee vs Suburban Waukesha | F1, F4, F5, F8, F9, F11 | High |
| 2 | High-Return Rural Recipient Analysis: Menominee & Forest | F1, F4, F5, F8, F11 | High |
| 3 | Tourism Hub Sales Tax Dynamics: Door & Vilas Counties | F2, F3, F4, F7, F11 | Medium |
| 4 | State Capital / High Income Donor: Dane County | F2, F3, F4, F5, F9, F11 | Medium |
| 5 | Act 12 Reform Shift: Comparing statewide net change and county shifts | F3, F5, F7, F9, F10 | High |

## Coverage Thresholds
- Tier 1: >=60 test cases covering representative happy paths across all features
- Tier 2: >=60 test cases covering boundaries, zero checks, extremes (Menominee, Ozaukee, Waukesha)
- Tier 3: >=15 pairwise cross-feature tests
- Tier 4: >=5 realistic civic application scenarios
- Tier 5: Adversarial edge cases and stress testing
