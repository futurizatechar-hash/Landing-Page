/**
 * Inicializador Principal, Ruteador de Vistas y Service Worker — Cenko Fragancias
 */
import { db } from './db.js';
import {
  initPosView,
  renderProductsCatalog,
  setCategoryFilter,
  filterProducts,
  addToCart,
  updateCartQty,
  clearCart,
  renderCart,
  updateMobileCartBarVisibility,
  openMobileCart,
  closeMobileCart,
  toggleMobileCart,
  togglePosSubView,
  setPaymentMethod,
  setConsumidorFinal,
  suggestClient,
  confirmCurrentSale,
  shareSaleWhatsApp,
  renderTodaySales,
  cancelSale,
  shareCierreWhatsApp
} from './views/pos-caja.js';
import {
  initClientesView,
  renderClientsList,
  openClientHistory,
  openNewClientModal,
  saveNewClientModal
} from './views/clientes.js';
import {
  initStockView,
  renderStockView,
  quickStockDelta,
  openAdjustStockModal,
  openSingleAdjustModal,
  executeStockAdjustment,
  openSyncModal,
  forceSyncTiendanube
} from './views/stock.js';
import {
  initUsuariosView,
  renderUsersTable,
  openNewUserModal,
  saveNewUserModal,
  toggleUserStatus,
  resetDemoData,
  toggleUserDropdown,
  closeUserDropdown,
  logoutSession,
  switchSellerRole,
  lockScreen,
  unlockScreen,
  pressPinKey,
  deletePinDigit,
  clearPinInput,
  quickPinFran,
  quickPinSeller
} from './views/usuarios.js';

let currentActiveView = 'pos';
let toastTimeout;

export function openModal(id) {
  document.getElementById(id)?.classList.add('active');
}

export function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
}

export function showToast(msg) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2400);
}

export function switchView(viewName) {
  currentActiveView = viewName;
  document.body.classList.toggle('pos-view-active', viewName === 'pos');
  closeMobileCart();

  document.querySelectorAll('.view-container').forEach((el) => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab-btn').forEach((el) => el.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-item').forEach((el) => el.classList.remove('active'));

  document.getElementById('view-' + viewName)?.classList.add('active');
  document.getElementById('btn-tab-' + viewName)?.classList.add('active');
  document.getElementById('bnav-' + viewName)?.classList.add('active');

  if (viewName === 'pos') renderProductsCatalog();
  if (viewName === 'clientes') renderClientsList();
  if (viewName === 'stock') renderStockView();
  if (viewName === 'usuarios') renderUsersTable();

  updateMobileCartBarVisibility();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

Object.assign(window, {
  switchView,
  openModal,
  closeModal,
  showToast,
  setCategoryFilter,
  filterProducts,
  addToCart,
  updateCartQty,
  clearCart,
  renderCart,
  openMobileCart,
  closeMobileCart,
  toggleMobileCart,
  togglePosSubView,
  setPaymentMethod,
  setConsumidorFinal,
  suggestClient,
  confirmCurrentSale,
  shareSaleWhatsApp,
  renderTodaySales,
  cancelSale,
  shareCierreWhatsApp,
  renderClientsList,
  openClientHistory,
  openNewClientModal,
  saveNewClientModal,
  renderStockView,
  quickStockDelta,
  openAdjustStockModal,
  openSingleAdjustModal,
  executeStockAdjustment,
  openSyncModal,
  forceSyncTiendanube,
  renderUsersTable,
  openNewUserModal,
  saveNewUserModal,
  toggleUserStatus,
  resetDemoData,
  toggleUserDropdown,
  closeUserDropdown,
  logoutSession,
  switchSellerRole,
  lockScreen,
  unlockScreen,
  pressPinKey,
  deletePinDigit,
  clearPinInput,
  quickPinFran,
  quickPinSeller
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.update());
  });
  navigator.serviceWorker.register('./sw.js?v=20261123_v9').then((reg) => {
    reg.update();
  }).catch(() => {});

  let isRefreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!isRefreshing) {
      isRefreshing = true;
      window.location.reload();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.toggle('pos-view-active', currentActiveView === 'pos');

  initPosView({
    getActiveView: () => currentActiveView,
    openModal,
    showToast,
    openNewClientModal
  });
  initClientesView({ openModal, closeModal, showToast });
  initStockView({
    openModal,
    closeModal,
    showToast,
    onCatalogChanged: () => renderProductsCatalog()
  });
  initUsuariosView({ openModal, closeModal, showToast });
});

window.addEventListener('resize', () => {
  updateMobileCartBarVisibility();
});

document.addEventListener('click', (e) => {
  const wrap = document.getElementById('user-menu-wrap');
  if (wrap && !wrap.contains(e.target)) {
    closeUserDropdown();
  }
});

window.addEventListener('keydown', (e) => {
  if (!db.isTerminalLocked()) return;
  if (e.key >= '0' && e.key <= '9') pressPinKey(e.key);
  else if (e.key === 'Backspace') deletePinDigit();
  else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') clearPinInput();
});
