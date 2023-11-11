"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const stubData = require("../../stub/data.json");

/**
 * stubデータ登録用のDaoクラスです。
 */
class StubDao {
  /**
   * json型のスタブデータを保存します。
   * @param {object} collectionName 追加したいコレクション名です。
   * @param {object} documentName 追加したいドキュメント名です。
   *
   *
   * @returns
   */
  async stubImport(collectionName, documentName, documentId) {
    const db = admin.firestore();
    const subCompanyRef = (() => {
      // TODO: 1コレクション内の複数データを1ファイルで登録できるように変更する
      // TODO: コレクションごとにスタブデータファイルを変更する
      switch (collectionName) {
        case "attendance":
          return db
            .collection(collectionName)
            .doc(documentName)
            .collection("2022-07-01")
            .doc()
            .set(stubData);

        case "contractRelation" || "contractor":
          return db.collection(collectionName).doc().set(stubData);

        case "employee":
          return db
            .collection(collectionName)
            .doc(documentName)
            .collection("data")
            .doc(documentId)
            .set(stubData);

        default:
          return db
            .collection(collectionName)
            .doc(documentName)
            .collection("data")
            .doc()
            .set(stubData);
      }
    })();

    const responce = await subCompanyRef
      .then(function (a) {
        console.log(a);
        var data = {
          checkResult: true,
          messageList: [collectionName + "のスタブデータを保存しました。"],
        };
        return data;
      })
      .catch(function (err) {
        console.log(err);
        return err;
      });
    console.log(responce);
    return responce;
  }
}

module.exports = StubDao;
