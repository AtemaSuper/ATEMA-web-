"use strict";
//共通Logic
const CommonLogic = require("../logic/commonLogic");
var commonLogic = new CommonLogic();
const Util = require("../public/util");
var util = new Util();
const constractor = require("../public/const");
var successMessage = constractor.SuccessMessage;
var colum = constractor.Colum;
var type = constractor.Type;
var format = constractor.Format;

/**
 * 出退勤のLogicクラスです。
 */
class AttendanceManageLogic {
  /**
   * 出退勤の入力情報をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //出退勤IDチェック
      checkAttendanceId(errorMessageList, param.attendanceId);
      //社員IDチェック
      checkEmployeeId(errorMessageList, param.employeeId);
      //ステータスチェック
      checkStatus(errorMessageList, param.status);
      //現場詳細IDチェック
      checkWorkFieldDetailId(errorMessageList, param.workFieldDetailId);
      //年月日チェック
      checkDayOfYear(errorMessageList, param.dayOfYear);
      //出勤開始時間チェック
      checkStart(errorMessageList, param.start);
      //休憩開始時間チェック
      checkRestStart(errorMessageList, param.restStart);
      //出勤終了時間チェック
      checkEnd(errorMessageList, param.end);
      //休憩終了時間チェック
      checkRestEnd(errorMessageList, param.restEnd);
      //備考チェック
      // checkNoteContents(errorMessageList, param.noteContents);
      //契約形態チェック
      checkContactStatus(errorMessageList, param.contactStatrus);
      var data = {};
      //エラーがある場合
      if (errorMessageList.length !== 0) {
        data = {
          checkResult: false,
          messageList: errorMessageList,
        };
        reject(data);
      }
      resolve();
    });

    /**
     * 出退勤IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkAttendanceId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.ATTENDANCE_ID,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.ATTENDANCE_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.ATTENDANCE_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 社員IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkEmployeeId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.EMPLOYEE_ID,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.EMPLOYEE_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.EMPLOYEE_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }
    /**
     * ステータスをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkStatus(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.STATUS, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.STATUS,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.STATUS,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.STATUS,
        0,
        3
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }
    /**
     * 現場詳細IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkWorkFieldDetailId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.WORK_FIELD_DETAIL_ID,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.WORK_FIELD_DETAIL_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.WORK_FIELD_DETAIL_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 年月日をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkDayOfYear(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.DAY_OF_YEAR,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.DAY_OF_YEAR,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkDateFormat(value, colum.DAY_OF_YEAR);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 出勤時間をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkStart(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.START, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.START,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(value, colum.START);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 休憩開始時間をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkRestStart(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.REST_START, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.REST_START,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(value, colum.REST_START);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 退勤時間をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkEnd(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.END, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(value, colum.END, type.STRING);
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(value, colum.END);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 休憩終了時間をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkRestEnd(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.REST_END, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.REST_END,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(value, colum.REST_END);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }
    /**
     * 契約形態をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkContactStatus(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.CONTACT_STATUS,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.CONTACT_STATUS,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.CONTACT_STATUS,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.CONTACT_STATUS,
        0,
        1
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }
  }

  /**
   * サクセスメッセージを作成します。
   *
   * @returns {string} サクセスメッセージです。
   */
  createSuccessMessage() {
    return util.stringFormat(successMessage.SAVE_INPPUT, "出退勤情報");
  }

  /**
   * システムエラーメッセージを作成します。
   *
   * @returns {string} システムエラーメッセージです。
   */
  createSytemErrorMessage() {
    return util.stringFormat(successMessage.SYSTEM_ERROR);
  }
}

module.exports = AttendanceManageLogic;
