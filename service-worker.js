'use strict';

var cacheName = 'Mastermind';
var filesToCache = ['/', '/index.html', '/bundle.js', '/img/green-question-icon-33680.png', '/client/fonts.css', '/client/fonts/Darkenstone.ttf'];

// loaded in index.js
// importScripts('/cache-polyfill.js');

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(caches.open(cacheName).then(function (cache) {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  }));
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
    }));
  }));
  return self.clients.claim();
});

// clear outdated cache from array.
// self.addEventListener('activate', function(event) {
//   var cacheWhitelist = [cacheName];

//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(caches.match(e.request).then(function (response) {
    return response || fetch(e.request);
  }));
});
