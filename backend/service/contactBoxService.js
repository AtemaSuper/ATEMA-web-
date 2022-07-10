const express = require("express");
const app = express();
//通知Logic
const AlertLogic = require("../logic/alertLogic");
var alertLogic = new AlertLogic();
//通知テーブル
const AlertDao = require("../middle/dao/alertDao");
var alertDao = new AlertDao();
//社員テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();

/**
 * 通知画面のService
 */
//通知BOXの初期表示処理です。
app.post("/", async function (req, res) {
  var alertResponse = {};
  var employeeResponse = {};
  //通知テーブルから通知情報を取得します。
  await alertDao
    .selectAlertAll(req.body.contractorId)
    .then(function (items) {
      alertResponse = items;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll(req.body.contractorId);
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
      console.log(err);

      res.status(500).json(err);
    });
});
//通知BOXの入力情報を保存します。
app.post("/saveStatus", async function (req, res) {
  var alertResponse = {};
  var employeeResponse = {};
  var checkResult = false;
  var messageList = [];
  //通知テーブルに通知情報を保存します。
  await alertDao
    .saveStatus(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //客先テーブルから客先情報を取得します。
      return alertDao.selectAlertAll(req.body.contractorId);
    })
    .then(function (items) {
      alertResponse = items;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      employeeResponse = items;
      //返却用のdata
      var data = {
        alertResponse: alertResponse,
        employeeResponse: employeeResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList.length != 0) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList.push(alertLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});

module.exports = app;
