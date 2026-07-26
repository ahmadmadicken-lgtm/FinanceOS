// Finance OS Service Worker v5.14.15 — Cache disabled
// Version bump forces browser to install new SW
const SW_VERSION = 'v5.14.15';

self.addEventListener('install', function(e) {
  console.log('[SW] Installing version:', SW_VERSION);
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  console.log('[SW] Activating version:', SW_VERSION);
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { 
        console.log('[SW] Deleting cache:', k);
        return caches.delete(k); 
      }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  // Always fetch from network, never from cache
  e.respondWith(fetch(e.request));
});
