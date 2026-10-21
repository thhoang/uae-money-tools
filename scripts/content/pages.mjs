// Programmatic gratuity tables, hubs, home, methodology and disclaimer pages.
import { createRequire } from 'node:module';
import { SRC, TOOLS, GUIDES, esc, adSlot, footer, header, LAST_CHECKED, LAST_CHECKED_ISO, BASE } from '../lib/layout.mjs';
import { n0, n2 } from './guides1.mjs';
const C = createRequire(import.meta.url)('../../assets/calc.js');

export const SALARIES = Array.from({ length: 28 }, (_, i) => 3000 + i * 1000);
const YEARS = Array.from({ length: 30 }, (_, i) => i + 1);

// Each salary page gets its own example (years vary by position) and its own computed comparisons.
const EXAMPLE_YEARS = [2.5, 4, 6.25, 8, 3.75, 11, 7.5, 5.5, 9.25, 14, 6, 3, 10.5, 12.75, 4.5, 16, 7, 2, 13, 8.5, 5, 18, 9, 3.25, 20, 6.75, 15, 10];
const LEAD = [
  (s, d, g1, g5) => `On a basic salary of AED ${n0(s)} a month, one year of service earns AED ${n0(g1)} in end-of-service gratuity, and five years earn AED ${n0(g5)}.`,
  (s, d, g1, g5) => `Your daily wage for gratuity purposes at AED ${n0(s)} basic is AED ${n2(d)}. That one number drives every figure on this page: 21 of those days per year for the first five years, 30 after.`,
  (s, d, g1, g5) => `If your payslip shows AED ${n0(s)} as basic pay, your gratuity after five years is AED ${n0(g5)}, which is ${(g5 / s).toFixed(2)} months of basic salary.`,
  (s, d, g1, g5) => `Planning to leave a job paying AED ${n0(s)} basic? After one year you are owed about AED ${n0(g1)}; after five, AED ${n0(g5)}. The table below runs to 30 years.`
];

export function gratuityPage(s, idx) {
  const d = s * 12 / 365, g = y => C.gratuity(s, y);
  const ey = EXAMPLE_YEARS[idx % EXAMPLE_YEARS.length], ex = g(ey);
  const rows = YEARS.map(y => `<tr><th>${y}</th><td>${n0(g(y).days1 + g(y).days2)}</td><td>${n2(g(y).total)}</td></tr>`).join('\n');
  const next = SALARIES[idx + 1], prev = SALARIES[idx - 1];
  const g10 = g(10).total, g20 = g(20).total, cap = s * 24;
  const diff1000 = C.gratuity(s + 1000, 5).total - g(5).total;
  const faqs = [
    [`How much is gratuity on AED ${n0(s)} basic salary?`, `After 1 year: AED ${n2(g(1).total)}. After 5 years: AED ${n2(g(5).total)}. After 10 years: AED ${n2(g10)}. See the full table above.`],
    [`What is the daily wage at AED ${n0(s)} basic?`, `AED ${n2(d)}: ${n0(s)} &times; 12 &divide; 365.`],
    [`Is there a maximum for AED ${n0(s)} basic?`, `The cap is two years' wages: AED ${n0(cap)}. It is reached after about ${C.capYear(s).toFixed(1)} years of service.`]
  ];
  const body = `<p>${LEAD[idx % 4](s, d, g(1).total, g(5).total)} These figures apply the Article 51 formula used by the UAE Government Portal: 21 days of basic pay per year for the first five years, 30 days per year after that, capped at two years' wages, and nothing for less than one year of continuous service.</p>
<h2>Gratuity at AED ${n0(s)} basic, year by year</h2>
<div class="tablewrap"><table><thead><tr><th>Years of service</th><th>Days of wages</th><th>Gratuity (AED)</th></tr></thead><tbody>
${rows}
</tbody></table></div>
<p>Daily wage used: AED ${n2(d)} (${n0(s)} &times; 12 &divide; 365). Whole years only; part-years are paid pro rata, so use the <a href="/gratuity-calculator">gratuity calculator</a> for exact dates.</p>
<h2>What these numbers tell you at AED ${n0(s)}</h2>
<ul>
<li>The first five years add AED ${n2(d * 21)} each. After year five, each extra year adds AED ${n2(d * 30)}.</li>
<li>Ten years of service pays AED ${n0(g10)} (${(g10 / s).toFixed(1)} months of basic). Twenty years pays AED ${n0(g20)} (${(g20 / s).toFixed(1)} months).</li>
<li>The cap (two years of wages) is AED ${n0(cap)}; it is reached at about ${C.capYear(s).toFixed(1)} years of service.</li>
<li>${next ? `Each extra AED 1,000 of basic adds roughly AED ${n0(diff1000)} to a five-year payout. At AED ${n0(next)} basic, five years pays AED ${n0(C.gratuity(next, 5).total)}.` : `No higher band is shown on this site; use the calculator for other salaries.`}${prev ? ` At AED ${n0(prev)} basic it pays AED ${n0(C.gratuity(prev, 5).total)}.` : ''}</li>
</ul>
<h2>Worked example: AED ${n0(s)} basic, ${ey} years</h2>
<ol>
<li>Daily wage = ${n0(s)} &times; 12 &divide; 365 = AED ${n2(d)}.</li>
<li>First ${Math.min(ey, 5)} year${Math.min(ey, 5) === 1 ? '' : 's'} at 21 days = ${(Math.min(ey, 5) * 21).toFixed(1).replace(/\.0$/, '')} days = AED ${n2(ex.part1)}.</li>
${ey > 5 ? `<li>Remaining ${(ey - 5)} year${ey - 5 === 1 ? '' : 's'} at 30 days = ${((ey - 5) * 30).toFixed(1).replace(/\.0$/, '')} days = AED ${n2(ex.part2)}.</li>` : ''}
<li>Total gratuity = <strong>AED ${n2(ex.total)}</strong>.</li>
</ol>
<h2>Check before you rely on this</h2>
<p>Use <em>basic</em> salary only, not housing or transport allowances. Remove any unpaid leave days from your service. DIFC and some free zones, part-time work models and UAE nationals follow different rules; see the <a href="/methodology">methodology</a>. Your employer must pay final dues, including gratuity, within 14 days of the end of the contract. For leave pay and notice, use the <a href="/end-of-service-calculator">final settlement calculator</a>.</p>`;
  return {
    path: `/gratuity/salary-${s}`,
    title: `Gratuity for AED ${n0(s)} Basic Salary in the UAE - Table by Years`,
    description: `UAE end-of-service gratuity for a basic salary of AED ${n0(s)}: AED ${n0(g(1).total)} after 1 year, AED ${n0(g(5).total)} after 5, AED ${n0(g10)} after 10. Full table and worked example.`,
    h1: `Gratuity for AED ${n0(s)} basic salary (UAE)`,
    nav: 'tables',
    crumbs: [['Home', '/'], ['Gratuity tables', '/gratuity/'], [`AED ${n0(s)}`, `/gratuity/salary-${s}`]],
    body, faqs,
    sources: [SRC.eos, SRC.law],
    related: [['Gratuity calculator (exact dates)', '/gratuity-calculator'], ['Final settlement calculator', '/end-of-service-calculator'], ['Gratuity examples', '/guides/gratuity-examples'], ...(prev ? [[`Gratuity at AED ${n0(prev)} basic`, `/gratuity/salary-${prev}`]] : []), ...(next ? [[`Gratuity at AED ${n0(next)} basic`, `/gratuity/salary-${next}`]] : [])]
  };
}

export function gratuityHub() {
  const rows = SALARIES.map(s => `<tr><th><a href="/gratuity/salary-${s}">AED ${n0(s)}</a></th><td>${n0(C.gratuity(s, 1).total)}</td><td>${n0(C.gratuity(s, 3).total)}</td><td>${n0(C.gratuity(s, 5).total)}</td><td>${n0(C.gratuity(s, 10).total)}</td><td>${n0(C.gratuity(s, 15).total)}</td></tr>`).join('\n');
  return {
    path: '/gratuity/',
    title: 'UAE Gratuity Tables by Basic Salary - AED 3,000 to 30,000',
    description: 'Pre-computed UAE end-of-service gratuity for basic salaries from AED 3,000 to AED 30,000 at 1, 3, 5, 10 and 15 years, with a full year-by-year table for each salary.',
    h1: 'UAE gratuity tables by basic salary',
    items: SALARIES.map(s => [`Gratuity for AED ${n0(s)} basic salary`, `/gratuity/salary-${s}`]),
    nav: 'tables',
    crumbs: [['Home', '/'], ['Gratuity tables', '/gratuity/']],
    intro: `<p>Find your <strong>basic</strong> monthly salary and read across to see your end-of-service gratuity at 1, 3, 5, 10 and 15 years. Each salary links to a full year-by-year table and a worked example. For exact dates, unpaid leave and part-years, use the <a href="/gratuity-calculator">gratuity calculator</a>.</p>`,
    body: `<div class="tablewrap"><table><thead><tr><th>Basic salary</th><th>1 yr</th><th>3 yrs</th><th>5 yrs</th><th>10 yrs</th><th>15 yrs</th></tr></thead><tbody>
${rows}
</tbody></table></div>
<p>All values in AED, rounded to the nearest dirham, computed with the Article 51 formula: 21 days of basic pay per year for the first 5 years and 30 days per year after, capped at two years' wages. See the <a href="/methodology">methodology</a> and the <a href="/guides/how-gratuity-is-calculated">full guide</a>.</p>`,
    sources: [SRC.eos, SRC.law],
    related: [['Gratuity calculator', '/gratuity-calculator'], ['Gratuity examples', '/guides/gratuity-examples'], ['Final settlement calculator', '/end-of-service-calculator']]
  };
}

export function guidesHub() {
  return {
    path: '/guides/',
    title: 'UAE Money and Employment Guides - Gratuity, Leave, VAT',
    description: 'Plain-English UAE guides with worked examples: gratuity, unpaid leave, resignation vs termination, final settlement, probation, Ramadan hours and VAT.',
    h1: 'UAE money and employment guides',
    items: GUIDES.map(g => [g.name, g.path]),
    nav: 'guides',
    crumbs: [['Home', '/'], ['Guides', '/guides/']],
    intro: `<p>Each guide explains one rule, shows the arithmetic, and links the official source it came from. Pair them with the <a href="/#tools">calculators</a>.</p>`,
    body: `<ul class="cardlist">${GUIDES.map(g => `<li><a href="${g.path}"><strong>${esc(g.name)}</strong></a><br><span>${esc(g.blurb)}</span></li>`).join('\n')}</ul>`,
    sources: [SRC.eos, SRC.term, SRC.vatreg],
    related: [['Gratuity tables', '/gratuity/'], ['Final settlement calculator', '/end-of-service-calculator']]
  };
}

export function homePage() {
  const grp = (title, items) => `<h2>${title}</h2><div class="grid">${items.map(t => `<div class="card"><h3><a href="${t.path}">${esc(t.name)}</a></h3><p>${esc(t.blurb)}</p></div>`).join('')}</div>`;
  const pick = ps => TOOLS.filter(t => ps.includes(t.path));
  return {
    path: '/',
    title: 'UAE Money Tools - Free Gratuity, VAT, Salary and Leave Calculators',
    description: 'Free UAE calculators and guides: end-of-service gratuity, final settlement, leave pay, overtime, notice pay, VAT invoices, salary and budget. Fast, private, no sign-up.',
    h1: 'Free money calculators and guides for life and work in the UAE',
    nav: '',
    crumbs: [['Home', '/']],
    home: true,
    intro: `<p>Work out your end-of-service gratuity, final settlement, leave pay, overtime and VAT. Every calculator runs in your browser: nothing you type is sent anywhere, and the formulas are shown on the <a href="/methodology">methodology page</a>.</p>`,
    body: `<div id="tools"></div>
${grp('Leaving a job: gratuity and final pay', pick(['/gratuity-calculator', '/end-of-service-calculator', '/leave-encashment-calculator', '/notice-period-pay-calculator']))}
${grp('Working in the UAE: pay and leave', pick(['/overtime-pay-calculator', '/annual-leave-calculator', '/salary-calculator', '/monthly-budget-calculator']))}
${grp('Business: VAT', pick(['/vat-calculator', '/vat-invoice-calculator']))}
<h2 id="guides">Guides</h2>
<ul class="cardlist">${GUIDES.map(g => `<li><a href="${g.path}"><strong>${esc(g.name)}</strong></a><br><span>${esc(g.blurb)}</span></li>`).join('\n')}</ul>
<h2>Gratuity tables</h2>
<p>Pre-computed payouts for basic salaries from AED 3,000 to AED 30,000: <a href="/gratuity/">see the gratuity tables</a>.</p>
<h2>Why these tools</h2>
<p>Each rule comes from a published UAE government source (the UAE Government Portal, MOHRE, the Federal Tax Authority), is cited on the page with a "last checked" date, and is applied in a way you can follow step by step. Where the official pages do not give a figure, we say so rather than guess.</p>`,
    sources: [SRC.eos, SRC.leave, SRC.hours, SRC.vatreg],
    related: []
  };
}

export function methodologyPage() {
  return {
    path: '/methodology',
    title: 'Methodology - Formulas Used by UAE Money Tools',
    description: 'The exact formulas behind every UAE Money Tools calculator: gratuity, leave pay, notice allowance, overtime, annual leave accrual and VAT, with assumptions stated.',
    h1: 'Methodology: formulas and assumptions',
    nav: 'method',
    crumbs: [['Home', '/'], ['Methodology', '/methodology']],
    intro: `<p>This page lists every formula used on the site so you can check it. The same code (<a href="/assets/calc.js">assets/calc.js</a>) powers the calculators and the pre-computed tables, and it is tested against hand-calculated examples. Where an official source does not fix a convention, the page says so and the calculator lets you choose.</p>`,
    body: `<h2>Gratuity (Article 51, Federal Decree-Law No. 33 of 2021)</h2>
<ul>
<li>Service years = (days from first to last day &minus; unpaid-leave days) &divide; 365.</li>
<li>Less than 1 year: gratuity = 0.</li>
<li>Daily wage = basic monthly salary &times; 12 &divide; 365.</li>
<li>Gratuity = daily wage &times; (21 &times; min(years, 5) + 30 &times; max(years &minus; 5, 0)).</li>
<li>Cap: gratuity cannot exceed 24 &times; basic monthly salary (two years' wages). The cap is reached at 5 + (730 &minus; 105) &divide; 30 = about 25.83 years of service, whatever the salary.</li>
</ul>
<p><strong>Assumption:</strong> the official sources say gratuity uses basic salary and a daily wage; the 365-day divisor is our convention. Part-years are pro rata. Part-time work models (full-time gratuity &times; contracted hours &divide; full-time hours) are not modelled in the calculator.</p>
<h2>Unused annual leave</h2>
<p>Pay = (basic monthly salary &divide; D) &times; unused days, where D is 30 or 30.42 (365 &divide; 12). The sources specify basic salary but not D, so both choices are offered.</p>
<h2>Annual leave accrual</h2>
<ul>
<li>Under 6 months: no accrual shown (not stated in the pages we use).</li>
<li>6 to 12 months: 2 days &times; completed months of service.</li>
<li>1 year or more: 30 days &times; service days &divide; 365.</li>
</ul>
<h2>Notice allowance</h2>
<p>Allowance = (monthly wage &divide; D) &times; max(required notice days &minus; days served, 0). Article 43 sets notice at 30 to 90 days with full wages during the period and an allowance for the unserved part; the per-day conversion is our simplification.</p>
<h2>Overtime</h2>
<p>Hourly rate = basic &divide; D &divide; normal hours per day. Daytime overtime = hours &times; hourly rate &times; 1.25. Overtime from 10 pm to 4 am and work on an off-day (if paid instead of a substitute rest day) = hours &times; hourly rate &times; 1.5. These multipliers come from the UAE Government Portal's working-hours page.</p>
<h2>VAT</h2>
<ul>
<li>Add VAT: VAT = net &times; rate; gross = net + VAT.</li>
<li>Remove VAT: net = gross &divide; (1 + rate); VAT = gross &minus; net.</li>
<li>Invoice lines: net = quantity &times; unit price, rounded to the nearest fils; VAT = net &times; rate on standard lines, nil on zero-rated and exempt lines.</li>
<li>Standard rate: 5% (Federal Tax Authority).</li>
</ul>
<h2>Rounding</h2>
<p>Intermediate values are not rounded; results are displayed to two decimals (except per-line invoice VAT, which is rounded per line). Differences of a few fils against an employer's figure usually come from the daily-wage divisor or rounding.</p>
<h2>Testing</h2>
<p>The repository contains <code>TESTS.md</code> with hand-computed examples and a script that checks the code against them.</p>`,
    sources: [SRC.eos, SRC.leave, SRC.term, SRC.hours, SRC.vat, SRC.law],
    related: [['Gratuity calculator', '/gratuity-calculator'], ['Disclaimer', '/disclaimer']]
  };
}

export function disclaimerPage() {
  return {
    path: '/disclaimer',
    title: 'Disclaimer - Not Legal, Tax or Financial Advice',
    description: 'UAE Money Tools provides estimates for general information only. Not legal, tax or financial advice. Read what the calculators can and cannot tell you.',
    h1: 'Disclaimer',
    nav: '',
    crumbs: [['Home', '/'], ['Disclaimer', '/disclaimer']],
    intro: `<p><strong>This site is not legal advice.</strong> UAE Money Tools is an independent site that provides calculators and guides for general information only. It is not a law firm, a tax adviser, a government body or a financial adviser, and it is not affiliated with MOHRE, the Federal Tax Authority or any other authority.</p>`,
    body: `<h2>Estimates only</h2>
<p>Calculators give estimates based on rules as we understand them from the official sources linked on each page. Your actual entitlement depends on your contract, your employer's policies, your free zone, and the facts of your case. Results can differ from what your employer or a court decides.</p>
<h2>Laws change</h2>
<p>Each page shows the date its sources were last checked. Laws, fees and ministry guidance change, and we may not have updated a page yet. Confirm anything important with the linked official source before you rely on it.</p>
<h2>Where we are unsure</h2>
<p>When official pages disagree or do not give a figure, we say so and leave the figure out instead of guessing. If you spot an error, please <a href="/contact">tell us</a>.</p>
<h2>Who it does not cover</h2>
<p>Gratuity pages are written for full-time private-sector expatriate employees under Federal Decree-Law No. 33 of 2021. DIFC, some other free zones, government employees, domestic workers and UAE nationals may be covered by different rules.</p>
<h2>No liability</h2>
<p>To the extent permitted by law, we accept no liability for loss arising from use of this site. Links to external sites are provided for convenience; we do not control their content.</p>
<h2>Advertising</h2>
<p>The site may show advertising in future. Ads will be clearly separate from content and will never change a calculation.</p>`,
    sources: [],
    related: [['Methodology', '/methodology'], ['Privacy', '/privacy'], ['Contact', '/contact']]
  };
}
