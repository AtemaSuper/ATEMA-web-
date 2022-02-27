const express = require('express')
const app = express()
const ownWorkerAll = require('../service/ownWorkerAllService')

app.use('/',ownWorkerAll)

module.exports = app;