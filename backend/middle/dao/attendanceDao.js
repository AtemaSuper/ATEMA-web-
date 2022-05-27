"use strict";

var NCMB = require("ncmb");
const { ContentsConflictError } = require("ncmb/lib/errors");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

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
  async fetchAll() {
    var Item = ncmb.DataStore("attendanceTable");
    const response = await Item.fetchAll()
      .then(function (results) {
        return results;
      })
      .catch(function (err) {
        return err;
      });
    return response;
  }
  /**
   * 指定された日時範囲に対する勤怠情報一覧を取得します。
   *
   * @param {Array} specifiedDateRangeOfStart 開始日時の範囲
   * @param {Array} specifiedDateRangeOfEnd 終了日時の範囲
   * @returns
   */
  async find(specifiedDateRangeOfStart, specifiedDateRangeOfEnd) {
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
      .fetchAll()
      .then(function (results) {
        return results;
      })
      .catch(function (err) {
        return err;
      });
    return response;
  }
  /**
   * 指定された条件に対してレコードを更新します。(カラム指定一つまで)
   *
   * @param {string} objectId 更新したいobjectId
   * @param {string} clumn 更新したいclumn
   * @param {any} items 更新したいアイテム（テーブル定義に基づいた型指定）
   * @returns
   */
  async singleUpdate(objectId, clumn, items) {
    var Item = ncmb.DataStore("attendanceTable");
    const response = await Item.equalTo("objectId", objectId)
      .equalTo("deleteFlg", false)
      .fetch()
      .then(function (results) {
        results.set(clumn, items);
        return results.update();
      })
      .then(function (results) {
        var data = {
          checkResult: true,
          messageList: ["勤怠情報を更新しました。"],
        };
        return results;
      })
      .catch(function (err) {
        return err;
      });
    return response;
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
