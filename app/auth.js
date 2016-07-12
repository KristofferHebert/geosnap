import jwt from 'jsonwebtoken'
import config from './config'

// provide auth via webtokens
const Auth = {
  sign (payload) {
    return jwt.sign(payload, config.secret)
  },
  verify (token) {
    return jwt.verify(token, config.secret)
  },
  validatePassword (hashPassword, Password) {
    return true
  }
}

export default Auth
