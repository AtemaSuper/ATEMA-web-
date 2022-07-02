const express = require("express");
const app = express();

//客先Logic
const ClientFieldLogic = require("../logic/clientFieldLogic");
var clientFieldLogic = new ClientFieldLogic();
//客先テーブル
const ClientFieldDao = require("../middle/dao/clientFieldDao");
var clientFieldDao = new ClientFieldDao();
//現場テーブル
const WorkFieldDao = require("../middle/dao/workFieldDao");
var workFieldDao = new WorkFieldDao();

/**
 * 客先編集画面のService
 */
//客先編集の初期表示処理です。
app.post("/", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  //客先テーブルから客先情報を取得します。
  await clientFieldDao
    .selectClientFieldAll(req.body.contractorId)
    .then(function (items) {
      clientFieldResponse = items;
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldResponse = items;
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err);

      res.status(500).json(err);
    });
});
//客先編集(客先)の入力情報を保存します。
app.post("/saveClientField", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  var checkResult = false;
  var messageList = [];
  //入力値チェックします。
  await clientFieldLogic
    .checkClientFieldInputData(req.body)
    .then(function () {
      //客先テーブルから客先情報を取得します。
      return clientFieldDao.selectClientFieldAll(req.body.contractorId);
    })
    .then(function () {
      clientFieldResponse = items;
      //入力値の存在チェックします。
      return clientFieldLogic.checkExistsData(req.body, clientFieldResponse);
    })
    .then(function () {
      //客先テーブルに客先情報を保存します。
      return clientFieldDao.saveClientField(req.body);
    })
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //客先テーブルに客先情報を保存します。
      return clientFieldDao.saveClientField(req.body);
    })
    .then(function () {
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldResponse = items;
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
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
        err.messageList = clientFieldLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});
//客先情報を削除します。
app.post("/deleteClientField", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  var checkResult = false;
  var messageList = [];

  //客先テーブルから客先情報を削除します。
  await clientFieldDao
    .deleteClientField(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //客先テーブルから客先情報を取得します。
      return clientFieldDao.selectClientFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      clientFieldResponse = items;
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldResponse = items;
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
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
        err.messageList = ownCompanyLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});
//客先編集(現場)の入力情報を保存します。
app.post("/saveWorkField", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  var checkResult = false;
  var messageList = [];

  //入力値チェックします。
  await clientFieldLogic
    .checkWorkFieldInputData(req.body)
    .then(function () {
      //契約テーブルから自社情報を取得します。
      return workFieldDao.saveWorkField(req.body);
    })
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //客先テーブルから客先情報を取得します。
      return clientFieldDao.selectClientFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      clientFieldResponse = items;
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldResponse = items;
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
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
        err.messageList = ownCompanyLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});
//現場情報を削除します。
app.post("/deleteWorkField", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  var checkResult = false;
  var messageList = [];

  //現場テーブルから現場情報を削除します。
  await workFieldDao
    .deleteWorkField(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //客先テーブルから客先情報を取得します。
      return clientFieldDao.selectClientFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      clientFieldResponse = items;
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldResponse = items;
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
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
        err.messageList = ownCompanyLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});
module.exports = app;
