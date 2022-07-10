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
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectfetchAll(contractorId) {
    const db = admin.firestore();
    const employeeRef = db
      .collection("employee")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);

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
   * 自社員情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectEmployeeAll(contractorId) {
    const db = admin.firestore();
    const employeeRef = db
      .collection("employee")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);
    // .where("companyId", "==", contractorId);

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
   * 社員情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveEmployee(param) {
    const db = admin.firestore();

    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    //必須でない項目にnullが入っている場合、空文字をセットします。
    var license = param.license == null ? "" : param.license;
    var entryEndDate = param.entryEndDate == null ? "" : param.entryEndDate;
    //新規の場合
    if (param.employeeId == "") {
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
          companyId: param.contractorId,
          postId: param.postId,
          staffCode: param.staffCode,
          birthday: param.birthday,
          address: param.address,
          mailAddress: param.mailAddress,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          entryFirstDate: param.entryFirstDate,
          entryEndDate: entryEndDate,
          employment: param.employment,
          license: license,
          createDate: updateDate,
          createUserId: param.userId,
          updateDate: updateDate,
          updateUserId: param.userId,
          deleteFlg: false,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["会社員情報を保存しました。"],
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
        .collection("employee")
        .doc(param.contractorId)
        .collection("data")
        .doc(param.employeeId);
      const responce = await employeeRef
        .update({
          loginId: param.loginId,
          password: param.password,
          employeeFirstname: param.employeeFirstname,
          employeeLastname: param.employeeLastname,
          postId: param.postId,
          staffCode: param.staffCode,
          birthday: param.birthday,
          address: param.address,
          mailAddress: param.mailAddress,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          entryFirstDate: param.entryFirstDate,
          entryEndDate: entryEndDate,
          employment: param.employment,
          license: license,
          updateDate: updateDate,
          updateUserId: param.userId,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["会社員情報を保存しました。"],
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

    //必須でない項目にnullが入っている場合、空文字をセットします。
    var staffCode = param.staffCode == null ? "" : param.staffCode;
    var mailAddress = param.mailAddress == null ? "" : param.mailAddress;
    var license = param.license == null ? "" : param.license;
    //新規の場合
    if (param.employeeId == "") {
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
          staffCode: staffCode,
          birthday: param.birthday,
          address: param.address,
          mailAddress: mailAddress,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          license: license,
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
        .collection("employee")
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
          staffCode: staffCode,
          birthday: param.birthday,
          address: param.address,
          mailAddress: mailAddress,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          license: license,
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
   * 社員情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteEmployee(param) {
    const db = admin.firestore();
    const employeeRef = db
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

    const responce = await employeeRef
      .update({
        updateDate: updateDate,
        updateUserId: param.userId,
        deleteFlg: true,
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["会社員情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
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
}

module.exports = EmployeeDao;
