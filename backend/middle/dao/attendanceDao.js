"use strict";

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
  (Number(date.getMonth()) + 1) +
  "-" +
  date.getDate();

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

    // var Item = ncmb.DataStore("attendanceTable");
    // const response = await Item.greaterThanOrEqualTo("start", {
    //   __type: "Date",
    //   iso: specifiedDateRangeOfStart[0],
    // })
    //   .lessThanOrEqualTo("start", {
    //     __type: "Date",
    //     iso: specifiedDateRangeOfStart[1],
    //   })
    //   .greaterThanOrEqualTo("end", {
    //     __type: "Date",
    //     iso: specifiedDateRangeOfEnd[0],
    //   })
    //   .lessThanOrEqualTo("end", {
    //     __type: "Date",
    //     iso: specifiedDateRangeOfEnd[1],
    //   })
    //   .fetchAll()
    //   .then(function (results) {
    //     return results;
    //   })
    //   .catch(function (err) {
    //     return err;
    //   });
    // return response;
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
   * 勤怠情報を登録します
   * @param {string} userObjectId ユーザー情報です。
   * @param {object} attendanceData 勤怠情報です。
   * @param {Array} specifiedDateRangeOfStart 開始日時の範囲
   * @param {Array} specifiedDateRangeOfEnd 終了日時の範囲
   *
   * postDataImage
   *
   * {
   *    "userObjectId",
   *      {
   *        attendanceStatus:0,
   *        workTimeClumn:"start",
   *        workTime:{
   *                    type:date,
   *                    iso:2022-02-26T15:00:00.000Z}
   *                  }
   *      }
   *     "workFieldDetailId",
   *     "noteContents"
   * }
   * }
   *
   *
   * @returns
   */
  async registerAttendance(
    userObjectId,
    attendanceData,
    specifiedDateRangeOfStart,
    specifiedDateRangeOfEnd
  ) {
    var Item = ncmb.DataStore("attendanceTable");
    const response = await Item.greaterThanOrEqualTo("start", {
      __type: "Date",
      iso: specifiedDateRangeOfStart[0],
    })
      .lessThanOrEqualTo("start", {
        __type: "Date",
        iso: specifiedDateRangeOfStart[1],
      })
      .greaterThanOrEqualTo("end", {
        __type: "Date",
        iso: specifiedDateRangeOfEnd[0],
      })
      .lessThanOrEqualTo("end", {
        __type: "Date",
        iso: specifiedDateRangeOfEnd[1],
      })
      .notEqualTo("employeeId", userObjectId)
      .fetchAll()
      .then(function (results) {
        // TODO:新規登録手段の記述
        console.log(
          userObjectId,
          attendanceData,
          specifiedDateRangeOfStart,
          specifiedDateRangeOfEnd
        );
      })
      .catch(function () {
        //　update処理を別途呼び出し(userObjectより一致レコードを検索するところから)
        results.set("status", attendanceData.attendanceStatus);
        results.set(attendanceData.workTimeClumn, attendanceData.workTime);
        results.set("workFieldDetailId", attendanceData.workFieldDetailId);
        results.set("noteContents", attendanceData.noteContents);
        return results.update();
      });
    return response;
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
}

module.exports = AttendanceDao;
