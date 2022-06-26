"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 工種テーブルのDaoクラスです。
 */
class WorkTypeDao {
  /**
   * 工種情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectWorkTypeAll(contractorId) {
    const db = admin.firestore();
    const workTypeRef = db
      .collection("workTypeId")
      .doc(contractorId)
      .collection("data");
    // .where("deleteFlg", "==", false);

    const responce = await workTypeRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.workTypeId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
}

module.exports = WorkTypeDao;
