const express = require("express");
const app = express();

//現場Logic
const WorkFieldLogic = require("../logic/workFieldLogic");
var workFieldLogic = new WorkFieldLogic();
//客先テーブル
const ClientFieldDao = require("../middle/dao/clientFieldDao");
var clientFieldDao = new ClientFieldDao();
//現場テーブル
const WorkFieldDao = require("../middle/dao/workFieldDao");
var workFieldDao = new WorkFieldDao();
//現場詳細テーブル
const WorkFieldDetailDao = require("../middle/dao/workFieldDetailDao");
var workFieldDetailDao = new WorkFieldDetailDao();

/**
 * 工事編集画面のService
 */
//工事編集の初期表示処理です。
app.post("/", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  var workFieldDetailResponse = {};
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
      //現場詳細テーブルから現場詳細情報を取得します。
      return workFieldDetailDao.selectWorkFieldDetailAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldDetailResponse = items;
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err);

      res.status(500).json(err);
    });
});
//工事編集の入力情報を保存します。
app.post("/save", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  var workFieldDetailResponse = {};
  var checkResult = false;
  var messageList = [];
  //入力値チェックします。
  await workFieldLogic
    .checkInputData(req.body)
    .then(function () {
      //客先テーブルから客先情報を取得します。
      return clientFieldDao.selectClientFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      clientFieldResponse = items;
      //入力値(客先ID)の存在チェックします。
      return workFieldLogic.checkClientFieldExistsData(
        req.body,
        clientFieldResponse
      );
    })
    .then(function () {
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldResponse = items;
      //入力値(現場ID)の存在チェックします。
      return workFieldLogic.checkWorkFieldExistsData(
        req.body,
        workFieldResponse
      );
    })
    .then(function () {
      //現場詳細テーブルに現場詳細情報を保存します。
      return workFieldDetailDao.saveWorkFieldDetail(req.body);
    })
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //現場詳細テーブルから現場詳細情報を取得します。
      return workFieldDetailDao.selectWorkFieldDetailAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldDetailResponse = items;
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
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
        err.messageList.push(workFieldLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
//工事編集の入力情報を削除します。
app.post("/delete", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  var workFieldDetailResponse = {};
  var checkResult = false;
  var messageList = [];

  //契約テーブルから自社情報を取得します。
  await workFieldDetailDao
    .deleteWorkFieldDetail(req.body)
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
      //現場詳細テーブルから現場詳細情報を取得します。
      return workFieldDetailDao.selectWorkFieldDetailAll(req.body.contractorId);
    })
    .then(function (items) {
      workFieldDetailResponse = items;
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
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
        err.messageList.push(workFieldLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
module.exports = app;
