import User from './model'
import Auth from '../auth'

const controller = {
  auth (req, res) {
    var email = req.body.email
    var password = req.body.password

    return this.getUserByEmail(id)
        .then((user) => {
          if(!user){
            res.json({
              success:false,
              message: 'Please provide valid Email or Password.'
            })
          }

          var validPassword = Auth.validatePassword(password, user.password)

          if(!validatePassword){
            return res.json({
              success:false,
              message: 'Please provide valid Email or Password.'
            })
          }



        })
        .catch((err)=> {
          return res.json({error: err})
        })
  },
  getUserByEmail(email){
      var promise = new Promise((resolve, reject) => {
        return User.findOneByEmail(email, function (err, user) {
          if (err) {
            return reject(err)
          }

          return resolve(user)
      })

      return promise
  },
  getUserById(id){
      var promise = new Promise((resolve, reject) => {
        return User.findOneById(id, function (err, user) {
          if (err) {
            return reject(err)
          }

          return resolve(user)
      })

      return promise
  },
  find (req, res) {
    return User.find(req.body.query, function (err, users) {
      if (err) {
        return res.json({err: err})
      }

      return res.json({data: users})

  })

}
