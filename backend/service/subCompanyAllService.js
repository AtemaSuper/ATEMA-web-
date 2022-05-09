const express = require("express");
const app = express();

//協力会社テーブル
const SubCompanyDao = require("../middle/dao/subCompanyDao");
var subCompanyDao = new SubCompanyDao();
//客先テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();
//工種テーブル
const WorkTypeDao = require("../middle/dao/workTypeDao");
var workTypeDao = new WorkTypeDao();

/**
 * 協力会社管理画面のService
 */
//協力会社管理の初期表示処理です。
app.post("/", async function (req, res) {
  var subCompanyResponse = {};
  var subEmployeeResponse = {};
  var workTypeResponse = {};

  //協力会社テーブルから協力会社情報を取得します。
  await subCompanyDao
    .selectSubCompanyAll()
    .then(function (items) {
      subCompanyResponse = items;
      //社員テーブルから社員情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll();
    })
    .then(function (items) {
      workTypeResponse = items;
      //返却用のdata
      var data = {
        subCompanyResponse: subCompanyResponse,
        subEmployeeResponse: subEmployeeResponse,
        workTypeResponse: workTypeResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//協力会社編集の入力情報を保存します。
app.post("/saveSubCompany", async function (req, res) {
  var subCompanyResponse = {};
  var subEmployeeResponse = {};
  var workTypeResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //工種をテーブル保存用に変換します。
  var selectWorkTypeList = [];
  for (var i = 0; i < req.body.selectWorkTypeList.length; i++) {
    selectWorkTypeList.push(req.body.selectWorkTypeList[i].workTypeId);
  }
  req.body.selectWorkTypeList = selectWorkTypeList;

  //社員テーブルに社員情報を保存します。
  await subCompanyDao
    .saveSubCompany(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //社員テーブルから社員情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return subCompanyDao.selectSubCompanyAll();
    })
    .then(function (items) {
      subCompanyResponse = items;
      //工種テーブルから工種情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll();
    })
    .then(function (items) {
      workTypeResponse = items;
      //返却用のdata
      var data = {
        subCompanyResponse: subCompanyResponse,
        subEmployeeResponse: subEmployeeResponse,
        workTypeResponse: workTypeResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//協力会社員情報を保存します。
app.post("/saveSubEmployee", async function (req, res) {
  var subCompanyResponse = {};
  var subEmployeeResponse = {};
  var workTypeResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //社員テーブルに役職情報を保存します。
  await employeeDao
    .saveSubEmployee(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //社員テーブルから社員情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return subCompanyDao.selectSubCompanyAll();
    })
    .then(function (items) {
      subCompanyResponse = items;
      //工種テーブルから工種情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll();
    })
    .then(function (items) {
      workTypeResponse = items;
      //返却用のdata
      var data = {
        subCompanyResponse: subCompanyResponse,
        subEmployeeResponse: subEmployeeResponse,
        workTypeResponse: workTypeResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//協力会社情報を削除します。
app.post("/deleteSubCompany", async function (req, res) {
  var subCompanyResponse = {};
  var subEmployeeResponse = {};
  var workTypeResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //社員テーブルから社員情報を削除します。
  await subCompanyDao
    .deleteSubCompany(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //社員テーブルから社員情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return subCompanyDao.selectSubCompanyAll();
    })
    .then(function (items) {
      subCompanyResponse = items;
      //工種テーブルから工種情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll();
    })
    .then(function (items) {
      workTypeResponse = items;
      //返却用のdata
      var data = {
        subCompanyResponse: subCompanyResponse,
        subEmployeeResponse: subEmployeeResponse,
        workTypeResponse: workTypeResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//協力会社員情報を削除します。
app.post("/deleteSubEmployee", async function (req, res) {
  var subCompanyResponse = {};
  var subEmployeeResponse = {};
  var workTypeResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //役職テーブルから役職情報を削除します。
  await employeeDao
    .deleteSubEmployee(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //社員テーブルから社員情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return subCompanyDao.selectSubCompanyAll();
    })
    .then(function (items) {
      subCompanyResponse = items;
      //工種テーブルから工種情報を取得します。
      //TODO ここで自社のIDから協力会社のみ持ってくるようにする
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll();
    })
    .then(function (items) {
      workTypeResponse = items;
      //返却用のdata
      var data = {
        subCompanyResponse: subCompanyResponse,
        subEmployeeResponse: subEmployeeResponse,
        workTypeResponse: workTypeResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
module.exports = app;
