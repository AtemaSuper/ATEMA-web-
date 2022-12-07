"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 役職テーブルのDaoクラスです。
 */
class PostDao {
  /**
   * 役職情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectPostAll(contractorId) {
    const db = admin.firestore();
    const postRef = db
      .collection("post")
      .doc(contractorId)
      .collection("data")
      .where("deleteFlg", "==", false);

    const responce = await postRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.postId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 役職IDから役職情報を取得します。
   *
   * @param {string} postId 契約IDです。
   *
   * @returns
   */
  async selectPostInfoByPostId(contractorId, postId) {
    const db = admin.firestore();
    const postRef = db
      .collection("post")
      .doc(contractorId)
      .collection("data")
      .doc(postId);

    const responce = await postRef
      .get()
      .then(function (items) {
        return items.data();
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 役職情報を保存します。
   * @param {object} param 入力情報です。
   *
   * @returns
   */
  async savePost(param) {
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
    if (param.postId == "") {
      const postRef = db
        .collection("post")
        .doc(param.contractorId)
        .collection("data");
      const responce = await postRef
        .add({
          postName: param.postName,
          attendanceAuth: param.attendanceAuth,
          ownWokerManageAuth: param.ownWokerManageAuth,
          subCompanyManageAuth: param.subCompanyManageAuth,
          ownCompanyManageAuth: param.ownCompanyManageAuth,
          payPlanAuth: param.payPlanAuth,
          createDate: updateDate,
          createUserId: param.userId,
          updateDate: updateDate,
          updateUserId: param.userId,
          deleteFlg: false,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["役職情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
      //更新の場合
    } else {
      const postRef = db
        .collection("employee")
        .doc(param.contractorId)
        .collection("data")
        .doc(param.postId);
      const responce = await postRef
        .update({
          postName: param.postName,
          attendanceAuth: param.attendanceAuth,
          ownWokerManageAuth: param.ownWokerManageAuth,
          subCompanyManageAuth: param.subCompanyManageAuth,
          ownCompanyManageAuth: param.ownCompanyManageAuth,
          payPlanAuth: param.payPlanAuth,
          updateDate: updateDate,
          updateUserId: param.userId,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["役職情報を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
    }
  }
  /**
   * 役職情報を削除します。
   * @param {object} param 削除情報です。
   *
   * @returns
   */
  async deletePost(param) {
    const db = admin.firestore();
    const postRef = db
      .collection("post")
      .doc(param.contractorId)
      .collection("data")
      .doc(param.postId);
    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    const responce = await postRef
      .update({
        updateDate: updateDate,
        updateUserId: param.userId,
        deleteFlg: true,
      })
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["役職情報を削除しました。"],
        };
        return data;
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
}

module.exports = PostDao;
