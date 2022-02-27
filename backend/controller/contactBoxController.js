const express = require('express')
const app = express()
const contactBox = require('../service/contactBoxService')

/**
 * 通知画面のController
 */
app.use('/',contactBox)

module.exports = app;