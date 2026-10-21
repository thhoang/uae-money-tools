// Static site build. Run: node scripts/build.mjs
// Generates the new pages, refreshes the shared header/footer on the older hand-written pages,
// and writes sitemap.xml, robots.txt and 404.html. Output is committed; Cloudflare Pages serves it as-is.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, BASE, LAST_CHECKED_ISO, SRC, schemasFor, metaExtras, faqHtml, faqLd, renderPage, write, header, footer, sourcesBlock, relatedBlock, breadcrumbLd, TOOLS, GUIDES, fileFor } from './lib/layout.mjs';
import { toolPages } from './content/tools.mjs';
import { guides1 } from './content/guides1.mjs';
import { guides2 } from './content/guides2.mjs';
import { SALARIES, gratuityPage, gratuityHub, guidesHub, homePage, methodologyPage, disclaimerPage } from './content/pages.mjs';

const pages = [homePage(), guidesHub(), gratuityHub(), methodologyPage(), disclaimerPage(), ...toolPages, ...guides1, ...guides2, ...SALARIES.map(gratuityPage)];
const written = [];
for (const p of pages) { write(p.path, renderPage(p)); written.push(p.path); }

// ---- older hand-written pages: shared header/footer, sources, related links, breadcrumbs ----
const gratRel = [['Final settlement calculator', '/end-of-service-calculator'], ['Gratuity tables by salary', '/gratuity/'], ['Gratuity examples', '/guides/gratuity-examples'], ['Unpaid leave and gratuity', '/guides/unpaid-leave-and-gratuity']];
const FAQ = {
  grat: [['How is gratuity calculated in the UAE?', 'For a full-time employee with at least one year of continuous service: 21 days of basic salary for each of the first 5 years and 30 days for each year after, pro rata for part-years, capped at two years&rsquo; wages (UAE Government Portal, Article 51).'],
    ['When must the employer pay gratuity?', 'Outstanding wages, entitlements and gratuity must be paid within 14 days of the termination of the contract.'],
    ['Is there a maximum gratuity?', 'Yes. The total gratuity cannot exceed the wage of two years.'],
    ['Where can I see examples?', 'See <a href="/guides/gratuity-examples">gratuity examples</a> or the <a href="/gratuity/">gratuity tables by salary</a>.']],
  contracts: [['What happened to unlimited contracts?', 'Under Federal Decree-Law No. 33 of 2021 contracts are fixed-term. MOHRE extended the deadline for converting unlimited contracts to fixed-term until the end of 2023.'],
    ['Does contract type change my gratuity?', 'The official gratuity formula is set by length of service, not by contract type. Use the <a href="/end-of-service-calculator">final settlement calculator</a>.'],
    ['How long is the notice period?', 'Between 30 and 90 days under Article 43; see <a href="/guides/resignation-vs-termination">resignation vs termination</a>.']],
  vat: [['What is the UAE VAT rate?', 'The standard rate is 5%, per the Federal Tax Authority.'],
    ['What are the VAT registration thresholds?', 'AED 375,000 of taxable supplies and imports for mandatory registration and AED 187,500 for voluntary registration. See the <a href="/guides/vat-registration-threshold">registration threshold guide</a>.'],
    ['How do I calculate VAT on an invoice with several lines?', 'Use the <a href="/vat-invoice-calculator">VAT invoice calculator</a>, which handles standard, zero-rated and exempt lines.']]
};
const legacy = {
  '/gratuity-calculator': { nav: 'tools', app: true, desc: 'Free UAE end-of-service gratuity calculator under Article 51: 21 days per year for 5 years, 30 days after, 2-year cap, unpaid leave adjustment.', name: 'Gratuity calculator', crumb: [['Home', '/'], ['Calculators', '/#tools'], ['Gratuity calculator', '/gratuity-calculator']], sources: [SRC.eos, SRC.law], related: gratRel },
  '/vat-calculator': { nav: 'tools', app: true, name: 'VAT calculator', crumb: [['Home', '/'], ['Calculators', '/#tools'], ['VAT calculator', '/vat-calculator']], sources: [SRC.vat, SRC.vatreg], related: [['VAT invoice calculator (multiple lines)', '/vat-invoice-calculator'], ['VAT registration threshold', '/guides/vat-registration-threshold'], ['UAE VAT guide', '/guides/uae-vat-guide']] },
  '/salary-calculator': { nav: 'tools', app: true, desc: 'Free UAE salary calculator: monthly pay to annual, daily and hourly rates, take-home pay, and your basic salary share for gratuity.', name: 'Salary calculator', crumb: [['Home', '/'], ['Calculators', '/#tools'], ['Salary calculator', '/salary-calculator']], sources: [['General Pension and Social Security Authority (GPSSA)', 'https://gpssa.gov.ae']], note: 'The pension-contribution percentage used for UAE nationals should be confirmed on the GPSSA website.', related: [['Overtime pay calculator', '/overtime-pay-calculator'], ['Monthly budget calculator', '/monthly-budget-calculator'], ['Final settlement calculator', '/end-of-service-calculator']] },
  '/guides/how-gratuity-is-calculated': { nav: 'guides', desc: 'How UAE end-of-service gratuity is calculated: the Article 51 formula, a worked example, and the rules most people miss.', crumb: [['Home', '/'], ['Guides', '/guides/'], ['How gratuity is calculated', '/guides/how-gratuity-is-calculated']], faqs: FAQ.grat, sources: [SRC.eos, SRC.law], related: gratRel },
  '/guides/limited-vs-unlimited-contracts': { nav: 'guides', desc: 'UAE limited vs unlimited contracts: the 2022 labour law made all contracts fixed-term, and gratuity rules are now the same for everyone.', crumb: [['Home', '/'], ['Guides', '/guides/'], ['Limited vs unlimited contracts', '/guides/limited-vs-unlimited-contracts']], faqs: FAQ.contracts, sources: [SRC.contracts, SRC.unlimited, SRC.law], related: [['Resignation vs termination', '/guides/resignation-vs-termination'], ['Probation rules', '/guides/probation-rules'], ['Final settlement calculator', '/end-of-service-calculator']] },
  '/guides/uae-vat-guide': { nav: 'guides', crumb: [['Home', '/'], ['Guides', '/guides/'], ['UAE VAT guide', '/guides/uae-vat-guide']], faqs: FAQ.vat, sources: [SRC.vat, SRC.vatreg, SRC.vatguide], related: [['VAT registration threshold', '/guides/vat-registration-threshold'], ['VAT calculator', '/vat-calculator'], ['VAT invoice calculator', '/vat-invoice-calculator']] },
  '/about': { nav: '', kind: 'about', crumb: [['Home', '/'], ['About', '/about']] },
  '/contact': { nav: '', kind: 'contact', crumb: [['Home', '/'], ['Contact', '/contact']] },
  '/privacy': { nav: '', kind: 'page', crumb: [['Home', '/'], ['Privacy', '/privacy']] }
};
for (const [p, cfg] of Object.entries(legacy)) {
  const f = path.join(ROOT, fileFor(p));
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/<header class="site">[\s\S]*?<\/header>/, header(cfg.nav));
  h = h.replace(/<footer class="site">[\s\S]*?<\/footer>/, footer());
  if (p === '/contact' && process.env.CONTACT_EMAIL && !h.includes('mailto:')) {
    const e = process.env.CONTACT_EMAIL;
    h = h.replace('<p>When reporting a calculation problem', `<p>You can also email us: <a href="mailto:${e}">${e}</a></p>
<p>When reporting a calculation problem`);
  }
  if (cfg.faqs && !h.includes('FAQPage')) h = h.replace('</head>', `${faqLd(cfg.faqs)}</head>`);
  if (cfg.faqs && !h.includes('class="faq"')) h = h.replace('</div></main>', `<article>${faqHtml(cfg.faqs)}</article>
</div></main>`);
  if (!h.includes('class="sources"') && cfg.sources) {
    h = h.replace('</div></main>', `${relatedBlock(cfg.related)}\n${sourcesBlock(cfg.sources, cfg.note)}\n</div></main>`);
  }
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (cfg.desc) h = h.replace(/(<meta name="description" content=")[^"]*"/, `$1${cfg.desc}"`);
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const h1 = (h.match(/<h1>([^<]*)<\/h1>/) || [])[1];
  if (!h.includes('twitter:card')) h = h.replace('<link rel="icon"', `${metaExtras(title, desc)}
<link rel="icon"`);
  if (!h.includes('og:title')) h = h.replace('<link rel="icon"', `<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${BASE}${p}">
<link rel="icon"`);
  if (!h.includes('"@id"')) {
    const o = { path: p, title, description: desc, h1, kind: cfg.kind, app: cfg.app };
    // keep any existing WebApplication/FAQPage; add only what is missing
    let extra = schemasFor(o, BASE + p);
    if (h.includes('"WebApplication"')) extra = extra.split(/\r?\n/).filter(x => !x.includes('"WebApplication"')).join(' ');
    h = h.replace('</head>', `${extra}
</head>`);
  }
  if (cfg.crumb && !h.includes('BreadcrumbList')) h = h.replace('</head>', `${breadcrumbLd(cfg.crumb)}\n</head>`);
  fs.writeFileSync(f, h);
}

// ---- 404 ----
fs.writeFileSync(path.join(ROOT, '404.html'), `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page not found | UAE Money Tools</title>
<meta name="description" content="The page you asked for does not exist. Try one of our free UAE calculators or guides.">
<meta name="robots" content="noindex">
<link rel="stylesheet" href="/assets/style.css"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"></head>
<body>
${header('')}
<main><div class="wrap"><article><h1>Page not found</h1>
<p>The page you asked for does not exist. Try one of our free tools:</p>
<ul>${TOOLS.map(t => `<li><a href="${t.path}">${t.name}</a></li>`).join('')}<li><a href="/guides/">All guides</a></li><li><a href="/">Home</a></li></ul>
</article></div></main>
${footer()}
</body></html>
`);

// ---- sitemap + robots ----
const urls = [...new Set([...Object.keys(legacy), ...written, '/'])];
const prio = u => u === '/' ? '1.0' : u.startsWith('/gratuity/salary-') ? '0.4' : ['/about', '/contact', '/privacy', '/disclaimer'].includes(u) ? '0.3' : u.startsWith('/guides/') ? '0.7' : '0.8';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.sort().map(u => `  <url><loc>${BASE}${u}</loc><lastmod>${LAST_CHECKED_ISO}</lastmod><priority>${prio(u)}</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);

console.log(`Built ${written.length} pages, refreshed ${Object.keys(legacy).length} older pages, sitemap has ${urls.length} URLs.`);
