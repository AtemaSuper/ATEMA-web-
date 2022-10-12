const express = require("express");
const app = express();

//自社設定Logic
const OwnCompanyLogic = require("../logic/ownCompanyLogic");
var ownCompanyLogic = new OwnCompanyLogic();
//契約テーブル
const ContactDao = require("../middle/dao/contactDao");
var contactDao = new ContactDao();
//工種テーブル
const WorkTypeDao = require("../middle/dao/workTypeDao");
var workTypeDao = new WorkTypeDao();

var ownCompanyResponse = {};
var workTypeResponse = {};

/** 会社情報を取得します。 */
const contactFetchAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    contactDao
      .selectContactAll(contractorId)
      .then(function (items) {
        ownCompanyResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

/** 会社情報を取得します。 */
const workTypeFetchAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    workTypeDao
      .selectWorkTypeAll(contractorId)
      .then(function (items) {
        workTypeResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

/**
 * 自社設定画面のService
 */
//自社設定の情報を取得します。
app.post("/", async function (req, res) {
  const promises = [];
  promises.push(contactFetchAll(req.body.contractorId));
  promises.push(workTypeFetchAll(req.body.contractorId));

  Promise.all(promises)
    .then(async function (result) {
      //返却用のdata
      var data = {
        ownCompanyResponse: ownCompanyResponse,
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
//自社設定の入力情報を保存します。
app.post("/save", async function (req, res) {
  //入力値チェックします。
  await ownCompanyLogic
    .checkInputData(req.body)
    .then(function () {
      //工種テーブルから工種情報を取得します。
      return workTypeFetchAll(req.body.contractorId);
    })
    .then(function () {
      //入力値の存在チェックします。
      return ownCompanyLogic.checkExistsData(req.body, workTypeResponse);
    })
    .then(function () {
      //契約テーブルの自社情報を更新します。
      return contactDao.updateContact(req.body);
    })
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //契約テーブルから自社情報を取得します。
      return contactFetchAll(req.body.contractorId);
    })
    .then(function (items) {
      ownCompanyResponse = items;
      //dataをレスポンスで返却します。
      data = {
        ownCompanyResponse: ownCompanyResponse,
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
        err.messageList.push(ownCompanyLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});

module.exports = app;
