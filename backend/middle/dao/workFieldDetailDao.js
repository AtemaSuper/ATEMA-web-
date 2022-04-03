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
    const responce = await Item.equalTo("deleteFlg", false)
      .fetchAll()
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
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveWorkFieldDetail(param) {
    var Item = ncmb.DataStore("workFieldDetailTable");
    //workFieldIdがある場合、更新します。
    if (param.workFieldId != "") {
      const responce = await Item.equalTo("objectId", param.workFieldId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("jobNo", param.jobNo)
            .set("clientFieldId", param.clientFieldId)
            .set("workFieldName", param.workFieldName)
            .set("workId", param.workId)
            .set("status", param.status)
            .set("contractStatus", param.contractStatus)
            .set("deleteFlg", false)
            .set("createUserId", param.createUserId)
            .set("updateUserId", param.updateUserId);
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
      //workFieldIdがない場合、新規で保存します。
    } else {
      var item = new Item();
      return await item
        .set("jobNo", param.jobNo)
        .set("clientFieldId", param.clientFieldId)
        .set("workFieldName", param.workFieldName)
        .set("workId", param.workId)
        .set("status", param.status)
        .set("contractStatus", param.contractStatus)
        .set("deleteFlg", false)
        .set("createUserId", param.createUserId)
        .set("updateUserId", param.updateUserId)
        .save()
        .then(function (item) {
          var data = {
            checkResult: true,
            messageList: ["工事情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
    }
  }
  /**
   * 現場詳細情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteWorkFieldDetail(param) {
    var Item = ncmb.DataStore("workFieldDetailTable");
    const responce = await Item.equalTo("objectId", param.workFieldId)
      .fetch()
      .then(function (results) {
        results.set("deleteFlg", true);
        return results.update();
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["工事情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = WorkFieldDetailDao;
