const express = require("express");
const app = express();

//会社紐づけテーブル
const ContractRelationDao = require("../middle/dao/contractRelationDao");
var contractRelationDao = new ContractRelationDao();
//契約テーブル
const ContactDao = require("../middle/dao/contactDao");
var contactDao = new ContactDao();
//客先テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();
//役職テーブル
const PostDao = require("../middle/dao/postDao");
var postDao = new PostDao();

/**
 * ログイン画面のService
 */

//ログインユーザの情報を取得します。
app.post("/getUserInfo", async function (req, res) {
  var contractorId = "";
  var employeeResponse = {};
  var contactResponse = {};
  var postResponse = {};
  //会社紐づけテーブルから会社IDを取得します。
  await contractRelationDao
    .getContractorId(req.body.employeeId)
    .then(async function (items) {
      contractorId = items.contractorId;
      //社員テーブルから社員情報を取得します。
      return (employeeResponse = await employeeDao.selectEmployee(
        contractorId,
        req.body.employeeId
      ));
    })
    .then(async function () {
      //会社テーブルから会社情報を取得します。
      return (contactResponse = await contactDao.selectContact(contractorId));
    })
    .then(async function () {
      //役職IDから役職名を取得します。
      return (postResponse = await postDao.selectPostInfoByPostId(
        contractorId,
        employeeResponse.postId
      ));
    })
    .then(function () {
      var userInfo = {
        employeeId: req.body.employeeId,
        companyName: contactResponse.contractorName,
        companyId: contractorId,
        userName:
          employeeResponse.employeeFirstName +
          employeeResponse.employeeLastName,
        userId: req.body.employeeId,
        postName: postResponse.postName,
        menuActivity: {
          payPlanAuth: postResponse.payPlanAuth,
          subCompanyManageAuth: postResponse.subCompanyManageAuth,
          attendanceManageAuth: postResponse.attendanceManageAuth,
          ownWorkerManageAuth: postResponse.ownWorkerManageAuth,
          ownCompanyManageAuth: postResponse.ownCompanyManageAuth,
        },
      };

      //返却用のdata
      var data = {
        userInfo: userInfo,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

module.exports = app;
