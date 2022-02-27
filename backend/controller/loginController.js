const express = require('express')
const app = express()
const longin = require('../service/loginService')

/**
 * ログイン画面のController
 */
app.use('/',longin)

module.exports = app;