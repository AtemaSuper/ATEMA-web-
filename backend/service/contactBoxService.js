const express = require("express");
const app = express();
//通知テーブル
const ContactDao = require("../middle/dao/contactDao");
var contactDao = new ContactDao();
//社員テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();

/**
 * 通知画面のService
 */
//工事編集の初期表示処理です。
app.post("/", async function (req, res) {
  var alertResponse = {};
  var employeeResponse = {};
  //客先テーブルから客先情報を取得します。
  await contactDao
    .selectAlertAll()
    .then(function (items) {
      alertResponse = items;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      employeeResponse = items;
      //返却用のdata
      var data = {
        alertResponse: alertResponse,
        employeeResponse: employeeResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

module.exports = app;
