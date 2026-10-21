// Guides, part 2: probation, Ramadan hours, VAT registration threshold.
import { SRC } from '../lib/layout.mjs';
import { n0 } from './guides1.mjs';
const crumbs = (name, p) => [['Home', '/'], ['Guides', '/guides/'], [name, p]];

export const guides2 = [];

// ---------------- Probation ----------------
guides2.push({
  path: '/guides/probation-rules',
  title: 'UAE Probation Period Rules - Length, Leave and the Work Permit Ban',
  description: 'UAE probation explained: the six-month maximum, annual leave during probation, quitting during probation and the one-year work-permit ban, with a practical checklist.',
  h1: 'Probation period rules in the UAE',
  nav: 'guides', crumbs: crumbs('Probation rules', '/guides/probation-rules'),
  intro: `<p>A probation period lets an employer assess a new hire and lets the employee test the job. It also changes some of the rules that apply when employment ends, most importantly for people who think about quitting early. This guide covers what the UAE Government Portal and Federal Decree-Law No. 33 of 2021 say, and clearly marks the points where official pages differ, so you know what to double-check with MOHRE.</p>`,
  body: `<h2>How long can probation be?</h2>
<p>The Labour Law says probation must <strong>not exceed six months</strong> and cannot be extended for a further term. If your offer letter or contract says anything longer, or an employer tells you in month six that probation will continue, raise it with MOHRE. The probation period should be written into your contract; if it is not, ask for it to be added before you sign.</p>
<h2>Annual leave during probation</h2>
<p>The Government Portal's summary says the employer may grant you leave from your annual leave balance during the probation period, and that you have the right to be compensated for the remaining annual leave balance if you did not pass probation. Separately, the portal says that for service of more than six months and under one year, you earn 2 days of leave for each month of service. The pages we used do not state an accrual for the first six months, so ask your employer what applies in your contract.</p>
<h2>Leaving during probation</h2>
<p>This is the part that catches people. Under <strong>Ministerial Resolution No. 47 of 2022</strong>, a worker who quits during the probation period, where the employer has not breached its obligations, cannot obtain a new work permit for <strong>one year from departure</strong>. The same ban applies if a proven "work abandonment" report exists against the worker. In plain terms: resigning in the first six months to join a competitor can block your next UAE work permit for a year.</p>
<p>The Government Portal also notes the ban is aimed at quitting without cause. If your employer is the one in breach (for example by not paying wages), the position is different and you should take advice before acting. The law also provides a route for leaving without notice where the employer breaches its obligations, but it has strict conditions, including notifying MOHRE first; see <a href="/guides/resignation-vs-termination">resignation vs termination</a>.</p>
<h2>What notice applies during probation?</h2>
<p>Here official pages are not fully consistent. The main termination rule (Article 43) requires written notice of 30 to 90 days. For probation, some official pages describe a minimum of one month for a resignation to join another UAE employer and 14 days if you are leaving the country, while other readings of the Decree-Law give the employer 14 days' written notice to end probation. We have not been able to confirm a single authoritative wording, so this site does not give a number. Check the current text on the MOHRE website or call MOHRE before you rely on one.</p>
<h2>What about gratuity and probation?</h2>
<p>Gratuity needs at least one year of continuous service, and probation is at most six months, so someone who leaves during probation does not qualify. Whether the probation period counts towards the one-year service for someone who stays is not addressed in the pages we reviewed; ask your employer in writing, because it affects the date you first become eligible. Our <a href="/gratuity-calculator">gratuity calculator</a> counts service from your first day of work.</p>
<h2>Practical checklist for new joiners</h2>
<ol>
<li>Find the probation length in your contract. If it is over six months, query it.</li>
<li>Write down your first day of work; it drives leave and gratuity dates.</li>
<li>Ask whether any annual leave can be taken during probation, and how a balance would be paid if probation is not passed.</li>
<li>Before resigning in the first six months, check the one-year work-permit ban. If you have an offer from another employer, ask it whether the ban affects your permit.</li>
<li>Keep every written message about performance. If you are ended on grounds of misconduct, the employer should follow the written-investigation procedure in Article 44.</li>
<li>Keep your payslips and the signed contract.</li>
</ol>
<h2>For employers and HR</h2>
<p>Record probation start and end dates, deliver notices in writing, and keep the evidence of any breach alleged against the employee. If you end employment during probation, pay outstanding wages and any unused leave compensation due, and give the worker a clear final statement.</p>
<h2>Example</h2>
<p>Omar joins on 1 March with a six-month probation. In June he receives a better offer. He resigns during probation. Because his employer has not breached the contract, he risks the one-year work-permit ban counted from the date he leaves. If instead he waits until 1 September, probation is over and the usual notice rules for resignation apply (30 to 90 days, paid at full wage).</p>`,
  faqs: [
    ['How long can a probation period be in the UAE?', 'No more than six months, and it cannot be extended.'],
    ['Can I take annual leave during probation?', 'The employer may grant leave from your annual leave balance during probation. If you do not pass probation you have the right to compensation for the remaining annual leave balance, according to the Government Portal summary.'],
    ['Can I be banned from working if I quit during probation?', 'Yes. A worker who quits during probation without the employer having breached its contract cannot get a new work permit for one year from departure (Ministerial Resolution No. 47 of 2022).'],
    ['Do I get gratuity if I leave during probation?', 'No. Gratuity requires at least one year of continuous service and probation is at most six months.']
  ],
  sources: [SRC.term, SRC.leave, SRC.law, SRC.eos],
  sourceNote: 'The notice period during probation is described differently across official pages and is intentionally left out.',
  related: [['Resignation vs termination', '/guides/resignation-vs-termination'], ['Annual leave calculator', '/annual-leave-calculator'], ['Notice period pay calculator', '/notice-period-pay-calculator']]
});

// ---------------- Ramadan ----------------
guides2.push({
  path: '/guides/ramadan-working-hours',
  title: 'Working Hours in Ramadan in the UAE - The 2-Hour Reduction Explained',
  description: 'UAE private-sector working hours during Ramadan: the two-hour daily reduction, normal 8-hour and 48-hour limits, overtime rules and flexible work, with examples.',
  h1: 'Working hours in Ramadan for UAE private-sector employees',
  nav: 'guides', crumbs: crumbs('Working hours in Ramadan', '/guides/ramadan-working-hours'),
  intro: `<p>During the holy month of Ramadan, working hours in the UAE private sector are reduced by <strong>two hours per day</strong>. This guide explains how that sits on top of the normal working-hours rules, how it affects weekly totals, what the Ministry (MOHRE) has said about flexible and remote work, and which questions the published sources do not answer.</p>`,
  body: `<h2>The normal rules first</h2>
<p>Article 17 of Federal Decree-Law No. 33 of 2021 sets normal private-sector working hours at <strong>8 hours per day or 48 hours per week</strong>. Commuting from home to work is not counted as working time, except for certain worker categories. After five consecutive hours of work, the employee is entitled to one or more breaks of no less than one hour in total; breaks do not count as working time.</p>
<h2>The Ramadan reduction</h2>
<p>The UAE Government Portal states that in Ramadan working hours are <strong>reduced by 2 hours per day</strong>. MOHRE announces this each year; its notice dated 12 February 2026, ahead of Ramadan 2026, carries the headline "Reduction of Working Hours for Private Sector Employees by Two Hours Daily During the Holy Month of Ramadan". The same notice says private-sector companies may use flexible working arrangements or remote work within the limits of the daily working hours set for the days of Ramadan.</p>
<h2>What it means in numbers</h2>
<table><thead><tr><th>Situation</th><th>Normal month</th><th>Ramadan</th></tr></thead><tbody>
<tr><td>Hours per working day</td><td>8</td><td>6</td></tr>
<tr><td>6-day week</td><td>48</td><td>36</td></tr>
<tr><td>5-day week (8 hours per day = 40)</td><td>40</td><td>30</td></tr>
</tbody></table>
<p>The table applies the "minus 2 hours per day" rule arithmetically. If your contract already sets shorter normal hours than the legal maximum, ask your employer how the reduction applies to your schedule; the sources we reviewed state the reduction but do not give a worked example for shorter contracts.</p>
<h2>Overtime in Ramadan</h2>
<p>Outside Ramadan, overtime is paid at the normal hourly rate (based on basic salary) plus 25%, or plus 50% between 10 pm and 4 am, with a limit of 2 extra hours per day. Shift workers are excluded from these rates. The pages we reviewed do not say whether time worked beyond the reduced Ramadan schedule is treated as overtime, or what the reference "normal hours" are. This is a point to raise with your employer or MOHRE if it matters to you. You can model both views in the <a href="/overtime-pay-calculator">overtime pay calculator</a>.</p>
<p><strong>Illustration.</strong> Basic AED 6,000, 30 days, 8 hours: the normal hourly rate is AED 25.00. One extra hour at +25% is AED 31.25. If your employer treats the sixth hour as part of a reduced schedule, working a seventh hour could be extra time; whether and at what rate it is paid should be confirmed with them.</p>
<h2>Is pay reduced when hours are reduced?</h2>
<p>The sources we reviewed describe a reduction of working hours, not of pay, and none says wages may be cut. We do not give a conclusion beyond that: if your employer proposes to change your pay in Ramadan, ask for the legal basis in writing and contact MOHRE.</p>
<h2>Summer midday work ban (a different rule)</h2>
<p>Do not confuse Ramadan reductions with the summer midday break. Under Ministerial Resolution No. 44 of 2022, outdoor work directly under the sun is not allowed between 12:30 pm and 3:00 pm from 15 June to 15 September. It is a safety rule that applies on its own timetable.</p>
<h2>Practical tips for employees</h2>
<ol>
<li>Ask HR for the Ramadan timetable in writing before the month starts.</li>
<li>Check how breaks are scheduled; breaks do not count as working hours.</li>
<li>Keep a record of any extra hours, with dates and who requested them.</li>
<li>If you work remotely, agree specific working hours with your employer.</li>
</ol>
<h2>Practical tips for employers</h2>
<p>Publish the Ramadan schedule early, apply the reduction consistently to all private-sector staff, keep timesheets so any extra hours are provable and make sure managers know the 2-hour daily overtime cap still applies.</p>`,
  faqs: [
    ['How many hours do you work in Ramadan in the UAE?', 'Normal hours are reduced by two hours per day, so a standard 8-hour day becomes 6 hours, according to the UAE Government Portal.'],
    ['Does the Ramadan reduction apply to the whole private sector?', 'MOHRE announces the reduction for private-sector employees. Sector or contract-specific questions should be confirmed with MOHRE.'],
    ['Can employers use remote work in Ramadan?', 'MOHRE\'s 2026 notice says companies may implement flexible working arrangements or remote work within the limits of the daily working hours set for Ramadan.'],
    ['How much is overtime pay?', 'The normal hourly rate based on basic salary plus 25% (plus 50% between 10 pm and 4 am), excluding shift workers.']
  ],
  sources: [SRC.hours, SRC.ramadan, SRC.law],
  sourceNote: 'The Ramadan notice page could not be loaded when this page was last checked; its headline is cited from the search listing. Please verify on the MOHRE website.',
  related: [['Overtime pay calculator', '/overtime-pay-calculator'], ['Salary calculator', '/salary-calculator'], ['Probation rules', '/guides/probation-rules']]
});

// ---------------- VAT registration threshold ----------------
const th = 375000, vth = 187500;
guides2.push({
  path: '/guides/vat-registration-threshold',
  title: 'UAE VAT Registration Threshold - AED 375,000 and AED 187,500 Explained',
  description: 'When must a UAE business register for VAT? The AED 375,000 mandatory and AED 187,500 voluntary thresholds, the 30-day test, and worked examples.',
  h1: 'UAE VAT registration threshold: mandatory and voluntary',
  nav: 'guides', crumbs: crumbs('VAT registration threshold', '/guides/vat-registration-threshold'),
  intro: `<p>You do not need to charge VAT from the first dirham you earn, but once your business passes a set turnover you must register with the Federal Tax Authority (FTA). The thresholds are <strong>AED ${n0(th)}</strong> for mandatory registration and <strong>AED ${n0(vth)}</strong> for voluntary registration. This guide explains how each test works, with examples, and what to do next.</p>`,
  body: `<h2>Mandatory registration: AED ${n0(th)}</h2>
<p>The FTA says a business must register for VAT if the total value of its <strong>taxable supplies and imports</strong> exceeded AED ${n0(th)} over the previous 12 months, <strong>or</strong> it expects its taxable supplies and imports to exceed that amount in the next 30 days. The threshold does not apply to foreign businesses, which are dealt with separately by the FTA.</p>
<p>"Taxable supplies" means supplies that carry VAT at 5% or at zero. Exempt supplies are not counted. If you are unsure how your sales are classified, read the FTA's VAT guides before deciding.</p>
<h2>Voluntary registration: AED ${n0(vth)}</h2>
<p>If you do not meet the mandatory test, you may still register if your taxable supplies and imports, or your taxable <em>expenses</em>, exceeded AED ${n0(vth)} over the previous 12 months, or you expect them to in the next 30 days. This helps start-ups that have large setup costs on which they want to recover VAT, and businesses whose customers require a VAT number on invoices.</p>
<h2>The 30-day forward-looking test</h2>
<p>The "next 30 days" limb means you cannot wait for a year of history. If you win a contract worth more than the threshold that will be delivered within 30 days, you may need to register straight away. The FTA's wording is about what you expect to exceed in the next 30 days, so keep contracts and projections that show how you assessed it.</p>
<h2>Worked examples</h2>
<table><thead><tr><th>Business</th><th>Taxable supplies (12 months)</th><th>Result</th></tr></thead><tbody>
<tr><td>Freelance designer</td><td>AED ${n0(310000)}</td><td>Below ${n0(th)}; not required to register. Above ${n0(vth)}, so voluntary registration is available.</td></tr>
<tr><td>Cafe</td><td>AED ${n0(520000)}</td><td>Over ${n0(th)}; must register.</td></tr>
<tr><td>New consultancy, no sales yet</td><td>Signed contract worth AED ${n0(400000)} to be delivered next month</td><td>Expects to exceed ${n0(th)} within 30 days; must register.</td></tr>
<tr><td>Start-up buying equipment</td><td>Sales AED ${n0(90000)}, taxable expenses AED ${n0(250000)}</td><td>Not mandatory. Expenses exceed ${n0(vth)}, so voluntary registration is available.</td></tr>
</tbody></table>
<p>These examples apply the published thresholds to made-up figures. They do not account for exempt supplies or special sectors.</p>
<h2>After you cross the threshold</h2>
<p>A business that is required to register must submit its application to the FTA; the FTA's terms and conditions give a 30-day period from the date the obligation arises, which we have flagged for your own check. Register through the FTA's online portal and keep the evidence you used to calculate turnover.</p>
<h2>What changes once registered?</h2>
<ul>
<li>You charge 5% VAT on standard-rated supplies and 0% on zero-rated ones; try the <a href="/vat-invoice-calculator">VAT invoice calculator</a>.</li>
<li>You issue tax invoices with the required details (see the FTA's VAT guide).</li>
<li>You file VAT returns and may recover input VAT on business costs.</li>
<li>Record-keeping duties apply.</li>
</ul>
<h2>If you are below the threshold</h2>
<p>You do not charge VAT and cannot recover VAT on your costs. Monitor your turnover each month: add the last 12 months' taxable supplies and imports, and compare with the threshold. A spreadsheet row per month is enough. Re-check whenever you sign a large contract.</p>
<h2>Tracking your rolling 12 months</h2>
<p>Because the test looks back over the previous 12 months, a simple monthly log works better than an annual figure. List taxable sales (and imports) for each month; the sum of the latest 12 is your running total. Example for a small agency:</p>
<table><thead><tr><th>Month</th><th>Taxable sales (AED)</th><th>Running 12-month total</th></tr></thead><tbody>
${(() => { const m = [18000, 22000, 25000, 27000, 30000, 31000, 33000, 35000, 36000, 38000, 40000, 42000, 45000, 48000]; const names = ['Jan Y1', 'Feb Y1', 'Mar Y1', 'Apr Y1', 'May Y1', 'Jun Y1', 'Jul Y1', 'Aug Y1', 'Sep Y1', 'Oct Y1', 'Nov Y1', 'Dec Y1', 'Jan Y2', 'Feb Y2']; return m.map((v, i) => { const tot = m.slice(Math.max(0, i - 11), i + 1).reduce((a, b) => a + b, 0); return i >= 9 ? `<tr><td>${names[i]}</td><td>${n0(v)}</td><td>${n0(tot)}${tot > th ? ' (over threshold)' : ''}</td></tr>` : ''; }).join(''); })()}
</tbody></table>
<p>The agency's rolling total passes AED ${n0(th)} in the last row shown, so the mandatory registration obligation arises at that point (and earlier if it had expected to pass it within the next 30 days). The point of the table is the method: look at the latest 12 months, not the calendar year, and look forward too.</p>
<h2>Records to keep</h2>
<ul>
<li>Monthly sales and import records that show which supplies were taxable, zero-rated or exempt.</li>
<li>Contracts and quotations supporting your 30-day expectation.</li>
<li>A dated note of when you assessed the threshold and what you concluded.</li>
<li>Invoices and receipts for taxable expenses if you apply voluntarily on that basis.</li>
</ul>
<h2>Common mistakes</h2>
<ol>
<li>Only checking the previous calendar year and ignoring the rolling 12 months.</li>
<li>Forgetting the 30-day forward-looking test.</li>
<li>Counting exempt sales as taxable (or the reverse).</li>
<li>Assuming a freelancer or home business is outside VAT; the thresholds apply to the business, not its size or location.</li>
</ol>`,
  faqs: [
    ['What is the VAT registration threshold in the UAE?', `AED ${n0(th)} of taxable supplies and imports for mandatory registration, and AED ${n0(vth)} for voluntary registration, per the Federal Tax Authority.`],
    ['Do I count the last 12 months or the calendar year?', 'The FTA test looks at the previous 12 months, plus an expectation for the next 30 days.'],
    ['Does the threshold apply to foreign businesses?', 'No. The FTA says the mandatory threshold does not apply to foreign businesses, which are treated separately.'],
    ['What is the VAT rate?', 'The standard rate is 5%, per the Federal Tax Authority.']
  ],
  sources: [SRC.vatreg, SRC.vat, SRC.vatguide],
  sourceNote: 'The 30-day application deadline is not stated on the registration page; verify it on the FTA site.',
  related: [['VAT calculator', '/vat-calculator'], ['VAT invoice calculator', '/vat-invoice-calculator'], ['UAE VAT guide', '/guides/uae-vat-guide']]
});
