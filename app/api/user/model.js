import mongoose from 'mongoose'

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
  password: {
    type: String,
    trim: true,
    required: 'Password is required',
    select: false
  }
})

function isEmail (str) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
}

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
