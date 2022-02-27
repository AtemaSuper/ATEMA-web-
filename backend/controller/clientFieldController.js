const express = require('express')
const app = express()
const clientField = require('../service/clientFieldService')

/**
 * 客先編集画面のController
 */
app.use('/',clientField)

module.exports = app;