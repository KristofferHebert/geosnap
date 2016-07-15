// inspired by http://www.html5rocks.com/en/tutorials/service-worker/introduction/

function registerSW (swpath) {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register(swpath)
            .then((registration) => {
              console.log('Service worker registered on scope: ', registration.scope)
            })
            .catch((err) => {
              console.log('Service worker failed', err)
            })
  } else {
    console.log('Service work not supported in this browser')
  }
}

export default registerSW
