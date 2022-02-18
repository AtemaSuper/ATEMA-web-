const express = require('express')
const app = express()

app.post('/', function(req, res) {
  res.send({
    message: req.body.text
  })
})

module.exports=app;