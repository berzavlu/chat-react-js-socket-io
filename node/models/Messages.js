const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
    validate: (object) => {
      let allowedKeys = ['name', 'email', 'id', 'image']
      let correctKeys = Object.keys(object).every((key) => allowedKeys.includes(key) && object[key])
      return correctKeys
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: Number,
    required: true,
  },
})

const Messages = mongoose.model('Messages', MessagesSchema)

module.exports = Messages
