"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 客先テーブルのDaoクラスです。
 */
class ClientFieldDao {
  /**
   * 客先情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectClientFieldAll(contractorId) {
    const db = admin.firestore();
    const clientFieldRef = db
      .collection("clientField")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);

    const responce = await clientFieldRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.clientFieldId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
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
    if (param.clientFieldId == null) {
      const clientFieldRef = db
        .collection("clientField")
        .doc(param.contractorId)
        .collection("data");
      const responce = await clientFieldRef
        .add({
          clientFieldName: param.clientFieldName,
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
            messageList: ["客先情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
      //更新の場合
    } else {
      const clientFieldRef = db
        .collection("clientField")
        .doc(param.contractorId)
        .collection("data")
        .doc(param.clientFieldId);
      const responce = await clientFieldRef
        .update({
          clientFieldName: param.clientFieldName,
          status: param.status,
          updateDate: updateDate,
          updateUserId: param.userId,
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
    }
  }

  /**
   * 客先情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteClientField(param) {
    const db = admin.firestore();
    const clientFieldRef = db
      .collection("clientField")
      .doc(param.contractorId)
      .collection("data")
      .doc(param.clientFieldId);

    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    const responce = await clientFieldRef
      .update({
        updateDate: updateDate,
        updateUserId: param.userId,
        deleteFlg: true,
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
