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
      return workFieldDao.selectWorkAll();
    })
    .then(function (items) {
      workFieldResponse = items;
      //現場詳細テーブルから現場詳細情報を取得します。
      return workFieldDetailDao.selectWorkFieldAll();
    })
    .then(function (items) {
      workFieldDetailResponse = items;
      var workFieldDetailList = [];
      for (var i = 0; i < workFieldDetailResponse.length; i++) {
        var workFieldDetail = {};
        workFieldDetail.jobNo = workFieldDetailResponse[i].jobNo;
        workFieldDetail.clientFieldName = getClientFieldName(
          workFieldDetailResponse[i].clientFieldId,
          clientFieldResponse
        );
        workFieldDetail.workName = getWorkName(
          workFieldDetailResponse[i].workId,
          workFieldResponse
        );
        workFieldDetail.workFieldName =
          workFieldDetailResponse[i].workFieldName;
        workFieldDetail.status = workFieldDetailResponse[i].status;
        workFieldDetail.statusName = getStatusName(
          workFieldDetailResponse[i].status
        );
        workFieldDetail.contractStatus =
          workFieldDetailResponse[i].contractStatus;
        workFieldDetailList.push(workFieldDetail);
      }
      //返却用のdata
      var data = {
        workFieldDetailList: workFieldDetailList,
      };
      //dataをレスポンスで返却します。
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
 * 客先IDをもとに客先名を取得します。
 *
 * @param {string} clientFieldId 工種IDです。
 * @param {object} clientFieldResponse 工種のレスポンスデータです。
 *
 * @private
 * @returns
 */
function getClientFieldName(clientFieldId, clientFieldResponse) {
  var clientFieldName = "";
  for (var i = 0; i < clientFieldResponse.length; i++) {
    if (clientFieldId == clientFieldResponse[i].objectId) {
      clientFieldName = clientFieldResponse[i].clientFieldName;
    }
  }
  return clientFieldName;
}
/**
 * 工事IDをもとに工事件名を取得します。
 *
 * @param {string} workId 工種IDです。
 * @param {object} workFieldResponse 工種のレスポンスデータです。
 *
 * @private
 * @returns
 */
function getWorkName(workId, workFieldResponse) {
  var workName = "";
  for (var i = 0; i < workFieldResponse.length; i++) {
    if (workId == workFieldResponse[i].objectId) {
      workName = workFieldResponse[i].workName;
    }
  }
  return workName;
}
/**
 * ステータスをもとにステータス名を取得します。
 *
 * @param {string} status ステータスです。
 *
 * @private
 * @returns
 */
function getStatusName(status) {
  if (status == 0) {
    return "未進行";
  } else {
    return "進行中";
  }
}
module.exports = app;
