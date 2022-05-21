"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 現場テーブルのDaoクラスです。
 */
class WorkFieldDao {
  /**
   * 現場情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectWorkFieldAll() {
    var Item = ncmb.DataStore("workFieldTable");
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
   * 指定されたobjectIdに対する現場情報一覧を取得します。
   * @param {string} objectId 取得したいobjectIdです。
   *
   * @returns
   */
  async findWorkField(objectId) {
    var Item = ncmb.DataStore("workFieldTable");
    const responce = await Item.equalTo("objectId", objectId)
      .fetch()
      .then(function (results) {
        var data = {
          checkResult: true,
          messageList: ["現場情報一覧を取得しました。"],
        };
        return results;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
  /**
   * 現場情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveWorkField(param) {
    var Item = ncmb.DataStore("workFieldTable");
    //workIdがある場合、更新します。
    if (param.workId != "") {
      const responce = await Item.equalTo("objectId", param.workId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("workName", param.workName)
            .set("clientFieldId", param.clientFieldId)
            .set("status", param.status)
            .set("deleteFlg", false)
            .set("createUserId", param.createUserId)
            .set("updateUserId", param.updateUserId);
          return results.update();
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["客先情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
      //workIdがない場合、新規で保存します。
    } else {
      var item = new Item();
      return await item
        .set("workName", param.workName)
        .set("clientFieldId", param.clientFieldId)
        .set("status", param.status)
        .set("deleteFlg", false)
        .set("createUserId", param.createUserId)
        .set("updateUserId", param.updateUserId)
        .save()
        .then(function (item) {
          var data = {
            checkResult: true,
            messageList: ["客先情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
    }
  }
  /**
   * 現場情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteWorkField(param) {
    var Item = ncmb.DataStore("workFieldTable");
    const responce = await Item.equalTo("objectId", param.workId)
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

module.exports = WorkFieldDao;
