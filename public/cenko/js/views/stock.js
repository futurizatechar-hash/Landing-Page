/**
 * Vista Gestión de Stock, Analítica y Monitor Tiendanube — Cenko Fragancias
 */
import { db } from '../db.js';

let openModalFn = () => {};
let closeModalFn = () => {};
let showToastFn = () => {};
let onCatalogChangedFn = () => {};

export function initStockView({ openModal, closeModal, showToast, onCatalogChanged }) {
  openModalFn = openModal;
  closeModalFn = closeModal;
  showToastFn = showToast;
  onCatalogChangedFn = onCatalogChanged;

  const root = document.getElementById('view-stock');
  if (!root) return;

  root.innerHTML = `
    <div class="view-header">
      <div class="view-title-wrap">
        <h1>Gestión de Stock &amp; Analítica</h1>
        <p>Monitoreo de reposición, porcentajes de rotación de perfumes árabes y sincronización.</p>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-secondary btn-sm" onclick="openSyncModal()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          Monitor Tiendanube
        </button>
        <button class="btn btn-primary btn-sm" onclick="openAdjustStockModal()">+ Ajustar / Ingresar Stock</button>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Facturado en el Período</div>
        <div class="kpi-value" id="kpi-stock-facturado">$0</div>
        <div class="kpi-trend up">Showroom + Online</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Frascos Vendidos</div>
        <div class="kpi-value" id="kpi-stock-unidades">0</div>
        <div class="kpi-trend up">Perfumes entregados</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Fragancias en Alerta</div>
        <div class="kpi-value" id="kpi-stock-alerta" style="color: var(--ck-amber);">0</div>
        <div class="kpi-trend" style="color: var(--ck-amber);">Stock ≤ 2 unidades</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Stock Inmovilizado</div>
        <div class="kpi-value" id="kpi-stock-inmovilizado">0</div>
        <div class="kpi-trend neutral">0 ventas en el período</div>
      </div>
    </div>

    <div class="ranking-grid">
      <div class="ranking-card">
        <div class="ranking-header">
          <div class="ranking-title">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Más Vendidos (% del Total)
          </div>
          <span class="stock-badge ok">Mayor Rotación</span>
        </div>
        <div id="ranking-mas-vendidos-container"></div>
      </div>

      <div class="ranking-card">
        <div class="ranking-header">
          <div class="ranking-title">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Alertas de Reposición (Stock Crítico)
          </div>
          <span class="stock-badge out">Urgente</span>
        </div>
        <div id="ranking-menos-vendidos-container"></div>
      </div>
    </div>

    <div class="view-header" style="margin-top: 26px; margin-bottom: 12px;">
      <h3 style="font-family: var(--font-heading); font-size: 17px;">Inventario Completo de Perfumes Árabes</h3>
    </div>

    <div class="data-table-card">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Perfume</th>
              <th>Casa Árabe</th>
              <th>Presentación</th>
              <th>Precio</th>
              <th>Stock Actual</th>
              <th>Mínimo</th>
              <th>Estado</th>
              <th>Tiendanube</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody id="tabla-inventario-body"></tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderStockView() {
  const catalog = db.getCatalog();
  const totalUnits = catalog.reduce((acc, p) => acc + (p.soldUnits || 0), 0);
  const totalRevenue = catalog.reduce((acc, p) => acc + (p.revenue || 0), 0);
  const alertItems = catalog.filter((p) => p.stock <= p.minStock);
  const deadItems = catalog.filter((p) => (p.soldUnits || 0) === 0 && p.stock > 0);

  const factEl = document.getElementById('kpi-stock-facturado');
  if (!factEl) return;

  factEl.textContent = db.formatMoney(totalRevenue);
  document.getElementById('kpi-stock-unidades').textContent = totalUnits;
  document.getElementById('kpi-stock-alerta').textContent = alertItems.length;
  document.getElementById('kpi-stock-inmovilizado').textContent = deadItems.length;

  const sorted = [...catalog].sort((a, b) => (b.soldUnits || 0) - (a.soldUnits || 0));
  const topSelling = sorted.slice(0, 5);
  const maxUnits = topSelling[0]?.soldUnits || 1;

  document.getElementById('ranking-mas-vendidos-container').innerHTML = topSelling.map((p, idx) => {
    const pctOfTotal = totalUnits > 0 ? ((p.soldUnits / totalUnits) * 100).toFixed(1) : 0;
    const barWidth = Math.round((p.soldUnits / maxUnits) * 100);
    return `
      <div class="ranking-item">
        <div class="ranking-labels">
          <span class="ranking-perfume-name">${idx + 1}° ${p.name} (${p.brand})</span>
          <span class="ranking-stat-val">${p.soldUnits} uds. (${pctOfTotal}%)</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill gold" style="width: ${barWidth}%;"></div>
        </div>
      </div>
    `;
  }).join('');

  const lowContainer = document.getElementById('ranking-menos-vendidos-container');
  const urgentReponer = alertItems.slice(0, 5);
  if (urgentReponer.length === 0) {
    lowContainer.innerHTML = `<div style="color: var(--ck-emerald); font-size: 12.5px; text-align: center; padding: 18px;">✓ Todo el inventario sobre el stock mínimo.</div>`;
  } else {
    lowContainer.innerHTML = urgentReponer.map((p) => {
      const isOut = p.stock <= 0;
      return `
        <div class="ranking-item">
          <div class="ranking-labels">
            <span class="ranking-perfume-name" style="${isOut ? 'color: var(--ck-rose);' : ''}">${p.name} (${p.brand})</span>
            <span class="ranking-stat-val" style="color: ${isOut ? 'var(--ck-rose)' : 'var(--ck-amber)'};">
              ${isOut ? '¡AGOTADO!' : `Quedan ${p.stock} (Mín: ${p.minStock})`}
            </span>
          </div>
          <div class="progress-track">
            <div class="progress-fill ${isOut ? 'rose' : ''}" style="width: ${Math.min(100, (p.stock / p.minStock) * 100)}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  document.getElementById('tabla-inventario-body').innerHTML = catalog.map((p) => {
    let statusBadge = '<span class="stock-badge ok">Stock OK</span>';
    if (p.stock <= 0) statusBadge = '<span class="stock-badge out">Agotado</span>';
    else if (p.stock <= p.minStock) statusBadge = '<span class="stock-badge low">Stock Bajo</span>';

    return `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.brand}</td>
        <td>${p.variant}</td>
        <td style="font-family: var(--font-mono); font-weight: 700;">${db.formatMoney(p.price)}</td>
        <td style="white-space: nowrap;">
          <div class="quick-stock-step-ctrls">
            <button class="step-btn minus" onclick="quickStockDelta('${p.id}', -1)" title="Restar 1 unidad">-</button>
            <span class="step-val ${p.stock <= p.minStock ? 'text-danger' : ''}">${p.stock}</span>
            <button class="step-btn plus" onclick="quickStockDelta('${p.id}', 1)" title="Sumar 1 unidad">+</button>
          </div>
        </td>
        <td style="font-family: var(--font-mono); color: var(--ck-text-muted);">${p.minStock}</td>
        <td>${statusBadge}</td>
        <td><span class="stock-badge ok">✓ Sincronizado</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="openSingleAdjustModal('${p.id}')">Ajustar</button>
        </td>
      </tr>
    `;
  }).join('');
}

export function quickStockDelta(prodId, delta) {
  const prod = db.quickStockDelta(prodId, delta);
  if (!prod) return;
  renderStockView();
  onCatalogChangedFn();
  showToastFn(`${prod.name}: stock ${prod.stock} uds`);
}

export function openAdjustStockModal() {
  const select = document.getElementById('adjust-product-select');
  if (select) {
    select.innerHTML = db.getCatalog().map((p) => `<option value="${p.id}">${p.brand} - ${p.name} [Stock: ${p.stock}]</option>`).join('');
  }
  openModalFn('modal-adjust-stock');
}

export function openSingleAdjustModal(prodId) {
  openAdjustStockModal();
  const select = document.getElementById('adjust-product-select');
  if (select) select.value = prodId;
}

export function executeStockAdjustment() {
  const prodId = document.getElementById('adjust-product-select').value;
  const type = document.getElementById('adjust-type-select').value;
  const qty = parseInt(document.getElementById('adjust-qty-input').value, 10);

  const prod = db.ajustarStock({ prodId, type, qty });
  if (!prod) return;

  closeModalFn('modal-adjust-stock');
  renderStockView();
  onCatalogChangedFn();
  showToastFn(`Stock de ${prod.name} actualizado`);
}

export function openSyncModal() {
  const logContainer = document.getElementById('sync-events-log-container');
  if (logContainer) {
    logContainer.innerHTML = db.getSyncLog().map((e) => `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 3px;">
        <span>[${e.time}] ${e.details}</span>
        <span style="color: var(--ck-emerald);">${e.status}</span>
      </div>
    `).join('');
  }
  openModalFn('modal-sync-monitor');
}

export function forceSyncTiendanube() {
  db.forceSyncTiendanube();
  openSyncModal();
  showToastFn('Conciliación completada con Tiendanube');
}
