require('dotenv').config()
const comFunc = require('../controllers/ComFunc')
const users = require('../models/user')

module.exports = async (req, res, next) => {
  try {
    const token = req.get('Authorization')
    if (token) {
      const configData = []
      configData.token = token
      const userIdJson = await comFunc.getJwtDecoded(configData)
      console.log(userIdJson, 'retsgshs')

      if (userIdJson.userId) {
        // eslint-disable-next-line no-undef
        const userData = await users.findById(userIdJson.userId)
        console.log(userData, 'userdaataaaa')
        if (userData) {
          console.log(userData, 'user')
          req.userData = userData
          next()
        }
      } else {
        return next()
      }
    } else {
      return next()
    }
  } catch (e) {
    next()
  }
}
