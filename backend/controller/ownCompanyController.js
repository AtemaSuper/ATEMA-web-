const express = require('express')
const app = express()
const ownCompany = require('../service/ownCompanyService')

/**
 * 自社設定画面のController
 */
app.use('/',ownCompany)

module.exports = app;