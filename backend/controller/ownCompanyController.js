const express = require('express')
const app = express()
const ownCompany = require('../service/ownCompanyService')
/**
 * 自社設定画面のController
 */
//初期表示処理
app.use('/',ownCompany)
app.use('/save',ownCompany)

module.exports = app;