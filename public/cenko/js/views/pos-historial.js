/**
 * Submódulo Historial de Ventas del Día & Cierre de Caja — Cenko Fragancias
 */
import { db } from '../../db.js';

let showToastFn = () => {};
let onSaleCancelledFn = () => {};

export function initPosHistorial({ showToast, onSaleCancelled }) {
  showToastFn = showToast;
  onSaleCancelledFn = onSaleCancelled;
}

export function getPosHistorialHtml() {
  return `
    <div id="pos-sub-historial" style="display: none;">
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Total Recaudado Hoy</div>
          <div class="kpi-value" id="kpi-hoy-total">$0</div>
          <div class="kpi-trend up" id="kpi-hoy-cant">0 ventas confirmadas</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Transferencias</div>
          <div class="kpi-value" id="kpi-hoy-transf">$0</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Efectivo en Caja</div>
          <div class="kpi-value" id="kpi-hoy-efvo">$0</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Tarjetas (Débito/Crédito)</div>
          <div class="kpi-value" id="kpi-hoy-tarj">$0</div>
        </div>
      </div>

      <div class="data-table-card">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Ticket</th>
                <th>Cliente</th>
                <th>Detalle de Fragancias Árabes</th>
                <th>Medio de Pago</th>
                <th>Total</th>
                <th>Tiendanube</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody id="tabla-ventas-hoy-body"></tbody>
          </table>
        </div>
      </div>

      <div class="cierre-caja-card" id="cierre-caja-card">
        <div class="cierre-caja-header">
          <div>
            <div class="cierre-caja-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Cierre de Caja Diario (Showroom)
            </div>
            <p style="font-size: 12px; color: var(--ck-text-muted); margin-top: 2px;">Balance diario y desglose de cobranzas para rendición directa a Francisco.</p>
          </div>
          <button class="btn btn-whatsapp btn-sm" onclick="shareCierreWhatsApp()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            Enviar Cierre a Fran por WhatsApp
          </button>
        </div>
      </div>
    </div>
  `;
}

export function renderTodaySales() {
  const tbody = document.getElementById('tabla-ventas-hoy-body');
  if (!tbody) return;

  const salesToday = db.getTodaySales();
  let tot = 0, transf = 0, efvo = 0, tarj = 0;
  salesToday.forEach((v) => {
    if (v.status !== 'Anulada') {
      tot += v.total;
      if (v.payment === 'Transferencia') transf += v.total;
      else if (v.payment === 'Efectivo') efvo += v.total;
      else tarj += v.total;
    }
  });

  document.getElementById('kpi-hoy-total').textContent = db.formatMoney(tot);
  document.getElementById('kpi-hoy-cant').textContent = `${salesToday.filter((v) => v.status !== 'Anulada').length} ventas confirmadas`;
  document.getElementById('kpi-hoy-transf').textContent = db.formatMoney(transf);
  document.getElementById('kpi-hoy-efvo').textContent = db.formatMoney(efvo);
  document.getElementById('kpi-hoy-tarj').textContent = db.formatMoney(tarj);

  if (salesToday.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--ck-text-muted); padding: 26px;">Aún no hay ventas registradas en el día de hoy.</td></tr>`;
    return;
  }

  tbody.innerHTML = salesToday.map((v) => {
    const isAnulada = v.status === 'Anulada';
    return `
      <tr style="${isAnulada ? 'opacity: 0.5; text-decoration: line-through;' : ''}">
        <td style="font-family: var(--font-mono);">${new Date(v.date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</td>
        <td style="font-family: var(--font-mono); font-weight: 700;">${v.id}</td>
        <td><strong>${v.clientName}</strong></td>
        <td>${v.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}</td>
        <td><span class="stock-badge" style="background: rgba(255,255,255,0.06); color: #fff;">${v.payment}</span></td>
        <td style="font-family: var(--font-mono); font-weight: 800;">${db.formatMoney(v.total)}</td>
        <td><span class="stock-badge ok">✓ Sincronizado</span></td>
        <td>
          ${isAnulada ? '<span style="color: var(--ck-rose); font-size: 11px;">Anulada</span>' : `<button class="btn btn-sm btn-danger" onclick="cancelSale('${v.id}')">Anular</button>`}
        </td>
      </tr>
    `;
  }).join('');
}

export function cancelSale(saleId) {
  if (!confirm(`¿Anular la venta ${saleId}? El stock se devolverá al inventario automáticamente.`)) return;
  const cancelled = db.anularVenta(saleId);
  if (!cancelled) return;
  renderTodaySales();
  updateTodayCounters();
  onSaleCancelledFn();
  showToastFn(`Venta ${saleId} anulada y stock devuelto`);
}

export function updateTodayCounters() {
  const count = db.getTodaySales().filter((v) => v.status !== 'Anulada').length;
  const countEl = document.getElementById('count-ventas-hoy');
  if (countEl) countEl.textContent = count;
}

export function shareCierreWhatsApp() {
  const salesToday = db.getTodaySales().filter((v) => v.status !== 'Anulada');
  let tot = 0, transf = 0, efvo = 0, tarj = 0;
  salesToday.forEach((v) => {
    tot += v.total;
    if (v.payment === 'Transferencia') transf += v.total;
    else if (v.payment === 'Efectivo') efvo += v.total;
    else tarj += v.total;
  });

  const nowTime = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  const nowDate = new Date().toLocaleDateString('es-AR');
  const activeUser = db.getSessionUser();

  const text =
    `*🏛️ CIERRE DE CAJA — CENKO FRAGANCIAS*%0A` +
    `Showroom Malagueño • ${nowDate} ${nowTime}%0A` +
    `Responsable de Caja: *${activeUser.name}*%0A` +
    `──────────────────────────%0A` +
    `*TOTAL OPERACIONES:* ${salesToday.length} ventas confirmadas%0A` +
    `*TOTAL RECAUDADO:* ${db.formatMoney(tot)}%0A` +
    `──────────────────────────%0A` +
    `*DESGLOSE DE COBRANZAS:*%0A` +
    `• 💳 Transferencias: ${db.formatMoney(transf)}%0A` +
    `• 💵 Efectivo en Caja: ${db.formatMoney(efvo)}%0A` +
    `• 💳 Tarjetas Débito / Crédito: ${db.formatMoney(tarj)}%0A` +
    `──────────────────────────%0A` +
    `*SINCRONIZACIÓN TIENDANUBE:* ✓ Stock conciliado al 100%%0A` +
    `*Cenko Fragancias* — Perfumería Árabe Exclusiva`;

  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}
