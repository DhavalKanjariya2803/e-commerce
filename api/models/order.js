const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  productId: { required: true, type: String },
  userId: { required: true, type: String },
  isPlaced: { required: true, type: Boolean },
  isOnCart: { required: true, type: Boolean },
  email: { required: true, type: String },
  address: { type: String }

})

module.exports = mongoose.model('orders', orderSchema)
