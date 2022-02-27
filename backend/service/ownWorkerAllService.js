const express = require('express')
const EmployeeDao = require('../middle/dao/employeeDao')
const app = express()


app.get('/', function (req, res) {
    var employeeDao = new EmployeeDao()
    return employeeDao.selectEmployeeByloginId(req,res)
})

module.exports = app;

