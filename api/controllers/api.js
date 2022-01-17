const product = require('../models/products')

module.exports = class API {
  static async fetchAllProducts (req, res) {
    // res.send("hello fromm api")
    try {
      const allProducts = await product.find()
      res.status(200).json(allProducts)
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message })
    }
  };

  static async addProduct (req, res) {
    const postData = req.body
    const productTitle = postData.product_title
    const productDescription = postData.product_description
    const productPrice = postData.product_price
    const productImage = req.file.filename

    try {
      await product.create({ title: productTitle, description: productDescription, price: productPrice, image: productImage })
      res.status(201).json({ message: 'product added succesfully' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  };

  static async getSingleProduct (req, res) {
    // let postData = req.body;
    const productId = req.body.id
    try {
      console.log(productId, 'id')
      const singleProduct = await product.findById(productId)
      return res.status(200).json(singleProduct)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }
}
