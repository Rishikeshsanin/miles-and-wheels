(() => {
  'use strict';

  const vehicles = [
    { id:'swift', name:'Maruti Swift', brand:'Maruti Suzuki', type:'car', category:'Hatchback', price:2520, deposit:3000, rating:4.8, popularity:100, transmission:'Manual', fuel:'Petrol', seats:'5 seats', range:'180 km/day', badge:'Popular', image:'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=84', keywords:['swift','maruti','hatchback','city car','small car'] },
    { id:'alto', name:'Maruti Alto K10', brand:'Maruti Suzuki', type:'car', category:'Hatchback', price:2160, deposit:2500, rating:4.6, popularity:93, transmission:'Manual', fuel:'Petrol', seats:'5 seats', range:'180 km/day', badge:'Value pick', image:'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=84', keywords:['alto','k10','maruti','budget car','hatchback'] },
    { id:'i20', name:'Hyundai i20', brand:'Hyundai', type:'car', category:'Premium hatchback', price:2950, deposit:3500, rating:4.7, popularity:89, transmission:'Automatic', fuel:'Petrol', seats:'5 seats', range:'180 km/day', badge:'City favourite', image:'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=84', keywords:['i20','hyundai','automatic','premium hatchback'] },
    { id:'baleno', name:'Maruti Baleno', brand:'Maruti Suzuki', type:'car', category:'Premium hatchback', price:3120, deposit:3500, rating:4.8, popularity:96, transmission:'Automatic', fuel:'Petrol', seats:'5 seats', range:'180 km/day', badge:'Top rated', image:'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=84', keywords:['baleno','maruti','automatic','hatchback'] },
    { id:'fronx', name:'Maruti Fronx AT', brand:'Maruti Suzuki', type:'car', category:'Compact crossover', price:3792, deposit:4500, rating:4.7, popularity:87, transmission:'Automatic', fuel:'Petrol', seats:'5 seats', range:'180 km/day', badge:'Automatic', image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=84', keywords:['fronx','maruti','crossover','automatic','suv'] },
    { id:'creta', name:'Hyundai Creta', brand:'Hyundai', type:'car', category:'SUV', price:4490, deposit:6000, rating:4.8, popularity:98, transmission:'Automatic', fuel:'Petrol', seats:'5 seats', range:'200 km/day', badge:'Road trip pick', image:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=84', keywords:['creta','hyundai','suv','automatic','road trip'] },
    { id:'seltos', name:'Kia Seltos', brand:'Kia', type:'car', category:'SUV', price:4680, deposit:6000, rating:4.8, popularity:91, transmission:'Automatic', fuel:'Petrol', seats:'5 seats', range:'200 km/day', badge:'Premium SUV', image:'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=900&q=84', keywords:['seltos','kia','suv','automatic'] },
    { id:'nexonev', name:'Tata Nexon EV', brand:'Tata', type:'car', category:'Electric SUV', price:4250, deposit:6000, rating:4.7, popularity:84, transmission:'Automatic', fuel:'Electric', seats:'5 seats', range:'220 km/day', badge:'Electric', image:'https://images.unsplash.com/photo-1597404294360-feeeda04612e?auto=format&fit=crop&w=900&q=84', keywords:['nexon','tata','ev','electric','suv'] },
    { id:'scorpio', name:'Mahindra Scorpio-N AT', brand:'Mahindra', type:'car', category:'SUV', price:6240, deposit:9000, rating:4.9, popularity:95, transmission:'Automatic', fuel:'Diesel', seats:'7 seats', range:'220 km/day', badge:'7 seater', image:'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=900&q=84', keywords:['scorpio','mahindra','7 seater','suv','diesel'] },
    { id:'innova', name:'Toyota Innova Hycross', brand:'Toyota', type:'car', category:'MUV', price:7944, deposit:12000, rating:4.9, popularity:92, transmission:'Automatic', fuel:'Hybrid', seats:'7 seats', range:'220 km/day', badge:'Family premium', image:'https://images.unsplash.com/photo-1534093607318-f025413f49cb?auto=format&fit=crop&w=900&q=84', keywords:['innova','hycross','toyota','muv','7 seater','family'] },
    { id:'activa', name:'Honda Activa 6G', brand:'Honda', type:'scooter', category:'Scooter', price:552, deposit:1200, rating:4.8, popularity:99, transmission:'Automatic', fuel:'Petrol', seats:'2 riders', range:'120 km/day', badge:'Most popular', image:'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=900&q=84', keywords:['activa','honda','scooter','automatic','scooty'] },
    { id:'access', name:'Suzuki Access 125', brand:'Suzuki', type:'scooter', category:'Scooter', price:648, deposit:1200, rating:4.7, popularity:90, transmission:'Automatic', fuel:'Petrol', seats:'2 riders', range:'120 km/day', badge:'Easy city ride', image:'https://images.unsplash.com/photo-1592664474505-51c549ad15c5?auto=format&fit=crop&w=900&q=84', keywords:['access','suzuki','125','scooter','scooty'] },
    { id:'ather', name:'Ather 450X', brand:'Ather', type:'scooter', category:'Electric scooter', price:672, deposit:1500, rating:4.8, popularity:85, transmission:'Automatic', fuel:'Electric', seats:'2 riders', range:'100 km/day', badge:'Electric', image:'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=84', keywords:['ather','450x','electric scooter','ev','scooter'] },
    { id:'pulsar', name:'Bajaj Pulsar 150', brand:'Bajaj', type:'bike', category:'Street bike', price:840, deposit:1800, rating:4.7, popularity:88, transmission:'5-speed', fuel:'Petrol', seats:'2 riders', range:'160 km/day', badge:'Everyday bike', image:'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=84', keywords:['pulsar','bajaj','150','bike','motorcycle'] },
    { id:'apache', name:'TVS Apache RTR 200', brand:'TVS', type:'bike', category:'Street bike', price:1128, deposit:2200, rating:4.8, popularity:86, transmission:'5-speed', fuel:'Petrol', seats:'2 riders', range:'160 km/day', badge:'Sporty', image:'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=84', keywords:['apache','tvs','rtr','200','bike','sport'] },
    { id:'mt15', name:'Yamaha MT-15 V2', brand:'Yamaha', type:'bike', category:'Street bike', price:1056, deposit:2500, rating:4.8, popularity:94, transmission:'6-speed', fuel:'Petrol', seats:'2 riders', range:'160 km/day', badge:'Youth favourite', image:'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=900&q=84', keywords:['mt15','mt 15','yamaha','bike','motorcycle'] },
    { id:'hunter', name:'Royal Enfield Hunter 350', brand:'Royal Enfield', type:'bike', category:'Roadster', price:1751, deposit:3500, rating:4.9, popularity:97, transmission:'5-speed', fuel:'Petrol', seats:'2 riders', range:'180 km/day', badge:'Weekend favourite', image:'https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?auto=format&fit=crop&w=900&q=84', keywords:['hunter','royal enfield','re','350','bike','roadster'] },
    { id:'classic', name:'Royal Enfield Classic 350', brand:'Royal Enfield', type:'bike', category:'Classic', price:1905, deposit:4000, rating:4.9, popularity:96, transmission:'5-speed', fuel:'Petrol', seats:'2 riders', range:'180 km/day', badge:'Iconic', image:'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=84', keywords:['classic','royal enfield','350','bullet','bike'] },
    { id:'meteor', name:'Royal Enfield Meteor 350', brand:'Royal Enfield', type:'bike', category:'Cruiser', price:2396, deposit:4500, rating:4.8, popularity:82, transmission:'5-speed', fuel:'Petrol', seats:'2 riders', range:'180 km/day', badge:'Cruiser', image:'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=900&q=84', keywords:['meteor','royal enfield','350','cruiser','bike'] },
    { id:'himalayan', name:'Royal Enfield Himalayan', brand:'Royal Enfield', type:'bike', category:'Adventure', price:2519, deposit:5000, rating:4.9, popularity:92, transmission:'6-speed', fuel:'Petrol', seats:'2 riders', range:'200 km/day', badge:'Adventure', image:'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=900&q=84', keywords:['himalayan','royal enfield','adventure','touring','bike'] }
  ];

  const state = {
    type: 'all',
    search: '',
    sort: 'popular',
    cart: readJSON('mw_cart', []),
    profile: readJSON('mw_profile', null),
    orders: readJSON('mw_orders', []),
    favourites: new Set(readJSON('mw_favourites', []))
  };

  const $ = (id) => document.getElementById(id);
  const refs = {
    heroSearch: $('heroSearch'), fleetSearch: $('fleetSearch'), suggestions: $('searchSuggestions'), clearSearch: $('clearSearch'),
    popularGrid: $('popularGrid'), fleetGrid: $('fleetGrid'), fleetCountText: $('fleetCountText'), emptyState: $('emptyState'), sortSelect: $('sortSelect'),
    cartButton: $('cartButton'), cartCount: $('cartCount'), cartDrawer: $('cartDrawer'), cartItems: $('cartItems'), cartFooter: $('cartFooter'), scrim: $('scrim'),
    accountButton: $('accountButton'), accountLabel: $('accountLabel'), accountAvatar: $('accountAvatar'), accountModal: $('accountModal'), accountForm: $('accountForm'), nameInput: $('nameInput'), signOutButton: $('signOutButton'),
    checkoutModal: $('checkoutModal'), checkoutSummary: $('checkoutSummary'), checkoutForm: $('checkoutForm'), pickupDate: $('pickupDate'), pickupTime: $('pickupTime'), pickupArea: $('pickupArea'), licenseCheck: $('licenseCheck'),
    historyModal: $('historyModal'), historyList: $('historyList'), successModal: $('successModal'), successDetails: $('successDetails'), successCopy: $('successCopy'), privacyModal: $('privacyModal'),
    detectLocationButton: $('detectLocationButton'), locationPill: $('locationPill'), locationTitle: $('locationTitle'), locationSubtitle: $('locationSubtitle'),
    toastStack: $('toastStack'), mobileMenu: $('mobileMenu'), menuButton: $('menuButton')
  };

  function readJSON(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
  }
  function writeJSON(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  function formatINR(value) { return new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(value); }
  function escapeHTML(value='') { return value.replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function titleType(v) { return v.type === 'car' ? 'Car' : v.type === 'scooter' ? 'Scooter' : 'Bike'; }

  function levenshtein(a, b) {
    a = a.toLowerCase(); b = b.toLowerCase();
    const matrix = Array.from({length: b.length + 1}, (_, i) => [i]);
    matrix[0] = Array.from({length: a.length + 1}, (_, i) => i);
    for (let i=1; i<=b.length; i++) for (let j=1; j<=a.length; j++) matrix[i][j] = b[i-1] === a[j-1] ? matrix[i-1][j-1] : Math.min(matrix[i-1][j-1]+1, matrix[i][j-1]+1, matrix[i-1][j]+1);
    return matrix[b.length][a.length];
  }

  function fuzzyScore(vehicle, query) {
    const q = query.trim().toLowerCase();
    if (!q) return vehicle.popularity;
    const fields = [vehicle.name, vehicle.brand, vehicle.category, vehicle.type, vehicle.fuel, vehicle.transmission, ...vehicle.keywords].map(s => s.toLowerCase());
    let best = -Infinity;
    for (const field of fields) {
      if (field === q) best = Math.max(best, 300);
      if (field.startsWith(q)) best = Math.max(best, 240 - Math.abs(field.length - q.length));
      if (field.includes(q)) best = Math.max(best, 210 - field.indexOf(q));
      const tokens = field.split(/\s+/);
      for (const token of tokens) {
        const dist = levenshtein(token, q);
        const threshold = q.length <= 4 ? 1 : q.length <= 8 ? 2 : 3;
        if (dist <= threshold) best = Math.max(best, 170 - dist * 25 - Math.abs(token.length - q.length));
        if (q.length > 2 && token.startsWith(q.slice(0, Math.max(2, q.length - 1)))) best = Math.max(best, 150);
      }
    }
    return best;
  }

  function vehicleCard(v, featured=false) {
    const fav = state.favourites.has(v.id);
    return `<article class="vehicle-card ${featured ? 'featured' : ''}" data-vehicle-id="${v.id}">
      <div class="vehicle-media"><img src="${v.image}" alt="${escapeHTML(v.name)} rental vehicle" loading="lazy" referrerpolicy="no-referrer" onerror="this.src='https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80'" />
        <div class="media-top"><span class="badge">${escapeHTML(v.badge)}</span><button class="fav-btn ${fav ? 'active' : ''}" data-fav="${v.id}" aria-label="${fav ? 'Remove from' : 'Add to'} favourites" type="button">${fav ? '♥' : '♡'}</button></div>
      </div>
      <div class="vehicle-body"><div class="vehicle-title-row"><div><h3>${escapeHTML(v.name)}</h3><p class="vehicle-sub">${escapeHTML(v.brand)} · ${escapeHTML(v.category)}</p></div><span class="rating">★ ${v.rating.toFixed(1)}</span></div>
      <div class="spec-row"><span class="spec">${escapeHTML(v.transmission)}</span><span class="spec">${escapeHTML(v.fuel)}</span><span class="spec">${escapeHTML(v.seats)}</span><span class="spec">${escapeHTML(v.range)}</span></div>
      <div class="vehicle-bottom"><div class="price-block"><small>from</small><strong>${formatINR(v.price)}</strong><span> / day</span></div><button class="rent-btn" data-rent="${v.id}" type="button">Add to trip</button></div></div>
    </article>`;
  }

  function renderPopular() {
    const picks = ['creta','activa','swift','hunter','innova'].map(id => vehicles.find(v => v.id === id));
    refs.popularGrid.innerHTML = picks.map((v, i) => vehicleCard(v, i === 0)).join('');
  }

  function filteredVehicles() {
    let list = vehicles.map(v => ({v, score:fuzzyScore(v, state.search)})).filter(x => state.type === 'all' || x.v.type === state.type).filter(x => !state.search || x.score > -Infinity);
    if (state.search) list = list.filter(x => x.score >= 120);
    list.sort((a,b) => {
      if (state.sort === 'low') return a.v.price - b.v.price;
      if (state.sort === 'high') return b.v.price - a.v.price;
      if (state.sort === 'name') return a.v.name.localeCompare(b.v.name);
      return (state.search ? b.score - a.score : b.v.popularity - a.v.popularity);
    });
    return list.map(x => x.v);
  }

  function renderFleet() {
    const list = filteredVehicles();
    refs.fleetGrid.innerHTML = list.map(v => vehicleCard(v)).join('');
    refs.fleetGrid.hidden = list.length === 0;
    refs.emptyState.hidden = list.length !== 0;
    refs.fleetCountText.textContent = list.length === vehicles.length ? 'Showing all vehicles' : `Showing ${list.length} matching ${list.length === 1 ? 'vehicle' : 'vehicles'}`;
  }

  function showSuggestions(query) {
    const q = query.trim();
    refs.clearSearch.hidden = !q;
    if (!q) { refs.suggestions.hidden = true; refs.suggestions.innerHTML = ''; return; }
    const ranked = vehicles.map(v => ({v, score:fuzzyScore(v, q)})).filter(x => x.score >= 120).sort((a,b) => b.score - a.score || b.v.popularity - a.v.popularity).slice(0,6);
    if (!ranked.length) { refs.suggestions.innerHTML = `<div class="suggestion"><div></div><div><strong>No close matches yet</strong><small>Keep typing or try a category like SUV.</small></div></div>`; refs.suggestions.hidden = false; return; }
    refs.suggestions.innerHTML = ranked.map(({v}) => `<button class="suggestion" data-suggestion="${v.id}" type="button"><img src="${v.image}" alt="" referrerpolicy="no-referrer" /><span><strong>${escapeHTML(v.name)}</strong><small>${titleType(v)} · ${escapeHTML(v.category)}</small></span><span class="suggestion-price">${formatINR(v.price)}/day</span></button>`).join('');
    refs.suggestions.hidden = false;
  }

  function applySearch(value, sync=true) {
    state.search = value.trim();
    if (sync) { refs.heroSearch.value = value; refs.fleetSearch.value = value; }
    renderFleet();
  }

  function setType(type) {
    state.type = type;
    document.querySelectorAll('.type-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.type === type));
    document.querySelectorAll('.category-chip').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === type));
    renderFleet();
    document.querySelector('#fleet').scrollIntoView({behavior:'smooth', block:'start'});
  }

  function addToCart(id) {
    const found = state.cart.find(item => item.id === id);
    if (found) found.quantity = Math.min(5, found.quantity + 1); else state.cart.push({id, quantity:1, days:1});
    saveCart(); renderCart();
    const v = vehicles.find(x => x.id === id); toast('Added to trip', `${v.name} is ready in your booking cart.`);
  }

  function saveCart() { writeJSON('mw_cart', state.cart); updateCartCount(); }
  function updateCartCount() { refs.cartCount.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0); }
  function cartTotals() {
    const subtotal = state.cart.reduce((sum, item) => { const v = vehicles.find(x => x.id === item.id); return sum + v.price * item.quantity * item.days; }, 0);
    const service = Math.round(subtotal * .035);
    const tax = Math.round((subtotal + service) * .18);
    const deposit = state.cart.reduce((sum, item) => { const v = vehicles.find(x => x.id === item.id); return sum + v.deposit * item.quantity; }, 0);
    return {subtotal, service, tax, deposit, payable:subtotal + service + tax};
  }

  function renderCart() {
    if (!state.cart.length) {
      refs.cartItems.innerHTML = `<div class="cart-empty"><div class="empty-icon">◌</div><strong>Your trip is empty</strong><p>Add a car, bike or scooter from the fleet. You can adjust quantity and days here.</p><button class="secondary-btn" data-close="drawer" type="button">Browse fleet</button></div>`;
      refs.cartFooter.innerHTML = '';
      updateCartCount(); return;
    }
    refs.cartItems.innerHTML = state.cart.map(item => { const v = vehicles.find(x=>x.id===item.id); const line = v.price * item.quantity * item.days; return `<div class="cart-line"><img src="${v.image}" alt="${escapeHTML(v.name)}" referrerpolicy="no-referrer" /><div><div class="cart-line-top"><div><h4>${escapeHTML(v.name)}</h4><span class="line-price">${formatINR(line)}</span></div><button class="remove-line" data-remove="${v.id}" aria-label="Remove ${escapeHTML(v.name)}" type="button">×</button></div><div class="line-controls"><div class="line-control"><label>Quantity</label><div class="stepper"><button data-step="qty-down" data-id="${v.id}" type="button">−</button><span>${item.quantity}</span><button data-step="qty-up" data-id="${v.id}" type="button">+</button></div></div><div class="line-control"><label>Rental days</label><div class="stepper"><button data-step="days-down" data-id="${v.id}" type="button">−</button><span>${item.days}</span><button data-step="days-up" data-id="${v.id}" type="button">+</button></div></div></div></div></div>`; }).join('');
    const t = cartTotals();
    refs.cartFooter.innerHTML = `<div class="summary-row"><span>Rental subtotal</span><strong>${formatINR(t.subtotal)}</strong></div><div class="summary-row"><span>Service fee</span><strong>${formatINR(t.service)}</strong></div><div class="summary-row"><span>GST (18%)</span><strong>${formatINR(t.tax)}</strong></div><div class="summary-row total"><span>Payable amount</span><span>${formatINR(t.payable)}</span></div><div class="deposit-note">Refundable security deposit shown separately: <strong>${formatINR(t.deposit)}</strong>. Not charged in this demo.</div><button class="primary-btn full-btn" id="checkoutButton" type="button">Review booking</button>`;
    $('checkoutButton').addEventListener('click', openCheckout);
    updateCartCount();
  }

  function changeCart(id, action) {
    const item = state.cart.find(x => x.id === id); if (!item) return;
    if (action === 'qty-up') item.quantity = Math.min(5, item.quantity + 1);
    if (action === 'qty-down') item.quantity = Math.max(1, item.quantity - 1);
    if (action === 'days-up') item.days = Math.min(30, item.days + 1);
    if (action === 'days-down') item.days = Math.max(1, item.days - 1);
    saveCart(); renderCart();
  }

  function openDrawer() { renderCart(); refs.scrim.hidden = false; refs.cartDrawer.classList.add('open'); refs.cartDrawer.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll'); }
  function closeDrawer() { refs.cartDrawer.classList.remove('open'); refs.cartDrawer.setAttribute('aria-hidden','true'); refs.scrim.hidden = true; document.body.classList.remove('no-scroll'); }
  function openModal(modal) { closeDrawer(); closeAllModals(); modal.hidden = false; document.body.classList.add('no-scroll'); setTimeout(() => modal.querySelector('input,button')?.focus(), 0); }
  function closeAllModals() { document.querySelectorAll('.modal').forEach(m => m.hidden = true); document.body.classList.remove('no-scroll'); }

  function updateProfileUI() {
    if (state.profile?.name) {
      refs.accountLabel.textContent = state.profile.name;
      refs.accountAvatar.textContent = state.profile.name.trim().charAt(0).toUpperCase() || 'U';
      refs.nameInput.value = state.profile.name;
      refs.signOutButton.hidden = false;
    } else {
      refs.accountLabel.textContent = 'Guest'; refs.accountAvatar.textContent = 'G'; refs.nameInput.value = ''; refs.signOutButton.hidden = true;
    }
  }

  async function requestStatelessQuote() {
    const localQuote = cartTotals();
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({items: state.cart.map(({id, quantity, days}) => ({id, quantity, days}))})
      });
      if (!response.ok) return localQuote;
      const quote = await response.json();
      return ['subtotal','service','tax','deposit','payable'].every(k => Number.isFinite(quote[k])) ? quote : localQuote;
    } catch { return localQuote; }
  }

  function renderCheckoutSummary(t) {
    refs.checkoutSummary.innerHTML = `<h3>Trip summary</h3>${state.cart.map(item=>{ const v=vehicles.find(x=>x.id===item.id); return `<div class="checkout-item"><img src="${v.image}" alt="" referrerpolicy="no-referrer"><div><strong>${escapeHTML(v.name)}</strong><small>${item.quantity} × ${item.days} day${item.days>1?'s':''} · ${formatINR(v.price)}/day</small></div></div>`; }).join('')}<div class="summary-row"><span>Rental subtotal</span><strong>${formatINR(t.subtotal)}</strong></div><div class="summary-row"><span>Service fee</span><strong>${formatINR(t.service)}</strong></div><div class="summary-row"><span>GST</span><strong>${formatINR(t.tax)}</strong></div><div class="summary-row total"><span>Payable</span><span>${formatINR(t.payable)}</span></div><div class="deposit-note">Refundable security deposit: ${formatINR(t.deposit)} · shown only, not collected. Quote processing is stateless.</div>`;
  }

  async function openCheckout() {
    if (!state.cart.length) return;
    renderCheckoutSummary(cartTotals());
    const tomorrow = new Date(Date.now()+86400000); refs.pickupDate.min = tomorrow.toISOString().slice(0,10); refs.pickupDate.value ||= tomorrow.toISOString().slice(0,10);
    openModal(refs.checkoutModal);
    const quote = await requestStatelessQuote();
    if (!refs.checkoutModal.hidden && state.cart.length) renderCheckoutSummary(quote);
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!refs.licenseCheck.checked || !state.cart.length) return;
    const t = cartTotals(); const id = `MW-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const order = { id, createdAt:new Date().toISOString(), pickupDate:refs.pickupDate.value, pickupTime:refs.pickupTime.value, pickupArea:refs.pickupArea.value.trim(), name:state.profile?.name || 'Guest', items:state.cart.map(x=>({...x})), totals:t };
    state.orders.unshift(order); writeJSON('mw_orders', state.orders); state.cart=[]; saveCart(); renderCart();
    refs.successCopy.textContent = `${order.name === 'Guest' ? 'Your' : `${order.name}'s`} demo booking has been stored only in this browser.`;
    refs.successDetails.innerHTML = `<div><span>Booking ID</span><strong>${id}</strong></div><div><span>Pickup</span><strong>${escapeHTML(order.pickupDate)} · ${escapeHTML(order.pickupTime)}</strong></div><div><span>Area</span><strong>${escapeHTML(order.pickupArea)}</strong></div><div><span>Amount</span><strong>${formatINR(t.payable)}</strong></div>`;
    closeAllModals(); openModal(refs.successModal); refs.checkoutForm.reset(); refs.pickupTime.value='10:00';
  }

  function renderHistory() {
    if (!state.orders.length) { refs.historyList.innerHTML = `<div class="history-empty">No local bookings yet. Place a demo booking and it will appear here.</div>`; return; }
    refs.historyList.innerHTML = state.orders.map(order => `<article class="history-order"><header><h3>${escapeHTML(order.id)}</h3><span>Placed</span></header><p>${new Date(order.createdAt).toLocaleString('en-IN')} · Pickup ${escapeHTML(order.pickupDate)} at ${escapeHTML(order.pickupTime)} · ${escapeHTML(order.pickupArea)}</p><p>${order.items.map(item=>{ const v=vehicles.find(x=>x.id===item.id); return `${v ? escapeHTML(v.name) : 'Vehicle'} × ${item.quantity} for ${item.days}d`; }).join(' · ')}</p><div class="history-total"><span>${escapeHTML(order.name || 'Guest')}</span><span>${formatINR(order.totals.payable)}</span></div></article>`).join('');
  }

  function toast(title, message) { const div=document.createElement('div'); div.className='toast'; div.innerHTML=`<strong>${escapeHTML(title)}</strong><span>${escapeHTML(message)}</span>`; refs.toastStack.appendChild(div); setTimeout(()=>div.remove(), 3200); }

  async function detectLocation() {
    if (!navigator.geolocation) { toast('Location unavailable','This browser does not support geolocation.'); return; }
    refs.detectLocationButton.disabled = true; refs.detectLocationButton.textContent = 'Detecting…';
    navigator.geolocation.getCurrentPosition(async pos => {
      const {latitude, longitude} = pos.coords; let label = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`; let sub = 'Detected coordinates · display only';
      try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        if (res.ok) { const data = await res.json(); const parts=[data.city || data.locality, data.principalSubdivision, data.countryName].filter(Boolean); if (parts.length) { label=parts.slice(0,2).join(', '); sub=`${data.countryName || 'Current location'} · display only`; } }
      } catch {}
      refs.locationTitle.textContent = label; refs.locationSubtitle.textContent = sub; refs.locationPill.classList.add('detected'); refs.detectLocationButton.textContent='Location shown'; refs.detectLocationButton.disabled=false; toast('Location detected','The fleet and pricing remain exactly the same.');
    }, err => { refs.detectLocationButton.disabled=false; refs.detectLocationButton.textContent='Use my location'; toast('Location not shared', err.code===1 ? 'Permission was declined. Nothing else changes.' : 'We could not detect your location.'); }, {enableHighAccuracy:false, timeout:9000, maximumAge:300000});
  }

  function clearLocalData() {
    if (!confirm('Clear your Miles & Wheels display name, cart, favourites and local booking history from this browser?')) return;
    ['mw_profile','mw_cart','mw_orders','mw_favourites'].forEach(k=>localStorage.removeItem(k)); state.profile=null; state.cart=[]; state.orders=[]; state.favourites.clear(); updateProfileUI(); renderCart(); renderFleet(); renderPopular(); toast('Local data cleared','This browser no longer stores your Miles & Wheels demo data.');
  }

  document.addEventListener('click', (e) => {
    const rent=e.target.closest('[data-rent]'); if (rent) addToCart(rent.dataset.rent);
    const fav=e.target.closest('[data-fav]'); if (fav) { const id=fav.dataset.fav; state.favourites.has(id)?state.favourites.delete(id):state.favourites.add(id); writeJSON('mw_favourites',[...state.favourites]); renderFleet(); renderPopular(); }
    const suggestion=e.target.closest('[data-suggestion]'); if (suggestion) { const v=vehicles.find(x=>x.id===suggestion.dataset.suggestion); applySearch(v.name); refs.suggestions.hidden=true; document.querySelector('#fleet').scrollIntoView({behavior:'smooth'}); }
    const remove=e.target.closest('[data-remove]'); if(remove){state.cart=state.cart.filter(x=>x.id!==remove.dataset.remove);saveCart();renderCart();}
    const step=e.target.closest('[data-step]'); if(step) changeCart(step.dataset.id,step.dataset.step);
    const close=e.target.closest('[data-close="drawer"]'); if(close){closeDrawer();document.querySelector('#fleet').scrollIntoView({behavior:'smooth'});}
    if (!e.target.closest('.hero-search-card')) refs.suggestions.hidden = true;
  });

  refs.heroSearch.addEventListener('input', e => { showSuggestions(e.target.value); applySearch(e.target.value, false); refs.fleetSearch.value=e.target.value; });
  refs.heroSearch.addEventListener('keydown', e => { if(e.key==='Enter'){ e.preventDefault(); refs.suggestions.hidden=true; document.querySelector('#fleet').scrollIntoView({behavior:'smooth'}); } });
  refs.fleetSearch.addEventListener('input', e => { refs.heroSearch.value=e.target.value; state.search=e.target.value.trim(); renderFleet(); });
  refs.clearSearch.addEventListener('click', () => { refs.heroSearch.value=''; refs.fleetSearch.value=''; refs.clearSearch.hidden=true; refs.suggestions.hidden=true; state.search=''; renderFleet(); refs.heroSearch.focus(); });
  $('browseAllButton').addEventListener('click',()=>document.querySelector('#fleet').scrollIntoView({behavior:'smooth'}));
  document.querySelectorAll('.type-tab').forEach(btn=>btn.addEventListener('click',()=>setType(btn.dataset.type)));
  document.querySelectorAll('.category-chip').forEach(btn=>btn.addEventListener('click',()=>setType(btn.dataset.filter)));
  refs.sortSelect.addEventListener('change',e=>{state.sort=e.target.value;renderFleet();});
  $('resetFiltersButton').addEventListener('click',()=>{state.type='all';state.search='';refs.heroSearch.value='';refs.fleetSearch.value='';document.querySelectorAll('.type-tab').forEach(b=>b.classList.toggle('active',b.dataset.type==='all'));document.querySelectorAll('.category-chip').forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));renderFleet();});
  refs.cartButton.addEventListener('click',openDrawer); refs.scrim.addEventListener('click',closeDrawer); document.querySelector('[data-close="drawer"]').addEventListener('click',closeDrawer);
  refs.accountButton.addEventListener('click',()=>openModal(refs.accountModal));
  refs.accountForm.addEventListener('submit',e=>{e.preventDefault();const name=refs.nameInput.value.trim();if(!name)return;state.profile={name};writeJSON('mw_profile',state.profile);updateProfileUI();closeAllModals();toast('Welcome',`${name} is now your local display name.`);});
  refs.signOutButton.addEventListener('click',()=>{localStorage.removeItem('mw_profile');state.profile=null;updateProfileUI();closeAllModals();toast('Signed out','Your booking history remains on this device.');});
  $('showHistoryButton').addEventListener('click',()=>{renderHistory();openModal(refs.historyModal);}); $('historyFooterButton').addEventListener('click',()=>{renderHistory();openModal(refs.historyModal);});
  refs.checkoutForm.addEventListener('submit',placeOrder);
  $('successDoneButton').addEventListener('click',()=>{closeAllModals();document.querySelector('#fleet').scrollIntoView({behavior:'smooth'});}); $('successHistoryButton').addEventListener('click',()=>{renderHistory();openModal(refs.historyModal);});
  $('privacyButton').addEventListener('click',()=>openModal(refs.privacyModal)); $('privacyDoneButton').addEventListener('click',closeAllModals); $('clearDataButton').addEventListener('click',clearLocalData);
  refs.detectLocationButton.addEventListener('click',detectLocation);
  document.querySelectorAll('.modal-close').forEach(btn=>btn.addEventListener('click',closeAllModals));
  document.querySelectorAll('.modal').forEach(modal=>modal.addEventListener('mousedown',e=>{if(e.target===modal)closeAllModals();}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){refs.suggestions.hidden=true;if(refs.cartDrawer.classList.contains('open'))closeDrawer();else closeAllModals();}});
  refs.menuButton.addEventListener('click',()=>{const open=refs.mobileMenu.hidden;refs.mobileMenu.hidden=!open;refs.menuButton.setAttribute('aria-expanded',String(open));});
  refs.mobileMenu.addEventListener('click',e=>{if(e.target.matches('a')){refs.mobileMenu.hidden=true;refs.menuButton.setAttribute('aria-expanded','false');}});

  $('year').textContent = new Date().getFullYear();
  updateProfileUI(); updateCartCount(); renderPopular(); renderFleet(); renderCart();
})();
