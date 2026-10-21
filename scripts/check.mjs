// Run: node scripts/check.mjs  - offline site checks (links, titles, h1, canonicals, JSON-LD, sitemap).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://uae-money-tools.pages.dev';
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
  if (['.git', 'node_modules', 'scripts'].includes(e.name)) return [];
  const f = path.join(d, e.name);
  return e.isDirectory() ? walk(f) : [f];
});
const files = walk(ROOT);
const htmls = files.filter(f => f.endsWith('.html'));
const rel = f => path.relative(ROOT, f).replace(/\\/g, '/');
const urlToFile = u => {
  u = u.split('#')[0].split('?')[0];
  if (u === '/' || u === '') return 'index.html';
  if (u.endsWith('/')) return u.slice(1) + 'index.html';
  if (/\.[a-z0-9]+$/i.test(u)) return u.slice(1);
  return u.slice(1) + '.html';
};
const fileToUrl = r => r === 'index.html' ? '/' : r.endsWith('/index.html') ? '/' + r.slice(0, -10) : '/' + r.replace(/\.html$/, '');

let errors = 0, warnings = 0;
const err = m => { errors++; console.log('ERROR ' + m); };
const warn = m => { warnings++; console.log('WARN  ' + m); };
const titles = new Map(), descs = new Map();
const ids = new Map();
let links = 0;

for (const f of htmls) {
  const r = rel(f), h = fs.readFileSync(f, 'utf8'), url = fileToUrl(r);
  ids.set(r, new Set([...h.matchAll(/\sid="([^"]+)"/g)].map(m => m[1])));
}
for (const f of htmls) {
  const r = rel(f), h = fs.readFileSync(f, 'utf8'), url = fileToUrl(r);
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const h1s = (h.match(/<h1[ >]/g) || []).length;
  if (!title) err(r + ': missing <title>'); else { if (titles.has(title)) err(`${r}: duplicate title with ${titles.get(title)}`); titles.set(title, r); if (title.length > 75) warn(`${r}: title ${title.length} chars`); }
  if (!desc) err(r + ': missing meta description'); else { if (descs.has(desc)) err(`${r}: duplicate description with ${descs.get(desc)}`); descs.set(desc, r); if (desc.length > 170) warn(`${r}: description ${desc.length} chars`); }
  if (h1s !== 1) err(`${r}: ${h1s} <h1> elements`);
  if (r !== '404.html') {
    const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    if (canon !== BASE + url) err(`${r}: canonical ${canon} != ${BASE + url}`);
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { err(r + ': invalid JSON-LD'); }
  }
  if (!/<footer class="site">/.test(h)) err(r + ': no footer');
  if (!/<html lang="en"/.test(h)) err(r + ': missing html lang');
  if (!/name="viewport"/.test(h)) err(r + ': missing viewport');
  if (r !== '404.html') {
    for (const k of ['og:title', 'og:description', 'og:url', 'og:site_name', 'twitter:card']) if (!h.includes(k)) err(`${r}: missing ${k}`);
    const types = [];
    for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { types.push(JSON.parse(m[1])['@type']); } catch (e) {} }
    if (!types.includes('BreadcrumbList')) err(r + ': no BreadcrumbList schema');
    const hasFaqHtml = /class="faq"/.test(h);
    if (hasFaqHtml !== types.includes('FAQPage')) err(`${r}: FAQ markup (${hasFaqHtml}) and FAQPage schema (${types.includes('FAQPage')}) disagree`);
    if (hasFaqHtml) { const q = (h.match(/<details class="faq">/g) || []).length; const sj = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).find(o => o['@type'] === 'FAQPage'); if (sj.mainEntity.length !== q) err(`${r}: ${q} visible FAQs but ${sj.mainEntity.length} in schema`); }
    const need = r === 'index.html' ? ['WebSite', 'Organization'] : r.startsWith('guides/') && !r.endsWith('index.html') || r.startsWith('gratuity/salary-') ? ['Article'] : r.endsWith('index.html') ? ['CollectionPage'] : ['WebPage', 'WebApplication', 'AboutPage', 'ContactPage'];
    if (!need.some(t => types.includes(t))) err(`${r}: expected one of ${need.join('/')} schema, found ${types.join(',')}`);
    const idsInPage = [...h.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]); const dup = idsInPage.filter((x, i) => idsInPage.indexOf(x) !== i);
    if (dup.length) err(`${r}: duplicate ids ${[...new Set(dup)].join(',')}`);
    if (/<h3/.test(h) && !/<h2/.test(h)) warn(r + ': h3 without h2');
  }
  if (/AD SLOT/.test(h) && /adsbygoogle|googlesyndication/.test(h)) err(r + ': ad code present');
  if (!['404.html', 'about.html', 'contact.html', 'privacy.html'].includes(r) && !h.includes('class="sources"')) warn(r + ': no sources block');
  for (const m of h.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    links++;
    if (u.startsWith('#')) { if (u.length > 1 && !ids.get(r).has(u.slice(1))) err(`${r}: missing anchor ${u}`); continue; }
    if (!u.startsWith('/')) { err(`${r}: relative link ${u}`); continue; }
    const target = urlToFile(u);
    if (!fs.existsSync(path.join(ROOT, target))) { err(`${r}: broken link ${u}`); continue; }
    const frag = u.split('#')[1];
    if (frag && target.endsWith('.html') && !ids.get(target).has(frag)) err(`${r}: missing anchor ${u}`);
  }
}

// sitemap
const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(BASE, '') || '/');
for (const l of locs) if (!fs.existsSync(path.join(ROOT, urlToFile(l)))) err('sitemap: missing page ' + l);
for (const f of htmls) { const u = fileToUrl(rel(f)); if (rel(f) !== '404.html' && !locs.includes(u)) err('sitemap: missing ' + u); }

// guide word counts
for (const f of htmls.filter(f => rel(f).startsWith('guides/') && !rel(f).endsWith('index.html'))) {
  const h = fs.readFileSync(f, 'utf8');
  const body = (h.match(/<main>([\s\S]*)<\/main>/) || [])[1] || '';
  const words = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`words ${String(words).padStart(5)}  ${rel(f)}`);
  if (words < 800) warn(rel(f) + ': only ' + words + ' words (including boilerplate)');
}
console.log(`\n${htmls.length} pages, ${links} internal links checked, ${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
