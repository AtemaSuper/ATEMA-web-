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
   * ログインIDをもとに従業員を取得します。
   *
   * @param {string} loginId
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

  async update(objectId, clumns, items) {
    var Item = ncmb.DataStore("attendanceTable");
    const response = await Item.equalTo("objectId", objectId)
      .equalTo("deleteFlg", false)
      .fetch()
      .then(function (results) {
        results.set(clumns, items);
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
}

module.exports = AttendanceDao;
