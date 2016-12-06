const cacheName = 'Mastermind';
const filesToCache = [
  '/',
  '/index.html',
  '/bundle.js',
  '/img/green-question-icon-33680.png',
  '/client/fonts.css',
  '/client/fonts/Darkenstone.ttf'
];

// importScripts('/cache-polyfill.js');

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install1');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response;
    })
  );
});

// var cacheName = 'Mastermind';
// var filesToCache = [
//   '/',
//   '/index.html',
//   '/bundle.js',
//   '/img/green-question-icon-33680.png',
//   '/manifest.json'
// ];

// // importScripts('/cache-polyfill.js');

// self.addEventListener('install', function(e) {
//   console.log('[ServiceWorker] Install');
//   e.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       console.log('[ServiceWorker] Caching app shell');
//       return cache.addAll(filesToCache);
//     })
//   );
// });

// self.addEventListener('activate', function(e) {
//   console.log('[ServiceWorker] Activate');
// });

// self.addEventListener('fetch', function(e) {
//   console.log('[ServiceWorker] Fetch', e.request.url);
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });