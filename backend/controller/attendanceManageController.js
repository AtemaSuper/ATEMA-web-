const express = require('express')
const app = express()
const attendanceManage = require('../service/attendanceManageService')

/**
 * 出勤簿画面のController
 */
app.use('/',attendanceManage)

module.exports = app;