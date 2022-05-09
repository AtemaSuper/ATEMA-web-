"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 協力会社テーブルのDaoクラスです。
 */
class SubCompanyDao {
  /**
   * 協力会社一覧を取得します。
   *
   * @param {string} loginId
   *
   * @returns
   */
  async selectSubCompanyAll(req, res) {
    var Item = ncmb.DataStore("subCompanyTable");
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
   * 協力会社情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveSubCompany(param) {
    var Item = ncmb.DataStore("subCompanyTable");
    //subCompanyIdがある場合、更新します。
    if (param.subCompanyId != "") {
      const responce = await Item.equalTo("objectId", param.subCompanyId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("subCompanyName", param.subCompanyName)
            .set("foundation", param.foundation)
            .set("leaderName", param.leaderName)
            .set("postNumber1", param.postNumber1)
            .set("postNumber2", param.postNumber2)
            .set("address", param.address)
            .set("telNumber1", param.telNumber1)
            .set("telNumber2", param.telNumber2)
            .set("telNumber3", param.telNumber3)
            .set("selectWorkTypeList", param.selectWorkTypeList)
            .set("note", param.note)
            .set("deleteFlg", false)
            .set("createUserId", param.createUserId)
            .set("updateUserId", param.updateUserId);
          return results.update();
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["協力会社情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
      //subCompanyIdがない場合、新規で保存します。
    } else {
      var item = new Item();
      return await item
        .set("subCompanyName", param.subCompanyName)
        .set("foundation", param.foundation)
        .set("leaderName", param.leaderName)
        .set("postNumber1", param.postNumber1)
        .set("postNumber2", param.postNumber2)
        .set("address", param.address)
        .set("telNumber1", param.telNumber1)
        .set("telNumber2", param.telNumber2)
        .set("telNumber3", param.telNumber3)
        .set("selectWorkTypeList", param.selectWorkTypeList)
        .set("note", param.note)
        .set("deleteFlg", false)
        .set("createUserId", param.createUserId)
        .set("updateUserId", param.updateUserId)
        .save()
        .then(function (item) {
          var data = {
            checkResult: true,
            messageList: ["協力会社情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
    }
  }
  /**
   * 協力会社情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteSubCompany(param) {
    var Item = ncmb.DataStore("subCompanyTable");
    const responce = await Item.equalTo("objectId", param.subCompanyId)
      .fetch()
      .then(function (results) {
        results.set("deleteFlg", true);
        return results.update();
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["協力会社情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = SubCompanyDao;
