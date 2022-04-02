const express = require("express");
const app = express();

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
    .selectClientFieldAll()
    .then(function (items) {
      clientFieldResponse = items;
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll();
    })
    .then(function (items) {
      workFieldResponse = items;
      //現場詳細テーブルから現場詳細情報を取得します。
      return workFieldDetailDao.selectWorkFieldDetailAll();
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
  //TODO 入力チェック

  //契約テーブルから自社情報を取得します。
  await workFieldDetailDao
    .saveWorkFieldDetail(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //客先テーブルから客先情報を取得します。
      return clientFieldDao.selectClientFieldAll();
    })
    .then(function (items) {
      clientFieldResponse = items;
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll();
    })
    .then(function (items) {
      workFieldResponse = items;
      //現場詳細テーブルから現場詳細情報を取得します。
      return workFieldDetailDao.selectWorkFieldDetailAll();
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
      res.status(500).json(err);
    });
});
//工事編集の入力情報を削除します。
app.post("/delete", async function (req, res) {
  var clientFieldResponse = {};
  var workFieldResponse = {};
  var workFieldDetailResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //契約テーブルから自社情報を取得します。
  await workFieldDetailDao
    .deleteWorkFieldDetail(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //客先テーブルから客先情報を取得します。
      return clientFieldDao.selectClientFieldAll();
    })
    .then(function (items) {
      clientFieldResponse = items;
      //現場テーブルから現場情報を取得します。
      return workFieldDao.selectWorkFieldAll();
    })
    .then(function (items) {
      workFieldResponse = items;
      //現場詳細テーブルから現場詳細情報を取得します。
      return workFieldDetailDao.selectWorkFieldDetailAll();
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
      res.status(500).json(err);
    });
});
module.exports = app;
