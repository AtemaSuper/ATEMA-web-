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
}

module.exports = AttendanceDao;
