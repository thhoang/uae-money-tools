// New calculator pages. Maths lives in assets/calc.js; DOM wiring in assets/tools.js.
import { SRC, field, row2, resultBox, DIVISOR_SELECT } from '../lib/layout.mjs';

const SCRIPTS = ['/assets/calc.js', '/assets/tools.js'];
const crumbsFor = (name, path) => [['Home', '/'], ['Calculators', '/#tools'], [name, path]];
const toolWrap = (kind, inner, disclaimer) => `<div class="tool" data-tool="${kind}">
${inner}
<p class="disclaimer">${disclaimer}</p>
</div>`;
const DIV_HINT = 'The official sources say pay is based on basic salary but do not fix the daily divisor, so you can choose. Check what your contract or MOHRE says for your case.';

export const toolPages = [];

// ---------- Leave encashment ----------
toolPages.push({
  path: '/leave-encashment-calculator',
  title: 'UAE Leave Encashment Calculator - Pay for Unused Annual Leave',
  description: 'Free UAE calculator for unused annual leave pay. Enter basic salary and unused days to see the cash value paid at the end of employment.',
  h1: 'UAE leave encashment calculator',
  nav: 'tools', scripts: SCRIPTS,
  crumbs: crumbsFor('Leave encashment calculator', '/leave-encashment-calculator'),
  intro: `<p>When your job ends, your employer must pay you for annual leave you did not take. This calculator turns your unused days into a cash figure using your <strong>basic salary</strong>, which is the basis the UAE Government Portal gives for this payment.</p>`,
  tool: toolWrap('leave', `
${row2(field('basic', 'Basic monthly salary (AED)', { ph: 'e.g. 6000', hint: 'Basic pay only, without allowances.' }), field('unused', 'Unused leave days', { ph: 'e.g. 12', hint: 'Include leave accrued for the part of the year you worked.' }))}
${field('divisor', 'Days per month used for the daily rate', { select: DIVISOR_SELECT, hint: DIV_HINT })}
${resultBox([['Unused days', 'r-days'], ['Daily rate (basic &divide; divisor)', 'r-daily']])}`,
    'Estimate only. The number of days you are owed depends on your contract, your service period and what you already took. Use the <a href="/annual-leave-calculator">annual leave days calculator</a> to work out your balance.'),
  body: `<h2>How the calculation works</h2>
<p>Daily rate = basic monthly salary &divide; days per month. Leave pay = daily rate &times; unused days. For a basic salary of AED 6,000 and 12 unused days at 30 days per month: 6,000 &divide; 30 = AED 200 per day, and 200 &times; 12 = <strong>AED 2,400</strong>.</p>
<h2>What the official sources say</h2>
<ul>
<li>On termination, the employee is paid for unused annual leave regardless of its duration.</li>
<li>Leave accrued for the part of the year worked is also paid.</li>
<li>The payment is calculated on the basis of basic salary.</li>
</ul>
<p>Which divisor your employer uses (30 days, or annual salary &divide; 365) is not set out in the pages we rely on, so both are offered. The difference is small but real: on AED 6,000 and 12 days it is about AED 31.</p>`,
  faqs: [
    ['Do I get paid for unused annual leave when I resign?', 'The UAE Government Portal says the employee is paid for unused annual leave on termination of employment, whatever the duration of the unused leave. That covers the end of the contract in general; see our <a href="/guides/final-settlement-checklist">final settlement checklist</a>.'],
    ['Is leave pay based on basic or total salary?', 'The UAE Government Portal says it is calculated on the basis of basic salary.'],
    ['Can I carry unused leave into next year?', 'With the employer\'s consent, unused leave can be carried over to the following year, according to the UAE Government Portal.']
  ],
  sources: [SRC.leave, SRC.law],
  related: [['Annual leave days calculator', '/annual-leave-calculator'], ['Final settlement calculator', '/end-of-service-calculator'], ['Final settlement checklist', '/guides/final-settlement-checklist']],
  app: true
});

// ---------- Notice period pay ----------
toolPages.push({
  path: '/notice-period-pay-calculator',
  title: 'UAE Notice Period Pay Calculator - Allowance for Unserved Notice',
  description: 'Free UAE notice period calculator. Work out the allowance for notice days not served, based on your last wage and the 30 to 90 day notice rule.',
  h1: 'UAE notice period pay calculator',
  nav: 'tools', scripts: SCRIPTS,
  crumbs: crumbsFor('Notice period pay calculator', '/notice-period-pay-calculator'),
  intro: `<p>Under Article 43 of the UAE Labour Law, either side ending a contract must give written notice of <strong>at least 30 and at most 90 days</strong>, and the worker is paid full wages during it. If a party does not serve the full notice, it owes the other side a notice-period allowance. This tool estimates that allowance for the days not served.</p>`,
  tool: toolWrap('notice', `
${row2(field('wage', 'Last monthly wage (AED)', { ph: 'e.g. 9000', hint: 'The worker\'s most recent wage.' }), field('divisor', 'Days per month used for the daily rate', { select: DIVISOR_SELECT, hint: DIV_HINT }))}
${row2(field('required', 'Notice period required (days)', { value: 30, hint: 'Your contract sets this within the 30 to 90 day range.' }), field('served', 'Notice days actually served', { value: 0 }))}
${resultBox([['Monthly wage', 'r-wage'], ['Daily rate', 'r-daily'], ['Unserved notice days', 'r-short']])}`,
    'Estimate only. The exact allowance, and who owes it, depends on your contract and the circumstances. Confirm with MOHRE.'),
  body: `<h2>How it is calculated</h2>
<p>Daily rate = last monthly wage &divide; days per month. Allowance = daily rate &times; unserved notice days. Example: wage AED 9,000, 30 days required, 10 days served. The daily rate is 9,000 &divide; 30 = AED 300, there are 20 unserved days, so the allowance is 20 &times; 300 = <strong>AED 6,000</strong>.</p>
<h2>What Article 43 and the UAE Government Portal say</h2>
<ul>
<li>Notice must be in writing, between 30 and 90 days, and the contract stays in force until it ends.</li>
<li>The worker receives full wages during the notice period, based on the most recent wage.</li>
<li>A party that does not serve the full notice owes the other an allowance, even if no harm resulted.</li>
<li>When the employer ends the contract, the worker gets one unpaid day per week to look for a new job, declared at least 3 days in advance.</li>
</ul>
<p>Notice rules during probation are described differently across official pages, so this tool does not model them. See our <a href="/guides/probation-rules">probation guide</a> for what we could confirm.</p>`,
  faqs: [
    ['How long is the notice period in the UAE?', 'Between 30 and 90 days under Article 43 of Federal Decree-Law No. 33 of 2021. The exact length is in your contract.'],
    ['Am I paid during my notice period?', 'Yes. The UAE Government Portal says the worker receives the full wage during the notice period.'],
    ['What if I leave without serving notice?', 'A party that does not serve the full notice owes the other a notice-period allowance. For a resignation, an employee who leaves early to join another employer may also face a work-permit ban if it falls in probation; see <a href="/guides/resignation-vs-termination">resignation vs termination</a>.']
  ],
  sources: [SRC.term, SRC.law],
  related: [['Resignation vs termination', '/guides/resignation-vs-termination'], ['Final settlement calculator', '/end-of-service-calculator'], ['Probation rules', '/guides/probation-rules']],
  app: true
});

// ---------- Overtime ----------
toolPages.push({
  path: '/overtime-pay-calculator',
  title: 'UAE Overtime Pay Calculator - 25% and 50% Rates Explained',
  description: 'Free UAE overtime calculator using the official rates: normal hourly pay plus 25%, plus 50% for 10pm to 4am and for off-day work.',
  h1: 'UAE overtime pay calculator',
  nav: 'tools', scripts: SCRIPTS,
  crumbs: crumbsFor('Overtime pay calculator', '/overtime-pay-calculator'),
  intro: `<p>Enter your basic salary and the extra hours you worked. Overtime is paid at your normal hourly rate (based on basic salary) <strong>plus 25%</strong>, rising to <strong>plus 50%</strong> for overtime between 10 pm and 4 am. Work on an off-day is paid at the normal rate plus 50% (or you get a substitute rest day instead).</p>`,
  tool: toolWrap('overtime', `
${row2(field('basic', 'Basic monthly salary (AED)', { ph: 'e.g. 6000' }), field('divisor', 'Days per month for the hourly rate', { select: DIVISOR_SELECT, hint: DIV_HINT }))}
${row2(field('hpd', 'Normal hours per day', { value: 8, hint: 'Normal hours are 8 per day or 48 per week.' }), field('dayh', 'Overtime hours (outside 10pm-4am)', { value: 0 }))}
${row2(field('nighth', 'Overtime hours between 10pm and 4am', { value: 0 }), field('offh', 'Hours worked on an off-day', { value: 0, hint: 'Only if you take pay instead of a substitute rest day.' }))}
${resultBox([['Normal hourly rate', 'r-hourly'], ['Daytime overtime (+25%)', 'r-day'], ['Night overtime (+50%)', 'r-night'], ['Off-day work (+50%)', 'r-off']])}`,
    'Estimate only. Shift workers are excluded from these overtime rates, and overtime is capped at 2 extra hours a day. Your contract and MOHRE rules apply.'),
  body: `<h2>How the calculation works</h2>
<p>Hourly rate = basic monthly salary &divide; days per month &divide; normal hours per day. Overtime pay = hourly rate &times; 1.25 for ordinary overtime, &times; 1.5 for 10 pm to 4 am overtime or off-day work.</p>
<p><strong>Worked example.</strong> Basic AED 6,000, 30 days, 8 hours: hourly rate = 6,000 &divide; 30 &divide; 8 = <strong>AED 25.00</strong>. Four daytime overtime hours = 4 &times; 25 &times; 1.25 = AED 125. Two night hours = 2 &times; 25 &times; 1.5 = AED 75. One off-day hour = 1 &times; 25 &times; 1.5 = AED 37.50. Total: <strong>AED 237.50</strong>.</p>
<h2>What the UAE Government Portal says</h2>
<ul>
<li>Normal working hours are 8 per day or 48 per week (Article 17).</li>
<li>Overtime cannot exceed 2 extra hours per day.</li>
<li>Overtime is paid at the normal hourly rate based on basic salary plus at least 25%, or plus 50% between 10 pm and 4 am. These rates do not apply to shift workers.</li>
<li>Work on an off-day earns either a substitute rest day or pay at the normal rate plus 50%.</li>
<li>In Ramadan, normal hours are reduced by 2 hours a day; see <a href="/guides/ramadan-working-hours">working hours in Ramadan</a>.</li>
</ul>`,
  faqs: [
    ['How much is overtime pay in the UAE?', 'The normal hourly rate based on basic salary plus 25%, or plus 50% for overtime between 10 pm and 4 am, according to the UAE Government Portal.'],
    ['Is overtime based on basic or total salary?', 'The UAE Government Portal says the hourly rate is based on basic salary.'],
    ['What is the maximum overtime per day?', 'Overtime cannot exceed 2 extra hours per day.'],
    ['Do shift workers get these overtime rates?', 'No. The UAE Government Portal says the overtime rates do not apply to shift workers.']
  ],
  sources: [SRC.hours, SRC.law],
  related: [['Working hours in Ramadan', '/guides/ramadan-working-hours'], ['Salary calculator', '/salary-calculator'], ['Final settlement calculator', '/end-of-service-calculator']],
  app: true
});

// ---------- Annual leave days ----------
toolPages.push({
  path: '/annual-leave-calculator',
  title: 'UAE Annual Leave Calculator - How Many Leave Days Have You Earned?',
  description: 'Free UAE annual leave calculator: 30 days a year after one year of service, 2 days a month for 6 to 12 months. See accrued and remaining days.',
  h1: 'UAE annual leave days calculator',
  nav: 'tools', scripts: SCRIPTS,
  crumbs: crumbsFor('Annual leave calculator', '/annual-leave-calculator'),
  intro: `<p>Enter your start date and the date you want to check. Per the UAE Government Portal, you get a fully paid <strong>30 days of annual leave after completing one year</strong>, and <strong>2 days for each month</strong> of service if you have worked more than six months but less than a year.</p>`,
  tool: toolWrap('leavedays', `
${row2(field('start', 'First day of work', { type: 'date' }), field('asof', 'Calculate as of', { type: 'date' }))}
${field('taken', 'Leave days already taken', { value: 0 })}
${resultBox([['Service so far', 'r-service'], ['Leave accrued', 'r-accrued'], ['Leave taken', 'r-taken'], ['Basis', 'r-basis']])}`,
    'Estimate only. Pro rata accrual for the part-year uses days of service divided by 365 and then multiplied by 30. Part-time workers accrue on actual hours worked. Your contract may give more than the legal minimum.'),
  body: `<h2>The rules this tool follows</h2>
<ul>
<li><strong>More than 6 months, under 1 year:</strong> 2 days per month of service.</li>
<li><strong>1 year or more:</strong> 30 days per year; for the final part-year we pro-rate (days of service &divide; 365 &times; 30).</li>
<li><strong>Under 6 months:</strong> we show no accrual because the pages we rely on do not state one. Your contract may allow leave earlier.</li>
</ul>
<p><strong>Example.</strong> Start 1 January 2025, as of 1 July 2026: 546 days of service = 1.4959 years &times; 30 = <strong>44.88 days</strong> accrued. If you have taken 10 days, 34.88 remain. Unused days are paid in cash when employment ends; use the <a href="/leave-encashment-calculator">leave encashment calculator</a> to value them.</p>
<h2>Carry-over</h2>
<p>With the employer's consent, unused leave can be carried over to the next year. The UAE Government Portal also says an employer cannot stop an employee using accrued leave beyond two consecutive years unless the employee chooses to carry it over or take cash compensation.</p>`,
  faqs: [
    ['How many annual leave days do I get in the UAE?', '30 days per year after one year of service, per the UAE Government Portal. For service between six months and one year it is 2 days per month.'],
    ['Do I get leave during probation?', 'The employer may grant annual leave during probation, and if you do not pass probation you are entitled to compensation for the remaining annual leave balance, according to the Decree-Law summary on the UAE Government Portal.'],
    ['Are weekends and public holidays counted in the 30 days?', 'The pages we rely on do not say, so this calculator does not adjust for them. Check your contract and MOHRE.']
  ],
  sources: [SRC.leave, SRC.law],
  related: [['Leave encashment calculator', '/leave-encashment-calculator'], ['Probation rules', '/guides/probation-rules'], ['Final settlement checklist', '/guides/final-settlement-checklist']],
  app: true
});

// ---------- Final settlement (end of service) ----------
toolPages.push({
  path: '/end-of-service-calculator',
  title: 'UAE Final Settlement Calculator - Gratuity, Leave and Notice in One Total',
  description: 'Estimate your full UAE end-of-service payout: gratuity under Article 51, unused leave pay, notice shortfall and unpaid wages, minus deductions.',
  h1: 'UAE final settlement (end of service) calculator',
  nav: 'tools', scripts: SCRIPTS,
  crumbs: crumbsFor('Final settlement calculator', '/end-of-service-calculator'),
  intro: `<p>Your last payment is usually more than gratuity. This tool adds the four common parts: <strong>gratuity</strong>, <strong>unused annual leave</strong>, a <strong>notice shortfall</strong> if either side did not serve notice, and <strong>outstanding wages</strong>, then subtracts anything you owe. Contract type does not change the formula: since 2022 the same Article 51 gratuity rules apply, as explained in our <a href="/guides/limited-vs-unlimited-contracts">limited vs unlimited contracts guide</a>.</p>`,
  tool: toolWrap('eos', `
${field('basic', 'Basic monthly salary (AED)', { ph: 'e.g. 8000' })}
${row2(field('start', 'First day of work', { type: 'date' }), field('end', 'Last day of work', { type: 'date' }))}
${row2(field('unpaid', 'Unpaid leave days', { value: 0, hint: 'Excluded from the gratuity service period.' }), field('unused', 'Unused annual leave days', { value: 0 }))}
${field('leavediv', 'Days per month for the leave day rate', { select: DIVISOR_SELECT, hint: DIV_HINT })}
${row2(field('noticeshort', 'Notice days not served', { value: 0 }), field('noticewho', 'Who did not serve the notice?', { select: [['none', 'Nobody'], ['employer', 'Employer (you are owed)'], ['employee', 'You (you owe)']] }))}
${row2(field('wages', 'Outstanding wages and other dues (AED)', { value: 0, hint: 'Unpaid salary, overtime, commissions that are due.' }), field('deduct', 'Deductions you owe (AED)', { value: 0, hint: 'Amounts owed to the employer may be deducted.' }))}
<div class="result" id="out" hidden>
<div class="big" id="total">-</div>
<table>
<tr><td>Gratuity (Article 51)</td><td id="r-grat">-</td></tr>
<tr><td>Unused leave pay</td><td id="r-leave">-</td></tr>
<tr><td>Notice shortfall</td><td id="r-notice">-</td></tr>
<tr><td>Outstanding wages</td><td id="r-wages">-</td></tr>
<tr><td>Deductions</td><td id="r-deduct">-</td></tr>
</table>
</div>
<p class="note" id="warn" hidden></p>`,
    'Estimate only, for full-time private-sector employees. Employers may deduct amounts you owe them, and free zones such as DIFC follow their own rules. The notice shortfall uses basic salary &divide; 30 per day as a simple assumption.'),
  body: `<h2>What goes into the total</h2>
<ol>
<li><strong>Gratuity.</strong> 21 days of basic pay for each of the first 5 years and 30 days for each year after, pro rata, capped at two years' wages. Unpaid leave days are excluded. See the <a href="/gratuity-calculator">gratuity calculator</a> and <a href="/methodology">methodology</a>.</li>
<li><strong>Unused leave.</strong> Paid on basic salary when employment ends.</li>
<li><strong>Notice shortfall.</strong> If the employer ended the contract without notice you may be owed an allowance; if you left without serving notice you may owe one.</li>
<li><strong>Wages and other dues.</strong> Salary for the last days worked and anything else already earned.</li>
</ol>
<p>The employer must pay outstanding wages and entitlements, including gratuity, within 14 days of the end of the contract (UAE Government Portal).</p>
<p><strong>Worked example.</strong> Basic AED 8,000; 1 January 2019 to 31 December 2024 (2,191 days = 6.0027 years); 10 unused leave days at 30 days a month; no notice issue; AED 8,000 unpaid salary. Daily wage = 8,000 &times; 12 &divide; 365 = AED 263.01. Gratuity: 105 days (5 years &times; 21) = 27,616.44, plus 1.0027 years &times; 30 = 30.08 days = 7,912.03, so AED 35,528.47. Leave: 10 &times; 266.67 = AED 2,666.67. Unpaid salary: AED 8,000. Total <strong>AED 46,195.13</strong> before any deductions.</p>`,
  faqs: [
    ['What is included in a UAE final settlement?', 'Typically outstanding wages, unused annual leave, gratuity if you have at least one year of service, and any notice allowance. Use our <a href="/guides/final-settlement-checklist">checklist</a> to verify each line.'],
    ['How long does the employer have to pay?', 'Within 14 days of the end of the contract, per the UAE Government Portal.'],
    ['Does the contract type change my gratuity?', 'No. The same Article 51 formula is applied; unlimited-term contracts had to be converted to fixed-term by the end of 2023.'],
    ['Can my employer deduct money?', 'Amounts you owe the employer may be deducted from gratuity, according to the UAE Government Portal.']
  ],
  sources: [SRC.eos, SRC.leave, SRC.term, SRC.unlimited],
  related: [['Gratuity calculator', '/gratuity-calculator'], ['Leave encashment calculator', '/leave-encashment-calculator'], ['Notice period pay calculator', '/notice-period-pay-calculator'], ['Final settlement checklist', '/guides/final-settlement-checklist'], ['Gratuity tables by salary', '/gratuity/']],
  app: true
});

// ---------- VAT invoice ----------
toolPages.push({
  path: '/vat-invoice-calculator',
  title: 'UAE VAT Invoice Calculator - Multiple Lines, 5%, Zero-Rated and Exempt',
  description: 'Free UAE VAT invoice calculator. Add several lines with quantity and price, mark each as 5%, zero-rated or exempt, and get net, VAT and total.',
  h1: 'UAE VAT invoice calculator (multiple lines)',
  nav: 'tools', scripts: SCRIPTS,
  crumbs: crumbsFor('VAT invoice calculator', '/vat-invoice-calculator'),
  intro: `<p>Real invoices mix products. Add one row per line, enter the VAT-exclusive unit price, and mark each line as <strong>5% standard</strong>, <strong>0% zero-rated</strong> or <strong>exempt</strong>. The tool totals net, VAT and gross, and shows the value in each category, which you also need for a VAT return.</p>`,
  tool: toolWrap('vatinvoice', `
<div class="field"><label for="rate">VAT rate for standard lines (%)</label><input id="rate" type="number" value="5" min="0" step="any" inputmode="decimal"></div>
<div class="tablewrap"><table class="lines"><thead><tr><th>Description</th><th>Qty</th><th>Unit price (excl. VAT)</th><th>VAT treatment</th><th>Line total</th><th></th></tr></thead><tbody id="lines"></tbody></table></div>
<p><button type="button" id="add" class="btn">+ Add line</button></p>
<div class="result" id="out" hidden>
<div class="big" id="total">-</div>
<table>
<tr><td>Net total (excl. VAT)</td><td id="r-net">-</td></tr>
<tr><td>VAT</td><td id="r-vat">-</td></tr>
<tr><td>Value of standard-rated lines</td><td id="r-std">-</td></tr>
<tr><td>Value of zero-rated lines</td><td id="r-zero">-</td></tr>
<tr><td>Value of exempt lines</td><td id="r-exempt">-</td></tr>
</table>
</div>`,
    'Estimate only. Which supplies are zero-rated or exempt is set by UAE VAT law; check the Federal Tax Authority guidance. This tool does not create a tax invoice. VAT is rounded to the nearest fils per line.'),
  body: `<h2>How the calculation works</h2>
<p>For each line: net = quantity &times; unit price. VAT = net &times; rate for standard-rated lines, and nil for zero-rated and exempt lines. The invoice totals are the sums of the line figures.</p>
<p><strong>Worked example.</strong> 10 hours of consulting at AED 250 (standard): net 2,500, VAT 125. 4 exported items at AED 120 (zero-rated): net 480, VAT 0. Invoice net = AED 2,980, VAT = AED 125, total = <strong>AED 3,105</strong>.</p>
<h2>Zero-rated versus exempt</h2>
<p>Both carry no VAT on the invoice, but they differ in how input VAT is treated on your costs. The Federal Tax Authority's VAT guides explain which supplies fall into each group and what a valid tax invoice must show; start with the sources below. For a single amount use the simpler <a href="/vat-calculator">VAT calculator</a>.</p>`,
  faqs: [
    ['What is the VAT rate in the UAE?', 'The standard VAT rate is 5%, per the Federal Tax Authority.'],
    ['Do I charge VAT if I am not registered?', 'A business that is not VAT-registered does not charge VAT. See the <a href="/guides/vat-registration-threshold">registration threshold guide</a>.'],
    ['Why show zero-rated and exempt values separately?', 'VAT returns report standard-rated, zero-rated and exempt supplies separately, so keeping the split on each invoice makes the return easier.']
  ],
  sources: [SRC.vat, SRC.vatguide, SRC.vatreg],
  related: [['VAT calculator', '/vat-calculator'], ['VAT registration threshold', '/guides/vat-registration-threshold'], ['UAE VAT guide', '/guides/uae-vat-guide']],
  app: true
});

// ---------- Monthly budget ----------
const budgetItems = [['rent', 'Rent / mortgage'], ['utilities', 'Utilities (DEWA etc.)'], ['groceries', 'Groceries'], ['transport', 'Transport and fuel'], ['telecom', 'Phone and internet'], ['school', 'School / childcare'], ['insurance', 'Insurance'], ['dining', 'Dining and leisure'], ['remit', 'Money sent home'], ['other', 'Other']];
toolPages.push({
  path: '/monthly-budget-calculator',
  title: 'UAE Monthly Budget Calculator - Simple Cost of Living Planner',
  description: 'Free monthly budget calculator for the UAE. Enter your income and costs for rent, utilities, school, transport and more to see what is left to save.',
  h1: 'UAE monthly budget (cost of living) calculator',
  nav: 'tools', scripts: SCRIPTS,
  crumbs: crumbsFor('Monthly budget calculator', '/monthly-budget-calculator'),
  intro: `<p>Fill in your own take-home income and your own monthly costs. We deliberately do not pre-fill "average" prices: rent, school fees and bills vary too much between emirates and households for a single number to be useful. The tool shows what is left, your savings rate and each cost as a share of income.</p>`,
  tool: toolWrap('budget', `
${field('income', 'Monthly take-home income (AED)', { ph: 'e.g. 15000', hint: 'After deductions. Use the <a href="/salary-calculator">salary calculator</a> if you need a take-home figure.' })}
<div class="row2">${budgetItems.map(([id, label]) => field(id, label + ' (AED)', { value: 0, cls: 'exp' })).join('')}</div>
<div class="result" id="out" hidden>
<div class="big" id="total">-</div>
<table>
<tr><td>Monthly income</td><td id="r-income">-</td></tr>
<tr><td>Total spending</td><td id="r-spent">-</td></tr>
<tr><td>Savings rate</td><td id="r-rate">-</td></tr>
<tr><td>Left over for the year</td><td id="r-annual">-</td></tr>
</table>
<h3>Share of income</h3>
<table>${budgetItems.map(([id, label]) => `<tr><td>${label}</td><td id="s-${id}">-</td></tr>`).join('')}</table>
</div>`,
    'A planning aid only. No figures are sent anywhere; nothing is saved when you close the page.'),
  body: `<h2>How to use it</h2>
<p>Savings rate = (income &minus; spending) &divide; income. Example: income AED 15,000 and costs of AED 9,000 leave AED 6,000, a 40% savings rate and AED 72,000 over a year.</p>
<h2>Tips for a realistic budget</h2>
<ul>
<li>Use last month's bank statement rather than memory.</li>
<li>List yearly costs (insurance, school re-enrolment, visa renewals) divided by 12.</li>
<li>Keep "money sent home" on its own line so it is visible.</li>
<li>If you are leaving a job, plan around your <a href="/end-of-service-calculator">final settlement</a> arriving later than your last salary.</li>
</ul>`,
  faqs: [
    ['Is there income tax in the UAE?', 'This tool does not model taxes. It takes your take-home income as an input; our <a href="/salary-calculator">salary calculator</a> helps you estimate take-home pay.'],
    ['Does this site store my budget?', 'No. Everything runs in your browser and nothing is saved or sent.']
  ],
  sources: [],
  sourceNote: 'This tool contains no legal or tax rules: it only adds up the figures you enter.',
  related: [['Salary calculator', '/salary-calculator'], ['Final settlement calculator', '/end-of-service-calculator'], ['Overtime pay calculator', '/overtime-pay-calculator']],
  app: true
});
