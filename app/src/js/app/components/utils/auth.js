// Helper function to get current user after authenticating
const Auth = {}
// sets root for localStorage
const base = 'geosnap'

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
  var user = localStorage[base]
  if (user) return JSON.parse(user)
  return false
}

Auth.logoutUser = function () {
  if (Auth.getUser()) {
    delete localStorage[base]
  }
}

// Used to populate localStorage[base].user with user data.
Auth.setUser = function (json) {
  var user = JSON.stringify(json)
  localStorage[base].setItem('user', user)
  return user
}

// Check if user is logged in
Auth.isLoggedIn = function () {
  return (Auth.getUser()) ? true : false
}

export default Auth
