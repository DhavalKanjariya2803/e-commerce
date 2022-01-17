const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Product', productSchema)
