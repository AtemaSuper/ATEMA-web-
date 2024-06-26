const express = require("express");
const app = express();

//協力会社Logic
const SubCompanyLogic = require("../logic/subCompanyLogic");
var subCompanyLogic = new SubCompanyLogic();
//協力会社テーブル
const SubCompanyDao = require("../middle/dao/subCompanyDao");
var subCompanyDao = new SubCompanyDao();
//客先テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();
//工種テーブル
const WorkTypeDao = require("../middle/dao/workTypeDao");
var workTypeDao = new WorkTypeDao();
//共通変数
var subCompanyResponse = [];
var subEmployeeResponse = [];
var workTypeResponse = [];
var checkResult = false;
var messageList = [];

/**
 * 協力会社情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectSubCompanyAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    subCompanyDao
      .selectSubCompanyAll(contractorId)
      .then(function (items) {
        subCompanyResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

/**
 * 協力会社員情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectSubEmployeeAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    employeeDao
      .selectSubEmployeeAll(contractorId)
      .then(function (items) {
        subEmployeeResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        reject(err);
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
const checkSubCompnayExistsData = function (contractorId, param) {
  return new Promise(function (resolve, reject) {
    selectWorkTypeAll(contractorId)
      .then(function (items) {
        return subCompanyLogic.checkSubCompnayExistsData(param, items);
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
 * 協力会社情報存在チェック処理
 *
 * @param {string} contractorId 会社IDです。
 * @param {string} param パラメータです。
 * @returns
 */
const checkSubCompnayEmployeeExistsData = function (contractorId, param) {
  return new Promise(function (resolve, reject) {
    selectSubCompanyAll(contractorId)
      .then(function (items) {
        return subCompanyLogic.checkSubCompnayEmployeeExistsData(param, items);
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
 * 協力会社管理画面のService
 */
//協力会社管理の初期表示処理です。
app.post("/", async function (req, res) {
  const promises = [];
  promises.push(selectSubCompanyAll(req.body.contractorId));
  promises.push(selectSubEmployeeAll(req.body.contractorId));
  promises.push(selectWorkTypeAll(req.body.contractorId));
  Promise.all(promises)
    .then(function () {
      var data = {
        subCompanyResponse: subCompanyResponse,
        subEmployeeResponse: subEmployeeResponse,
        workTypeResponse: workTypeResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = subCompanyLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});

//協力会社編集の入力情報を保存します。
app.post("/saveSubCompany", async function (req, res) {
  const promises = [];
  promises.push(subCompanyLogic.checSubCompanyInputData(req.body));
  promises.push(checkSubCompnayExistsData(req.body.contractorId, req.body));
  Promise.all(promises)
    .then(function () {
      //会社テーブルに協力会社情報を保存します。
      return subCompanyDao.saveSubCompany(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises2 = [];
      promises2.push(selectSubCompanyAll(req.body.contractorId));
      promises2.push(selectSubEmployeeAll(req.body.contractorId));
      promises2.push(selectWorkTypeAll(req.body.contractorId));
      return Promise.all(promises2);
    })
    .then(function () {
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
      err = subCompanyLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//協力会社員情報を保存します。
app.post("/saveSubEmployee", async function (req, res) {
  const promises = [];
  promises.push(subCompanyLogic.checkSubCompnayEmployeeInputData(req.body));
  promises.push(
    checkSubCompnayEmployeeExistsData(req.body.contractorId, req.body)
  );
  Promise.all(promises)
    .then(function () {
      //従業員テーブルに協力会社員情報を保存します。
      return employeeDao.saveSubEmployee(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises2 = [];
      promises2.push(selectSubCompanyAll(req.body.contractorId));
      promises2.push(selectSubEmployeeAll(req.body.contractorId));
      promises2.push(selectWorkTypeAll(req.body.contractorId));
      return Promise.all(promises2);
    })
    .then(function () {
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
      err = subCompanyLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//協力会社情報を削除します。
app.post("/deleteSubCompany", async function (req, res) {
  //社員テーブルから社員情報を削除します。
  await subCompanyDao
    .deleteSubCompany(req.body)
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises = [];
      promises.push(selectSubCompanyAll(req.body.contractorId));
      promises.push(selectSubEmployeeAll(req.body.contractorId));
      promises.push(selectWorkTypeAll(req.body.contractorId));
      return Promise.all(promises);
    })
    .then(function () {
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
      err = subCompanyLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//協力会社員情報を削除します。
app.post("/deleteSubEmployee", async function (req, res) {
  //役職テーブルから役職情報を削除します。
  await employeeDao
    .deleteSubEmployee(req.body)
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises = [];
      promises.push(selectSubCompanyAll(req.body.contractorId));
      promises.push(selectSubEmployeeAll(req.body.contractorId));
      promises.push(selectWorkTypeAll(req.body.contractorId));
      return Promise.all(promises);
    })
    .then(function () {
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
      err = subCompanyLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
module.exports = app;
