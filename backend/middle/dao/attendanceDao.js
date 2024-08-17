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
const dayjs = require("dayjs");

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
   * 指定された日時に対する勤怠情報一覧を取得します。
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
   * 年月日ごとに分かれているFirebase Firestoreのコレクションから一か月分のデータを取得します。
   * @param {string} contractorId 契約者番号です。
   * @param {Array<string>} employeeIds 従業員IDの配列です。
   * @param {Date} startDate 取得したいデータの開始日です。
   * @param {Date} endDate 取得したいデータの終了日です。
   * @returns {Promise<object>} 取得したデータを従業員IDごとにまとめたオブジェクトを含むPromiseオブジェクトです。
   */
  async fetchMonthlyData(
    contractorId,
    employeeAttendanceList,
    startDate,
    endDate
  ) {
    const db = admin.firestore();
    startDate = dayjs(startDate);
    endDate = dayjs(endDate);
    while (startDate <= endDate) {
      const formattedDate = dayjs(startDate).format("YYYY-MM-DD"); // YYYY-MM-DD形式に変換
      const collectionRef = db
        .collection("attendance")
        .doc(contractorId)
        .collection(formattedDate);
      try {
        // コレクションの存在を確認する
        const collectionSnapshot = await collectionRef.limit(1).get();

        if (!collectionSnapshot.empty) {
          // employeeIdsのいずれかの従業員IDに一致するドキュメントをクエリする
          for (const employee of employeeAttendanceList) {
            const docRef = collectionRef.doc(employee.employeeId);
            const doc = await docRef.get();

            if (doc.exists) {
              employee.attendanceList.push(doc.data());
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching data for ${formattedDate}: `, error);
      }
      // 次の日に進む
      startDate = dayjs(startDate).add(1, "day");
    }
    return employeeAttendanceList;
  }
}

module.exports = AttendanceDao;
