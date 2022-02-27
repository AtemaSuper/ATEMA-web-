const express = require('express')
const app = express()
const main = require('../service/mainService')

/**
 * トップ画面のController
 */
app.use('/',main)

module.exports = app;