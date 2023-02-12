"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 通知テーブルのDaoクラスです。
 */
class AlertDao {
  /**
   * 通知情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectAlertAll(contractorId) {
    const db = admin.firestore();
    const alertRef = db
      .collection("alert")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);

    const responce = await alertRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.alertId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 通知情報を保存します。
   *
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async saveStatus(param) {
    const db = admin.firestore();

    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    const alertRef = db
      .collection("alert")
      .doc(param.contractorId)
      .collection("data")
      .doc(param.alertId);
    const responce = await alertRef
      .update({
        status: param.status,
        updateDate: updateDate,
        updateUserId: param.userId,
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["通知情報を保存しました。"],
        };
        return data;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = AlertDao;
