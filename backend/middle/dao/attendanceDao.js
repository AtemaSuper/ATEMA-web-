"use strict";

const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

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
    //日付を取得します。
    var date = new Date();
    var todayDate =
      date.getFullYear() +
      "-" +
      (Number(date.getMonth()) + 1) +
      "-" +
      date.getDate();
    var test = "2022-07-01";

    const db = admin.firestore();
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(test)
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
    //TODO 日付範囲で検索
    var test = "2022-07-01";
    const db = admin.firestore();
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(test)
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
    //TODO 日付範囲で検索
    var test = "2022-07-01";
    // //日付を取得します。
    // var date = new Date();
    // var updateDate =
    //   date.getFullYear() +
    //   "-" +
    //   (Number(date.getMonth()) + 1) +
    //   "-" +
    //   date.getDate();

    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(test)
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
        res.status(500).json(err);
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
    //TODO 日付範囲で検索
    var test = "2022-07-01";
    const db = admin.firestore();
    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(test)
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
   * 指定された条件に対してレコードを更新します。
   *
   * @param {string} contractorId 会社IDです。
   * @param {string} employeeId 社員IDです。
   * @param {string} updateItem 保存する情報です。
   * @returns
   */
  async saveAttendance(contractorId, employeeId, updateItem) {
    const db = admin.firestore();
    //TODO 日付範囲で検索
    var test = "2022-07-01";

    const attendanceRef = db
      .collection("attendance")
      .doc(contractorId)
      .collection(test)
      .doc(employeeId);
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
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = AttendanceDao;
