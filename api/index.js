//  import

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const userDataMid = require('./middleware/userData')

const app = express()

app.use(cors())
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const APiRoutes = require('./routes/routes')

mongoose.connect(process.env.DB_URL).then(() => { console.log('connected to database') }).catch((err) => { console.log('error connecting to database:' + err.message) })
console.log('test')
// console.log(APiRoutes)
app.use(userDataMid)
app.use(APiRoutes)

module.exports = app
// app.listen(port, () => { console.log(`server running at http://localhost:${port}`) })

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
