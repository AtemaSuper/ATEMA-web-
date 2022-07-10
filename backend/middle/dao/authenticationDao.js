"use strict";
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 承認用DAOクラス
 */
class authentication {
  /**
   * アクセストークンの検証
   *
   *
   * @returns
   */
  async verificationToken(token, res) {
    return await admin
      .auth()
      .verifyIdToken(token)
      .then(function (decodedToken) {
        return decodedToken.uid;
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  }
}

module.exports = authentication;
