"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * 契約テーブルのDaoクラスです。
 */
class ContactDao {
  /**
   * 契約IDをもとに自社情報を取得します。
   *
   * @param {string} contractorId 契約IDです。
   *
   * @returns
   */
  async selectContactAll(contractorId) {
    const db = admin.firestore();
    const contractorRef = db.collection("contractor").doc(contractorId);

    const responce = await contractorRef
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
   * 入力情報をもとに自社情報を保存します。
   *
   * @param {object} param
   * @returns
   */
  async updateContact(param) {
    const db = admin.firestore();
    const contractorRef = db.collection("contractor").doc(param.contractorId);

    //日付を取得します。
    var date = new Date();
    var updateDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();

    //基本情報で入力した内容を保存します。
    if (param.pageContents == 1) {
      const responce = await contractorRef
        .update({
          contractorName: param.contractorName,
          foundation: param.foundation,
          leaderName: param.leaderName,
          postNumber1: param.postNumber1,
          postNumber2: param.postNumber2,
          address: param.address,
          telNumber1: param.telNumber1,
          telNumber2: param.telNumber2,
          telNumber3: param.telNumber3,
          workTypeIdList: param.workTypeIdList,
          updateDate: updateDate,
          updateUserId: param.userId,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["自社設定(基本情報)を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
      //勤怠情報で入力した内容を保存します。
    } else {
      const responce = await contractorRef
        .update({
          normalWorkStartTime: param.normalWorkStartTime,
          normalWorkFinishTime: param.normalWorkFinishTime,
          exceptionWorkStartTime: param.exceptionWorkStartTime,
          exceptionWorkFinishTime: param.exceptionWorkFinishTime,
          tardyTime: param.tardyTime,
          roundingTime: param.roundingTime,
          selectRoundingTime: param.selectRoundingTime,
          updownSelect: param.updownSelect,
          updateDate: updateDate,
          updateUserId: param.userId,
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["自社設定(勤怠情報)を保存しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
    }
  }
}

module.exports = ContactDao;
