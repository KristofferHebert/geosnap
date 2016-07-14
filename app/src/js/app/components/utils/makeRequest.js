import 'whatwg-fetch'

let defaultOptions = {
  headers: {
    'Accept': 'application/json'
  }
}

function makeRequest (endpoint, userOptions) {
  let options = Object.assign(defaultOptions, userOptions)
  if (options.method === 'get' || options.method === 'GET') {
    delete options.body
  }
  return fetch(endpoint, options)
  .then((response) => {
    return response.json()
  }).then((data) => {
    return data
  }).catch((err) => {
    console.log('request failed', err)
  })
}

export default makeRequest
