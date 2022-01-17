// const bcrypt = require('bcrypt')
const bcrypt = require('bcryptjs')
// const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const users = require('../models/user')
const comFunc = require('./ComFunc')

module.exports = class USER {
  static async registerUSer (req, res) {
    try {
      const email = req.body.email
      const username = req.body.username
      const password = await bcrypt.hash(req.body.password, 10)

      // Encrypt
      //   const password = CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString()

      // Decrypt
      //   console.log(username, password, email, req.body.password)
      console.log(username, password)
      await users.create({ username, password, email })

      return res.status(200).json({ message: 'user registered succesfully' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async loginUser (req, res) {
    try {
      const postData = req.body
      const password = postData.password
      const postUserName = postData.username

      const userData = await users.findOne({ username: postUserName })
      //   console.log()
      if (!userData) {
        return res.status(404).json({ message: 'invaliid username' })
      }
      const isValid = await bcrypt.compare(password, userData.password)
      if (!isValid) {
        return res.status(404).json({ message: 'invaliid username' })
      } else {
        const userId = userData._id
        const dataToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY)
        return res.status(200).json({ token: dataToken, message: 'loged in succesfully' })
      }
    //   return res.status(404).json({ message: 'invaliid username' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async userData (req, res) {
    try {
      const token = req.get('Authorization')
      if (token) {
        const configData = []
        configData.token = token
        const userIdJson = await comFunc.getJwtDecoded(configData)
        console.log(userIdJson.userId)
        // eslint-disable-next-line no-undef
        const userData = await users.findById(userIdJson.userId)
        const resData = {}
        resData.userId = userData._id
        resData.username = userData.username
        resData.email = userData.email
        resData.isAdmin = userData.isAdmin

        return res.status(200).json({ data: resData })
      }
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
