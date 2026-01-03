const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `navigator-kids-ai-${CACHE_VERSION}`;

// Core assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/styles.css',
  '/script.js',
  '/images/avery-sage.jpg',
  '/images/evan-calder.jpg',
  '/images/rachel-whitcomb.jpg'
];

// Install Event
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event (Cleanup)
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. API Strategy: Network Only (for now), handles dynamic data
  // We do NOT cache API responses by default to ensure data freshness and privacy
  if (url.pathname.startsWith('/api/')) {
    return; 
  }

  // 2. Navigation Strategy: Network First -> Cache -> Offline Page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match(request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Fallback to offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // 3. Static Assets Strategy: Stale-While-Revalidate
  // Serve from cache immediately, but update cache in background
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const fetchPromise = fetch(request).then(networkResponse => {
        // Only cache valid responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        // Network failed, nothing to do (we hopefully have cached response)
      });
      return cachedResponse || fetchPromise;
    })
  );
});
