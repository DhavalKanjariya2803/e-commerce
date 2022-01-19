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
      const postProductId = postData.productId
      const postUserId = req.userData._id
      const PostAddress = postData.address
      const postEmail = postData.email
      const product = await order.findOne({ productId: postProductId })
      if (product.isonCart) {
        await order.findOneAndUpdate({
          productId: postProductId
        }, { isOnCart: false, isPlaced: true }, { upsert: true, useFindAndModify: false })
      } else {
        await order.create({ productId: postProductId, userId: postUserId, isOnCart: false, isPlaced: true, email: postEmail, address: PostAddress })
        res.status(200).json({ message: 'order placed succesfully' })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message })
    }
  }

  static async addToCart (req, res) {
    try {
      const postData = req.body
      const postProductId = postData.productId
      const postUserId = req.userData._id
      await order.create({ productId: postProductId, userId: postUserId, isOnCart: true, isPlaced: false })
      res.status(201).json({ message: 'order placed succesfully' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message })
    }
  }

  static async getCartProducts (req, res) {
    try {
      const postUserId = req.userData._id
      const responceData = await order.find({ userId: postUserId, isOnCart: true })
      const productIDArray = []
      if (responceData && responceData.length > 0) {
        for (let i = 0; i < responceData.length; i++) {
          const singleProduuct = responceData[i]
          productIDArray.push(singleProduuct.productId)
        }
      }
      let resultData = []
      if (productIDArray) {
        resultData = await product.find({
          _id: { $in: productIDArray }
        })
      }
      res.status(200).json(resultData)
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message })
    }
  }

  static async fetchMyOrders (req, res) {
    // res.send("hello fromm api")
    try {
      const postUserId = req.userData._id
      const responceData = await order.find({ userId: postUserId, isPlaced: true })
      const productIDArray = []
      if (responceData && responceData.length > 0) {
        for (let i = 0; i < responceData.length; i++) {
          const singleProduuct = responceData[i]
          productIDArray.push(singleProduuct.productId)
        }
      }
      let resultData = []
      if (productIDArray) {
        resultData = await product.find({
          _id: { $in: productIDArray }
        })
      }
      res.status(200).json(resultData)
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message })
    }
  };

  static async placeOrderAll (req, res) {
    try {
      const postData = req.body
      const postUserId = req.userData._id
      const postAddress = postData.address
      const postEmail = postData.email
      // User.update({"created": false}, {"$set":{"created": true}}, {"multi": true},
      await order.updateMany({ userId: postUserId, isOnCart: true }, { isOnCart: false, isPlaced: true, email: postEmail, address: postAddress })
      res.status(200).json({ message: 'placed succesfully' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message })
    }
  }

  static async removeFromCart (req, res) {
    try {
      const postData = req.body
      const postUserId = req.userData._id
      const postProductId = postData.productId
      await order.deleteOne({ userId: postUserId, isOnCart: true, productId: postProductId })
      res.status(200).json({ message: 'removed succesfully' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message })
    }
  }
}
