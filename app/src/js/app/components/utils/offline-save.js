// if online procede as normal
// else save to localStorage
//
// check if online periodically
// sync data from localStorage
// remove data from localStorage

import Auth from 'auth'

const OfflineSave = {}

OfflineSave.save = function (id, userdata) {
  var user = Auth.getUserById(id)
  if (!user) {
    return false
  }

  // add to user.data

}

export default OfflineSave
