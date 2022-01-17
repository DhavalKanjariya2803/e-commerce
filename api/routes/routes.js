const express = require('express')
const router = express.Router()
const multer = require('multer')
const API = require('../controllers/api')
const ORDER = require('../controllers/order')
const User = require('../controllers/users')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, './static')
  },
  filename (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage
}).single('image')

router.get('/', API.fetchAllProducts)
router.post('/product/add', upload, API.addProduct)
router.post('/product/single', API.getSingleProduct)

router.get('/orders', ORDER.fetchAllOrders)
router.post('/product/buy', auth, ORDER.buyProduct)

router.post('/user/register', User.registerUSer)
router.post('/user/login', User.loginUser)
router.get('/user/me', User.userData)

module.exports = router
