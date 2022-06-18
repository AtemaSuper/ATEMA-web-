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
 * 社員編集のLogicクラスです。
 */
class OwnWorkerAllLogic {
  /**
   * 社員編集の入力情報をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      var data = {};
      //社員IDチェック
      checkEmployeeId(errorMessageList, param.employeeId);
      //契約IDチェック
      checkContractorId(errorMessageList, param.contractorId);
      //ログインIDチェック
      checkLoginId(errorMessageList, param.loginId);
      //パスワードチェック
      checkPassword(errorMessageList, param.password);
      //社員名(姓)チェック
      checkEmployeeFirstName(errorMessageList, param.employeeFirstName);
      //社員名(名)チェック
      checkEmployeeLastName(errorMessageList, param.employeeLastName);
      //会社IDチェック
      checkCompanyId(errorMessageList, param.companyId);
      //役職IDチェック
      checkPostId(errorMessageList, param.postId);
      //出退勤IDチェック
      checkAttendanceId(errorMessageList, param.attendanceId);
      //スタッフコードチェック
      checkStaffCode(errorMessageList, param.staffCode);
      //誕生日チェック
      checkBirthday(errorMessageList, param.birthday);
      //住所チェック
      checkAddress(errorMessageList, param.address);
      //電話番号1チェック
      checkTelNumber1(errorMessageList, param.telNumber1);
      //電話番号2チェック
      checkTelNumber2(errorMessageList, param.telNumber2);
      //電話番号3チェック
      checkTelNumber3(errorMessageList, param.telNumber3);
      //入社日チェック
      checkEntryFirstDate(errorMessageList, param.entryFirstDate);
      //退社日チェック
      checkEntryEndDate(errorMessageList, param.entryEndDate);
      //雇用形態チェック
      checkEmployment(errorMessageList, param.employment);
      //取得資格チェック
      checkLicenseName(errorMessageList, param.licenseName);
      //資格取得日チェック
      checkLicenseGetDate(errorMessageList, param.licenseGetDate);
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
     * 契約IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkContractorId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.CONTRACTOR_ID,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.CONTRACTOR_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.CONTRACTOR_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * ログインIDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkLoginId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.LOGIN_ID, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.LOGIN_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.LOGIN_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(value, colum.LOGIN_ID, 50);
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * パスワードをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkPassword(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.PASSWORD, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.PASSWORD,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.PASSWORD,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(value, colum.PASSWORD, 50);
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 社員名（姓）をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkEmployeeFirstName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.EMPLOYEE_FIRST_NAME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.EMPLOYEE_FIRST_NAME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.EMPLOYEE_FIRST_NAME,
        50
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 社員名（名）をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkEmployeeLastName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.EMPLOYEE_LAST_NAME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.EMPLOYEE_LAST_NAME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.EMPLOYEE_LAST_NAME,
        50
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 会社IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkCompanyId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.COMPANY_ID, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.COMPANY_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.COMPANY_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 役職IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkPostId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.POST_ID, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.POST_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.POST_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

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
     * スタッフコードをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkStaffCode(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.STAFF_CODE, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.STAFF_CODE,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.STAFF_CODE,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(
        value,
        colum.STAFF_CODE,
        8
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 誕生日をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkBirthday(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.BIRTHDAY, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.BIRTHDAY,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //日付チェックです。
      var errorMessage3 = commonLogic.checkDateFormat(value, colum.BIRTHDAY);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 住所をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkAddress(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.ADDRESS, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.ADDRESS,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(value, colum.ADDRESS, 100);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 電話番号1をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkTelNumber1(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.TEL_NUMBER1,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.TEL_NUMBER1,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.TEL_NUMBER1,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(
        value,
        colum.TEL_NUMBER1,
        4
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 電話番号2をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkTelNumber2(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.TEL_NUMBER2,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.TEL_NUMBER2,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.TEL_NUMBER2,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(
        value,
        colum.TEL_NUMBER2,
        4
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 電話番号3をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkTelNumber3(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.TEL_NUMBER3,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.TEL_NUMBER3,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.TEL_NUMBER3,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(
        value,
        colum.TEL_NUMBER3,
        4
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 入社日をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkEntryFirstDate(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.ENTRY_FIRST_DATE,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.ENTRY_FIRST_DATE,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //日付チェックです。
      var errorMessage3 = commonLogic.checkDateFormat(
        value,
        colum.ENTRY_FIRST_DATE
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 退社日をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkEntryEndDate(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.ENTRY_END_DATE,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.ENTRY_END_DATE,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //日付チェックです。
      var errorMessage3 = commonLogic.checkDateFormat(
        value,
        colum.ENTRY_END_DATE
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 雇用形態をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkEmployment(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.EMPLOYMENT, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.EMPLOYMENT,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.EMPLOYMENT,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.EMPLOYMENT,
        0,
        3
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 取得資格名をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkLicenseName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.LICENSE_NAME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.LICENSE_NAME,
        type.OBJECT
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.LICENSE_NAME,
        5
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 資格取得日をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkLicenseGetDate(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.LICENSE_GET_DATE,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.LICENSE_GET_DATE,
        type.OBJECT
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.LICENSE_GET_DATE,
        5
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
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
    return util.stringFormat(successMessage.SAVE_INPPUT, "社員情報");
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

module.exports = OwnWorkerAllLogic;
