// Define the cache name
const CACHE_NAME = 'v1';
// const urlsToCache = [
//   // Add URLs of assets you want to cache during SW installation
// ]

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(urlsToCache))
//   )
// })

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Exclude specific URLs and non-GET requests from being cached
  if (event.request.method !== 'GET' || 
      url.href.includes("https://identitytoolkit.googleapis.com") || 
      url.href.includes(".netlify/functions/") || 
      url.href.includes("google.com/recaptcha") || 
      url.href.includes("index.css") || 
      url.href.includes("https://www.gstatic.com/firebasejs")) {
    // Bypass the cache and go directly to the network for these requests
    return; // Note: We don't call fetch(event.request) here because we're inside a fetch event listener, not intercepting the request.
  }

  // For GET requests that don't match the excluded URLs, use the cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(fetchResponse => {
          // Only cache GET responses
          if (fetchResponse.ok) { // Check if fetch was successful
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          }
          return fetchResponse;
        });
      })
  );
});

// const CACHE_NAME = 'v1'
// const urlsToCache = [
//   // Add URLs of assets you want to cache during SW installation
// ]

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(urlsToCache))
//   )
// })

// self.addEventListener('fetch', event => {
//   const url = new URL(event.request.url)

//   // Exclude Firebase Auth requests or any other specific URLs from being cached
//   if (url.href.includes("https://identitytoolkit.googleapis.com") ||
//       url.href.includes(".netlify/functions/") ||
//       url.href.includes("google.com/recaptcha") ||
//       url.href.includes("https://www.gstatic.com/firebasejs")) {
//     // Bypass the cache and go directly to the network for these requests
//     return fetch(event.request)
//   }

//   // For all other requests, use the cache-first strategy
//   event.respondWith(
//     caches.match(event.request)
//       .then(cachedResponse => {
//         if (cachedResponse) {
//           return cachedResponse
//         }
//         return fetch(event.request).then(fetchResponse => {
//           return caches.open(CACHE_NAME).then(cache => {
//             cache.put(event.request, fetchResponse.clone())
//             return fetchResponse
//           })
//         })
//       })
//   )
// })