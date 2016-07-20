// if online procede as normal
// else save to localStorage
//
// check if online periodically
// sync data from localStorage
// remove data from localStorage

// check for data every 10 minutes
// if online
// try to sync via http post
// log success
// if fail give error and leave in localStorage
// log failure

import Auth from './auth'
import makeRequest from './makerequest'

const OfflineSave = {}

OfflineSave.save = function (data) {
  var base = Auth.getCurrentUser()
  var user = Auth.getUserById(base)
  base = 'geosnap_' + base

  if (!Array.isArray(user.data)) {
    user.data = []
  }

  user.data.push(data)

  user = JSON.stringify(user)
  localStorage[base] = user
}

OfflineSave.sync = function (userData, endpoint) {
  if (!Array.isArray(user.data)) {
    return false
  }
  userData.forEach((data, i) => {
    let request = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }
    makeRequest(endpoint, request)
      .then((response) => {
        if (!response.success) {
          console.log('data sync failed at index:', i)
        }
        userData.splice(i, 1)
        console.log('data syncd at index:', i)
      })
      .catch((e) => {
        console.log('data error during sync index:', i, e)
      })

    return userData
  })
}

OfflineSave.checkForOfflineData = function (userID, endpoint, isOnline) {

  if (!isOnline) {
    return false
  }

  var user = Auth.getUser()

  if (user.data) {
    user.data = OfflineSave.sync(user.data, endpoint)
  }

  return false

}

export default OfflineSave
