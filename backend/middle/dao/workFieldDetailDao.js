"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 現場詳細テーブルのDaoクラスです。
 */
class WorkFieldDetailDao {
  /**
   * 現場詳細情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectWorkFieldDetailAll() {
    var Item = ncmb.DataStore("workFieldDetailTable");
    const responce = await Item.fetchAll()
      .then(function (items) {
        return items;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
  /**
   * 現場詳細情報を保存します。
   *
   *
   * @returns
   */
  async saveWorkFieldDetail(param) {
    //workFieldIdがない場合、新規で保存します。
    console.log(param);
    if (param.workFieldId != "") {
      var Item = ncmb.DataStore("workFieldDetailTable");
      const responce = await Item.equalTo("objectId", param.workFieldId)
        .fetch()
        .then(function (results) {
          results
            .set("jobNo", param.jobNo)
            .set("clientFieldId", param.clientFieldId)
            .set("workFieldName", param.workFieldName)
            .set("workId", param.workId)
            .set("status", param.status)
            .set("contractStatus", param.contractStatus);
          return results.update();
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["工事情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
      //workFieldIdがある場合、更新します。
    } else {
      var Item = ncmb.DataStore("workFieldDetailTable");
      const responce = await Item.equalTo("objectId", param.objectId)
        .fetch()
        .then(function (results) {
          results
            .set("jobNo", param.jobNo)
            .set("clientFieldName", param.clientFieldName)
            .set("workFieldName", param.workFieldName)
            .set("workName", param.workName)
            .set("status", param.status)
            .set("contractStatus", param.contractStatus);
          return results.update();
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["工事情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
    }
  }
}

module.exports = WorkFieldDetailDao;
