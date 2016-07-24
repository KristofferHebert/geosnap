// Helper function to get current user after authenticating
const Auth = {}
// sets root for localStorage

Auth._base = 'geosnap'

Auth.setBase = function (base, id) {
  Auth._base = base + '_' + id
  if (!localStorage[Auth._base]) {
    localStorage[Auth._base] = ''
  }

  return Auth._base
}

Auth.getBase = function (base) {
  return Auth._base
}

// Fetch user id
Auth.getId = function () {
  var user = Auth.getUser()
  return (user._id) ? user._id : false
}

// Fetch user token
Auth.getToken = function () {
  var user = Auth.getUser()
  return (user.token) ? user.token : false
}

// Fetch user data from localStorage
Auth.getUser = function () {
  var base = Auth.getCurrentUser()
  if (base.indexOf('geosnap_') === -1) {
    base = 'geosnap_' + base
  }
  var user = localStorage[base]
  return (user) ? JSON.parse(user) : false
}

Auth.getUserById = function (id) {
  var base = 'geosnap_' + id
  var user = localStorage[base]
  return (user) ? JSON.parse(user) : false
}

Auth.logoutUser = function () {
  if (Auth.getUser()) {
    delete localStorage['currentUser']
  }
}

// Used to populate localStorage[Auth._base].user with user data.
Auth.setUser = function (token, id) {
  var user = {
    token: token,
    _id: id
  }

  Auth.setBase('geosnap', id)
  Auth.setCurrentUser(id)

  localStorage[Auth._base] = JSON.stringify(user)
  return user
}

// Set Current User from localStorage
Auth.setCurrentUser = function (id) {
  return localStorage['currentUser'] = id
}

Auth.getCurrentUser = function () {
  var user = localStorage['currentUser']
  return (user) ? user : 'geosnap_temp'
}
// Check if user is logged in
Auth.isLoggedIn = function () {
  return (localStorage['currentUser']) ? true : false
}

window.Auth = Auth

export default Auth
