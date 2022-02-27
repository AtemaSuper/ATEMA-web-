const express = require('express')
const app = express()
const passwordReset = require('../service/passwordResetService')

/**
 * パスワードリセット画面のController
 */
app.use('/',passwordReset)

module.exports = app;