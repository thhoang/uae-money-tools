/* UAE Money Tools - calculator page wiring. All maths is in calc.js; nothing leaves the browser. */
(function () {
  var C = window.UAEcalc, f = C.fmtAED;
  var $ = function (id) { return document.getElementById(id); };
  var num = function (id) { var v = parseFloat($(id).value); return isNaN(v) ? 0 : v; };
  var set = function (id, t) { var e = $(id); if (e) e.textContent = t; };
  var days = function (n) { return (Math.round(n * 100) / 100) + ' day' + (n === 1 ? '' : 's'); };
  function bind(ids, fn) {
    ids.forEach(function (id) { var e = $(id); e.addEventListener('input', fn); e.addEventListener('change', fn); });
    fn();
  }
  function show(ok) { $('out').hidden = !ok; if ($('warn')) $('warn').hidden = true; }
  function warn(msg) { $('out').hidden = true; $('warn').hidden = !msg; $('warn').textContent = msg || ''; }
  var today = new Date().toISOString().slice(0, 10);

  var tools = {
    leave: function () {
      bind(['basic', 'unused', 'divisor'], function () {
        if (!(num('basic') > 0) || !(num('unused') > 0)) return show(false);
        var r = C.leaveEncashment(num('basic'), num('unused'), num('divisor'));
        show(true);
        set('total', f(r.total)); set('r-daily', f(r.daily)); set('r-days', days(num('unused')));
      });
    },
    notice: function () {
      bind(['wage', 'required', 'served', 'divisor'], function () {
        if (!(num('wage') > 0) || !(num('required') > 0)) return show(false);
        var r = C.noticeAllowance(num('wage'), num('required'), num('served'), num('divisor'));
        show(true);
        set('total', f(r.total)); set('r-daily', f(r.daily)); set('r-short', days(r.shortDays));
        set('r-wage', f(num('wage')));
      });
    },
    overtime: function () {
      bind(['basic', 'divisor', 'hpd', 'dayh', 'nighth', 'offh'], function () {
        if (!(num('basic') > 0)) return show(false);
        var r = C.overtime(num('basic'), { divisor: num('divisor'), hoursPerDay: num('hpd') || 8, dayHours: num('dayh'), nightHours: num('nighth'), offDayHours: num('offh') });
        show(true);
        set('total', f(r.total)); set('r-hourly', f(r.hourly)); set('r-day', f(r.day)); set('r-night', f(r.night)); set('r-off', f(r.off));
      });
    },
    leavedays: function () {
      $('asof').value = today;
      bind(['start', 'asof', 'taken'], function () {
        if (!$('start').value || !$('asof').value || $('asof').value <= $('start').value) return show(false);
        var r = C.annualLeave($('start').value, $('asof').value, num('taken'));
        if (r.basis === 'none') return warn('Under 6 months of service: the official sources this tool relies on do not state an annual leave accrual for this period, so none is shown.');
        show(true);
        set('total', days(r.balance) + ' remaining');
        set('r-service', Math.floor(r.years) + ' year(s), ' + (r.months % 12) + ' month(s)');
        set('r-accrued', days(r.accrued)); set('r-taken', days(num('taken')));
        set('r-basis', r.basis === 'full' ? '30 days per year of service (pro rata for the part-year)' : '2 days per completed month (6 to 12 months of service)');
      });
    },
    eos: function () {
      $('end').value = today;
      bind(['basic', 'start', 'end', 'unpaid', 'unused', 'leavediv', 'noticeshort', 'noticewho', 'wages', 'deduct'], function () {
        var b = num('basic');
        if (!(b > 0) || !$('start').value || !$('end').value || $('end').value <= $('start').value) return show(false);
        var g = C.gratuityFromDates(b, $('start').value, $('end').value, num('unpaid'));
        var l = C.leaveEncashment(b, num('unused'), num('leavediv'));
        var who = $('noticewho').value, per = b / 30;
        var notice = who === 'employer' ? num('noticeshort') * per : who === 'employee' ? -num('noticeshort') * per : 0;
        var net = g.total + l.total + notice + num('wages') - num('deduct');
        show(true);
        set('total', f(net));
        set('r-grat', g.eligible ? f(g.total) : 'AED 0.00 (under 1 year)');
        set('r-leave', f(l.total));
        set('r-notice', notice === 0 ? 'AED 0.00' : (notice > 0 ? '+ ' : '- ') + f(Math.abs(notice)));
        set('r-wages', f(num('wages'))); set('r-deduct', '- ' + f(num('deduct')));
      });
    },
    vatinvoice: function () {
      var body = $('lines');
      function row(desc, qty, price, cat) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td><input aria-label="Description" type="text" class="d"></td>' +
          '<td><input aria-label="Quantity" class="q" type="number" min="0" step="any" inputmode="decimal"></td>' +
          '<td><input aria-label="Unit price excluding VAT" class="p" type="number" min="0" step="any" inputmode="decimal"></td>' +
          '<td><select aria-label="VAT treatment" class="c"><option value="std">5% standard</option><option value="zero">0% zero-rated</option><option value="exempt">Exempt</option></select></td>' +
          '<td class="lt">-</td><td><button type="button" class="rm" aria-label="Remove line">&times;</button></td>';
        tr.querySelector('.d').value = desc; tr.querySelector('.q').value = qty;
        tr.querySelector('.p').value = price; tr.querySelector('.c').value = cat;
        body.appendChild(tr);
      }
      row('Consulting service', 10, 250, 'std'); row('Exported goods', 4, 120, 'zero'); row('', '', '', 'std');
      function calc() {
        var lines = [].map.call(body.rows, function (tr) {
          return { qty: parseFloat(tr.querySelector('.q').value) || 0, price: parseFloat(tr.querySelector('.p').value) || 0, cat: tr.querySelector('.c').value };
        });
        var r = C.vatInvoice(lines, num('rate'));
        [].forEach.call(body.rows, function (tr, i) { tr.querySelector('.lt').textContent = r.lines[i].gross ? f(r.lines[i].gross) : '-'; });
        $('out').hidden = !(r.net > 0);
        set('total', 'Invoice total: ' + f(r.gross));
        set('r-net', f(r.net)); set('r-vat', f(r.vat));
        set('r-std', f(r.byCat.std)); set('r-zero', f(r.byCat.zero)); set('r-exempt', f(r.byCat.exempt));
      }
      body.addEventListener('input', calc); body.addEventListener('change', calc);
      $('rate').addEventListener('input', calc);
      body.addEventListener('click', function (e) { if (e.target.classList.contains('rm')) { e.target.closest('tr').remove(); calc(); } });
      $('add').addEventListener('click', function () { row('', '', '', 'std'); calc(); });
      calc();
    },
    budget: function () {
      var ids = [].map.call(document.querySelectorAll('.exp'), function (e) { return e.id; });
      bind(['income'].concat(ids), function () {
        var inc = num('income');
        if (!(inc > 0)) return show(false);
        var r = C.budget(inc, ids.map(num));
        show(true);
        set('total', (r.left >= 0 ? 'Left over: ' : 'Over budget by: ') + f(Math.abs(r.left)));
        set('r-spent', f(r.spent)); set('r-income', f(inc)); set('r-rate', (Math.round(r.savingsRate * 10) / 10) + '%');
        set('r-annual', f(r.left * 12));
        ids.forEach(function (id) { set('s-' + id, (Math.round(num(id) / inc * 1000) / 10) + '%'); });
      });
    }
  };
  var el = document.querySelector('[data-tool]');
  if (el && tools[el.getAttribute('data-tool')]) tools[el.getAttribute('data-tool')]();
})();
