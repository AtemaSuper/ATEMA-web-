const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')
const test = require('./middle/test')
const login = require('./middle/login')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/test',test)
app.use('/login',login)

/**app.post('/test', function(req, res) {
  res.send({
    message: req.body.text
  })
})*/

app.listen(process.env.PORT || 3000)