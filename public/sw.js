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
  console.log('event', event.request)
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      console.log('response', response)
        // If cached request found - return cache
      if (response) {
        console.log('Using cached response')
        return response
      }

      let fetchRequest = event.request.clone()
      console.log('fetchRequest', fetchRequest)

        // Start request again since there are no files in the cache
      return fetch(fetchRequest)
            .then((response) => {
              console.log('response', response)

                // If response is invalid, throw error
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response
              }

              let responseToCache = response.clone()

                // Otherwise cache the downloaded files
              caches.open(APPNAME)
                  .then((cache) => {
                    console.log('Saving cache fetch response')
                    cache.put(event.request, responseToCache)
                  })

                // And return the network response
              return response
            })
            .catch((err) => {
              console.log('Caching request failed:', err)
            })


    })
    .catch((err) => {
      console.log('Request cache failed:', error)
    })
    )
})
