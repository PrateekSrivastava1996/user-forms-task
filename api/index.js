var express = require('express')
const cors = require('cors')
const helmet = require('helmet')
var bodyParser = require('body-parser')
require('./dbConnection')

var app = express()
app.use(cors())

app.options('*', cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(helmet())
app.use('/auth', require('./routes/auth'))

app.get('/', function (req, res) {
  res.send('Hello world!')
})

app.listen(5000)

