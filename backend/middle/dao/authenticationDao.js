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
   * @param {boolean} isNew 新規か編集かどうかです。
   *
   * @returns
   */
  async updateUserForFirebase(param, isNew) {
    return new Promise(function (resolve, reject) {
      if (isNew) {
        return admin
          .auth()
          .createUser({
            uid: param.employeeId,
            email: param.mailAddress,
            emailVerified: false,
            password: param.password,
            disabled: false,
          })
          .then((userRecord) => {
            resolve(userRecord.uid);
          })
          .catch(function (err) {
            reject(err);
          });
      } else {
        return admin
          .auth()
          .updateUser(param.employeeId, {
            email: param.mailAddress,
            emailVerified: false,
            password: param.password,
            disabled: false,
          })
          .then((userRecord) => {
            resolve(userRecord.uid);
          })
          .catch(function (err) {
            reject(err);
          });
      }
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
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  }
}

module.exports = authentication;
