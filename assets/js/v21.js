const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

function getTheme(){
  const stored=localStorage.getItem('mw_theme');
  if(stored==='light'||stored==='dark')return stored;
  return 'light';
}

function applyTheme(theme,animate=false){
  if(animate&&!reduced)root.classList.add('mw-theme-switching');
  root.dataset.theme=theme;
  root.style.colorScheme=theme;
  localStorage.setItem('mw_theme',theme);
  const meta=qs('meta[name="theme-color"]')||document.head.appendChild(Object.assign(document.createElement('meta'),{name:'theme-color'}));
  meta.setAttribute('content',theme==='dark'?'#070a0f':'#f4f3ee');
  const button=qs('#mwThemeToggle');
  if(button){
    button.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');
    button.setAttribute('title',theme==='dark'?'Light mode':'Dark mode');
    button.innerHTML=theme==='dark'
      ?'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>'
      :'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.4 8.4 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z"/></svg>';
  }
  window.setTimeout(()=>root.classList.remove('mw-theme-switching'),450);
}

function injectThemeToggle(){
  const actions=qs('.mw-nav-actions');
  if(!actions||qs('#mwThemeToggle'))return;
  const button=document.createElement('button');
  button.id='mwThemeToggle';
  button.className='mw-theme-toggle';
  button.type='button';
  actions.prepend(button);
  button.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark',true));
  applyTheme(getTheme());
}

function compactUtility(){
  const bar=qs('.mw-utility-bar');
  if(!bar)return;
  let compact=false;
  let lastY=Math.max(0,scrollY);
  let downDistance=0;
  let upDistance=0;
  let ticking=false;

  const setCompact=(value)=>{
    if(value===compact)return;
    compact=value;
    bar.classList.toggle('is-compact',compact);
    document.body.classList.toggle('mw-utility-compact',compact);
  };

  const render=()=>{
    ticking=false;
    const y=Math.max(0,scrollY);
    const delta=y-lastY;

    if(delta>0){
      downDistance+=delta;
      upDistance=0;
    }else if(delta<0){
      upDistance+=Math.abs(delta);
      downDistance=0;
    }

    /*
      Hysteresis deliberately keeps the bar away from a single toggle threshold.
      Shrinking the sticky bar changes layout height; using one threshold can make
      scrollY cross that threshold repeatedly and visibly shake.
    */
    if(!compact && y>190 && downDistance>34)setCompact(true);
    if(compact && (y<92 || upDistance>90))setCompact(false);

    if(y<40){
      downDistance=0;
      upDistance=0;
      setCompact(false);
    }
    lastY=y;
  };

  addEventListener('scroll',()=>{
    if(!ticking){
      ticking=true;
      requestAnimationFrame(render);
    }
  },{passive:true});
  render();
}
function scrollProgress(){
  const line=document.createElement('div');
  line.className='mw-scroll-progress';
  line.setAttribute('aria-hidden','true');
  document.body.appendChild(line);
  let ticking=false;
  const update=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    const p=max>0?Math.min(1,scrollY/max):0;
    line.style.transform=`scaleX(${p})`;
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  update();
}

function refreshCatalogCopy(){
  const input=qs('#mwGlobalSearch');
  if(input)input.placeholder='Search 96 cars, bikes & scooters';
  qsa('.mw-footer-hero h2').forEach(h=>h.dataset.v21='true');
}

function internalLinkPolish(){
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href]');
    if(!a)return;
    const href=a.getAttribute('href')||'';
    if(href.startsWith('#')||href.startsWith('http')||a.target==='_blank')return;
    if(!reduced&&/\.html/.test(href)){
      document.body.classList.add('mw-page-leaving');
      setTimeout(()=>document.body.classList.remove('mw-page-leaving'),550);
    }
  });
}

const imageFallbacks={
  car:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=84',
  bike:'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=84',
  scooter:'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1200&q=84'
};

function vehicleForImage(img){
  const card=img.closest('[data-vehicle]');
  if(card?.dataset.vehicle&&window.MW?.VEHICLE_BY_ID)return window.MW.VEHICLE_BY_ID.get(card.dataset.vehicle);
  const link=img.closest('a[href*="vehicle.html?id="]');
  if(link&&window.MW?.VEHICLE_BY_ID){
    try{
      const id=new URL(link.href,location.href).searchParams.get('id');
      return window.MW.VEHICLE_BY_ID.get(id);
    }catch{}
  }
  const alt=(img.alt||'').toLowerCase();
  if(/scooter|activa|vespa|iqube|ather|chetak|ola|jupiter|ntorq|aerox|burgman|aprilia|river|vida/.test(alt))return{type:'scooter'};
  if(/bike|motor|royal enfield|yamaha|ktm|triumph|kawasaki|harley|pulsar|apache|himalayan|duke|ninja/.test(alt))return{type:'bike'};
  return{type:'car'};
}

function repairImage(img){
  if(!(img instanceof HTMLImageElement)||img.dataset.mwFallback==='true')return;
  img.dataset.mwFallback='true';
  const type=vehicleForImage(img)?.type||'car';
  img.classList.add('mw-image-repairing');
  img.src=imageFallbacks[type]||imageFallbacks.car;
  img.removeAttribute('srcset');
  img.addEventListener('load',()=>img.classList.remove('mw-image-repairing'),{once:true});
}

function enhanceExternalImages(){
  qsa('img').forEach(img=>{
    if(img.loading!=='eager')img.loading='lazy';
    img.decoding='async';
    if(img.complete&&img.naturalWidth===0)repairImage(img);
  });
  document.addEventListener('error',event=>{
    if(event.target instanceof HTMLImageElement)repairImage(event.target);
  },true);
}

function backToTop(){
  if(qs('#mwBackTop'))return;
  const button=document.createElement('button');
  button.id='mwBackTop';
  button.className='mw-back-top';
  button.type='button';
  button.setAttribute('aria-label','Back to top');
  button.innerHTML='<span aria-hidden="true">↑</span>';
  document.body.appendChild(button);
  let ticking=false;
  const update=()=>{
    button.classList.toggle('is-visible',scrollY>620);
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  button.addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'}));
  update();
}

function fleetAmbient(){
  if(document.body.dataset.page!=='fleet')return;
  const media=qs('.mw-page-hero-media');
  if(!media||qs('.mw-fleet-ambient',media))return;
  const ambient=document.createElement('div');
  ambient.className='mw-fleet-ambient';
  ambient.setAttribute('aria-hidden','true');
  ambient.innerHTML='<i class="mw-fleet-orbit mw-fleet-orbit-a"></i><i class="mw-fleet-orbit mw-fleet-orbit-b"></i><div class="mw-fleet-particles"></div><div class="mw-fleet-float mw-fleet-float-search"><small>LIVE SEARCH</small><strong>Typo-tolerant</strong></div><div class="mw-fleet-float mw-fleet-float-count"><strong>96</strong><small>rides in one fleet</small></div>';
  const particles=qs('.mw-fleet-particles',ambient);
  for(let i=0;i<14;i++){
    const dot=document.createElement('b');
    dot.style.setProperty('--x',`${5+Math.random()*90}%`);
    dot.style.setProperty('--y',`${5+Math.random()*90}%`);
    dot.style.setProperty('--delay',`${Math.random()*4}s`);
    dot.style.setProperty('--duration',`${3.5+Math.random()*4}s`);
    particles.appendChild(dot);
  }
  media.prepend(ambient);
}
function loadStabilityCSS(){
  if(document.querySelector('link[href="assets/css/v22.css"]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='assets/css/v22.css';
  document.head.appendChild(link);
}

function init(){
  loadStabilityCSS();
  injectThemeToggle();
  compactUtility();
  scrollProgress();
  refreshCatalogCopy();
  internalLinkPolish();
  enhanceExternalImages();
  backToTop();
  fleetAmbient();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
window.addEventListener('pageshow',()=>applyTheme(getTheme()));
