# Expansion plan - feature/expand-uae-tools

## Existing state (Step 1 summary)
- 17 tracked files, ~70 KB. Plain static HTML + one CSS file, no build, no framework.
- Pages: home, 3 calculators (gratuity, VAT, salary; inline JS), 3 guides, about, contact, privacy, 404, sitemap.xml, robots.txt, `_headers`.
- Header/footer are copy-pasted in every page; only the gratuity page has FAQ JSON-LD; no breadcrumbs markup beyond a text trail; no source/"last checked" footers; no Methodology/Disclaimer pages.

## Approach
- Dependency-free Node script `scripts/build.mjs` (Node is only a dev tool; the deployed site is still plain static files committed to git, so Cloudflare Pages needs no build step).
- Calculation logic lives in one pure file `assets/calc.js` (used by the pages in the browser AND by `scripts/test.mjs` and the programmatic table generator, so tables and calculators can never disagree).
- Existing hand-written pages stay; the build only swaps the shared header/footer and appends a Sources/last-checked block.

## New pages
Calculators: leave-encashment, notice-period-pay, overtime-pay, annual-leave-days, end-of-service (final settlement: gratuity + leave + notice + unpaid wages), vat-invoice-calculator (multi-line), monthly-budget.
Guides: gratuity-examples, unpaid-leave-and-gratuity, resignation-vs-termination, final-settlement-checklist, vat-registration-threshold, probation-rules, ramadan-working-hours. (Contract types: existing guide kept. Visa/Emirates ID checklist: skipped, no verified official source - see NOTES.md.)
Programmatic: /gratuity/ index + /gratuity/salary-3000 ... salary-30000 (28 pages), each with computed, salary-specific text.
Hubs: /guides/, /gratuity/. Trust: methodology, disclaimer (about/contact/privacy updated).
SEO: unique title/description, canonical, breadcrumbs JSON-LD, FAQ JSON-LD, sitemap, robots, 404.
Checks: scripts/test.mjs (TESTS.md), scripts/check.mjs (links, titles, h1, canonicals).
