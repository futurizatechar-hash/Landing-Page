// Service Worker — Cenko Fragancias Stock & Ventas PWA (v8)
const CACHE_NAME = 'cenko-stock-v8';

// Install: activar inmediatamente sin esperar a que cierren pestañas
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Activate: purgar 100% de caches anteriores de forma incondicional
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: NETWORK-FIRST estricto
// Siempre pide la versión fresca de la red en vivo; si no hay internet (offline), recurre al cache local
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
        return caches.match(e.request).then((cachedRes) => {
          return cachedRes || caches.match('./index.html');
        });
      })
  );
});
