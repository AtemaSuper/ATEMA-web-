"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 現場詳細テーブルのDaoクラスです。
 */
class WorkFieldDetailDao {
  /**
   * 現場詳細情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectWorkFieldDetailAll(contractorId) {
    const db = admin.firestore();
    const workFieldDetailRef = db
      .collection("workFieldDetail")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);

    const responce = await workFieldDetailRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.workFieldDetailId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 現場詳細情報を取得します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async findWorkFieldDetail(param) {
    const db = admin.firestore();
    const workFieldDetailRef = db
      .collection("workFieldDetail")
      .doc(contractorId)
      .collection("data")
      .doc(param.workFieldDetailId);

    const responce = await workFieldDetailRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.workFieldDetailId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 現場詳細情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveWorkFieldDetail(param) {
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
    if (param.workFieldDetailId == null) {
      const workFieldDetailRef = db
        .collection("workFieldDetail")
        .doc(param.contractorId)
        .collection("data");
      const responce = await workFieldDetailRef
        .add({
          jobNo: param.jobNo,
          workFieldDetailName: param.workFieldDetailName,
          workFieldId: param.workFieldId,
          clientFieldId: param.clientFieldId,
          status: param.status,
          contractStatus: param.contractStatus,
          createDate: updateDate,
          createUserId: param.userId,
          updateDate: updateDate,
          updateUserId: param.userId,
          deleteFlg: false,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["現場詳細情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
      //更新の場合
    } else {
      const workFieldDetailRef = db
        .collection("workFieldDetail")
        .doc(param.contractorId)
        .collection("data")
        .doc(param.workFieldDetailId);
      const responce = await workFieldDetailRef
        .update({
          jobNo: param.jobNo,
          workFieldName: param.workFieldName,
          workFieldId: param.workFieldId,
          clientFieldId: param.clientFieldId,
          status: param.status,
          contractStatus: param.contractStatus,
          updateDate: updateDate,
          updateUserId: param.userId,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["現場詳細情報を保存しました。"],
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
   * 現場詳細情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deleteWorkFieldDetail(param) {
    const db = admin.firestore();
    const workFieldDetailRef = db
      .collection("workFieldDetail")
      .doc(param.contractorId)
      .collection("data")
      .doc(param.workFieldDetailId);
    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    const responce = await workFieldDetailRef
      .update({
        updateDate: updateDate,
        updateUserId: param.userId,
        deleteFlg: true,
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["現場詳細情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = WorkFieldDetailDao;
