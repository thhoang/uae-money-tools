// Run: node scripts/test.mjs
// Checks assets/calc.js against hand-computed examples (see TESTS.md for the working).
import { createRequire } from 'node:module';
const C = createRequire(import.meta.url)('../assets/calc.js');

let failed = 0;
const near = (name, got, want, tol = 0.005) => {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) failed++;
  console.log((ok ? 'PASS ' : 'FAIL ') + name + ' -> ' + got + (ok ? '' : ' (expected ' + want + ')'));
};
const eq = (name, got, want) => {
  const ok = got === want;
  if (!ok) failed++;
  console.log((ok ? 'PASS ' : 'FAIL ') + name + ' -> ' + got + (ok ? '' : ' (expected ' + want + ')'));
};

// Gratuity (Article 51)
near('gratuity 6000 x 7.25y', C.gratuity(6000, 7.25).total, 34027.40);
near('gratuity 3000 x 1y', C.gratuity(3000, 1).total, 2071.23);
near('gratuity 10000 x 5y', C.gratuity(10000, 5).total, 34520.55);
near('gratuity 6000 x 30y is capped at 24 months', C.gratuity(6000, 30).total, 144000);
eq('gratuity 6000 x 30y flagged capped', C.gratuity(6000, 30).capped, true);
near('gratuity under 1 year', C.gratuity(8000, 0.9).total, 0);
near('gratuity from dates 2020-01-01..2025-01-01', C.gratuityFromDates(5000, '2020-01-01', '2025-01-01', 0).total, 5000 * 12 / 365 * (105 + 30 * (1827 / 365 - 5)));
near('gratuity unpaid leave excluded (1y + 100 unpaid -> <1y)', C.gratuityFromDates(5000, '2024-01-01', '2025-01-01', 100).total, 0);
near('cap reached after 25.83 years', C.capYear(6000), 25.8333, 0.001);
eq('daysBetween across leap day', C.daysBetween('2024-02-28', '2024-03-01'), 2);

// Leave, notice, overtime
near('leave encashment 5000 basic, 12 days, /30', C.leaveEncashment(5000, 12, 30).total, 2000);
near('notice allowance 9000, 30 required, 10 served', C.noticeAllowance(9000, 30, 10, 30).total, 6000);
near('notice allowance when fully served', C.noticeAllowance(9000, 30, 30, 30).total, 0);
const ot = C.overtime(6000, { divisor: 30, hoursPerDay: 8, dayHours: 4, nightHours: 2, offDayHours: 1 });
near('overtime hourly rate', ot.hourly, 25);
near('overtime total (4h@125% + 2h@150% + 1h@150%)', ot.total, 237.5);

// Annual leave
near('leave 1 year', C.annualLeave('2025-01-01', '2026-01-01', 0).accrued, 30);
near('leave 546 days = 1.4959y x 30', C.annualLeave('2025-01-01', '2026-07-01', 0).accrued, 546 / 365 * 30);
near('leave 6 completed months = 12 days', C.annualLeave('2025-01-01', '2025-08-01', 0).accrued, 12);
eq('leave under 6 months -> basis none', C.annualLeave('2025-01-01', '2025-03-01', 0).basis, 'none');
near('leave balance after taking 10 days', C.annualLeave('2025-01-01', '2026-01-01', 10).balance, 20);

// VAT invoice
const inv = C.vatInvoice([{ qty: 10, price: 250, cat: 'std' }, { qty: 4, price: 120, cat: 'zero' }, { qty: 1, price: 99.99, cat: 'exempt' }]);
near('invoice net', inv.net, 3079.99);
near('invoice vat', inv.vat, 125);
near('invoice gross', inv.gross, 3204.99);

// Budget
const b = C.budget(15000, [5000, 1200, 2000, 800]);
near('budget left', b.left, 6000);
near('budget savings rate %', b.savingsRate, 40);

console.log(failed ? '\n' + failed + ' FAILED' : '\nAll tests passed');
process.exit(failed ? 1 : 0);
