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

  /**
   * FirebaseのAuthenticationのユーザ情報を作成します。
   *
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async createUserForFirebase(param) {
    return await admin
      .auth()
      .createUser({
        uid: param.employeeId,
        email: param.mailAddress,
        emailVerified: false,
        phoneNumber: telNumber,
        password: param.password,
        displayName: param.employeeFirstname + param.employeeLastname,
        disabled: false,
      })
      .then((userRecord) => {
        return userRecord.uid;
      })
      .catch(function (err) {
        console.log(err);
        return err;
      });
  }
  /**
   * FirebaseのAuthenticationのユーザ情報を更新します。
   *
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async updateUserForFirebase(param) {
    return await admin
      .auth()
      .updateUser(param.employeeId, {
        email: param.mailAddress,
        emailVerified: false,
        phoneNumber: telNumber,
        password: param.password,
        displayName: param.employeeFirstname + param.employeeLastname,
        disabled: false,
      })
      .then((userRecord) => {
        return userRecord.uid;
      })
      .catch(function (err) {
        console.log(err);
        return err;
      });
  }
  /**
   * FirebaseのAuthenticationのユーザ情報を削除します。
   *
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async deleteUserForFirebase(param) {
    return await admin
      .auth()
      .updateUser(param.employeeId, {
        disabled: true,
      })
      .then(() => {
        return;
      })
      .catch(function (err) {
        console.log(err);
        return err;
      });
  }
}

module.exports = authentication;
