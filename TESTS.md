# Tests

Run all checks (PowerShell, one at a time):

    node scripts/test.mjs      # calculator maths vs hand-computed values
    node scripts/build.mjs     # regenerate pages
    node scripts/check.mjs     # links, titles, descriptions, h1, canonicals, schema, sitemap

Last run: 21 October 2026 - `test.mjs`: all pass; `check.mjs`: 57 pages, 2,474 internal links, 0 errors (3 warnings: the three older guides are under 800 words).

## Hand-computed examples (assets/calc.js)

Daily wage = basic x 12 / 365.

| Case | Hand calculation | Result |
|---|---|---|
| Gratuity, basic 6,000, 7.25 yrs | d = 197.2603; 105 d + 67.5 d = 172.5 d x 197.2603 | 34,027.40 |
| Gratuity, basic 3,000, 1 yr | d = 98.6301; 21 x 98.6301 | 2,071.23 |
| Gratuity, basic 10,000, 5 yrs | d = 328.7671; 105 x 328.7671 | 34,520.55 |
| Cap, basic 6,000, 30 yrs | uncapped 855 d x 197.2603 = 168,657 > 24 x 6,000 | 144,000 |
| Cap year | 5 + (730 - 105) / 30 | 25.833 yrs |
| Under 1 year (0.9) | no gratuity | 0 |
| 1 yr minus 100 unpaid days | 265 days < 365 | 0 |
| Dates 2020-01-01 to 2025-01-01, basic 5,000 | 1,827 days = 5.0055 yrs; d x (105 + 30 x 0.0055) | 17,287.30 |
| Leave pay, basic 5,000, 12 days, /30 | 5,000 / 30 x 12 | 2,000.00 |
| Notice allowance, wage 9,000, 30 required, 10 served | 9,000 / 30 x 20 | 6,000.00 |
| Overtime, basic 6,000, 4 h day + 2 h night + 1 h off-day | hourly 25; 4 x 25 x 1.25 + 2 x 25 x 1.5 + 1 x 25 x 1.5 | 237.50 |
| Annual leave 1 Jan 2025 to 1 Jul 2026 | 546 / 365 x 30 | 44.88 days |
| Annual leave 6 completed months | 6 x 2 | 12 days |
| Invoice: 10 x 250 std, 4 x 120 zero, 1 x 99.99 exempt | net 3,079.99; VAT 125; gross 3,204.99 | matches |
| Budget 15,000 income, 9,000 spent | 6,000 left, 40% | matches |

## Browser checks (headless Edge, real DOM)

Each calculator page was loaded, inputs filled and `input` events fired; the displayed total was compared with the hand values:
gratuity (34,039.56 for 6,000 basic, 1 Jan 2017 - 1 Apr 2024), leave encashment 2,000.00, notice 6,000.00, overtime 237.50, annual leave 34.88 days remaining (10 taken), final settlement 46,195.13 (basic 8,000, 1 Jan 2019 - 31 Dec 2024, 10 leave days, 8,000 wages), VAT invoice 3,105.00, budget 6,000.00, VAT calculator 1,050.00, salary 10,000.00. All passed. The harness is a throwaway script outside the repo.

## Not tested
- Mobile layout was only eyeballed in a headless screenshot (Edge's minimum window width is wider than a phone).
- No automated check of the *legal content* - see NOTES.md for the facts to review.
