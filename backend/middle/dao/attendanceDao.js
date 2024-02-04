"use strict";
// const firebase = require("../firebase.js");
const admin = require("firebase-admin");
const Util = require("../../public/util");
var util = new Util();
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
//本日の日時を取得
//TODO ここで取得していいのか検討
var date = new Date();
var todayDate =
  date.getFullYear() +
  "-" +
  ("0" + (Number(date.getMonth()) + 1)).slice(-2) +
  "-" +
  ("0" + date.getDate()).slice(-2);

/**
 * 出退勤テーブルのDaoクラスです。
 */
class AttendanceDao {
  /**
   * 勤怠情報一覧を取得します。
   *
   * @param
   *
   * @returns
   */
  async fetchAll(contractorId) {
    const db = admin.firestore();
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(todayDate)
      .where("deleteFlg", "==", false);

    const responce = await attendanceRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.employeeId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 指定された日時範囲に対する勤怠情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   * @param {Array} specifiedDateRangeOfStart 開始日時の範囲
   * @param {Array} specifiedDateRangeOfEnd 終了日時の範囲
   * @returns
   */
  async find(contractorId, specifiedDateRangeOfStart, specifiedDateRangeOfEnd) {
    const db = admin.firestore();
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(todayDate)
      .where("deleteFlg", "==", false);

    const responce = await attendanceRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.employeeId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 指定された条件に対してレコードを更新します。(カラム指定一つまで)
   *
   * @param {string} contractorId 更新したいcontractorId
   * @param {string} employeeId 更新したいemployeeId
   * @param {string} clumn 更新したいclumn
   * @param {any} items 更新したいアイテム（テーブル定義に基づいた型指定）
   * @returns
   */
  async singleUpdate(contractorId, employeeId, clumn, items) {
    const db = admin.firestore();

    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(todayDate)
      .doc(employeeId);
    var updateKey = clumn;
    var updateItem = { [updateKey]: items };
    const responce = await attendanceRef
      .update(updateItem)
      .then(function () {
        var data = {
          checkResult: true,
          messageList: ["勤怠情報を更新しました。"],
        };
        return data;
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }

  /**
   * 指定された日時範囲に対する勤怠情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   * @param {string} employeeId 社員IDです。
   * @returns
   */
  async findToToday(contractorId, employeeId) {
    const db = admin.firestore();
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(todayDate)
      .doc(employeeId);

    const responce = await attendanceRef
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
   * 指定された日時範囲に対するすべての勤怠情報一覧を取得します。
   *
   * @param {string} contractorId 契約IDです。
   * @param {string} employeeId 社員IDです。
   * @returns
   */
  async findAllToToday(contractorId) {
    const db = admin.firestore();
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(todayDate)
      .where("deleteFlg", "==", false);

    const responce = await attendanceRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.employeeId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
  /**
   * 指定された条件に対してレコードを更新します。
   * @param {string} contractorId 会社IDです。
   * @param {string} employeeId 社員IDです。
   * @param {object} updateItem 入力情報です。
   *
   * @returns
   */
  async saveAttendance(contractorId, employeeId, updateItem) {
    const db = admin.firestore();
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(todayDate)
      .doc(employeeId);
    //新規の場合
    if (!util.isEmpty(updateItem.createDate)) {
      const responce = await attendanceRef
        .set(updateItem)
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["勤怠情報を更新しました。"],
          };
          return data;
        })
        .catch(function (err) {
          return err;
        });
      return responce;
      //更新の場合
    } else {
      const responce = await attendanceRef
        .update(updateItem)
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ["勤怠情報を更新しました。"],
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
   * 指定された社員ID+日時に対するすべての勤怠情報一覧を取得します。
   *
   * @param {string} date 日付です。
   * @param {string} contractorId 契約IDです。
   * @param {string} employeeIdList 社員IDのリストです。
   *
   * @returns {Array} 会社員ごとの出退勤情報です。
   */
  async getAttendanceByEmployeeIdList(date, contractorId, employeeIdList) {
    const db = admin.firestore();
    console.log(employeeIdList);
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(date)
      .where(admin.firestore.FieldPath.documentId(), "in", employeeIdList)
      .where("deleteFlg", "==", false);

    const responce = await attendanceRef
      .get()
      .then(function (items) {
        return items.docs.map((doc) => {
          var data = doc.data();
          data.employeeId = doc.id;
          return data;
        });
      })
      .catch(function (err) {
        return err;
      });
    return responce;
  }
}

module.exports = AttendanceDao;
