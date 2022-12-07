"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 会社紐づけテーブルのDaoクラスです。
 */
class ContractRelationDao {
  /**
   * 社員IDをもとに自社情報を取得します。
   *
   * @param {string} employeeId 社員IDです。
   *
   * @returns
   */
  async getContractorId(employeeId) {
    const db = admin.firestore();
    const contractRelationRef = db
      .collection("contractRelation")
      .doc(employeeId);

    const responce = await contractRelationRef
      .get()
      .then(function (items) {
        return items.data();
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
}

module.exports = ContractRelationDao;
