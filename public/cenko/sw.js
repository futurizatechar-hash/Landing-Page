// Service Worker — Cenko Fragancias Stock & Ventas PWA (v9 Modular)
const CACHE_NAME = 'cenko-stock-v9';

// Install: activar inmediatamente sin esperar a que cierren pestañas
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Activate: purgar 100% de caches anteriores de forma incondicional
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: NETWORK-FIRST estricto para shell, CSS y módulos ES
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200 && networkRes.type === 'basic') {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return networkRes;
      })
      .catch(() => {
        return caches.match(e.request).then((cachedRes) => cachedRes || caches.match('./index.html'));
      })
  );
});
