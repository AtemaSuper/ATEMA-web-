"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 役職テーブルのDaoクラスです。
 */
class PostDao {
  /**
   * 社員情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectPostAll() {
    var Item = ncmb.DataStore("postTable");
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
   * 役職情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async savePost(param) {
    var Item = ncmb.DataStore("postTable");
    //postIdがある場合、更新します。
    if (param.postId != "") {
      const responce = await Item.equalTo("objectId", param.postId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("postName", param.postName)
            .set("attendanceAuth", param.attendanceAuth)
            .set("ownWokerManageAuth", param.ownWokerManageAuth)
            .set("subCompanyManageAuth", param.subCompanyManageAuth)
            .set("ownCompanyManageAuth", param.ownCompanyManageAuth)
            .set("payPlanAuth", param.payPlanAuth)
            .set("deleteFlg", false)
            .set("createUserId", param.createUserId)
            .set("updateUserId", param.updateUserId);
          return results.update();
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["役職情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
      //postIdがない場合、新規で保存します。
    } else {
      var item = new Item();
      return await item
        .set("postName", param.postName)
        .set("attendanceAuth", param.attendanceAuth)
        .set("ownWokerManageAuth", param.ownWokerManageAuth)
        .set("subCompanyManageAuth", param.subCompanyManageAuth)
        .set("ownCompanyManageAuth", param.ownCompanyManageAuth)
        .set("payPlanAuth", param.payPlanAuth)
        .set("deleteFlg", false)
        .set("createUserId", param.createUserId)
        .set("updateUserId", param.updateUserId)
        .save()
        .then(function (item) {
          var data = {
            checkResult: true,
            messageList: ["役職情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
    }
  }
  /**
   * 役職情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deletePost(param) {
    var Item = ncmb.DataStore("postTable");
    const responce = await Item.equalTo("objectId", param.postId)
      .fetch()
      .then(function (results) {
        results.set("deleteFlg", true);
        return results.update();
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["役職情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = PostDao;
