import mongoose from 'mongoose'
import Auth from '../../auth'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: 'Email address is required',
    validate: [isEmail, 'Please provide a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  password: {
    type: String,
    trim: true,
    required: 'Password is required'
  }
})

function isEmail (str) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
}

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  var hash = Auth.generateHash(this.password)
  if (!hash) {
    return next(hash)
  }
  this.password = hash
  return next()
})

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
