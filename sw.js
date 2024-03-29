// Define the cache name
const CACHE_NAME = 'v1';

// STATIC ASSET CACHING
const urlsToCache = [
  // Add URLs of assets you want to cache during SW installation
  '/',
  // '/index.html',
  // '/styles/main.css',
  // '/scripts/main.js',

  //Page backgrounds
  // 'url("/src/assets/page-backgrounds/home-page-background-low-res.webp")',
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fbattletech-page-background.webp?alt=media&token=de9f579b-b3da-4eed-8d2d-ec2d8d01e4f9',
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fshadowrun-page-background.webp?alt=media&token=07b0b857-758f-4959-9923-4f567ed9ac6a',
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fother-background.webp?alt=media&token=cc00694d-6c3f-4852-9f87-462f0623679e',
  
  //Collection frames
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-frames%2Fcollection-frame-battletech-new-arrivals.svg?alt=media&token=a2549fe5-a9e3-4423-a2a1-7c72d9164967',
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-frames%2Fcollection-frame-battletech.svg?alt=media&token=f52f545f-8b0f-4974-8b0e-5e638378d372',
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-frames%2Fcollection-frame-featured.svg?alt=media&token=3b9a843a-b4eb-435d-8931-276f0df403f8',
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-frames%2Fcollection-frame-shadowrun-new-arrivals.svg?alt=media&token=374058a6-b77b-480a-92fe-9efec965890a',
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-frames%2Fcollection-frame-shadowrun.svg?alt=media&token=d0dcb630-d444-45c8-9958-3f7a74459922',
  // 'https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/collection-frames%2Fcollection-frame-tabletop.webp?alt=media&token=45bff922-7982-4736-a086-d85fce18b734',
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
      // !url.href.includes(".svg" || ".jpg" || ".png" || ".webp" || "font" || "index.css")) {
    return // Bypass the cache for these requests
  }

  // FIREBASE STORAGE SPECIFIC
  // if (url.origin === 'https://firebasestorage.googleapis.com') {
  //   event.respondWith(
  //     caches.open('firebase-images').then(cache => {
  //       return cache.match(event.request).then(response => {
  //         if (response) {
  //           // Return the cached response if available
  //           return response
  //         }
  //         // Otherwise, fetch from the network, cache the response, and return it
  //         return fetch(event.request).then(networkResponse => {
  //           cache.put(event.request, networkResponse.clone())
  //           return networkResponse
  //         })
  //       })
  //     })
  //   )
  // }
  // else {
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
  // }

})