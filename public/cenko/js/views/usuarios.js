/**
 * Vista Usuarios, Permisos y Seguridad de Terminal PIN — Cenko Fragancias
 */
import { db } from '../db.js';

let currentEnteredPin = '';
let openModalFn = () => {};
let closeModalFn = () => {};
let showToastFn = () => {};

export function initUsuariosView({ openModal, closeModal, showToast }) {
  openModalFn = openModal;
  closeModalFn = closeModal;
  showToastFn = showToast;

  const root = document.getElementById('view-usuarios');
  if (!root) return;

  root.innerHTML = `
    <div class="view-header">
      <div class="view-title-wrap">
        <h1>Control de Usuarios &amp; Permisos</h1>
        <p>Fran (Super-Admin): administración de accesos y seguridad del personal.</p>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn btn-danger" onclick="logoutSession()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Bloquear Terminal / Cerrar Sesión
        </button>
        <button class="btn btn-primary" onclick="openNewUserModal()">+ Crear Nuevo Usuario</button>
      </div>
    </div>

    <div class="data-table-card" style="margin-bottom: 20px;">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Permisos Activos</th>
              <th>Estado</th>
              <th>Último Ingreso</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody id="tabla-usuarios-body"></tbody>
        </table>
      </div>
    </div>

    <div style="padding: 18px; background: var(--ck-surface); border: 1px solid var(--ck-border); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
      <div>
        <h4 style="font-family: var(--font-heading); font-size: 14.5px; margin-bottom: 2px;">Restablecer Datos de Demostración</h4>
        <p style="font-size: 12.5px; color: var(--ck-text-muted);">Reinicia ventas y clientes de prueba para volver al estado inicial del catálogo.</p>
      </div>
      <button class="btn btn-danger btn-sm" onclick="resetDemoData()">Reiniciar Datos</button>
    </div>
  `;

  updateUserSessionUI();
  if (db.isTerminalLocked()) {
    document.getElementById('lock-screen-overlay')?.classList.add('active');
    document.getElementById('pin-error-msg')?.classList.remove('visible');
    updatePinDots();
  }
}

export function renderUsersTable() {
  const tbody = document.getElementById('tabla-usuarios-body');
  if (!tbody) return;

  tbody.innerHTML = db.getUsers().map((u) => `
    <tr>
      <td><strong>${u.name}</strong></td>
      <td style="font-family: var(--font-mono);">${u.email}</td>
      <td><span class="stock-badge ok">${u.role}</span></td>
      <td style="font-size: 11.5px; color: var(--ck-text-muted);">${u.permissions.join(', ')}</td>
      <td><span class="stock-badge ${u.status === 'Activo' ? 'ok' : 'out'}">${u.status}</span></td>
      <td style="font-family: var(--font-mono); font-size: 11.5px;">${u.lastLogin}</td>
      <td>
        ${u.role === 'Super-Admin' ? '<span style="font-size: 11px; color: var(--ck-champagne);">Inmutable</span>' : `
          <button class="btn btn-secondary btn-sm" onclick="toggleUserStatus('${u.id}')">${u.status === 'Activo' ? 'Desactivar' : 'Activar'}</button>
        `}
      </td>
    </tr>
  `).join('');
}

export function openNewUserModal() {
  document.getElementById('new-user-name').value = '';
  document.getElementById('new-user-email').value = '';
  openModalFn('modal-new-user');
}

export function saveNewUserModal() {
  const name = document.getElementById('new-user-name').value.trim();
  const email = document.getElementById('new-user-email').value.trim();
  const role = document.getElementById('new-user-role-select').value;

  if (!name || !email) {
    showToastFn('Nombre y email requeridos');
    return;
  }

  db.addUser({ name, email, role });
  closeModalFn('modal-new-user');
  renderUsersTable();
  showToastFn(`Usuario ${name} creado`);
}

export function toggleUserStatus(userId) {
  const user = db.toggleUserStatus(userId);
  if (!user) return;
  renderUsersTable();
  showToastFn(`Usuario ${user.name} marcado como ${user.status}`);
}

export function resetDemoData() {
  if (!confirm('¿Restablecer el catálogo y base de prueba al estado inicial?')) return;
  db.resetDemoData();
}

export function toggleUserDropdown(e) {
  if (e) e.stopPropagation();
  document.getElementById('user-dropdown-menu')?.classList.toggle('active');
}

export function closeUserDropdown() {
  document.getElementById('user-dropdown-menu')?.classList.remove('active');
}

export function logoutSession() {
  closeUserDropdown();
  lockScreen();
  showToastFn('Sesión cerrada. Terminal bloqueada.');
}

export function switchSellerRole() {
  closeUserDropdown();
  const current = db.getSessionUser();
  const nextUser = current.role === 'Super-Admin'
    ? { id: 'USR-02', name: 'Vendedor Showroom', role: 'Vendedor', pin: '0000' }
    : { id: 'USR-01', name: 'Fran', role: 'Super-Admin', pin: '1234' };
  db.setSessionUser(nextUser);
  updateUserSessionUI();
  showToastFn(`Cambiado a perfil: ${nextUser.name}`);
}

export function updateUserSessionUI() {
  const user = db.getSessionUser();
  const nameLabel = document.getElementById('user-name-label');
  const avatarBadge = document.getElementById('user-avatar-badge');
  const menuName = document.getElementById('menu-user-name');
  const menuRole = document.getElementById('menu-user-role');

  const initial = user.name.charAt(0).toUpperCase();
  if (nameLabel) nameLabel.textContent = user.name;
  if (avatarBadge) avatarBadge.textContent = initial;
  if (menuName) menuName.textContent = user.name === 'Fran' ? 'Francisco "Fran" Sverko' : user.name;
  if (menuRole) menuRole.textContent = user.role + ' • Showroom Malagueño';
}

export function lockScreen() {
  closeUserDropdown();
  db.setTerminalLocked(true);
  currentEnteredPin = '';
  updatePinDots();
  document.getElementById('pin-error-msg')?.classList.remove('visible');
  document.getElementById('lock-screen-overlay')?.classList.add('active');
}

export function unlockScreen() {
  db.setTerminalLocked(false);
  currentEnteredPin = '';
  updatePinDots();
  document.getElementById('lock-screen-overlay')?.classList.remove('active');
  document.getElementById('pin-error-msg')?.classList.remove('visible');
  showToastFn(`Sesión activa: ${db.getSessionUser().name}`);
}

export function updatePinDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById('pindot-' + i);
    if (dot) dot.classList.toggle('filled', i < currentEnteredPin.length);
  }
}

export function pressPinKey(digit) {
  if (currentEnteredPin.length >= 4) return;
  currentEnteredPin += digit;
  updatePinDots();
  document.getElementById('pin-error-msg')?.classList.remove('visible');
  if (currentEnteredPin.length === 4) {
    setTimeout(validatePin, 120);
  }
}

export function deletePinDigit() {
  if (currentEnteredPin.length > 0) {
    currentEnteredPin = currentEnteredPin.slice(0, -1);
    updatePinDots();
    document.getElementById('pin-error-msg')?.classList.remove('visible');
  }
}

export function clearPinInput() {
  currentEnteredPin = '';
  updatePinDots();
  document.getElementById('pin-error-msg')?.classList.remove('visible');
}

export function validatePin() {
  const matchedUser = db.validatePin(currentEnteredPin);
  if (matchedUser) {
    updateUserSessionUI();
    unlockScreen();
    return;
  }
  const errorEl = document.getElementById('pin-error-msg');
  if (errorEl) {
    errorEl.classList.remove('visible');
    void errorEl.offsetWidth;
    errorEl.classList.add('visible');
  }
  currentEnteredPin = '';
  setTimeout(updatePinDots, 250);
}

export function quickPinFran() {
  currentEnteredPin = '1234';
  updatePinDots();
  validatePin();
}

export function quickPinSeller() {
  currentEnteredPin = '0000';
  updatePinDots();
  validatePin();
}
