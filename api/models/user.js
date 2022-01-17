const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  email: { required: true, type: String },
  isAdmin: { type: Boolean, default: false }
})

module.exports = mongoose.model('users', userSchema)
