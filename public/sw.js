'use strict'

// inspired by examples on
// developer.mozilla.org/en-US/docs/Web/API/ServiceWorker.html
// https://github.com/mxstbr/react-boilerplate/blob/master/serviceworker.js

const APPNAME = 'geosnap-v1'
const resourceCache = [
  '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
  '//cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js',
  '//cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js',
  '//cdnjs.cloudflare.com/ajax/libs/react-router/2.4.1/ReactRouter.js',
  '//fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic',
  'manifest.json',
  '/js/bundle.min.js'
]

// Cache Resources
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APPNAME)
        .then((cache) => {
          console.log('Caching Resources')
          return cache.addAll(resourceCache)
        })
        .catch((err) => {
          console.log('Caching files failed:', err)
        })
    )
})

// Cache Requests
this.addEventListener('fetch', (event) => {
  // don't cache non get requests
  if (event.request.method !== 'GET') {
    return event.respondWith(fetch(event.request))
  }

  // make request and fallback to cache
  event.respondWith(
    fetch(event.request)
    .then((response) => {

      let responseToCache = response.clone()
      // Cache the downloaded files
      caches.open(APPNAME)
          .then((cache) => {
            console.log('Saving cache fetch response')
            cache.put(event.request, responseToCache)
          })

        // And return the network response
      return response
    })
    .catch(() => {
      // fall back to cache
      return caches.match(event.request)
    })
  )
})
