require('dotenv').config()
var express = require('express')
var cors = require('cors')
const { errorLog, errorHandlerNotify } = require('express-error-handle')
const userRoute = require('./api /routes/user.routes')
const blogRoutes = require('./api /routes/blog.routes')
const categoryRoutes = require('./api /routes/category.routes')
const dbConnected = require('./api /config')
var app = express()

var PORT = process.env.PORT || 8080
app.use([express.json(), cors()])

app.use('/api/v1/users', userRoute)
app.use('/api/v1/blogs', blogRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.get('/', function (req, res, next) {
  return res.json({ msg: 'demo projects!' })
})

app.listen(PORT, async function () {
  await dbConnected()
  console.log('demo projects web server listening on port', PORT)
})

app.use(errorLog) //optional
app.use(errorHandlerNotify) //required
