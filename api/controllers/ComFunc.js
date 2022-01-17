const jwt = require('jsonwebtoken')
require('dotenv').config()
// eslint-disable-next-line import/order

function getJwtDecoded (configData) {
  return new Promise((resolve, reject) => {
    const token = configData.token
    console.log(token, 'tokenfun')
    if (token) {
      // eslint-disable-next-line camelcase
      const token_arr = token.split(' ')
      // eslint-disable-next-line camelcase
      const jwt_token = token_arr[1]
      jwt.verify(jwt_token, process.env.JWT_SECRET_KEY, function (_err, decoded) { resolve(decoded) })
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(false)
    }
  })
}

exports.getJwtDecoded = getJwtDecoded
