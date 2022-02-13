const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')
const test = require('./middle/test')
const user = require('./middle/user')
const ncmb = require('./middle/ncmb')

const app = express()
app.use(bodyParser.json())
//異なるサーバ間でのやり取り許可（オリジン間）
app.use(cors({ origin: true, credentials: true }));
app.use('/test',test)
app.use('/user',user)
app.use('/ncmb',ncmb)

/**app.post('/test', function(req, res) {
  res.send({
    message: req.body.text
  })
})*/

app.listen(process.env.PORT || 3000)