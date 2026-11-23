/**
 * Adaptador de Datos Desacoplado — Cenko Fragancias POS & Stock
 * Opera sobre localStorage + semillas en fase demo y permite conectar
 * Supabase (Postgres/Auth/RPC) sin modificar ninguna vista.
 */

const STORAGE_PREFIX = 'cenko_arab_';

const DEFAULT_ARAB_CATALOG = [
  { id: 'CK-AR-01', brand: 'Lattafa', name: 'Khamrah', category: 'Gourmand', variant: '100ml Eau de Parfum', price: 89000, stock: 5, minStock: 2, soldUnits: 28, revenue: 2492000, image: 'https://fimgs.net/mdimg/perfume/375x500.75805.jpg', notes: 'Canela, nuez moscada, praliné, dátiles, vainilla y haba tonka.' },
  { id: 'CK-AR-02', brand: 'Lattafa', name: 'Asad', category: 'Amaderado', variant: '100ml Eau de Parfum', price: 74000, stock: 6, minStock: 2, soldUnits: 24, revenue: 1776000, image: 'https://fimgs.net/mdimg/perfume/375x500.72889.jpg', notes: 'Pimienta negra, café, tabaco, piña, iris y maderas ambaradas.' },
  { id: 'CK-AR-03', brand: 'Lattafa', name: 'Yara', category: 'Gourmand', variant: '100ml Eau de Parfum', price: 68000, stock: 7, minStock: 3, soldUnits: 32, revenue: 2176000, image: 'https://fimgs.net/mdimg/perfume/375x500.65582.jpg', notes: 'Orquídea, heliotropo, frutas tropicales, vainilla cremosa y almizcle.' },
  { id: 'CK-AR-04', brand: 'Afnan', name: '9 PM', category: 'Gourmand', variant: '100ml Eau de Parfum', price: 84000, stock: 4, minStock: 2, soldUnits: 22, revenue: 1848000, image: 'https://fimgs.net/mdimg/perfume/375x500.65414.jpg', notes: 'Manzana verde, canela silvestre, lavanda, vainilla bourbon y pachulí.' },
  { id: 'CK-AR-05', brand: 'Armaf', name: 'Club de Nuit Intense Man', category: 'Cítrico', variant: '105ml Pure Parfum', price: 86000, stock: 2, minStock: 2, soldUnits: 26, revenue: 2236000, image: 'https://fimgs.net/mdimg/perfume/375x500.34696.jpg', notes: 'Limón, piña, grosella, abedul ahumado, jazmín, ámbar gris y pachulí.' },
  { id: 'CK-AR-06', brand: 'Rasasi', name: 'Hawas for Him', category: 'Cítrico', variant: '100ml Eau de Parfum', price: 98000, stock: 1, minStock: 2, soldUnits: 19, revenue: 1862000, image: 'https://fimgs.net/mdimg/perfume/375x500.39433.jpg', notes: 'Manzana, bergamota, ciruela, canela, notas marinas y ámbar gris.' },
  { id: 'CK-AR-07', brand: 'Lattafa', name: "Bade'e Al Oud (Oud for Glory)", category: 'Oriental', variant: '100ml Eau de Parfum', price: 82000, stock: 3, minStock: 2, soldUnits: 15, revenue: 1230000, image: 'https://fimgs.net/mdimg/perfume/375x500.64948.jpg', notes: 'Azafrán, lavanda francesa, nuez moscada, madera de oud y pachulí.' },
  { id: 'CK-AR-08', brand: 'Al Haramain', name: 'Amber Oud Gold Edition', category: 'Gourmand', variant: '60ml Eau de Parfum', price: 118000, stock: 2, minStock: 1, soldUnits: 12, revenue: 1416000, image: 'https://fimgs.net/mdimg/perfume/375x500.51818.jpg', notes: 'Bergamota fresca, melón, piña jugosa, ámbar cálido y vainilla dulce.' },
  { id: 'CK-AR-09', brand: 'Lattafa', name: 'Fakhar Black', category: 'Cítrico', variant: '100ml Eau de Parfum', price: 72000, stock: 5, minStock: 2, soldUnits: 14, revenue: 1008000, image: 'https://fimgs.net/mdimg/perfume/375x500.70229.jpg', notes: 'Manzana crujiente, jengibre, bergamota, salvia, lavanda y cedro.' },
  { id: 'CK-AR-10', brand: 'Lattafa', name: 'Khamrah Qahwa', category: 'Gourmand', variant: '100ml Eau de Parfum', price: 94000, stock: 0, minStock: 2, soldUnits: 16, revenue: 1504000, image: 'https://fimgs.net/mdimg/perfume/375x500.88796.jpg', notes: 'Café tostado arábico, canela, cardamomo, praliné, jengibre y vainilla.' },
  { id: 'CK-AR-11', brand: 'Afnan', name: 'Turathi Blue', category: 'Cítrico', variant: '90ml Eau de Parfum', price: 88000, stock: 4, minStock: 2, soldUnits: 13, revenue: 1144000, image: 'https://fimgs.net/mdimg/perfume/375x500.70817.jpg', notes: 'Pomelo espumoso, notas cítricas mediterráneas, madera noble y ámbar.' },
  { id: 'CK-AR-12', brand: 'Lattafa', name: 'Nebras', category: 'Gourmand', variant: '100ml Eau de Parfum', price: 85000, stock: 3, minStock: 2, soldUnits: 11, revenue: 935000, image: 'https://fimgs.net/mdimg/perfume/375x500.78168.jpg', notes: 'Bayas rojas, mandarina, cacao amargo, vainilla dulce y haba tonka.' },
  { id: 'CK-AR-13', brand: 'Swiss Arabian', name: 'Shaghaf Oud', category: 'Oriental', variant: '75ml Eau de Parfum', price: 92000, stock: 1, minStock: 2, soldUnits: 9, revenue: 828000, image: 'https://fimgs.net/mdimg/perfume/375x500.50582.jpg', notes: 'Azafrán persa, rosa de Damasco, praliné, madera de oud y vainilla.' },
  { id: 'CK-AR-14', brand: 'Armaf', name: 'Club de Nuit Sillage', category: 'Cítrico', variant: '105ml Eau de Parfum', price: 86000, stock: 4, minStock: 2, soldUnits: 10, revenue: 860000, image: 'https://fimgs.net/mdimg/perfume/375x500.64105.jpg', notes: 'Bergamota cristalina, grosella negra, limón, lima, rosa, violeta e iris.' },
  { id: 'CK-AR-15', brand: 'Maison Alhambra', name: 'Kismet for Men', category: 'Amaderado', variant: '100ml Eau de Parfum', price: 69000, stock: 0, minStock: 2, soldUnits: 8, revenue: 552000, image: 'https://fimgs.net/mdimg/perfume/375x500.73024.jpg', notes: 'Coñac añejo, café tostado, cacao, nuez moscada y sándalo cremoso.' },
  { id: 'CK-AR-16', brand: 'Afnan', name: 'Supremacy Not Only Intense', category: 'Cítrico', variant: '100ml Extrait de Parfum', price: 115000, stock: 2, minStock: 1, soldUnits: 7, revenue: 805000, image: 'https://fimgs.net/mdimg/perfume/375x500.68254.jpg', notes: 'Grosella negra, bergamota, manzana verde, musgo de roble y ámbar gris.' }
];

const DEFAULT_CLIENTES = [
  { id: 'CLI-01', name: 'Santiago Morales', dni: '37812904', phone: '3515124099', totalSpent: 247000, purchasesCount: 3, avgTicket: 82333, lastDate: '2026-11-19', notes: "Prefiere maderas orientales y oud. Compró Asad y Bade'e Al Oud." },
  { id: 'CLI-02', name: 'Lucas Giordani', dni: '40129388', phone: '3518902143', totalSpent: 178000, purchasesCount: 2, avgTicket: 89000, lastDate: '2026-11-18', notes: 'Fanático absoluto de los gourmand. Compró Khamrah y Khamrah Qahwa.' },
  { id: 'CLI-03', name: 'Valentina Rossi', dni: '35901233', phone: '3516772100', totalSpent: 136000, purchasesCount: 2, avgTicket: 68000, lastDate: '2026-11-15', notes: 'Le encanta Lattafa Yara y notas dulces cremosas.' },
  { id: 'CLI-04', name: 'Agustín Ferreyra', dni: '39445120', phone: '3513309182', totalSpent: 170000, purchasesCount: 2, avgTicket: 85000, lastDate: '2026-11-10', notes: 'Perfumes árabes de uso diario versátiles (Club de Nuit y 9 PM).' }
];

const DEFAULT_USERS = [
  { id: 'USR-01', name: 'Francisco Sverko (Fran)', email: 'fran@cenko.com', role: 'Super-Admin', pin: '1234', status: 'Activo', lastLogin: 'Hoy, 04:50 hs', permissions: ['ventas.crear', 'ventas.descuento', 'ventas.ver_todas', 'ventas.anular', 'clientes.ver', 'clientes.editar', 'stock.ver', 'stock.ajustar', 'costos.ver', 'tiendanube.gestionar'] },
  { id: 'USR-02', name: 'Vendedor Showroom', email: 'vendedor@cenko.com', role: 'Vendedor', pin: '0000', status: 'Activo', lastLogin: 'Ayer, 20:00 hs', permissions: ['ventas.crear', 'clientes.ver'] },
  { id: 'USR-03', name: 'Encargado Stock', email: 'stock@cenko.com', role: 'Encargado', status: 'Activo', lastLogin: '18 Nov, 18:30 hs', permissions: ['ventas.crear', 'clientes.ver', 'stock.ver', 'stock.ajustar'] }
];

const DEFAULT_VENTAS = [
  { id: 'CK-1048', date: '2026-11-20T04:10:00', clientDni: '37812904', clientName: 'Santiago Morales', items: [{ name: 'Lattafa Khamrah (100ml)', price: 89000, qty: 1 }], total: 89000, payment: 'Transferencia', channel: 'Showroom', status: 'Confirmada' },
  { id: 'CK-1047', date: '2026-11-20T03:30:00', clientDni: '40129388', clientName: 'Lucas Giordani', items: [{ name: 'Afnan 9 PM (100ml)', price: 84000, qty: 1 }], total: 84000, payment: 'Efectivo', channel: 'Showroom', status: 'Confirmada' }
];

const DEFAULT_SYNCLOG = [
  { time: '04:50:11', details: 'Lattafa Khamrah (100ml) -1 en Tiendanube', status: 'OK 200' },
  { time: '04:30:04', details: 'Afnan 9 PM (100ml) -1 en Tiendanube', status: 'OK 200' },
  { time: '04:00:00', details: 'Catálogo sincronizado (16 fragancias árabes)', status: 'OK 200' }
];

function loadState(key, fallback) {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function saveState(key, val) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
  } catch {
    // Storage lleno o restringido
  }
}

const state = {
  catalog: loadState('catalog', DEFAULT_ARAB_CATALOG),
  clientes: loadState('clientes', DEFAULT_CLIENTES),
  users: loadState('users', DEFAULT_USERS),
  ventas: loadState('ventas', DEFAULT_VENTAS),
  syncLog: loadState('synclog', DEFAULT_SYNCLOG),
  terminalLocked: loadState('terminalLocked', false),
  activeUser: loadState('activeUser', { id: 'USR-01', name: 'Fran', role: 'Super-Admin', pin: '1234' })
};

export const db = {
  formatMoney(num) {
    return '$ ' + Number(num || 0).toLocaleString('es-AR');
  },

  getCatalog() {
    return state.catalog;
  },

  getProductById(id) {
    return state.catalog.find((p) => p.id === id) || null;
  },

  getClientes() {
    return state.clientes;
  },

  getClientById(id) {
    return state.clientes.find((c) => c.id === id) || null;
  },

  findClient(query) {
    const q = String(query || '').toLowerCase().trim();
    if (!q) return null;
    return state.clientes.find((c) => c.dni.includes(q) || c.name.toLowerCase().includes(q)) || null;
  },

  addCliente({ name, dni, phone, notes }) {
    const newCli = {
      id: 'CLI-' + String(state.clientes.length + 1).padStart(2, '0'),
      name,
      dni,
      phone: phone || '-',
      totalSpent: 0,
      purchasesCount: 0,
      avgTicket: 0,
      lastDate: new Date().toISOString().slice(0, 10),
      notes: notes || 'Sin notas'
    };
    state.clientes.unshift(newCli);
    saveState('clientes', state.clientes);
    return newCli;
  },

  getVentas() {
    return state.ventas;
  },

  getTodaySales() {
    const todayStr = new Date().toISOString().slice(0, 10);
    return state.ventas.filter((v) => v.date.startsWith(todayStr));
  },

  registrarVenta({ cart, client, paymentMethod }) {
    let resolvedClient = client;
    if (resolvedClient.isNew) {
      resolvedClient = this.addCliente({
        name: resolvedClient.name,
        dni: resolvedClient.dni,
        phone: resolvedClient.phone || '-',
        notes: 'Registrado en mostrador'
      });
    }

    cart.forEach((cartItem) => {
      const prod = this.getProductById(cartItem.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - cartItem.qty);
        prod.soldUnits = (prod.soldUnits || 0) + cartItem.qty;
        prod.revenue = (prod.revenue || 0) + cartItem.price * cartItem.qty;
        state.syncLog.unshift({
          time: new Date().toLocaleTimeString('es-AR'),
          details: `${prod.name} (${prod.variant}) -${cartItem.qty} en Tiendanube`,
          status: 'OK 200'
        });
      }
    });

    const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    if (resolvedClient.dni !== '00000000') {
      resolvedClient.totalSpent = (resolvedClient.totalSpent || 0) + total;
      resolvedClient.purchasesCount = (resolvedClient.purchasesCount || 0) + 1;
      resolvedClient.avgTicket = Math.round(resolvedClient.totalSpent / resolvedClient.purchasesCount);
      resolvedClient.lastDate = new Date().toISOString().slice(0, 10);
      saveState('clientes', state.clientes);
    }

    const newSale = {
      id: 'CK-' + (1049 + state.ventas.length),
      date: new Date().toISOString(),
      clientDni: resolvedClient.dni,
      clientName: resolvedClient.name,
      items: cart.map((i) => ({ ...i })),
      total,
      payment: paymentMethod,
      channel: 'Showroom',
      status: 'Confirmada'
    };

    state.ventas.unshift(newSale);
    saveState('catalog', state.catalog);
    saveState('synclog', state.syncLog);
    saveState('ventas', state.ventas);
    return newSale;
  },

  anularVenta(saleId) {
    const sale = state.ventas.find((v) => v.id === saleId);
    if (!sale || sale.status === 'Anulada') return null;

    sale.status = 'Anulada';
    sale.items.forEach((item) => {
      const prod = this.getProductById(item.id);
      if (prod) {
        prod.stock += item.qty;
        prod.soldUnits = Math.max(0, (prod.soldUnits || 0) - item.qty);
        prod.revenue = Math.max(0, (prod.revenue || 0) - item.price * item.qty);
      }
    });

    state.syncLog.unshift({
      time: new Date().toLocaleTimeString('es-AR'),
      details: `Anulación ${sale.id}: stock devuelto en Tiendanube`,
      status: 'OK 200'
    });

    saveState('ventas', state.ventas);
    saveState('catalog', state.catalog);
    saveState('synclog', state.syncLog);
    return sale;
  },

  quickStockDelta(prodId, delta) {
    const prod = this.getProductById(prodId);
    if (!prod) return null;
    const nextStock = Math.max(0, prod.stock + delta);
    if (nextStock === prod.stock) return null;

    prod.stock = nextStock;
    state.syncLog.unshift({
      time: new Date().toLocaleTimeString('es-AR'),
      details: `${prod.name}: ajuste rápido ${delta > 0 ? '+' : ''}${delta} (Stock: ${prod.stock} en Tiendanube)`,
      status: 'OK 200'
    });
    saveState('catalog', state.catalog);
    saveState('synclog', state.syncLog);
    return prod;
  },

  ajustarStock({ prodId, type, qty }) {
    const prod = this.getProductById(prodId);
    if (!prod || isNaN(qty)) return null;

    if (type === 'conteo') prod.stock = Math.max(0, qty);
    else if (type === 'ingreso') prod.stock += Math.abs(qty);
    else prod.stock = Math.max(0, prod.stock - Math.abs(qty));

    state.syncLog.unshift({
      time: new Date().toLocaleTimeString('es-AR'),
      details: `${prod.name} ajustado (${type}): nuevo stock ${prod.stock} en Tiendanube`,
      status: 'OK 200'
    });
    saveState('catalog', state.catalog);
    saveState('synclog', state.syncLog);
    return prod;
  },

  getSyncLog() {
    return state.syncLog;
  },

  forceSyncTiendanube() {
    state.syncLog.unshift({
      time: new Date().toLocaleTimeString('es-AR'),
      details: 'Conciliación completa exitosa (16 perfumes árabes sincronizados)',
      status: 'OK 200'
    });
    saveState('synclog', state.syncLog);
    return state.syncLog;
  },

  getUsers() {
    return state.users;
  },

  addUser({ name, email, role }) {
    const permissions = ['ventas.crear', 'clientes.ver'];
    if (role === 'Encargado') permissions.push('stock.ver', 'stock.ajustar');
    const newUser = {
      id: 'USR-' + String(state.users.length + 1).padStart(2, '0'),
      name,
      email,
      role,
      status: 'Activo',
      lastLogin: 'Nunca',
      permissions
    };
    state.users.push(newUser);
    saveState('users', state.users);
    return newUser;
  },

  toggleUserStatus(userId) {
    const user = state.users.find((u) => u.id === userId);
    if (!user || user.role === 'Super-Admin') return null;
    user.status = user.status === 'Activo' ? 'Inactivo' : 'Activo';
    saveState('users', state.users);
    return user;
  },

  getSessionUser() {
    return state.activeUser;
  },

  setSessionUser(user) {
    state.activeUser = user;
    saveState('activeUser', user);
    return state.activeUser;
  },

  isTerminalLocked() {
    return Boolean(state.terminalLocked);
  },

  setTerminalLocked(locked) {
    state.terminalLocked = Boolean(locked);
    saveState('terminalLocked', state.terminalLocked);
  },

  validatePin(rawPin) {
    const pin = String(rawPin || '').trim();
    if (pin === '1234') {
      return this.setSessionUser({ id: 'USR-01', name: 'Fran', role: 'Super-Admin', pin: '1234' });
    }
    if (pin === '0000') {
      return this.setSessionUser({ id: 'USR-02', name: 'Vendedor Showroom', role: 'Vendedor', pin: '0000' });
    }
    const matched = state.users.find((u) => u.pin && String(u.pin) === pin && u.status === 'Activo');
    if (matched) {
      return this.setSessionUser({ id: matched.id, name: matched.name, role: matched.role, pin: String(matched.pin) });
    }
    return null;
  },

  resetDemoData() {
    localStorage.clear();
    location.reload();
  }
};
