/**
 * Vista Punto de Venta y Carrito — Cenko Fragancias
 */
import { db } from '../db.js';
import { initPosHistorial, getPosHistorialHtml, renderTodaySales, cancelSale, updateTodayCounters, shareCierreWhatsApp } from './pos-historial.js';

let cart = [];
let currentCategoryFilter = 'todas';
let currentSelectedPayment = 'Transferencia';
let currentSelectedClient = null;
let currentPosSubView = 'caja';
let lastCompletedSale = null;

let getActiveViewFn = () => 'pos';
let openModalFn = () => {};
let showToastFn = () => {};
let openNewClientModalFn = () => {};

const FALLBACK_BOTTLE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' fill='none'><rect x='25' y='35' width='50' height='70' rx='12' stroke='%23CBD5E1' stroke-width='3' fill='%2317181F'/><rect x='38' y='20' width='24' height='15' rx='4' fill='%23CBD5E1'/><text x='50' y='78' font-family='sans-serif' font-weight='700' font-size='18' fill='%23D4AF37' text-anchor='middle'>C</text></svg>";

export function initPosView({ getActiveView, openModal, showToast, openNewClientModal }) {
  getActiveViewFn = getActiveView;
  openModalFn = openModal;
  showToastFn = showToast;
  openNewClientModalFn = openNewClientModal;

  initPosHistorial({ showToast, onSaleCancelled: () => renderProductsCatalog() });

  const root = document.getElementById('view-pos');
  if (!root) return;

  root.innerHTML = `
    <div class="view-header">
      <div class="view-title-wrap">
        <h1>Punto de Venta Showroom</h1>
        <p>Atención ágil en mostrador exclusiva para Perfumería Árabe con descuento en Tiendanube.</p>
      </div>
      <div class="sub-tabs-bar">
        <button class="sub-tab-btn active" id="btn-pos-caja" onclick="togglePosSubView('caja')">🛍️ <span class="subtab-desktop">Nueva Venta</span><span class="subtab-mobile">Catálogo</span></button>
        <button class="sub-tab-btn" id="btn-pos-carrito" onclick="togglePosSubView('carrito')">🛒 Carrito (<span id="count-cart-subtab">0</span>)</button>
        <button class="sub-tab-btn" id="btn-pos-historial" onclick="togglePosSubView('historial')">📜 <span class="subtab-desktop">Ventas del Día</span><span class="subtab-mobile">Ventas</span> (<span id="count-ventas-hoy">0</span>)</button>
      </div>
    </div>

    <div id="pos-sub-caja">
      <div class="pos-sub-caja-wrap" id="pos-sub-caja-wrap">
        <div class="pos-layout">
          <div id="pos-catalog-col">
            <div class="search-filter-box">
              <div class="search-input-wrap">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="pos-search-input" class="input-field" placeholder="Buscar perfume árabe (Khamrah, Asad, 9 PM, Yara, Hawas...)..." oninput="filterProducts()">
              </div>
              <div class="filter-pills-wrap">
                <button class="pill-filter active" onclick="setCategoryFilter('todas', this)">Todos los Árabes</button>
                <button class="pill-filter" onclick="setCategoryFilter('Gourmand', this)">Gourmand &amp; Dulces</button>
                <button class="pill-filter" onclick="setCategoryFilter('Amaderado', this)">Amaderados &amp; Cuero</button>
                <button class="pill-filter" onclick="setCategoryFilter('Cítrico', this)">Cítricos &amp; Frescos</button>
                <button class="pill-filter" onclick="setCategoryFilter('Oriental', this)">Orientales &amp; Oud</button>
              </div>
            </div>
            <div class="products-grid" id="products-catalog-container"></div>
          </div>

          <div class="cart-panel pos-cart-column" id="cart-panel-el">
            <div class="cart-panel-drag-handle" onclick="closeMobileCart()" title="Cerrar orden"></div>
            <div class="cart-header">
              <div class="cart-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Orden Actual
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <button class="btn btn-sm btn-secondary" onclick="clearCart()">Vaciar</button>
                <button class="cart-header-close-btn" onclick="closeMobileCart()" title="Volver al catálogo">✕ Volver</button>
              </div>
            </div>

            <div class="cart-items-list" id="cart-items-container"></div>

            <div class="cart-controls-fixed">
              <div>
                <div class="section-mini-label" style="margin-bottom: 5px;">
                  <span>Cliente</span>
                  <button class="sub-tab-btn" style="padding: 1px 6px; font-size: 10px; background: rgba(255,255,255,0.06);" onclick="setConsumidorFinal()">Consumidor Final</button>
                </div>
                <div class="client-select-wrap">
                  <input type="text" id="cart-client-input" class="input-field" placeholder="DNI o Nombre..." oninput="suggestClient(this.value)">
                  <button class="btn btn-secondary btn-sm" onclick="openNewClientModal()" title="Registrar nuevo cliente" style="padding: 0 10px;">+</button>
                </div>
                <div id="cart-selected-client-display" style="font-size: 11px; color: var(--ck-champagne); margin-top: 3px; display: none;"></div>
              </div>

              <div>
                <div class="section-mini-label" style="margin-bottom: 5px;">Medio de Pago</div>
                <div class="payment-row-compact">
                  <button class="payment-btn active" onclick="setPaymentMethod('Transferencia', this)">Transf</button>
                  <button class="payment-btn" onclick="setPaymentMethod('Efectivo', this)">Efvo</button>
                  <button class="payment-btn" onclick="setPaymentMethod('Débito', this)">Débito</button>
                  <button class="payment-btn" onclick="setPaymentMethod('Crédito', this)">Crédito</button>
                </div>
              </div>

              <div class="checkout-action-box">
                <div class="total-row final">
                  <span>Total a Cobrar:</span>
                  <span id="cart-total-val">$ 0</span>
                </div>
                <button class="btn btn-primary btn-confirm-sale" onclick="confirmCurrentSale()">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Confirmar Venta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    ${getPosHistorialHtml()}
  `;

  renderProductsCatalog();
  renderCart();
  updateTodayCounters();
  updateMobileCartBarVisibility();
}

export function renderProductsCatalog() {
  const container = document.getElementById('products-catalog-container');
  if (!container) return;

  const query = (document.getElementById('pos-search-input')?.value || '').toLowerCase().trim();
  const filtered = db.getCatalog().filter((p) => {
    const matchCat = currentCategoryFilter === 'todas' || p.category === currentCategoryFilter;
    const matchQuery = !query || p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query) || p.notes.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--ck-text-muted);">No se encontraron perfumes árabes con ese criterio.</div>`;
    return;
  }

  container.innerHTML = filtered.map((p) => {
    let badgeClass = 'ok';
    let badgeText = `${p.stock} en stock`;
    if (p.stock <= 0) {
      badgeClass = 'out';
      badgeText = 'Agotado';
    } else if (p.stock <= p.minStock) {
      badgeClass = 'low';
      badgeText = `¡Últimas ${p.stock}!`;
    }
    const isOut = p.stock <= 0;

    return `
      <div class="product-card">
        <div class="product-image-box">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='${FALLBACK_BOTTLE_SVG}';">
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <span class="product-brand">${p.brand}</span>
            <span class="stock-badge ${badgeClass}">${badgeText}</span>
          </div>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-variant-desc">${p.variant}</div>
        </div>
        <div class="product-bottom-row">
          <div class="product-price">${db.formatMoney(p.price)}</div>
          <button class="btn btn-sm ${isOut ? 'btn-secondary' : 'btn-primary'}"
                  ${isOut ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : `onclick="addToCart('${p.id}')"`}>
            ${isOut ? 'Sin Stock' : '+ Agregar'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

export function setCategoryFilter(cat, btn) {
  currentCategoryFilter = cat;
  document.querySelectorAll('.pill-filter').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProductsCatalog();
}

export function filterProducts() {
  renderProductsCatalog();
}

export function addToCart(productId) {
  const prod = db.getProductById(productId);
  if (!prod || prod.stock <= 0) {
    showToastFn('Perfume agotado');
    return;
  }

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    if (existing.qty >= prod.stock) {
      showToastFn(`Stock máximo alcanzado (${prod.stock} uds)`);
      return;
    }
    existing.qty++;
  } else {
    cart.push({ id: prod.id, name: prod.name, variant: prod.variant, price: prod.price, qty: 1 });
  }

  renderCart();
  const mcb = document.getElementById('mobile-cart-bar');
  if (mcb && window.innerWidth <= 820) {
    mcb.style.transform = 'scale(1.03)';
    setTimeout(() => { if (mcb) mcb.style.transform = ''; }, 200);
  }
  showToastFn(`+ Agregado: ${prod.name}`);
}

export function updateCartQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  const prod = db.getProductById(id);
  const nextQty = item.qty + delta;

  if (nextQty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  } else if (prod && nextQty > prod.stock) {
    showToastFn(`Stock disponible: ${prod.stock}`);
    return;
  } else {
    item.qty = nextQty;
  }
  renderCart();
}

export function clearCart() {
  closeMobileCart();
  cart = [];
  renderCart();
}

export function renderCart() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 12px 8px; color: var(--ck-text-muted); font-size: 11.5px;">
        El carrito está vacío.<br>Hacé clic en <strong>+ Agregar</strong> en cualquier fragancia.
      </div>
    `;
  } else {
    container.innerHTML = cart.map((item) => `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-sub">${item.variant} • ${db.formatMoney(item.price)}</div>
        </div>
        <div class="cart-qty-ctrls">
          <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `).join('');
  }

  const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const totalEl = document.getElementById('cart-total-val');
  if (totalEl) totalEl.textContent = db.formatMoney(total);

  const hdrBadge = document.getElementById('hdr-cart-count');
  if (hdrBadge) hdrBadge.textContent = totalCount;

  const subtabCount = document.getElementById('count-cart-subtab');
  if (subtabCount) subtabCount.textContent = totalCount;

  const mcbCount = document.getElementById('mcb-count');
  if (mcbCount) mcbCount.textContent = totalCount;

  const mcbTotal = document.getElementById('mcb-total');
  if (mcbTotal) mcbTotal.textContent = db.formatMoney(total);

  const mcbSummary = document.getElementById('mcb-summary');
  if (mcbSummary) {
    mcbSummary.textContent = totalCount === 0 ? 'Sin fragancias' : `${totalCount} perfume${totalCount > 1 ? 's' : ''} en orden`;
  }

  updateMobileCartBarVisibility();
}

export function updateMobileCartBarVisibility() {
  const mcb = document.getElementById('mobile-cart-bar');
  if (!mcb) return;

  const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const wrap = document.getElementById('pos-sub-caja-wrap');
  const isCartActiveOnMobile = Boolean(wrap && wrap.classList.contains('cart-active'));
  const isInsideCart = currentPosSubView === 'carrito' || isCartActiveOnMobile;

  document.body.classList.toggle('in-cart-subview', isInsideCart);

  const shouldShowMobileBar = (
    totalCount > 0 &&
    getActiveViewFn() === 'pos' &&
    currentPosSubView === 'caja' &&
    !isInsideCart &&
    window.innerWidth <= 820
  );

  if (!shouldShowMobileBar) {
    mcb.classList.remove('visible');
    mcb.style.setProperty('display', 'none', 'important');
  } else {
    mcb.style.setProperty('display', 'flex', 'important');
    mcb.classList.add('visible');
  }
}

export function openMobileCart() {
  if (window.innerWidth <= 820) togglePosSubView('carrito');
  else document.getElementById('cart-panel-el')?.classList.add('mobile-sheet-open');
}

export function closeMobileCart() {
  if (window.innerWidth <= 820) togglePosSubView('caja');
  else document.getElementById('cart-panel-el')?.classList.remove('mobile-sheet-open');
}

export function toggleMobileCart() {
  const wrap = document.getElementById('pos-sub-caja-wrap');
  if (wrap && wrap.classList.contains('cart-active')) closeMobileCart();
  else openMobileCart();
}

export function togglePosSubView(sub) {
  currentPosSubView = sub;
  const caja = document.getElementById('pos-sub-caja');
  const hist = document.getElementById('pos-sub-historial');
  const btnCaja = document.getElementById('btn-pos-caja');
  const btnCarrito = document.getElementById('btn-pos-carrito');
  const btnHist = document.getElementById('btn-pos-historial');
  const wrap = document.getElementById('pos-sub-caja-wrap');

  [btnCaja, btnCarrito, btnHist].forEach((b) => b?.classList.remove('active'));

  if (sub === 'caja') {
    if (caja) caja.style.display = 'block';
    if (hist) hist.style.display = 'none';
    if (wrap) wrap.classList.remove('cart-active');
    if (btnCaja) btnCaja.classList.add('active');
  } else if (sub === 'carrito') {
    if (caja) caja.style.display = 'block';
    if (hist) hist.style.display = 'none';
    if (wrap) wrap.classList.add('cart-active');
    if (btnCarrito) btnCarrito.classList.add('active');
    renderCart();
  } else if (sub === 'historial') {
    if (caja) caja.style.display = 'none';
    if (hist) hist.style.display = 'block';
    if (wrap) wrap.classList.remove('cart-active');
    if (btnHist) btnHist.classList.add('active');
    renderTodaySales();
  }

  updateMobileCartBarVisibility();
}

export function setPaymentMethod(method, btn) {
  currentSelectedPayment = method;
  document.querySelectorAll('.payment-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

export function setConsumidorFinal() {
  currentSelectedClient = { name: 'Consumidor Final', dni: '00000000', phone: '-' };
  const input = document.getElementById('cart-client-input');
  if (input) input.value = 'Consumidor Final';
  const disp = document.getElementById('cart-selected-client-display');
  if (disp) {
    disp.style.display = 'block';
    disp.textContent = '✓ Venta Rápida a Consumidor Final';
  }
}

export function suggestClient(val) {
  const query = val.toLowerCase().trim();
  const disp = document.getElementById('cart-selected-client-display');
  if (!disp) return;

  if (!query) {
    currentSelectedClient = null;
    disp.style.display = 'none';
    return;
  }

  const match = db.findClient(query);
  if (match) {
    currentSelectedClient = match;
    disp.style.display = 'block';
    disp.textContent = `✓ Cliente: ${match.name} (DNI ${match.dni})`;
  } else {
    currentSelectedClient = { name: val, dni: val, phone: '', isNew: true };
    disp.style.display = 'block';
    disp.textContent = '+ Se registrará como nuevo cliente';
  }
}

export function confirmCurrentSale() {
  if (cart.length === 0) {
    showToastFn('El carrito está vacío');
    return;
  }

  const clientInputVal = document.getElementById('cart-client-input')?.value.trim();
  let client = currentSelectedClient;
  if (!client) {
    client = clientInputVal
      ? { name: clientInputVal, dni: clientInputVal, phone: '', isNew: true }
      : { name: 'Consumidor Final', dni: '00000000', phone: '-' };
  }

  const newSale = db.registrarVenta({ cart, client, paymentMethod: currentSelectedPayment });
  lastCompletedSale = newSale;

  closeMobileCart();
  cart = [];
  renderCart();

  const clientInput = document.getElementById('cart-client-input');
  if (clientInput) clientInput.value = '';
  const disp = document.getElementById('cart-selected-client-display');
  if (disp) disp.style.display = 'none';
  currentSelectedClient = null;

  renderProductsCatalog();
  updateTodayCounters();
  openSaleSuccessModal(newSale);
}

function openSaleSuccessModal(sale) {
  const ticketEl = document.getElementById('modal-sale-ticket-id');
  if (ticketEl) ticketEl.textContent = `Ticket ${sale.id} • ${new Date(sale.date).toLocaleTimeString('es-AR')}`;

  const detailsBox = document.getElementById('modal-sale-details-box');
  if (detailsBox) {
    detailsBox.innerHTML = `
      <div style="font-size: 13px; font-weight: 600; color: #FFF; margin-bottom: 6px;">Cliente: ${sale.clientName} (DNI ${sale.clientDni})</div>
      <div style="border-top: 1px dashed var(--ck-border); padding-top: 6px; margin-bottom: 6px;">
        ${sale.items.map((i) => `
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 3px;">
            <span>${i.qty}x ${i.name}</span>
            <span style="font-family: var(--font-mono);">${db.formatMoney(i.price * i.qty)}</span>
          </div>
        `).join('')}
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: var(--ck-chrome-glow); border-top: 1px solid var(--ck-border); padding-top: 6px;">
        <span>Total Abonado (${sale.payment}):</span>
        <span style="font-family: var(--font-mono);">${db.formatMoney(sale.total)}</span>
      </div>
      <div style="margin-top: 8px; font-family: var(--font-mono); font-size: 10.5px; color: var(--ck-emerald);">
        ✓ Stock descontado automáticamente en Tiendanube
      </div>
    `;
  }
  openModalFn('modal-sale-success');
}

export function shareSaleWhatsApp() {
  if (!lastCompletedSale) return;
  const s = lastCompletedSale;
  const text = `Hola! Te compartimos el comprobante de compra en Cenko Fragancias ✨%0A%0A` +
    `Ticket: *${s.id}*%0A` +
    `Fecha: *${new Date(s.date).toLocaleDateString('es-AR')} ${new Date(s.date).toLocaleTimeString('es-AR')}*%0A` +
    `Cliente: *${s.clientName}*%0A%0A` +
    `*Perfumes Árabes:*%0A` +
    s.items.map((i) => `• ${i.qty}x ${i.name} (${db.formatMoney(i.price * i.qty)})`).join('%0A') +
    `%0A%0A*TOTAL:* ${db.formatMoney(s.total)} (${s.payment})%0A%0A` +
    `Showroom Malagueño • cenkofragancias.mitiendanube.com`;
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

export { renderTodaySales, cancelSale, shareCierreWhatsApp, openNewClientModalFn };
