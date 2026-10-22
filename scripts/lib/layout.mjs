// Shared page shell, registries and helpers for the static-site build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const BASE = 'https://uae-money-tools.pages.dev';
export const LAST_CHECKED = '21 October 2026';
export const LAST_CHECKED_ISO = '2026-10-21';

// Official sources (only these are cited as the basis for legal/tax facts).
export const SRC = {
  eos: ['UAE Government Portal - End of service benefits in the private sector', 'https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/end-of-service-benefits-for-employees-in-the-private-sector'],
  leave: ['UAE Government Portal - Types of leaves', 'https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/Types-of-leaves'],
  term: ['UAE Government Portal - Terminating employment contracts and arbitrary dismissal', 'https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/terminating-employment-contracts'],
  hours: ['UAE Government Portal - Working hours and overtime', 'https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/working-hours'],
  contracts: ['UAE Government Portal - Employment contracts: duration and models', 'https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/employment-contracts-duration-and-models-in-the-private-sector'],
  law: ['MOHRE - Federal Decree-Law No. 33 of 2021 (full text)', 'https://mohre.gov.ae/assets/download/8cd7cf08/Federal%20Decree-Law%20No.%2033%20of%202021%20Regarding%20the%20Regulation%20of%20Employment%20Relationship%20and%20its%20amendments.pdf.aspx'],
  ramadan: ['MOHRE - Reduction of working hours by two hours daily during Ramadan (2026 notice)', 'https://www.mohre.gov.ae/en/media-center/news/12/2/2026/reduction-of-working-hours-for-private-sector-employees-by-two-hours-daily-during-the-holy-month-of'],
  unlimited: ['MOHRE - Deadline to rectify unlimited-term contracts extended to end of 2023', 'https://mohre.gov.ae/en/media-center/news/30/1/2023/until-end-of-2023-ministry-extends-deadline-to-rectify-unlimited-term-employment-contracts-in-privat'],
  vatreg: ['Federal Tax Authority - Registration for VAT', 'https://tax.gov.ae/en/taxes/Vat/vat.topics/registration.for.vat.aspx'],
  vat: ['Federal Tax Authority - Value Added Tax', 'https://tax.gov.ae/en/taxes/vat.aspx'],
  vatguide: ['Federal Tax Authority - VAT user guide', 'https://tax.gov.ae/DataFolder/Files/Pdf/VAT%20User%20Guide_English_V9.0%2016%2011%202021.pdf']
};

export const TOOLS = [
  { path: '/gratuity-calculator', name: 'Gratuity calculator', blurb: 'End-of-service gratuity under Article 51, with the 2-year cap and unpaid-leave adjustment.' },
  { path: '/end-of-service-calculator', name: 'Final settlement calculator', blurb: 'Gratuity + unused leave + notice shortfall + unpaid wages in one total.' },
  { path: '/leave-encashment-calculator', name: 'Leave encashment calculator', blurb: 'What your unused annual leave days are worth in cash.' },
  { path: '/notice-period-pay-calculator', name: 'Notice period pay calculator', blurb: 'Allowance for notice days not served.' },
  { path: '/overtime-pay-calculator', name: 'Overtime pay calculator', blurb: 'Overtime at +25%, night hours at +50%, off-day work at +50%.' },
  { path: '/annual-leave-calculator', name: 'Annual leave days calculator', blurb: 'How many leave days you have accrued and how many remain.' },
  { path: '/vat-calculator', name: 'VAT calculator', blurb: 'Add or remove 5% VAT from a single amount.' },
  { path: '/vat-invoice-calculator', name: 'VAT invoice calculator', blurb: 'Multi-line invoice with standard, zero-rated and exempt lines.' },
  { path: '/salary-calculator', name: 'Salary calculator', blurb: 'Take-home pay, annual, daily and hourly rates.' },
  { path: '/monthly-budget-calculator', name: 'Monthly budget calculator', blurb: 'Simple cost-of-living budget: income, spending and savings rate.' }
];

export const GUIDES = [
  { path: '/guides/how-gratuity-is-calculated', name: 'How gratuity is calculated in the UAE', blurb: 'The formula, a worked example, and the rules most people miss.' },
  { path: '/guides/gratuity-examples', name: 'Gratuity examples at different salaries and years', blurb: 'A lookup table from AED 3,000 to AED 20,000 basic and 1 to 20 years.' },
  { path: '/guides/unpaid-leave-and-gratuity', name: 'Unpaid leave and gratuity', blurb: 'How days without pay shorten the service period, with examples.' },
  { path: '/guides/resignation-vs-termination', name: 'Resignation vs termination', blurb: 'Notice, final dues and the work-permit ban compared.' },
  { path: '/guides/final-settlement-checklist', name: 'Final settlement checklist', blurb: 'Every item to check before you sign off your final dues.' },
  { path: '/guides/probation-rules', name: 'Probation rules in the UAE', blurb: 'Length, leave during probation and the one-year ban on quitting.' },
  { path: '/guides/ramadan-working-hours', name: 'Working hours in Ramadan', blurb: 'The 2-hour reduction and what it means for overtime.' },
  { path: '/guides/limited-vs-unlimited-contracts', name: 'Limited vs unlimited contracts', blurb: 'What changed in 2022 and why contracts are now fixed-term.' },
  { path: '/guides/vat-registration-threshold', name: 'VAT registration threshold', blurb: 'AED 375,000 mandatory, AED 187,500 voluntary, and the 30-day test.' },
  { path: '/guides/uae-vat-guide', name: 'UAE VAT guide', blurb: 'Rate, zero-rated vs exempt, and tourist refunds.' }
];

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const stripTags = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&rsquo;/g, "'").replace(/\s+/g, ' ').trim();

export const SITE_NAME = 'UAE Money Tools';
export const PUBLISHED_ISO = '2026-10-20';
export const ORG = { '@type': 'Organization', '@id': BASE + '/#org', name: SITE_NAME, url: BASE + '/', logo: { '@type': 'ImageObject', url: BASE + '/assets/favicon.svg' } };
const ld = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

// Page kind drives which schema.org types are emitted.
export function kindOf(o) {
  if (o.kind) return o.kind;
  if (o.path === '/') return 'home';
  if (o.path === '/guides/' || o.path === '/gratuity/') return 'hub';
  if (o.path.startsWith('/guides/')) return 'guide';
  if (o.path.startsWith('/gratuity/salary-')) return 'table';
  if (o.app) return 'tool';
  return 'page';
}

export function schemasFor(o, canonical) {
  const kind = kindOf(o), out = [];
  const webpage = type => ({ '@context': 'https://schema.org', '@type': type, '@id': canonical + '#webpage', url: canonical, name: o.title, description: o.description, inLanguage: 'en-AE', isPartOf: { '@id': BASE + '/#website' }, publisher: { '@id': BASE + '/#org' }, dateModified: LAST_CHECKED_ISO });
  if (kind === 'home') {
    out.push({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': BASE + '/#website', url: BASE + '/', name: SITE_NAME, description: o.description, inLanguage: 'en-AE', publisher: { '@id': BASE + '/#org' } });
    out.push({ '@context': 'https://schema.org', ...ORG, description: 'Independent free calculators and guides for money and employment questions in the UAE.' });
    out.push(webpage('WebPage'));
  } else if (kind === 'guide' || kind === 'table') {
    out.push({ '@context': 'https://schema.org', '@type': 'Article', headline: o.h1, description: o.description, mainEntityOfPage: canonical, url: canonical, inLanguage: 'en-AE', datePublished: PUBLISHED_ISO, dateModified: LAST_CHECKED_ISO, author: { '@id': BASE + '/#org' }, publisher: ORG, image: BASE + '/assets/favicon.svg', isPartOf: { '@id': BASE + '/#website' } });
  } else if (kind === 'hub') {
    const w = webpage('CollectionPage');
    if (o.items) w.mainEntity = { '@type': 'ItemList', numberOfItems: o.items.length, itemListElement: o.items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, url: BASE + url })) };
    out.push(w);
  } else if (kind === 'about') out.push(webpage('AboutPage'));
  else if (kind === 'contact') out.push(webpage('ContactPage'));
  else if (kind === 'tool') {
    out.push({ '@context': 'https://schema.org', '@type': 'WebApplication', '@id': canonical + '#app', name: o.h1, url: canonical, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', inLanguage: 'en-AE', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'AED' }, description: o.description, publisher: { '@id': BASE + '/#org' }, dateModified: LAST_CHECKED_ISO });
    out.push(webpage('WebPage'));
  } else out.push(webpage('WebPage'));
  return out.map(ld).join('\n');
}

// Social / browser meta shared by all pages.
export const metaExtras = (title, desc, url) => `<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
<meta name="theme-color" content="#00732F">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:locale" content="en_AE">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">`;

export const header = (current = '') => `<header class="site"><div class="wrap">
  <a class="logo" href="/"><svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#fff" opacity=".18"/><text x="32" y="42" font-family="Arial,sans-serif" font-size="26" font-weight="bold" fill="#fff" text-anchor="middle">DH</text></svg>UAE Money Tools</a>
  <nav class="main" aria-label="Main"><ul>
    <li><a href="/#tools"${current === 'tools' ? ' aria-current="page"' : ''}>Calculators</a></li>
    <li><a href="/guides/"${current === 'guides' ? ' aria-current="page"' : ''}>Guides</a></li>
    <li><a href="/gratuity/"${current === 'tables' ? ' aria-current="page"' : ''}>Gratuity tables</a></li>
    <li><a href="/methodology"${current === 'method' ? ' aria-current="page"' : ''}>Methodology</a></li>
  </ul></nav>
</div></header>`;

export const footer = () => `<footer class="site"><div class="wrap">
  <div><h4>Calculators</h4><ul>
${TOOLS.map(t => `    <li><a href="${t.path}">${esc(t.name)}</a></li>`).join('\n')}
  </ul></div>
  <div><h4>Guides</h4><ul>
${GUIDES.slice(0, 8).map(g => `    <li><a href="${g.path}">${esc(g.name)}</a></li>`).join('\n')}
    <li><a href="/guides/">All guides</a></li>
  </ul></div>
  <div><h4>Site</h4><ul>
    <li><a href="/gratuity/">Gratuity tables</a></li>
    <li><a href="/methodology">Methodology</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/privacy">Privacy</a></li>
    <li><a href="/disclaimer">Disclaimer</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul></div>
  <p class="legal">UAE Money Tools provides free calculators for general information only. It is not legal, tax or financial advice. Figures are estimates based on rules published by official UAE government sources. See the <a href="/disclaimer">disclaimer</a>.</p>
</div></footer>`;

export const adSlot = name => `<!-- AD SLOT: ${name} - intentionally empty. Ad code is added here only after ad-network approval. -->
<div class="ad-slot" data-slot="${name}" aria-hidden="true"></div>`;

export const sourcesBlock = (sources, extraNote = '') => `<section class="sources" aria-labelledby="src-h">
<h2 id="src-h">Sources and last checked</h2>
${sources.length ? `<ul>
${sources.map(([label, url]) => `  <li><a href="${url}" rel="noopener">${esc(label)}</a></li>`).join('\n')}
</ul>` : ''}
<p class="checked">Last checked against these sources: <time datetime="${LAST_CHECKED_ISO}">${LAST_CHECKED}</time>. Laws and fees change; confirm with the linked source before you rely on a figure.${extraNote ? ' ' + extraNote : ''}</p>
</section>`;

export const relatedBlock = links => links && links.length ? `<section class="related" aria-labelledby="rel-h">
<h2 id="rel-h">Related tools and guides</h2>
<ul>
${links.map(([label, url]) => `  <li><a href="${url}">${esc(label)}</a></li>`).join('\n')}
</ul>
</section>` : '';

export const faqHtml = faqs => faqs && faqs.length ? `<h2>Frequently asked questions</h2>
${faqs.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${a}</p></details>`).join('\n')}` : '';

export const faqLd = faqs => faqs && faqs.length ? `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } }))
})}</script>` : '';

export const breadcrumbLd = crumbs => `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: BASE + url }))
})}</script>`;

export const breadcrumbHtml = crumbs => `<p class="breadcrumb">${crumbs.map(([name, url], i) =>
  i === crumbs.length - 1 ? esc(name) : `<a href="${url}">${esc(name)}</a>`).join(' &rsaquo; ')}</p>`;

// url path -> output file
export const fileFor = p => p.endsWith('/') ? p.slice(1) + 'index.html' : p.slice(1) + '.html';

/**
 * Render a full page.
 * opts: path, title, description, h1, crumbs[[name,url]...] (including current last), nav,
 *       intro (html under the h1), body (html), tool (html placed between intro and body),
 *       faqs [[q,a]], sources [[label,url]], related [[label,url]], script (extra script src list),
 *       ld (extra json-ld html), type ('WebApplication' adds app schema), noindex, sourceNote
 */
export function renderPage(o) {
  const canonical = BASE + (o.path === '/' ? '/' : o.path);
  const crumbs = o.crumbs || [['Home', '/'], [o.h1, o.path]];
  const scripts = (o.scripts || []).map(s => `<script src="${s}" defer></script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
<link rel="canonical" href="${canonical}">
${o.noindex ? '<meta name="robots" content="noindex,follow">' : metaExtras(o.title, o.description, canonical)}
<meta property="og:type" content="${o.path === '/' ? 'website' : 'article'}">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.description)}">
<meta property="og:url" content="${canonical}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/style.css">
${schemasFor(o, canonical)}
${breadcrumbLd(crumbs)}
${faqLd(o.faqs)}
${o.ld || ''}
</head>
<body>
${header(o.nav)}
<main><div class="wrap">
${breadcrumbHtml(crumbs)}
<article>
<h1>${esc(o.h1)}</h1>
${o.intro || ''}
</article>
${o.tool || ''}
${adSlot('top-of-content')}
<article>
${o.body || ''}
${faqHtml(o.faqs)}
</article>
${relatedBlock(o.related)}
${adSlot('bottom-of-content')}
${sourcesBlock(o.sources || [], o.sourceNote)}
<p class="disclaimer">General information only, not legal, tax or financial advice. <a href="/disclaimer">Read the disclaimer</a>.</p>
</div></main>
${footer()}
${scripts}
</body>
</html>
`;
}

export function write(p, html) {
  const f = path.join(ROOT, fileFor(p));
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
  return f;
}

// ---- tool form helpers ----
export const field = (id, label, o = {}) => `<div class="field"><label for="${id}">${label}</label>
${o.select ? `<select id="${id}">${o.select.map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select>`
  : `<input id="${id}" type="${o.type || 'number'}"${o.type === 'date' || o.type === 'text' ? '' : ' min="0" step="any" inputmode="decimal"'}${o.value != null ? ` value="${o.value}"` : ''}${o.ph ? ` placeholder="${o.ph}"` : ''}${o.cls ? ` class="${o.cls}"` : ''}>`}
${o.hint ? `<p class="hint">${o.hint}</p>` : ''}</div>`;
export const row2 = (a, b) => `<div class="row2">${a}${b}</div>`;
export const resultBox = (rows, big = 'total') => `<div class="result" id="out" hidden>
<div class="big" id="${big}">-</div>
<table>${rows.map(([label, id]) => `<tr><td>${label}</td><td id="${id}">-</td></tr>`).join('')}</table>
</div>
<p class="note" id="warn" hidden></p>`;
export const DIVISOR_SELECT = [['30', '30 days per month'], ['30.4167', '30.42 days (365 &divide; 12)']];
