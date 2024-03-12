// Define the cache name
const CACHE_NAME = 'v1';

// STATIC ASSET CACHING
const urlsToCache = [
  // Add URLs of assets you want to cache during SW installation
  '/',
  // '/index.html',
  // '/styles/main.css',
  // '/scripts/main.js',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

// WORKER UPDATE / ACTIVATE
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// // CACHE INTERCEPTOR/LISTENER
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)

  // Handle navigation requests to ensure SPA works offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then(response => {
        return response || fetch(event.request)
      })
    )
    return // Important to return here so navigation requests aren't processed further
  }

  // Existing code to exclude specific URLs and non-GET requests from being cached
  if (event.request.method !== 'GET' || 
      url.href.includes("https://identitytoolkit.googleapis.com") || 
      url.href.includes(".netlify/functions/") || 
      url.href.includes("google.com/recaptcha") || 
      url.href.includes("index.css") || 
      url.href.includes("https://www.gstatic.com/firebasejs")) {
    return // Bypass the cache for these requests
  }

  // Cache-first strategy for other GET requests
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(event.request).then(fetchResponse => {
          if (fetchResponse.ok) {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, fetchResponse.clone())
              return fetchResponse
            })
          }
          return fetchResponse
        })
      })
  )
})

// // CACHE INTERCEPTOR/LISTENER
// self.addEventListener('fetch', event => {
//   const url = new URL(event.request.url)

//   // Check if the request is a navigation to a new page
//   // if (event.request.mode === 'navigate') {
//   //   event.respondWith(
//   //     caches.match('/index.html').then(response => {
//   //       return response || fetch(event.request)
//   //     })
//   //   )
//   // } else {

//     // Exclude specific URLs and non-GET requests from being cached
//     if (event.request.method !== 'GET' || 
//         url.href.includes("https://identitytoolkit.googleapis.com") || 
//         url.href.includes(".netlify/functions/") || 
//         url.href.includes("google.com/recaptcha") || 
//         url.href.includes("index.css") || 
//         url.href.includes("https://www.gstatic.com/firebasejs")) {
//       // Bypass the cache and go directly to the network for these requests
//       return // Note: We don't call fetch(event.request) here because we're inside a fetch event listener, not intercepting the request.
//     }
  
//     // For GET requests that don't match the excluded URLs, use the cache-first strategy
//     event.respondWith(
//       caches.match(event.request)
//         .then(cachedResponse => {
//           if (cachedResponse) {
//             return cachedResponse
//           }
//           return fetch(event.request).then(fetchResponse => {
//             // Only cache GET responses
//             if (fetchResponse.ok) { // Check if fetch was successful
//               return caches.open(CACHE_NAME).then(cache => {
//                 cache.put(event.request, fetchResponse.clone())
//                 return fetchResponse
//               })
//             }
//             return fetchResponse
//           })
//         })
//     )
//   // }
// })