"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 協力会社テーブルのDaoクラスです。
 */
class SubCompanyDao {
  /**
   * 協力会社一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectSubCompanyAll(contractorId) {
    const db = admin.firestore();
    const subCompanyRef = db
      .collection("subCompany")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);

    const responce = await subCompanyRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.subCompanyId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
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
    if (param.subCompanyId == "") {
      var note = param.note == null ? "" : param.note;
      const subCompanyRef = db
        .collection("subCompany")
        .doc(param.contractorId)
        .collection("data");
      const responce = await subCompanyRef
        .add({
          subCompanyName: param.subCompanyName,
          foundation: param.foundation,
          leaderName: param.leaderName,
          postNumber1: param.postNumber1,
          postNumber2: param.postNumber2,
          address: param.address,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          workTypeIdList: param.workTypeIdList,
          note: note,
          createDate: updateDate,
          createUserId: param.userId,
          updateDate: updateDate,
          updateUserId: param.userId,
          deleteFlg: false,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["協力会社情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
      //更新の場合
    } else {
      const subCompanyRef = db
        .collection("subCompany")
        .doc(param.contractorId)
        .collection("data")
        .doc(param.subCompanyId);
      const responce = await subCompanyRef
        .update({
          subCompanyName: param.subCompanyName,
          foundation: param.foundation,
          leaderName: param.leaderName,
          postNumber1: param.postNumber1,
          postNumber2: param.postNumber2,
          address: param.address,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          workTypeIdList: param.workTypeIdList,
          note: param.note,
          updateDate: updateDate,
          updateUserId: param.userId,
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
    }
  }
  /**
   * 協力会社情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteSubCompany(param) {
    const db = admin.firestore();
    const subCompanyRef = db
      .collection("subCompany")
      .doc(param.contractorId)
      .collection("data")
      .doc(param.subCompanyId);
    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    const responce = await subCompanyRef
      .update({
        updateDate: updateDate,
        updateUserId: param.userId,
        deleteFlg: true,
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
