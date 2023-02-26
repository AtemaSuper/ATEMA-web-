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
    .then(function (items) {
      contractorId = items.contractorId;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployee(contractorId, req.body.employeeId);
    })
    .then(function (items) {
      employeeResponse = items;
      //会社テーブルから会社情報を取得します。
      return contactDao.selectContactAll(contractorId);
    })
    .then(function (items) {
      contactResponse = items;
      //役職IDから役職名を取得します。
      return postDao.selectPostInfoByPostId(
        contractorId,
        employeeResponse.postId
      );
    })
    .then(function (items) {
      postResponse = items;
      var userInfo = {
        companyName: contactResponse.contractorName,
        companyId: contractorId,
        userName:
          employeeResponse.employeeFirstName +
          employeeResponse.employeeLastName,
        postName: postResponse.postName,
      };

      //返却用のdata
      var data = {
        userInfo: userInfo,
      };
      console.log(data);
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err);

      res.status(500).json(err);
    });
});

module.exports = app;
