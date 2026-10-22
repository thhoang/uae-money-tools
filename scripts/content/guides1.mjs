// Guides, part 1: gratuity-focused. Numbers are computed with assets/calc.js so they always match the calculators.
import { createRequire } from 'node:module';
import { SRC } from '../lib/layout.mjs';
const C = createRequire(import.meta.url)('../../assets/calc.js');

export const n0 = x => Math.round(x).toLocaleString('en-US');
export const n2 = x => x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const crumbs = (name, p) => [['Home', '/'], ['Guides', '/guides/'], [name, p]];

export const guides1 = [];

// ---------------- Gratuity examples ----------------
{
  const salaries = [3000, 5000, 8000, 10000, 15000, 20000];
  const years = [1, 2, 3, 5, 7, 10, 15, 20];
  const table = `<table><thead><tr><th>Basic salary</th>${years.map(y => `<th>${y} yr${y > 1 ? 's' : ''}</th>`).join('')}</tr></thead><tbody>
${salaries.map(s => `<tr><th><a href="/gratuity/salary-${s}">AED ${n0(s)}</a></th>${years.map(y => `<td>${n0(C.gratuity(s, y).total)}</td>`).join('')}</tr>`).join('\n')}
</tbody></table>`;
  const e1 = C.gratuity(5000, 3), e2 = C.gratuity(8000, 8), e3 = C.gratuity(12000, 6.5);
  guides1.push({
    path: '/guides/gratuity-examples',
    title: 'UAE Gratuity Examples - Payout at AED 3,000 to 20,000 Salaries',
    description: 'Worked UAE end-of-service gratuity examples and a lookup table for basic salaries from AED 3,000 to AED 20,000 and 1 to 20 years of service.',
    h1: 'UAE gratuity examples: what you get at different salaries and years',
    nav: 'guides', crumbs: crumbs('Gratuity examples', '/guides/gratuity-examples'),
    intro: `<p>Formulas are easy to read and hard to picture. This page shows what end-of-service gratuity actually comes to for common basic salaries and lengths of service, and walks through three examples line by line. Every figure comes from the same code as our <a href="/gratuity-calculator">gratuity calculator</a>, which implements Article 51 of Federal Decree-Law No. 33 of 2021 as summarised by the UAE Government Portal.</p>`,
    body: `<h2>The rule in one paragraph</h2>
<p>For a full-time employee with at least one year of continuous service, gratuity is <strong>21 days of basic salary for each of the first 5 years</strong> and <strong>30 days for each year after that</strong>. Part-years are paid pro rata once you have passed one year, days of unpaid absence are excluded, and the total cannot exceed two years of wages. The daily wage we use is annual basic salary &divide; 365 (the same method our calculator has always used; see the <a href="/methodology">methodology page</a>).</p>
<h2>Lookup table: gratuity in AED</h2>
<p>Rounded to the nearest dirham. Click a salary to see its full year-by-year table.</p>
<div class="tablewrap">${table}</div>
<p>Read across a row to see how the payout grows. Notice the jump between 5 and 7 years: each extra year after year 5 is worth 30 days, not 21, so it adds roughly 43% more than a year earlier in the career.</p>
<h2>Example 1: AED 5,000 basic, 3 years</h2>
<ol>
<li>Daily wage = 5,000 &times; 12 &divide; 365 = <strong>AED ${n2(e1.daily)}</strong>.</li>
<li>3 years &times; 21 days = 63 days.</li>
<li>63 &times; ${n2(e1.daily)} = <strong>AED ${n2(e1.total)}</strong>.</li>
</ol>
<p>Compare that with the monthly basic of AED 5,000: three years of service earns about ${(e1.total / 5000).toFixed(2)} months of basic pay.</p>
<h2>Example 2: AED 8,000 basic, 8 years</h2>
<ol>
<li>Daily wage = 8,000 &times; 12 &divide; 365 = <strong>AED ${n2(e2.daily)}</strong>.</li>
<li>First 5 years: 5 &times; 21 = 105 days = AED ${n2(e2.part1)}.</li>
<li>Next 3 years: 3 &times; 30 = 90 days = AED ${n2(e2.part2)}.</li>
<li>Total = <strong>AED ${n2(e2.total)}</strong> (195 days of wages).</li>
</ol>
<h2>Example 3: AED 12,000 basic, 6 years and 6 months</h2>
<ol>
<li>Daily wage = 12,000 &times; 12 &divide; 365 = <strong>AED ${n2(e3.daily)}</strong>.</li>
<li>First 5 years: 105 days = AED ${n2(e3.part1)}.</li>
<li>Remaining 1.5 years &times; 30 = 45 days = AED ${n2(e3.part2)}.</li>
<li>Total = <strong>AED ${n2(e3.total)}</strong>.</li>
</ol>
<h2>What the examples assume</h2>
<ul>
<li><strong>Basic salary only.</strong> If your payslip shows AED 12,000 as a package, but only AED 7,000 is basic, use 7,000. This is the most common source of surprise at the end of a job.</li>
<li><strong>Continuous service.</strong> A year counts as 365 days after unpaid days are removed. See <a href="/guides/unpaid-leave-and-gratuity">unpaid leave and gratuity</a>.</li>
<li><strong>The cap.</strong> The total is limited to two years of wages (24 times the monthly basic). At AED 6,000 basic that is AED 144,000 and it is only reached after about 25.8 years of service, so most people never hit it. The cap year is the same at any salary because both the cap and the daily wage scale with basic pay.</li>
<li><strong>Not covered here:</strong> DIFC employees (DEWS savings scheme), employers on the optional MOHRE savings scheme, part-time work models and UAE nationals (pension system). Part-time gratuity is the full-time figure multiplied by the ratio of contracted hours to full-time hours.</li>
</ul>
<h2>How to use these numbers</h2>
<p>Treat them as a sanity check. Take your payslip, find the basic line, read off the matching salary row, and compare it with what your employer's final settlement says. If the gap is large, ask for the calculation in writing: employers are expected to pay all outstanding dues, including gratuity, within 14 days of the end of the contract. Then run the <a href="/end-of-service-calculator">final settlement calculator</a> to add leave pay and notice.</p>`,
    faqs: [
      ['How much gratuity do I get after 5 years at AED 5,000 basic?', `${n0(C.gratuity(5000, 5).total)} dirhams: 5,000 &times; 12 &divide; 365 = ${n2(C.gratuity(5000, 5).daily)} per day, times 105 days.`],
      ['Why is the table different from my employer\'s figure?', 'Common reasons: your employer used total salary instead of basic (which is not allowed under the official rule), a different daily divisor, or unpaid leave days. Ask for the working in writing.'],
      ['Is there a maximum gratuity?', 'Yes. The total cannot exceed the wage of two years.'],
      ['Does the gratuity change if I resign?', 'The official end-of-service page sets the formula by length of service. See <a href="/guides/resignation-vs-termination">resignation vs termination</a> for what we can and cannot confirm.']
    ],
    sources: [SRC.eos, SRC.law],
    related: [['Gratuity calculator', '/gratuity-calculator'], ['Gratuity tables by salary', '/gratuity/'], ['How gratuity is calculated', '/guides/how-gratuity-is-calculated'], ['Unpaid leave and gratuity', '/guides/unpaid-leave-and-gratuity']]
  });
}

// ---------------- Unpaid leave and gratuity ----------------
{
  const basic = 7000;
  const full = C.gratuityFromDates(basic, '2019-03-01', '2024-03-01', 0);
  const withUnpaid = C.gratuityFromDates(basic, '2019-03-01', '2024-03-01', 60);
  const edge = C.gratuityFromDates(6000, '2024-01-01', '2025-01-01', 10);
  guides1.push({
    path: '/guides/unpaid-leave-and-gratuity',
    title: 'Unpaid Leave and Gratuity in the UAE - How It Reduces Your Payout',
    description: 'How days of unpaid leave are excluded from service when calculating UAE end-of-service gratuity, with worked examples and the one-year edge case.',
    h1: 'Unpaid leave and gratuity in the UAE',
    nav: 'guides', crumbs: crumbs('Unpaid leave and gratuity', '/guides/unpaid-leave-and-gratuity'),
    intro: `<p>If you took time off without pay, it affects your end-of-service gratuity. The UAE Government Portal says that <strong>days of absence without pay are excluded from the service period</strong> used to calculate gratuity. This guide shows what that means in numbers and what to check on your own records.</p>`,
    body: `<h2>The rule</h2>
<p>Gratuity under Article 51 is based on your length of continuous service. The official summary states that days of absence without pay are not counted towards it. In practice: take the days between your first and last working day, subtract your unpaid days, and use the result as your service period. The rest of the formula is unchanged: 21 days of basic pay per year for the first 5 years and 30 days after, capped at two years' wages.</p>
<h2>Worked example: 60 unpaid days over five years</h2>
<p>Basic salary AED ${n0(basic)}, first day 1 March 2019, last day 1 March 2024. That span is 1,827 days (5.005 years) with no deductions.</p>
<table><thead><tr><th></th><th>No unpaid leave</th><th>60 unpaid days</th></tr></thead><tbody>
<tr><th>Days counted</th><td>1,827</td><td>1,767</td></tr>
<tr><th>Years of service</th><td>${(full.years).toFixed(3)}</td><td>${(withUnpaid.years).toFixed(3)}</td></tr>
<tr><th>Daily wage</th><td>AED ${n2(full.daily)}</td><td>AED ${n2(withUnpaid.daily)}</td></tr>
<tr><th>Gratuity</th><td>AED ${n2(full.total)}</td><td>AED ${n2(withUnpaid.total)}</td></tr>
</tbody></table>
<p>Sixty unpaid days reduced the payout by about AED ${n0(full.total - withUnpaid.total)}, or ${n2((full.total - withUnpaid.total) / (basic * 12 / 365))} days of wages. Each unpaid day removes one day from the service period before the formula is applied.</p>
<h2>The one-year edge case</h2>
<p>No gratuity is due for less than one year of continuous service. So unpaid days can push you under the line. Example: first day 1 January 2024, last day 1 January 2025 (366 days) with 10 unpaid days leaves 356 days, or ${(edge.years).toFixed(3)} years. That is under one year, so the gratuity is <strong>AED ${n0(edge.total)}</strong> even though you were employed for a calendar year. If you are near your first anniversary, check this before you hand in notice.</p>
<h2>What counts as "unpaid"?</h2>
<p>The official wording is "absence without pay". The pages we rely on do not list every type of leave, so we do not classify individual cases. If you are unsure whether a particular absence counts, check your payslips: if you were paid for the day, it is a paid day. If you were not, ask MOHRE or your employer how it was recorded. Do not assume that all absences are treated alike.</p>
<h2>Checklist before you leave</h2>
<ol>
<li>List every period of unpaid leave and count the days (calendar days, including weekends within the period).</li>
<li>Compare your list with the employer's records. If they differ, ask for the attendance report.</li>
<li>Enter the unpaid days in the <a href="/gratuity-calculator">gratuity calculator</a> and note the difference.</li>
<li>Keep copies of approvals for any leave you believe was paid.</li>
</ol>
<h2>How much does each block of unpaid leave cost?</h2>
<p>For AED 5,000 basic and five years of service (1,826 calendar days between the first and last day), here is the effect of different amounts of unpaid leave:</p>
<table><thead><tr><th>Unpaid days</th><th>Days counted</th><th>Years counted</th><th>Gratuity (AED)</th><th>Lost vs no unpaid leave</th></tr></thead><tbody>
${[0, 15, 30, 90, 180].map(u => { const r = C.gratuityFromDates(5000, '2020-01-01', '2024-12-31', u); const b = C.gratuityFromDates(5000, '2020-01-01', '2024-12-31', 0); return `<tr><td>${u}</td><td>${1826 - u}</td><td>${r.years.toFixed(3)}</td><td>${n2(r.total)}</td><td>${n2(b.total - r.total)}</td></tr>`; }).join('')}
</tbody></table>
<p>The pattern is steady: while you are within the first five years, every unpaid day is worth about 21/365 of a year of basic pay, so a month of unpaid leave costs roughly 1.7 days of wages. Once your counted service passes five years, each unpaid day is worth more, because later years earn 30 days instead of 21.</p>
<h2>Why employers and employees disagree about it</h2>
<p>Most disputes are about records, not the rule. An employee remembers a month "off" that the employer logged as paid annual leave, or the reverse. Annual leave is fully paid, so it counts towards service; an absence the employer recorded as unpaid does not. If your employer's service calculation is shorter than yours, ask for the dates of each unpaid period. If they cannot show them, say so in writing before you sign the final settlement. If you are the employer, keep dated approvals for each unpaid period so the figure can be proved.</p>
<h2>Steps if the numbers do not match</h2>
<ol>
<li>Calculate your own figure with the calculator and save a screenshot or note of the inputs.</li>
<li>Ask the employer in writing for their service dates, unpaid days and daily wage.</li>
<li>Compare the three inputs one by one: basic salary used, service days counted, unpaid days removed.</li>
<li>If you still disagree, contact MOHRE through its official channels. The official end-of-service page expects payment within 14 days of the end of the contract, so raise the issue promptly.</li>
</ol>
<h2>Does unpaid leave affect annual leave?</h2>
<p>The pages we used do not say how unpaid leave interacts with annual leave accrual, so this site does not model it. The <a href="/annual-leave-calculator">annual leave calculator</a> counts calendar service days only. If you took long unpaid leave, check your contract and ask MOHRE.</p>`,
    faqs: [
      ['Do unpaid leave days count towards gratuity?', 'No. Days of absence without pay are excluded from the service period, according to the UAE Government Portal.'],
      ['Can unpaid leave make me lose my gratuity entirely?', 'It can if it brings your counted service under one year, because no gratuity is due for less than one year of continuous service.'],
      ['How do I enter unpaid days in the calculator?', 'Use the "Unpaid leave days" field in the <a href="/gratuity-calculator">gratuity calculator</a>; it subtracts them before applying the formula.'],
      ['Are weekends in the middle of unpaid leave counted?', 'We count calendar days. If your employer counts differently, ask for the calculation in writing.']
    ],
    sources: [SRC.eos, SRC.law],
    related: [['Gratuity calculator', '/gratuity-calculator'], ['Gratuity examples', '/guides/gratuity-examples'], ['Final settlement checklist', '/guides/final-settlement-checklist']]
  });
}

// ---------------- Resignation vs termination ----------------
guides1.push({
  path: '/guides/resignation-vs-termination',
  title: 'Resignation vs Termination in the UAE - Notice, Dues and Work Permit Ban',
  description: 'How resigning differs from being terminated under UAE labour law: notice period, pay during notice, end-of-service dues, dismissal rules and the one-year work-permit ban.',
  h1: 'Resignation vs termination in the UAE: what you get in each case',
  nav: 'guides', crumbs: crumbs('Resignation vs termination', '/guides/resignation-vs-termination'),
  intro: `<p>Whether you resign or your employer ends your contract, the same core steps apply: written notice, a notice period of 30 to 90 days, and a final settlement. The differences are in who owes what if notice is not served, when dismissal without notice is allowed, and what happens to your next work permit. This guide sets out what the UAE Government Portal and the Labour Law text say, and flags what we could not confirm.</p>`,
  body: `<h2>The common rules (Article 43)</h2>
<ul>
<li>Either party can end the contract "for any legitimate reason" with <strong>written notice</strong>.</li>
<li>The notice period is <strong>at least 30 days and no more than 90 days</strong>. The contract stays in force until it ends.</li>
<li>The worker receives the <strong>full wage during the notice period</strong>, based on the most recent salary.</li>
<li>A party that does not serve the full notice owes the other a <strong>notice-period allowance</strong>, even if no loss resulted. Estimate it with the <a href="/notice-period-pay-calculator">notice period pay calculator</a>.</li>
<li>If the employer ends the contract, the worker gets <strong>one unpaid day per week</strong> to look for a job, and must declare the chosen day at least 3 days in advance.</li>
</ul>
<h2>Side by side</h2>
<div class="tablewrap"><table><thead><tr><th></th><th>You resign</th><th>Employer terminates</th></tr></thead><tbody>
<tr><th>Written notice</th><td>Required, 30 to 90 days</td><td>Required, 30 to 90 days</td></tr>
<tr><th>Paid during notice</th><td>Yes, full wage</td><td>Yes, full wage</td></tr>
<tr><th>If notice is not served</th><td>You may owe the employer the allowance</td><td>The employer may owe you the allowance</td></tr>
<tr><th>Job-search day</th><td>Not stated</td><td>One unpaid day per week</td></tr>
<tr><th>Gratuity formula</th><td colspan="2">Set by length of service (21/30 days per year); the official page lists no reduction by reason for leaving</td></tr>
<tr><th>Leave pay, wages</th><td colspan="2">Unused annual leave and outstanding wages are due on termination of employment</td></tr>
</tbody></table></div>
<h2>Dismissal without notice (Article 44)</h2>
<p>An employer may end a contract without notice only on specific grounds. The Government Portal lists examples including forged documents, deliberate damage to property, and absence of more than 20 non-consecutive days in a year or more than 7 consecutive days. Failing basic duties after two warnings is also a ground. Dismissal requires a written investigation first, and the dismissal notice must be written, justified and handed to the employee. If you are dismissed this way, ask for the written reasons and the investigation record.</p>
<h2>Arbitrary dismissal</h2>
<p>If a court finds dismissal was arbitrary, it can order compensation, which must not exceed the employee's wage for three months, based on the last wage. You can also claim gratuity, notice-period dues and other unpaid dues.</p>
<h2>Leaving without notice (Article 45)</h2>
<p>A worker may leave without serving notice and still keep end-of-service entitlements if the employer breaches its obligations. The worker must notify MOHRE 14 working days before quitting, and the employer must have failed to fix the breach after MOHRE notified it. Workers who are assaulted or harassed must report within five working days. Do not rely on this route without taking advice: the conditions are strict.</p>
<h2>Work-permit ban</h2>
<p>Under Ministerial Resolution No. 47 of 2022, a worker who quits <strong>during probation</strong> without the employer having breached its contract cannot get a new work permit for one year from departure. The same one-year ban applies where a proven "work abandonment" report exists. See the <a href="/guides/probation-rules">probation rules guide</a>.</p>
<h2>What about gratuity if I resign?</h2>
<p>The Government Portal's end-of-service page states the gratuity formula by length of service and, in the text we reviewed, does not list a reduction for resigning. Our older guides say that the old reductions for resigning from an unlimited contract no longer apply; we have flagged this wording for review against the consolidated law text. If your employer applies a reduction, ask which article they rely on.</p>
<h2>Worked example</h2>
<p>You earn AED 9,000 a month (all basic), have 4 years of service and resign on 30 days' notice, but leave after 10. The daily rate at 30 days a month is AED 300; 20 unserved days give an allowance of about AED 6,000 that the employer may claim from you. Your gratuity is 4 &times; 21 = 84 days &times; AED ${n2(C.gratuity(9000, 4).daily)} = AED ${n2(C.gratuity(9000, 4).total)}, and any unused leave is paid in addition. Use the <a href="/end-of-service-calculator">final settlement calculator</a> to net these off.</p>`,
  faqs: [
    ['How long is the notice period for resignation in the UAE?', 'Between 30 and 90 days under Article 43; the exact period is in your contract.'],
    ['Am I paid during my notice period?', 'Yes, the full wage, based on your latest salary.'],
    ['Can my employer fire me without notice?', 'Only on the grounds listed in Article 44, after a written investigation and with a written, justified dismissal notice.'],
    ['Can I be banned from working in the UAE if I resign?', 'If you quit during probation without the employer having breached its obligations, a one-year work-permit ban applies under Ministerial Resolution No. 47 of 2022. See the probation guide.']
  ],
  sources: [SRC.term, SRC.eos, SRC.law],
  related: [['Notice period pay calculator', '/notice-period-pay-calculator'], ['Final settlement checklist', '/guides/final-settlement-checklist'], ['Probation rules', '/guides/probation-rules'], ['Gratuity calculator', '/gratuity-calculator']]
});

// ---------------- Final settlement checklist ----------------
guides1.push({
  path: '/guides/final-settlement-checklist',
  title: 'UAE Final Settlement Checklist - Gratuity, Leave Pay and Dues',
  description: 'A step-by-step checklist for your UAE final settlement: gratuity, unused leave, notice, wages, deductions, the 14-day payment deadline and what to keep.',
  h1: 'Final settlement checklist for leaving a job in the UAE',
  nav: 'guides', crumbs: crumbs('Final settlement checklist', '/guides/final-settlement-checklist'),
  intro: `<p>Your final settlement is the sum of everything your employer owes you when the contract ends. Mistakes are common and are easiest to fix before you sign anything. Use this checklist, then confirm each number with the <a href="/end-of-service-calculator">final settlement calculator</a>.</p>`,
  body: `<h2>Before your last day</h2>
<ol>
<li><strong>Confirm the notice.</strong> Notice must be in writing and last 30 to 90 days (Article 43). Keep a copy with the date it was received. You receive full wages during the notice period.</li>
<li><strong>Agree your last working day</strong> in writing. Your service dates drive gratuity.</li>
<li><strong>Check your contract</strong> for the basic salary figure, notice length and any bonus or commission terms.</li>
<li><strong>Count your unused annual leave.</strong> Use the <a href="/annual-leave-calculator">annual leave calculator</a>.</li>
<li><strong>Note unpaid leave days</strong>; they reduce gratuity service (<a href="/guides/unpaid-leave-and-gratuity">details</a>).</li>
</ol>
<h2>The items that should be in the settlement</h2>
<table><thead><tr><th>Item</th><th>How it is worked out</th><th>Tool</th></tr></thead><tbody>
<tr><td>Outstanding salary</td><td>Wages for days worked and not yet paid</td><td>-</td></tr>
<tr><td>Gratuity</td><td>21 days of basic per year for the first 5 years, 30 days after; pro rata; max two years' wages; nothing under one year</td><td><a href="/gratuity-calculator">Gratuity calculator</a></td></tr>
<tr><td>Unused annual leave</td><td>Paid on basic salary, including leave accrued for the part-year worked</td><td><a href="/leave-encashment-calculator">Leave encashment</a></td></tr>
<tr><td>Notice shortfall</td><td>If notice was not fully served, the party in default owes an allowance</td><td><a href="/notice-period-pay-calculator">Notice pay</a></td></tr>
<tr><td>Overtime, commissions</td><td>Anything already earned and unpaid; overtime is basic hourly rate plus 25% (50% for 10pm-4am)</td><td><a href="/overtime-pay-calculator">Overtime</a></td></tr>
<tr><td>Deductions</td><td>Amounts you owe the employer may be deducted from gratuity</td><td>-</td></tr>
</tbody></table>
<h2>The deadline</h2>
<p>The UAE Government Portal states that the employer must pay outstanding wages, entitlements and gratuity <strong>within 14 days of the termination of the contract</strong>. Put the date in your calendar: day one is the day after your last working day. If the deadline passes, you can raise a complaint with MOHRE through its official channels.</p>
<h2>Worked example: a full settlement</h2>
<p>Ayesha has AED 8,000 basic, six years of service, 10 unused leave days and AED 8,000 of salary for her final month. Her gratuity is AED 35,528 (see the <a href="/end-of-service-calculator">calculator example</a>), leave pay is about AED 2,667 and wages are AED 8,000. The settlement should therefore be about AED 46,195 before deductions. If her statement shows less, she asks which line is lower and why.</p>
<h2>Reading the statement</h2>
<ul>
<li>Is the gratuity based on <strong>basic salary</strong> and not on a lower figure?</li>
<li>Does the service period match your joining and last working dates, less genuine unpaid days?</li>
<li>Is the leave balance consistent with your own count?</li>
<li>Is every deduction explained, with proof of what you owed?</li>
<li>Are bonuses or commissions you earned included?</li>
</ul>
<h2>Before you sign</h2>
<p>A signature on a clearance form can be read as accepting the amounts. If a number looks wrong, write down what you believe is owed and ask for the calculation. You can sign to confirm receipt of a payment while noting that you dispute a specific item, but ask for advice if the amount is significant.</p>
<h2>Special cases</h2>
<ul>
<li><strong>DIFC and some free zones</strong> use different schemes (for DIFC, the DEWS savings scheme).</li>
<li><strong>Employers on the MOHRE savings scheme</strong> pay contributions plus returns within 14 days after employment ends; gratuity accrued before enrolment must still be settled.</li>
<li><strong>Part-time or flexible work models</strong>: gratuity is the full-time figure multiplied by contracted hours over full-time hours.</li>
<li><strong>Dismissal for cause</strong>: see <a href="/guides/resignation-vs-termination">resignation vs termination</a>.</li>
</ul>
<h2>Common disputes and how to approach them</h2>
<ul>
<li><strong>"Gratuity is calculated on total salary" (or the reverse).</strong> The official rule uses basic salary. If your contract splits pay into basic and allowances, the basic figure in the contract is the starting point. Ask for the contract page or salary certificate.</li>
<li><strong>Leave balance differences.</strong> Compare your own count with the employer's leave record; the <a href="/annual-leave-calculator">annual leave calculator</a> gives an independent figure. The pro rata part-year leave is paid too.</li>
<li><strong>Unexplained deductions.</strong> Only amounts you actually owe the employer may be deducted from gratuity. Ask for the basis of each deduction, with documents.</li>
<li><strong>Late payment.</strong> The official deadline is 14 days. Keep proof of your last day and of the date you received payment.</li>
<li><strong>Notice period disagreements.</strong> Check whether notice was given in writing, how long it was and whether it was served. See <a href="/notice-period-pay-calculator">notice period pay</a>.</li>
</ul>
<h2>A simple timeline</h2>
<ol>
<li><strong>Weeks before:</strong> give written notice, agree the last working day, count leave and unpaid days.</li>
<li><strong>Last week:</strong> return company property, ask for a draft settlement statement and a salary certificate if you need one.</li>
<li><strong>Last day:</strong> get written confirmation of the last working day.</li>
<li><strong>Within 14 days:</strong> payment should arrive. Check each line against your own calculation.</li>
<li><strong>If not paid:</strong> write to the employer asking for the payment and the calculation, then escalate through MOHRE channels.</li>
</ol>
<h2>Keep these records</h2>
<p>Employment contract and amendments, payslips, resignation or termination letter, leave approvals, the settlement statement, and proof of payment. Keep them for as long as you may need to prove a claim.</p>`,
  faqs: [
    ['When must the employer pay my final settlement?', 'Within 14 days of the termination of the contract, according to the UAE Government Portal.'],
    ['Is unused leave paid when I leave?', 'Yes. The employee is paid for unused annual leave on termination, regardless of its duration, calculated on basic salary.'],
    ['Can my employer deduct money from my gratuity?', 'Amounts you owe the employer may be deducted, per the UAE Government Portal.'],
    ['What if I worked less than a year?', 'No gratuity is due for less than one year of continuous service, but outstanding wages and unused leave are still payable.']
  ],
  sources: [SRC.eos, SRC.leave, SRC.term, SRC.hours],
  related: [['Final settlement calculator', '/end-of-service-calculator'], ['Resignation vs termination', '/guides/resignation-vs-termination'], ['Gratuity examples', '/guides/gratuity-examples']]
});
