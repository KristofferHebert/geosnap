import User from './model'
import Auth from '../../auth'

const controller = {
  auth (req, res) {
    var email = req.body.email
    var password = req.body.password

    return controller.getUserByEmail(email)
        .then((user) => {
          if (!user) {
            res.json({
              success: false,
              message: 'Please provide valid Email or Password.'
            })
          }

          var validPassword = Auth.validateHashPassword(password, user.password)

          if (!validPassword) {
            return res.json({
              success: false,
              message: 'Please provide valid Email or Password.'
            })
          }

          let token = {
            _id : user._id,
            email : user.email
          }

          return res.json({
            success: true,
            data: Auth.signJWT(token)
          })
        })
        .catch((err) => {
          return res.json({error: err})
        })
  },
  getUserByEmail (email) {
    var promise = new Promise((resolve, reject) => {
      return User.findOne({email: email}, function (err, user) {
        if (err) {
          return reject(err)
        }
        return resolve(user)
      })
    })

    return promise
  },
  getUserById (id) {
    var promise = new Promise((resolve, reject) => {
      return User.findByID(id, function (err, user) {
        if (err) {
          return reject(err)
        }
        return resolve(user)
      })
    })
    return promise
  },
  post (req, res) {
    var newUser = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }

    User.create(newUser, (err, user) => {
      if (err) {
        return res.json({ err: err })
      }
      return res.json({
        success: true,
        data: user
      })
    })
  },
  find (req, res) {
    return User.find(req.body.query, function (err, users) {
      if (err) {
        return res.json({err: err})
      }
      return res.json({data: users})
    })
  }
}

export default controller
