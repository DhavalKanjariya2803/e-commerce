require('dotenv').config()
// const jwt = require('jsonwebtoken')
const comFunc = require('../controllers/ComFunc')
module.exports = async (req, res, next) => {
  try {
    const token = req.get('Authorization')
    if (token) {
      const configData = []
      configData.token = token
      const userIdJson = await comFunc.getJwtDecoded(configData)

      if (typeof userIdJson !== 'undefined' && userIdJson && userIdJson.userId.length > 0) {
        if (userIdJson.userId !== 'undefined') {
          // eslint-disable-next-line no-undef
          const userData = await users.findById(userIdJson.userId)
          if (userData) {
            next()
          } else {
            return res.json({ success: false, msg: 'user not found' })
          }
        }
      } else {
        return res.json({ success: false, msg: 'log in require3' })
      }
    }
  } catch (e) {
    next()
  }
}
