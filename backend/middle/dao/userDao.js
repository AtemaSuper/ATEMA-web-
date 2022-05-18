"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 会員管理のDaoクラスです。
 */
class UserDao {
  //   /**
  //    * 社員情報一覧を取得します。
  //    *
  //    *
  //    * @returns
  //    */
  //   async selectfetchAll() {
  //     var User = ncmb.User();
  //     const responce = await User.equalTo("deleteFlg", false)
  //       .fetchAll()
  //       .then(function (items) {
  //         return items;
  //       })
  //       .catch(function (err) {
  //         res.status(500).json(err);
  //       });
  //     return responce;
  //   }
  //   /**
  //    * 自社員情報一覧を取得します。
  //    *
  //    *
  //    * @returns
  //    */
  //   async selectEmployeeAll() {
  //     var User = ncmb.User();
  //     const responce = await User.equalTo("deleteFlg", false)
  //       .equalTo("companyId", "68vFyGzOcf9lMn1F") // TODO 協力会社員を省くようにする
  //       .fetchAll()
  //       .then(function (items) {
  //         return items;
  //       })
  //       .catch(function (err) {
  //         res.status(500).json(err);
  //       });
  //     return responce;
  //   }
  //   /**
  //    * 協力会社員情報一覧を取得します。
  //    *
  //    *
  //    * @returns
  //    */
  //   async selectSubEmployeeAll() {
  //     var User = ncmb.User();
  //     const responce = await User.equalTo("deleteFlg", false)
  //       .notEqualTo("companyId", "68vFyGzOcf9lMn1F") // TODO 自社員を省くようにする
  //       .fetchAll()
  //       .then(function (items) {
  //         return items;
  //       })
  //       .catch(function (err) {
  //         res.status(500).json(err);
  //       });
  //     return responce;
  //   }
  /**
   * 協力会社員情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveSubEmployee(param) {
    var User = ncmb.User();
    //employeeIdがある場合、更新します。
    if (param.employeeId != "") {
      const responce = await User.equalTo("employeeId", param.employeeId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("employeeId", param.employeeId)
            .set("userName", param.employeeFirstname + param.employeeLastname)
            .set("password", param.password)
            .set("mailAddress", param.mailAddress)
            .set("deleteFlg", false)
            .set("createUserId", param.createUserId)
            .set("updateUserId", param.updateUserId);
          return results.signUpByAccount();
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
      var item = new User();
      return await item
        .set("employeeId", param.employeeId)
        .set("userName", param.employeeFirstname + param.employeeLastname)
        .set("password", param.password)
        .set("mailAddress", param.mailAddress)
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
    var User = ncmb.User();
    const responce = await User.equalTo("employeeId", param.employeeId)
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
    var User = ncmb.User();
    //employeeIdがある場合、更新します。
    if (param.employeeId != "") {
      const responce = await User.equalTo("employeeId", param.employeeId)
        .equalTo("deleteFlg", false)
        .fetch()
        .then(function (results) {
          results
            .set("employeeId", param.employeeId)
            .set("userName", param.employeeFirstname + param.employeeLastname)
            .set("password", param.password)
            .set("mailAddress", param.mailAddress)
            .set("deleteFlg", false)
            .set("createUserId", param.createUserId)
            .set("updateUserId", param.updateUserId);
          return results.signUpByAccount();
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
      var item = new User();
      return await item
        .set("employeeId", param.employeeId)
        .set("userName", param.employeeFirstname + param.employeeLastname)
        .set("password", param.password)
        .set("mailAddress", param.mailAddress)
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
    var User = ncmb.User();
    const responce = await User.equalTo("employeeId", param.employeeId)
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

module.exports = UserDao;
