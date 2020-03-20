const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
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
})

const Messages = mongoose.model('Messages', MessagesSchema)

module.exports = Messages
