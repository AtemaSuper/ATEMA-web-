const express = require("express");
const app = express();

// const Const = require("..public//const");

//自社設定Logic
const OwnCompanyLogic = require("../logic/ownCompanyLogic");
var ownCompanyLogic = new OwnCompanyLogic();
//契約テーブル
const ContactDao = require("../middle/dao/contactDao");
var contactDao = new ContactDao();
//工種テーブル
const WorkTypeDao = require("../middle/dao/workTypeDao");
var workTypeDao = new WorkTypeDao();

/**
 * 自社設定画面のService
 */
//自社設定の情報を取得します。
app.post("/", async function (req, res) {
  var contactResponse = {};
  //契約テーブルから自社情報を取得します。
  await contactDao
    .selectContactBycontactId(req.body.contactId)
    .then(function (items) {
      contactResponse = items;
      //工種テーブルから工種情報を取得します。
      return workTypeDao.selectWorkTypeAll();
    })
    .then(function (items) {
      var workTypeResponse = items;
      //契約者の工種をレスポンス用に変換します。
      var selectWorkTypeList = [];
      for (var i = 0; i < contactResponse.selectWorkTypeList.length; i++) {
        var selectWorkType = {};
        var selectWorkTypeId = contactResponse.selectWorkTypeList[i];
        selectWorkType.workTypeId = selectWorkTypeId;
        selectWorkType.workTypeName = getWorkTypeName(
          selectWorkTypeId,
          workTypeResponse
        );
        selectWorkTypeList.push(selectWorkType);
      }
      //工種情報をレスポンス用に変換します。
      var workTypeList = [];
      for (var j = 0; j < workTypeResponse.length; j++) {
        var workType = {};
        workType.workTypeId = workTypeResponse[j].objectId;
        workType.workTypeName = workTypeResponse[j].workTypeName;
        workTypeList.push(workType);
      }
      //通常業務時間と時間外業務時間を時と分に分けます。
      var normalWorkStartTime = contactResponse.normalWorkStartTime.split("：");
      var normalWorkFinishTime =
        contactResponse.normalWorkFinishTime.split("：");
      var exceptionWorkStartTime =
        contactResponse.exceptionWorkStartTime.split("：");
      var exceptionWorkFinishTime =
        contactResponse.exceptionWorkFinishTime.split("：");

      //返却用のdata
      var data = {
        objectId: contactResponse.objectId,
        address: contactResponse.address,
        contactCompanyName: contactResponse.contactCompanyName,
        exceptionWorkStartHours: exceptionWorkStartTime[0],
        exceptionWorkStartMinutes: exceptionWorkStartTime[1],
        exceptionWorkFinishHours: exceptionWorkFinishTime[0],
        exceptionWorkFinishMinutes: exceptionWorkFinishTime[1],
        normalWorkStartHours: normalWorkStartTime[0],
        normalWorkStartMinutes: normalWorkStartTime[1],
        normalWorkFinishHours: normalWorkFinishTime[0],
        normalWorkFinishMinutes: normalWorkFinishTime[1],
        postNumber1: contactResponse.postNumber1,
        postNumber2: contactResponse.postNumber2,
        roundingTime: contactResponse.roundingTime,
        selectRoundingTime: contactResponse.selectRoundingTime,
        tardyTime: contactResponse.tardyTime,
        telNumber1: contactResponse.telNumber1,
        telNumber2: contactResponse.telNumber2,
        telNumber3: contactResponse.telNumber3,
        foundationDay: contactResponse.foundationDay,
        foundationMonth: contactResponse.foundationMonth,
        foundationYear: contactResponse.foundationYear,
        leaderName: contactResponse.leaderName,
        updownSelect: contactResponse.updownSelect,
        selectWorkTypeList: selectWorkTypeList,
        workTypeList: workTypeList,
        errorList: [],
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//自社設定の入力情報を保存します。
app.post("/save", async function (req, res) {
  //TODO 入力チェック
  await ownCompanyLogic
    .checkInputData(req.body)
    .then(function () {
      //基本情報の場合、工種をテーブル保存用に変換します。
      if (req.body.pageContents == 1) {
        var selectWorkTypeList = [];
        for (var i = 0; i < req.body.selectWorkTypeList.length; i++) {
          selectWorkTypeList.push(req.body.selectWorkTypeList[i].workTypeId);
        }
        req.body.selectWorkTypeList = selectWorkTypeList;
      }
      //契約テーブルから自社情報を取得します。
      return contactDao.updateContact(req.body);
    })
    .then(function (data) {
      //dataをレスポンスで返却します。
      data = {
        checkResult: true,
        messageList: [util.stringFormat("{0}の保存が完了しました。", "会社名")],
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//
// privateメソッドです。
//
/**
 * 工種IDをもとに工種名を取得します。
 *
 * @param {string} workTypeId 工種IDです。
 * @param {object} workTypeResponse 工種のレスポンスデータです。
 *
 * @private
 * @returns
 */
function getWorkTypeName(workTypeId, workTypeResponse) {
  var worlTypeName = "";
  for (var i = 0; i < workTypeResponse.length; i++) {
    if (workTypeId == workTypeResponse[i].objectId) {
      worlTypeName = workTypeResponse[i].workTypeName;
    }
  }
  return worlTypeName;
}

module.exports = app;
