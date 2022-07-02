"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 現場テーブルのDaoクラスです。
 */
class WorkFieldDao {
  /**
   * 現場情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectWorkFieldAll(contractorId) {
    const db = admin.firestore();
    const workFieldRef = db
      .collection("workField")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);

    const responce = await workFieldRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.workFieldId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 現場情報を取得します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async findWorkField(param) {
    const db = admin.firestore();
    const workFieldRef = db
      .collection("workField")
      .doc(contractorId)
      .collection("data")
      .doc(param.workFieldId);

    const responce = await workFieldRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.workFieldId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
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
    if (param.workFieldId == null) {
      const workFieldRef = db
        .collection("workField")
        .doc(param.contractorId)
        .collection("data");
      const responce = await workFieldRef
        .add({
          workFieldName: param.workFieldName,
          clientFieldId: param.clientFieldId,
          status: param.status,
          createDate: updateDate,
          createUserId: param.userId,
          updateDate: updateDate,
          updateUserId: param.userId,
          deleteFlg: false,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["現場情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
      //更新の場合
    } else {
      const workFieldRef = db
        .collection("workField")
        .doc(param.contractorId)
        .collection("data")
        .doc(param.workFieldId);
      const responce = await workFieldRef
        .update({
          workFieldName: param.workFieldName,
          clientFieldId: param.clientFieldId,
          status: param.status,
          updateDate: updateDate,
          updateUserId: param.userId,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["現場情報を保存しました。"],
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
   * 現場情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteWorkField(param) {
    const db = admin.firestore();
    const workFieldRef = db
      .collection("workField")
      .doc(param.contractorId)
      .collection("data")
      .doc(param.workFieldId);
    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    const responce = await workFieldRef
      .update({
        updateDate: updateDate,
        updateUserId: param.userId,
        deleteFlg: true,
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["現場情報を削除しました。"],
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
