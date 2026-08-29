import { chromium } from 'playwright';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const routes = [
  ['home','/index.html'],
  ['fleet','/fleet.html'],
  ['vehicle','/vehicle.html?id=meteor'],
  ['compare','/compare.html?ids=swift,creta,thar'],
  ['experiences','/experiences.html'],
  ['cities','/cities.html'],
  ['business','/business.html'],
  ['support','/support.html']
];

async function openChecked(page, name, route) {
  const errors = [];
  const consoleErrors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response || !response.ok()) throw new Error(`${name}: HTTP ${response?.status()}`);
  await page.waitForSelector('.mw-header', { timeout: 10000 });
  await page.waitForSelector('.mw-footer', { timeout: 10000 });
  await page.waitForTimeout(500);

  const overflow = await page.evaluate(() => {
    const de=document.documentElement;
    const cw=de.clientWidth;
    const offenders=[...document.querySelectorAll('body *')].map(el=>{
      const r=el.getBoundingClientRect();
      return {tag:el.tagName,cls:el.className||'',id:el.id||'',left:Math.round(r.left),right:Math.round(r.right),w:Math.round(r.width)};
    }).filter(x=>x.right>cw+2||x.left<-2).sort((a,b)=>Math.max(b.right-cw,-b.left)-Math.max(a.right-cw,-a.left)).slice(0,8);
    return {sw:de.scrollWidth,cw,offenders};
  });
  if (overflow.sw > overflow.cw + 2) throw new Error(`${name}: horizontal overflow ${overflow.sw} > ${overflow.cw}; offenders=${JSON.stringify(overflow.offenders)}`);

  if (errors.length) throw new Error(`${name}: page errors: ${errors.join(' | ')}`);
  const relevantConsole = consoleErrors.filter(x => !/favicon|Failed to load resource.*404/i.test(x));
  if (relevantConsole.length) throw new Error(`${name}: console errors: ${relevantConsole.join(' | ')}`);
}

const page = await context.newPage();
for (const [name, route] of routes) await openChecked(page, name, route);

// First visit is always light unless the visitor has explicitly saved a preference.
await page.goto(`${base}/index.html`, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#mwThemeToggle');
const beforeTheme = await page.evaluate(() => document.documentElement.dataset.theme);
if (beforeTheme !== 'light') throw new Error(`Fresh visitor theme should be light, got ${beforeTheme}`);
await page.click('#mwThemeToggle');
const afterTheme = await page.evaluate(() => document.documentElement.dataset.theme);
if (beforeTheme === afterTheme) throw new Error('Theme toggle did not change theme');

// Search must find the known iQube entry, never show a broken image, and stay above hero/carousel content.
const search = page.locator('#mwGlobalSearch');
await search.fill('iqube');
await page.waitForSelector('#mwSearchResults:not([hidden]) .mw-search-result', { timeout: 10000 });
await page.waitForTimeout(1200);
const searchImageOK = await page.locator('#mwSearchResults .mw-search-result img').first().evaluate(img => img.complete && img.naturalWidth > 0);
if (!searchImageOK) throw new Error('Search result image fallback failed for iQube');
const searchOverlayOK = await page.evaluate(() => {
  const results=document.querySelector('#mwSearchResults');
  const bar=document.querySelector('.mw-utility-bar');
  if(!results||!bar)return false;
  const rr=results.getBoundingClientRect(),br=bar.getBoundingClientRect();
  if(rr.bottom<=br.bottom+10)return false;
  const x=Math.max(1,Math.min(innerWidth-2,rr.left+Math.min(90,rr.width/2)));
  const y=Math.max(1,Math.min(innerHeight-2,rr.top+Math.min(28,rr.height/2)));
  const top=document.elementFromPoint(x,y);
  return !!top?.closest('#mwSearchResults');
});
if(!searchOverlayOK)throw new Error('Search results are clipped or covered by page/carousel content');
await search.fill('');

// Sticky search/location dock must remain stable around the compact threshold.
await page.evaluate(() => scrollTo(0, 260));
await page.waitForTimeout(400);
const samples = [];
for (let i=0;i<12;i++) {
  samples.push(await page.locator('.mw-utility-bar').evaluate(el => ({
    compact: el.classList.contains('is-compact'),
    h: Math.round(el.getBoundingClientRect().height)
  })));
  await page.waitForTimeout(70);
}
const states = new Set(samples.map(x => x.compact));
const heights = samples.map(x => x.h);
if (states.size !== 1) throw new Error(`Utility dock jittered compact state: ${JSON.stringify(samples)}`);
if (Math.max(...heights)-Math.min(...heights) > 2) throw new Error(`Utility dock jittered height: ${heights.join(',')}`);

// Restored back-to-top control.
await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(350);
if (!(await page.locator('#mwBackTop').isVisible())) throw new Error('Back-to-top did not become visible');
await page.click('#mwBackTop');
await page.waitForFunction(() => scrollY < 80, null, { timeout: 5000 });

// Fleet: render every catalog card, repair every image, and exercise comparison/cart.
await page.goto(`${base}/fleet.html`, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#fleetPageGrid .mw-vehicle-card');
const cardCount = await page.locator('#fleetPageGrid .mw-vehicle-card').count();
if (cardCount !== 96) throw new Error(`Fleet rendered ${cardCount} cards instead of 96`);
await page.locator('#fleetPageGrid img').evaluateAll(imgs => imgs.forEach(img => img.loading='eager'));
await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(5000);
const broken = await page.locator('#fleetPageGrid img').evaluateAll(imgs =>
  imgs.map((img,i)=>({i,src:img.currentSrc||img.src,ok:img.complete&&img.naturalWidth>0}))
      .filter(x=>!x.ok)
);
if (broken.length) throw new Error(`Broken fleet images: ${JSON.stringify(broken.slice(0,10))}`);

await page.evaluate(() => scrollTo(0, 0));
await page.locator('[data-compare]').nth(0).click();
await page.locator('[data-compare]').nth(1).click();
if (!(await page.locator('#compareBar').evaluate(el => el.classList.contains('is-visible')))) throw new Error('Compare bar did not open');
await page.locator('#fleetPageGrid .mw-add-button').first().click();
await page.click('#mwCartButton');
await page.waitForTimeout(250);
if (!(await page.locator('#mwCartDrawer').evaluate(el => el.classList.contains('is-open')))) throw new Error('Trip drawer did not open');
await page.locator('[data-mw-close="drawer"]').click();
await page.waitForTimeout(250);
if (await page.locator('#mwCartDrawer').evaluate(el => el.classList.contains('is-open'))) throw new Error('Trip drawer did not close');

await page.click('#mwProfileButton');
await page.waitForSelector('#mwProfileModal:not([hidden])');
await page.locator('#mwProfileModal [data-mw-close="modal"]').click();
await page.waitForTimeout(150);
if (!(await page.locator('#mwProfileModal').evaluate(el => el.hidden))) throw new Error('Profile modal did not close');

// Fleet hero restoration should exist.
if (!(await page.locator('.mw-page-hero-media .mw-fleet-ambient').count())) throw new Error('Fleet ambient animation layer missing');

// Mobile regression scan.
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
for (const [name, route] of routes) {
  await openChecked(mobile, `mobile-${name}`, route);
}
await mobile.goto(`${base}/index.html`, { waitUntil: 'domcontentloaded' });
await mobile.waitForSelector('#mwMenuButton');
await mobile.click('#mwMenuButton');
await mobile.waitForTimeout(100);
if (await mobile.locator('#mwMobileMenu').evaluate(el => el.hidden)) throw new Error('Mobile menu did not open');

await browser.close();
console.log('Browser QA OK: 8 routes, desktop/mobile, 96 cards, images, search overlay, light default, theme, sticky dock, compare, cart, profile, back-to-top.');
