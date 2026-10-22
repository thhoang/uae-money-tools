# Notes for review

Branch: `feature/expand-uae-tools`. Nothing was deployed; no wrangler/Cloudflare commands were run.

## What was added
- 7 new calculators: final settlement (end of service), leave encashment, notice period pay, overtime pay, annual leave days, VAT invoice (multi-line), monthly budget. Shared maths in `assets/calc.js`, unit-tested (`TESTS.md`).
- 7 new guides (each ~1,000 words, worked examples, FAQ): gratuity examples, unpaid leave and gratuity, resignation vs termination, final settlement checklist, probation rules, Ramadan working hours, VAT registration threshold. FAQs added to the three older guides.
- `/gratuity/` hub + 28 programmatic salary pages (AED 3,000 to 30,000). Each has its own numbers, comparison with neighbouring salaries and a worked example with different years of service.
- Hubs: `/guides/`, `/gratuity/`. Trust pages: Methodology, Disclaimer (About/Contact/Privacy kept).
- SEO: unique title and description per page, canonical, one H1, breadcrumbs (HTML + JSON-LD), FAQPage JSON-LD wherever a FAQ is shown (kept in sync, checked by `scripts/check.mjs`), Article on guides and tables, WebApplication on calculators, WebSite + Organization on home, CollectionPage on hubs, AboutPage/ContactPage/WebPage elsewhere, Open Graph and Twitter meta, sitemap.xml (56 URLs), robots.txt, 404.html, sources + "last checked 21 October 2026" on every content page.
- Empty ad slots (`<div class="ad-slot" data-slot="...">` with a comment). No ad code.
- Fixed an error in the existing gratuity guide: it said the 2-year cap is reached after "roughly 21 years"; the correct figure is about 25.8 years.

## Facts that need YOUR review
Checked on 21 October 2026 by reading the official pages listed on each page. I could not load some pages (marked below).

1. **Resignation and gratuity.** The existing site (calculator FAQ, guides) says resigning no longer reduces gratuity. The u.ae end-of-service page I read does not mention resignation at all. I kept the wording but flagged it on the resignation guide. Please verify against the consolidated Decree-Law text.
2. **Daily-wage divisors.** The sources say leave pay, overtime and notice pay are based on basic/last wage, but do not give the divisor. Calculators offer 30 days or 30.42 (365/12) and the page says so. Gratuity uses annual basic / 365 (the existing convention; the u.ae page says "21 days' salary" without a divisor).
3. **Notice shortfall allowance** is modelled as daily wage x unserved days. Article 43 says an allowance is owed; the exact amount rule was not confirmed.
4. **Annual leave under 6 months:** no accrual shown (sources silent). Pro rata for the last part-year is days/365 x 30 (my reading of "pro-rated"); the sources do not give a formula. Whether weekends/public holidays count within the 30 days is not stated.
5. **Probation notice** periods conflict between official pages (14 days vs one month). Left out on purpose. Also not confirmed: whether probation counts as service for gratuity.
6. **Ramadan:** the 2-hour reduction is confirmed on u.ae. The MOHRE 2026 notice page would not load for me; its headline and "flexible/remote work" statement come from a search listing. Verify it. Not answered by sources: whether hours beyond the reduced schedule count as overtime, and whether the reduction applies to all employees equally.
7. **VAT:** AED 375,000 / 187,500 and the 30-day forward-looking test are from the FTA registration page. The "30 days to apply for registration" is not on that page (it came from search results citing FTA terms/Cabinet Decision 52 of 2017), so it is flagged on the page. Zero-rated vs exempt examples and tax-invoice requirements are deliberately not listed.
8. **Contract duration:** the original Article 8 said fixed-term contracts could not exceed 3 years; later amendments may have removed the cap. I did not state any cap anywhere. The existing contracts guide was not rewritten; please review it (it predates this work).
9. **Salary calculator** (existing): the 5% GPSSA pension contribution for UAE nationals was not re-verified. The page now links GPSSA and says to confirm it. The existing VAT guide (tourist refunds etc.) and the existing salary/VAT FAQ content were also not re-verified.
10. **Contact page** (existing) quotes MOHRE "80060" and the old guide also mentions a MOHRE hotline. I did not verify the number; I avoided adding it to new pages.
11. **"Extra" statements in the existing pages** such as "Cabinet Resolution No. 1 of 2022, Article 30" were confirmed (part-time gratuity). The savings scheme percentages (5.83% / 8.33%) were confirmed on u.ae.
12. **Unpaid leave:** "absence without pay" is the official wording; I do not classify specific leave types (sick, etc.).

## Skipped
- **UAE labour contract types guide:** the existing "limited vs unlimited contracts" guide already covers it and I could not confirm the current duration rules (see 8). Not duplicated.
- **Visa / Emirates ID checklist guide:** I found no official source I could cite in this session (ICP/GDRFA pages not read). Skipped rather than guess.
- **Extending the gratuity calculator with a "contract type" selector:** the official gratuity formula does not depend on contract type, so a selector would invent a difference. The final settlement calculator and a note explain this instead.
- The three older guides are still under 800 words. Expanding them needs fact checks (see 8, 9).
- Mobile layout was only checked via a headless screenshot; please open the site on a phone.

## Other things to know
- **Thin-page risk:** the 28 gratuity table pages are templated (computed numbers, different examples and comparisons, but similar structure). If Search Console shows them as "crawled, not indexed", keep a subset (e.g. 3,000 / 5,000 / 8,000 / 10,000 / 15,000 / 20,000 / 30,000) and add `noindex` to the rest.
- **Contact email:** mailto is not included because I did not want to publish your email without your say-so. Set `CONTACT_EMAIL` when building (see README) or edit `contact.html`.
- **Domain:** canonical URLs and sitemap use `https://uae-money-tools.pages.dev`. Change `BASE` in `scripts/lib/layout.mjs` if you add a custom domain.
- Ad slots exist on every content page (top and bottom). Add ad code only after approval; also update the Privacy page (it already mentions advertising).
- After merging, run `node scripts/build.mjs` again only if you change content; the generated HTML is committed.
