import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from './config'

// provide auth via webtokens
const Auth = {
  signJWT (payload) {
    return jwt.sign(payload, config.secret)
  },
  verifyJWT (token) {
    return jwt.verify(token, config.secret)
  },
  generateHash (password) {
    return bcrypt.hashSync(password, config.saltLength)
  },
  validateHashPassword (password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
  }
}

export default Auth
