/**
 * Vista Directorio e Historial de Clientes — Cenko Fragancias
 */
import { db } from '../db.js';

let openModalFn = () => {};
let closeModalFn = () => {};
let showToastFn = () => {};

export function initClientesView({ openModal, closeModal, showToast }) {
  openModalFn = openModal;
  closeModalFn = closeModal;
  showToastFn = showToast;

  const root = document.getElementById('view-clientes');
  if (!root) return;

  root.innerHTML = `
    <div class="view-header">
      <div class="view-title-wrap">
        <h1>Directorio de Clientes</h1>
        <p>Historial de fragancias árabes compradas, perfil de notas olfativas y contacto directo.</p>
      </div>
      <button class="btn btn-secondary" onclick="openNewClientModal()">+ Registrar Nuevo Cliente</button>
    </div>

    <div class="search-filter-box">
      <div class="search-input-wrap">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="clientes-search-input" class="input-field" placeholder="Buscar cliente por DNI, nombre o teléfono..." oninput="renderClientsList()">
      </div>
    </div>

    <div class="data-table-card">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Nombre &amp; Apellido</th>
              <th>DNI</th>
              <th>WhatsApp</th>
              <th>Total Gastado</th>
              <th>Compras</th>
              <th>Ticket Promedio</th>
              <th>Última Compra</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody id="tabla-clientes-body"></tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderClientsList() {
  const tbody = document.getElementById('tabla-clientes-body');
  if (!tbody) return;

  const query = (document.getElementById('clientes-search-input')?.value || '').toLowerCase().trim();
  const filtered = db.getClientes().filter((c) => {
    return !query || c.name.toLowerCase().includes(query) || c.dni.includes(query) || (c.phone && c.phone.includes(query));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--ck-text-muted); padding: 26px;">No se encontraron clientes.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((c) => `
    <tr>
      <td>
        <strong>${c.name}</strong>
        <div style="font-size: 11px; color: var(--ck-text-muted);">${c.notes || 'Sin preferencias'}</div>
      </td>
      <td style="font-family: var(--font-mono);">${c.dni}</td>
      <td>
        ${c.phone && c.phone !== '-' ? `
          <a href="https://wa.me/549${c.phone.replace(/[^0-9]/g, '')}" target="_blank" class="btn btn-whatsapp btn-sm" style="padding: 2px 7px; font-size: 11px;">
            WhatsApp
          </a>
        ` : '<span style="color: var(--ck-text-muted);">-</span>'}
      </td>
      <td style="font-family: var(--font-mono); font-weight: 700; color: var(--ck-chrome-glow);">${db.formatMoney(c.totalSpent)}</td>
      <td style="font-family: var(--font-mono);">${c.purchasesCount}</td>
      <td style="font-family: var(--font-mono);">${db.formatMoney(c.avgTicket)}</td>
      <td style="font-family: var(--font-mono);">${c.lastDate}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openClientHistory('${c.id}')">Historial</button>
      </td>
    </tr>
  `).join('');
}

export function openClientHistory(clientId) {
  const client = db.getClientById(clientId);
  if (!client) return;

  const clientSales = db.getVentas().filter((v) => v.clientDni === client.dni && v.status !== 'Anulada');

  const header = document.getElementById('modal-client-profile-header');
  if (header) {
    header.innerHTML = `
      <h3 style="font-family: var(--font-heading); font-size: 18px; margin-bottom: 2px;">${client.name}</h3>
      <p style="font-size: 12.5px; color: var(--ck-text-muted);">DNI ${client.dni} • WhatsApp: ${client.phone || '-'}</p>
      <div style="display: flex; gap: 12px; margin-top: 10px; font-family: var(--font-mono); font-size: 11.5px; color: var(--ck-champagne);">
        <span>Total: ${db.formatMoney(client.totalSpent)}</span>
        <span>•</span>
        <span>Compras: ${client.purchasesCount}</span>
      </div>
    `;
  }

  const timeline = document.getElementById('modal-client-timeline');
  if (timeline) {
    if (clientSales.length === 0) {
      timeline.innerHTML = `<div style="text-align: center; color: var(--ck-text-muted); padding: 18px;">Sin historial de compras.</div>`;
    } else {
      timeline.innerHTML = clientSales.map((s) => `
        <div style="background: var(--ck-noir-deep); border: 1px solid var(--ck-border); border-radius: var(--radius-sm); padding: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 11.5px; margin-bottom: 4px;">
            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--ck-chrome);">${s.id}</span>
            <span style="color: var(--ck-text-muted);">${new Date(s.date).toLocaleDateString('es-AR')}</span>
          </div>
          <div style="font-size: 12.5px; font-weight: 600; color: #FFF; margin-bottom: 4px;">
            ${s.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; border-top: 1px dashed var(--ck-border); padding-top: 4px;">
            <span style="color: var(--ck-text-muted);">${s.payment}</span>
            <span style="font-family: var(--font-mono); font-weight: 800; color: var(--ck-chrome-glow);">${db.formatMoney(s.total)}</span>
          </div>
        </div>
      `).join('');
    }
  }

  openModalFn('modal-client-history');
}

export function openNewClientModal() {
  document.getElementById('new-client-name').value = '';
  document.getElementById('new-client-dni').value = '';
  document.getElementById('new-client-phone').value = '';
  document.getElementById('new-client-notes').value = '';
  openModalFn('modal-new-client');
}

export function saveNewClientModal() {
  const name = document.getElementById('new-client-name').value.trim();
  const dni = document.getElementById('new-client-dni').value.trim();
  const phone = document.getElementById('new-client-phone').value.trim();
  const notes = document.getElementById('new-client-notes').value.trim();

  if (!name || !dni) {
    showToastFn('Nombre y DNI obligatorios');
    return;
  }

  db.addCliente({ name, dni, phone, notes });
  closeModalFn('modal-new-client');
  renderClientsList();
  showToastFn(`Cliente ${name} guardado`);
}
