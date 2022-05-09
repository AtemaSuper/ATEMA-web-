"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 従業員テーブルのDaoクラスです。
 */
class EmployeeDao {
  /**
   * 社員情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectEmployeeAll() {
    var Item = ncmb.DataStore("employeeTable");
    const responce = await Item.equalTo("deleteFlg", false)
      .equalTo("companyId", "68vFyGzOcf9lMn1F") // TODO 協力会社員を省くようにする
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
   * 協力会社員情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectSubEmployeeAll() {
    var Item = ncmb.DataStore("employeeTable");
    const responce = await Item.equalTo("deleteFlg", false)
      .notEqualTo("companyId", "68vFyGzOcf9lMn1F") // TODO 自社員を省くようにする
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
   * 協力会社員情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveSubEmployee(param) {
    var Item = ncmb.DataStore("employeeTable");
    //employeeIdがある場合、更新します。
    if (param.employeeId != "") {
      const responce = await Item.equalTo("objectId", param.employeeId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("loginId", param.loginId)
            .set("password", param.password)
            .set("employeeFirstname", param.employeeFirstname)
            .set("employeeLastname", param.employeeLastname)
            .set("postId", param.postId)
            .set("companyName", param.companyName)
            .set("staffCode", param.staffCode)
            .set("birthday", param.birthday)
            .set("address", param.address)
            .set("mailAddress", param.mailAddress)
            .set("telNumber1", param.telNumber1)
            .set("telNumber2", param.telNumber2)
            .set("telNumber3", param.telNumber3)
            .set("entryFirstDate", param.entryFirstDate)
            .set("entryEndDate", param.entryEndDate)
            .set("employment", param.employment)
            .set("license", param.license)
            .set("deleteFlg", false)
            .set("createUserId", param.createUserId)
            .set("updateUserId", param.updateUserId);
          return results.update();
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["従業員情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
      //employeeIdがない場合、新規で保存します。
    } else {
      var item = new Item();
      return await item
        .set("loginId", param.loginId)
        .set("password", param.password)
        .set("employeeFirstname", param.employeeFirstname)
        .set("employeeLastname", param.employeeLastname)
        .set("postId", param.postId)
        .set("companyName", param.companyName)
        .set("staffCode", param.staffCode)
        .set("birthday", param.birthday)
        .set("address", param.address)
        .set("mailAddress", param.mailAddress)
        .set("telNumber1", param.telNumber1)
        .set("telNumber2", param.telNumber2)
        .set("telNumber3", param.telNumber3)
        .set("entryFirstDate", param.entryFirstDate)
        .set("entryEndDate", param.entryEndDate)
        .set("employment", param.employment)
        .set("license", param.license)
        .set("deleteFlg", false)
        .set("createUserId", param.createUserId)
        .set("updateUserId", param.updateUserId)
        .save()
        .then(function (item) {
          var data = {
            checkResult: true,
            messageList: ["協力会社員情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
    }
  }
  /**
   * 協力会社員情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteSubEmployee(param) {
    var Item = ncmb.DataStore("employeeTable");
    const responce = await Item.equalTo("objectId", param.employeeId)
      .fetch()
      .then(function (results) {
        results.set("deleteFlg", true);
        return results.update();
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["協力会社員情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
  /**
   * 社員情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveEmployee(param) {
    var Item = ncmb.DataStore("employeeTable");
    //employeeIdがある場合、更新します。
    if (param.employeeId != "") {
      const responce = await Item.equalTo("objectId", param.employeeId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("loginId", param.loginId)
            .set("password", param.password)
            .set("employeeFirstname", param.employeeFirstname)
            .set("employeeLastname", param.employeeLastname)
            .set("postId", param.postId)
            .set("companyName", param.companyName)
            .set("staffCode", param.staffCode)
            .set("birthday", param.birthday)
            .set("address", param.address)
            .set("mailAddress", param.mailAddress)
            .set("telNumber1", param.telNumber1)
            .set("telNumber2", param.telNumber2)
            .set("telNumber3", param.telNumber3)
            .set("entryFirstDate", param.entryFirstDate)
            .set("entryEndDate", param.entryEndDate)
            .set("employment", param.employment)
            .set("license", param.license)
            .set("deleteFlg", false)
            .set("createUserId", param.createUserId)
            .set("updateUserId", param.updateUserId);
          return results.update();
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["従業員情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
      //employeeIdがない場合、新規で保存します。
    } else {
      var item = new Item();
      return await item
        .set("loginId", param.loginId)
        .set("password", param.password)
        .set("employeeFirstname", param.employeeFirstname)
        .set("employeeLastname", param.employeeLastname)
        .set("postId", param.postId)
        .set("companyName", param.companyName)
        .set("staffCode", param.staffCode)
        .set("birthday", param.birthday)
        .set("address", param.address)
        .set("mailAddress", param.mailAddress)
        .set("telNumber1", param.telNumber1)
        .set("telNumber2", param.telNumber2)
        .set("telNumber3", param.telNumber3)
        .set("entryFirstDate", param.entryFirstDate)
        .set("entryEndDate", param.entryEndDate)
        .set("employment", param.employment)
        .set("license", param.license)
        .set("deleteFlg", false)
        .set("createUserId", param.createUserId)
        .set("updateUserId", param.updateUserId)
        .save()
        .then(function (item) {
          var data = {
            checkResult: true,
            messageList: ["従業員情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
    }
  }
  /**
   * 社員情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteEmployee(param) {
    var Item = ncmb.DataStore("employeeTable");
    const responce = await Item.equalTo("objectId", param.employeeId)
      .fetch()
      .then(function (results) {
        results.set("deleteFlg", true);
        return results.update();
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["社員情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = EmployeeDao;
