const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Messages = mongoose.model('Messages', MessagesSchema)

module.exports = Messages