"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 客先テーブルのDaoクラスです。
 */
class ClientFieldDao {
  /**
   * 客先情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectClientFieldAll() {
    var Item = ncmb.DataStore("clientFieldTable");
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
   * 客先情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveClientField(param) {
    var Item = ncmb.DataStore("clientFieldTable");
    //clientFieldIdがある場合、更新します。
    if (param.clientFieldId != "") {
      const responce = await Item.equalTo("objectId", param.clientFieldId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("clientFieldName", param.clientFieldName)
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
      //clientFieldIdがない場合、新規で保存します。
    } else {
      var item = new Item();
      return await item
        .set("clientFieldName", param.clientFieldName)
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
   * 客先情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteClientField(param) {
    var Item = ncmb.DataStore("clientFieldTable");
    const responce = await Item.equalTo("objectId", param.clientFieldId)
      .fetch()
      .then(function (results) {
        results.set("deleteFlg", true);
        return results.update();
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["客先情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = ClientFieldDao;
