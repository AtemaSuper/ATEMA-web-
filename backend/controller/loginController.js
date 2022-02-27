const express = require('express')
const app = express()
const longin = require('../service/loginService')

app.use('/',longin)

module.exports = app;