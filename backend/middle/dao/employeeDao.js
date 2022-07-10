"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

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
  async selectfetchAll() {
    var Item = ncmb.DataStore("employeeTable");
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
   * 自社員情報一覧を取得します。
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
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectSubEmployeeAll(contractorId) {
    const db = admin.firestore();
    const employeeRef = db
      .collection("employee")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);
    // .where("companyId", "!=", contractorId);

    const responce = await employeeRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.employeeId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
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
    const db = admin.firestore();

    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    //新規の場合
    if (param.employeeId == "") {
      var staffCode = param.staffCode == null ? "" : param.staffCode;
      var mailAddress = param.mailAddress == null ? "" : param.mailAddress;
      const employeeRef = db
        .collection("employee")
        .doc(param.contractorId)
        .collection("data");
      const responce = await employeeRef
        .add({
          loginId: param.loginId,
          password: param.password,
          employeeFirstname: param.employeeFirstname,
          employeeLastname: param.employeeLastname,
          companyId: param.companyId,
          staffCode: param.staffCode,
          birthday: param.birthday,
          address: param.address,
          mailAddress: param.mailAddress,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          license: param.license,
          createDate: updateDate,
          createUserId: param.userId,
          updateDate: updateDate,
          updateUserId: param.userId,
          deleteFlg: false,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["協力会社員情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
      //更新の場合
    } else {
      const employeeRef = db
        .collection("subCompany")
        .doc(param.contractorId)
        .collection("data")
        .doc(param.employeeId);
      const responce = await employeeRef
        .update({
          loginId: param.loginId,
          password: param.password,
          employeeFirstname: param.employeeFirstname,
          employeeLastname: param.employeeLastname,
          companyId: param.companyId,
          staffCode: param.staffCode,
          birthday: param.birthday,
          address: param.address,
          mailAddress: param.mailAddress,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          license: param.license,
          updateDate: updateDate,
          updateUserId: param.userId,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["協力会社員情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
    }
  }
  /**
   * 協力会社員情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteSubEmployee(param) {
    const db = admin.firestore();
    const subEmployeeRef = db
      .collection("employee")
      .doc(param.contractorId)
      .collection("data")
      .doc(param.employeeId);
    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    const responce = await subEmployeeRef
      .update({
        updateDate: updateDate,
        updateUserId: param.userId,
        deleteFlg: true,
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
