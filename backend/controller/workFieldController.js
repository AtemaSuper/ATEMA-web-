const express = require('express')
const app = express()
const workField = require('../service/workFieldService')

/**
 * 工事編集画面のController
 */
app.use('/',workField)

module.exports = app;