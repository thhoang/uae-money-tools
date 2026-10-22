/* UAE Money Tools - shared calculation logic (pure functions, no DOM).
   Used by the calculator pages in the browser, by scripts/test.mjs and by the
   build script that pre-computes the gratuity tables. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.UAEcalc = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var r2 = function (n) { return Math.round((n + Number.EPSILON) * 100) / 100; };
  var DAY_MS = 86400000;

  // Whole days between two ISO dates (yyyy-mm-dd), end minus start.
  function daysBetween(a, b) {
    return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / DAY_MS);
  }

  // Article 51: 21 days/year for first 5 years, 30 days/year after, pro rata,
  // capped at 2 years' wages; nothing under 1 year. Daily wage = annual basic / 365.
  function gratuity(basic, years) {
    var daily = basic * 12 / 365;
    if (!(basic > 0) || years < 1) {
      return { eligible: false, years: years, daily: daily, days1: 0, days2: 0, part1: 0, part2: 0, uncapped: 0, cap: basic * 24, capped: false, total: 0 };
    }
    var y1 = Math.min(years, 5), y2 = Math.max(years - 5, 0);
    var part1 = y1 * 21 * daily, part2 = y2 * 30 * daily, uncapped = part1 + part2, cap = basic * 24;
    return {
      eligible: true, years: years, daily: daily,
      days1: y1 * 21, days2: y2 * 30, part1: part1, part2: part2,
      uncapped: uncapped, cap: cap, capped: uncapped > cap, total: Math.min(uncapped, cap)
    };
  }
  function gratuityFromDates(basic, startIso, endIso, unpaidDays) {
    var days = Math.max(daysBetween(startIso, endIso) - (unpaidDays || 0), 0);
    return gratuity(basic, days / 365);
  }
  // First service year (as a fraction, 0.1 steps refined) at which the 2-year cap is reached.
  function capYear(basic) {
    // 105*d + 30*d*(y-5) = 24*basic, d = basic*12/365  ->  y = 5 + (24*basic/d - 105)/30
    var d = basic * 12 / 365;
    return 5 + (24 * basic / d - 105) / 30;
  }

  // Unused annual leave is paid on basic salary. The official pages do not state
  // the daily divisor, so it is a parameter (default 30).
  function leaveEncashment(basic, unusedDays, divisor) {
    divisor = divisor || 30;
    var daily = basic / divisor;
    return { daily: daily, total: daily * unusedDays };
  }

  // Allowance owed when notice is not fully served (wage for the unserved days).
  function noticeAllowance(monthlyWage, requiredDays, servedDays, divisor) {
    divisor = divisor || 30;
    var short = Math.max(requiredDays - servedDays, 0), daily = monthlyWage / divisor;
    return { shortDays: short, daily: daily, total: short * daily };
  }

  // Overtime: normal hourly rate (basic) + 25%; + 50% for 10pm-4am; off-day work + 50%.
  function overtime(basic, o) {
    var divisor = o.divisor || 30, hpd = o.hoursPerDay || 8;
    var hourly = basic / divisor / hpd;
    var day = (o.dayHours || 0) * hourly * 1.25;
    var night = (o.nightHours || 0) * hourly * 1.5;
    var off = (o.offDayHours || 0) * hourly * 1.5;
    return { hourly: hourly, day: day, night: night, off: off, total: day + night + off };
  }

  // Annual leave accrued: 2 days per month for 6-12 months, 30 days/year after one
  // year (pro rata for the part-year). Under 6 months: not stated in the sources used.
  function annualLeave(startIso, asOfIso, takenDays) {
    var days = Math.max(daysBetween(startIso, asOfIso), 0), years = days / 365;
    var months = Math.floor(days / 365 * 12), accrued, basis;
    if (years >= 1) { accrued = years * 30; basis = 'full'; }
    else if (months >= 6) { accrued = months * 2; basis = 'partial'; }
    else { accrued = 0; basis = 'none'; }
    var taken = takenDays || 0;
    return { serviceDays: days, years: years, months: months, basis: basis, accrued: accrued, balance: Math.max(accrued - taken, 0) };
  }

  // Invoice lines: {qty, price, cat: 'std'|'zero'|'exempt'}; prices are VAT-exclusive.
  function vatInvoice(lines, rate) {
    rate = rate == null ? 5 : rate;
    var out = { lines: [], net: 0, vat: 0, gross: 0, byCat: { std: 0, zero: 0, exempt: 0 } };
    lines.forEach(function (l) {
      var net = r2((l.qty || 0) * (l.price || 0));
      var vat = l.cat === 'std' ? r2(net * rate / 100) : 0;
      out.lines.push({ net: net, vat: vat, gross: r2(net + vat) });
      out.net += net; out.vat += vat; out.byCat[l.cat] = (out.byCat[l.cat] || 0) + net;
    });
    out.net = r2(out.net); out.vat = r2(out.vat); out.gross = r2(out.net + out.vat);
    return out;
  }

  function budget(income, expenses) {
    var spent = expenses.reduce(function (a, b) { return a + (b || 0); }, 0);
    var left = income - spent;
    return { spent: spent, left: left, savingsRate: income > 0 ? left / income * 100 : 0 };
  }

  var fmtAED = function (n) {
    return 'AED ' + Number(n).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return {
    r2: r2, daysBetween: daysBetween, gratuity: gratuity, gratuityFromDates: gratuityFromDates,
    capYear: capYear, leaveEncashment: leaveEncashment, noticeAllowance: noticeAllowance,
    overtime: overtime, annualLeave: annualLeave, vatInvoice: vatInvoice, budget: budget, fmtAED: fmtAED
  };
});
