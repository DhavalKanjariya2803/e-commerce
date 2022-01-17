const product = require('../models/products')
const order = require('../models/order')

module.exports = class ORDER {
  static async fetchAllOrders (req, res) {
    // res.send("hello fromm api")
    try {
      const allProducts = await product.find()
      res.status(200).json(allProducts)
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message })
    }
  };

  static async buyProduct (req, res) {
    try {
      const postData = req.body
      console.log(postData, 'data')
      const postProductId = postData.productId
      const postUserId = req.userData._id
      const PostAddress = postData.address
      const postEmail = postData.email
      await order.create({ productId: postProductId, userId: postUserId, isOnCart: false, isPlaced: true, email: postEmail, address: PostAddress})
      res.status(200).json({ message: 'order placed succesfully' })
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message })
    }
  }
}
