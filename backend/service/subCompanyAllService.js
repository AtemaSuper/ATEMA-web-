const express = require("express");
const app = express();

//協力会社Logic
const SUbCompanyLogic = require("../logic/subCompanyLogic");
var subCompanyLogic = new SUbCompanyLogic();
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
    .selectSubCompanyAll(req.body.contractorId)
    .then(function (items) {
      subCompanyResponse = items;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectSubEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll(req.body.contractorId);
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
      console.log(err);

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
  //入力値チェックします。
  await subCompanyLogic
    .checSubCompanyInputData(req.body)
    .then(function () {
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll(req.body.contractorId);
    })
    .then(function (items) {
      workTypeResponse = items;
      //入力値の存在チェックします。
      return subCompanyLogic.checkSubCompnayExistsData(
        req.body,
        workTypeResponse
      );
    })
    .then(function () {
      //社員テーブルに協力会社員情報を保存します。
      return subCompanyDao.saveSubCompany(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      //協力会社テーブルから協力会社情報を取得します。
      return subCompanyDao.selectSubCompanyAll(req.body.contractorId);
    })
    .then(function (items) {
      subCompanyResponse = items;
      //社員テーブルから協力会社員情報を取得します。
      return employeeDao.selectSubEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      subEmployeeResponse = items;
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
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList = subCompanyLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});
//協力会社員情報を保存します。
app.post("/saveSubEmployee", async function (req, res) {
  var subCompanyResponse = {};
  var subEmployeeResponse = {};
  var companyResponse = {}; //チェック用
  var employeeResponse = {}; //チェック用
  var workTypeResponse = {};
  var checkResult = false;
  var messageList = [];
  //入力値チェックします。
  await subCompanyLogic
    .checkSubCompnayEmployeeInputData(req.body)
    .then(function () {
      //社員テーブルから協力会社員情報を取得します。
      return employeeDao.selectSubEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      employeeResponse = items;
      //社員テーブルから協力社員情報を取得します。
      return subCompanyDao.selectSubCompanyAll(req.body.contractorId);
    })
    .then(function (items) {
      companyResponse = items;
      //入力値の存在チェックします。
      return subCompanyLogic.checkSubCompnayEmployeeExistsData(
        req.body,
        employeeResponse,
        companyResponse
      );
    })
    .then(function () {
      //従業員テーブルに協力会社員情報を保存します。
      return employeeDao.saveSubEmployee(req.body);
    })
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;

      //社員テーブルから協力会社員情報を取得します。
      return employeeDao.selectSubEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //協力会社テーブルから協力社情報を取得します。
      return subCompanyDao.selectSubCompanyAll(req.body.contractorId);
    })
    .then(function (items) {
      subCompanyResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll(req.body.contractorId);
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
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList.length != 0) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList = subCompanyLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});
//協力会社情報を削除します。
app.post("/deleteSubCompany", async function (req, res) {
  var subCompanyResponse = {};
  var subEmployeeResponse = {};
  var workTypeResponse = {};
  var checkResult = false;
  var messageList = [];

  //社員テーブルから社員情報を削除します。
  await subCompanyDao
    .deleteSubCompany(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //協力会社テーブルから協力会社情報を取得します。
      return subCompanyDao.selectSubCompanyAll(req.body.contractorId);
    })
    .then(function (items) {
      subCompanyResponse = items;
      //社員テーブルから協力会社員情報を取得します。
      return employeeDao.selectSubEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll(req.body.contractorId);
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
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList.length != 0) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList = subCompanyLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});
//協力会社員情報を削除します。
app.post("/deleteSubEmployee", async function (req, res) {
  var subCompanyResponse = {};
  var subEmployeeResponse = {};
  var workTypeResponse = {};
  var checkResult = false;
  var messageList = [];

  //役職テーブルから役職情報を削除します。
  await employeeDao
    .deleteSubEmployee(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //協力会社テーブルから協力会社情報を取得します。
      return subCompanyDao.selectSubCompanyAll(req.body.contractorId);
    })
    .then(function (items) {
      subCompanyResponse = items;
      //社員テーブルから協力会社員情報を取得します。
      return employeeDao.selectSubEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      subEmployeeResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll(req.body.contractorId);
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
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList.length != 0) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList = subCompanyLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});
module.exports = app;
