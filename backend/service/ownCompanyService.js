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
//共通変数
var ownCompanyResponse = [];
var workTypeResponse = [];
var checkResult = false;
var messageList = [];

/**
 * 自社情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const contactFetchAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    contactDao
      .selectContact(contractorId)
      .then(function (items) {
        ownCompanyResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

/**
 * 工種情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectWorkTypeAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    workTypeDao
      .selectWorkTypeAll(contractorId)
      .then(function (items) {
        workTypeResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

/**
 * 工種情報存在チェック処理
 *
 * @param {string} contractorId 会社IDです。
 * @param {string} param パラメータです。
 * @returns
 */
const checkExistsData = function (contractorId, param) {
  return new Promise(function (resolve, reject) {
    selectWorkTypeAll(contractorId)
      .then(function (items) {
        return ownCompanyLogic.checkExistsData(param, items);
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
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
  promises.push(selectWorkTypeAll(req.body.contractorId));
  Promise.all(promises)
    .then(async function () {
      //返却用のdata
      var data = {
        ownCompanyResponse: ownCompanyResponse,
        workTypeResponse: workTypeResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = ownCompanyLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//自社設定の入力情報を保存します。
app.post("/save", async function (req, res) {
  const promises = [];
  promises.push(ownCompanyLogic.checkInputData(req.body));
  promises.push(checkExistsData(req.body.contractorId, req.body));
  Promise.all(promises)
    .then(function () {
      //契約テーブルの自社情報を更新します。
      return contactDao.updateContact(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      const promises2 = [];
      promises2.push(contactFetchAll(req.body.contractorId));
      promises2.push(selectWorkTypeAll(req.body.contractorId));
      Promise.all(promises2);
    })
    .then(function () {
      //dataをレスポンスで返却します。
      var data = {
        ownCompanyResponse: ownCompanyResponse,
        workTypeResponse: workTypeResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = ownCompanyLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});

module.exports = app;
