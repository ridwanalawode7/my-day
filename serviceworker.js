const assets = [
  '/',
  '/script.js',
  '/style.css',
  'sw-register.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('assets').then((cache) => {
      cache.addAll(assets);
    }),
  );
});

// State while revalidate strategy
self.addEventListener('fetch', event => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open('assets').then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // We use the currently cached version if it's there
      return response || fetchPromise; // cached or a network fetch
    }),
  );
}); 
