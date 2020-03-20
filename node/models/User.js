const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fbId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
