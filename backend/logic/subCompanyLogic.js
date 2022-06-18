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
 * 協力会社編集のLogicクラスです。
 */
class SUbCompanyLogic {
  /**
   * 協力会社編集の入力情報をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //協力会社IDチェック
      checkSubCompanyId(errorMessageList, param.subCompanyId);
      //協力会社名チェック
      checkSubCompanyName(errorMessageList, param.subCompanyName);
      //設立チェック
      checkFoundation(errorMessageList, param.foundation);
      //代表者名チェック
      checkLeaderName(errorMessageList, param.leaderName);
      //郵便番号前3桁チェック
      checkPostNumber1(errorMessageList, param.postNumber1);
      //郵便番号後4桁チェック
      checkPostNumber2(errorMessageList, param.postNumber2);
      //住所チェック
      checkAddress(errorMessageList, param.address);
      //電話番号1チェック
      checkTelNumber1(errorMessageList, param.telNumber1);
      //電話番号2チェック
      checkTelNumber2(errorMessageList, param.telNumber2);
      //電話番号3チェック
      checkTelNumber3(errorMessageList, param.telNumber3);
      //工種チェック
      checkSelectWorkTypeList(errorMessageList, param.selectWorkTypeList);
      //備考チェック
      // checkNoteContents(errorMessageList, param.noteContents);

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
     * 協力会社IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkSubCompanyId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.SUB_COMPANY_ID,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.SUB_COMPANY_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.SUB_COMPANY_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 協力会社名をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkSubCompanyName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.SUB_COMPANY_NAME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.SUB_COMPANY_NAME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.SUB_COMPANY_NAME,
        100
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 設立をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkFoundation(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.FOUNDATION, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.FOUNDATION,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //日付チェックです。
      var errorMessage3 = commonLogic.checkDateFormat(value, colum.FOUNDATION);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 代表者名をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkLeaderName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.LEADER_NAME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.LEADER_NAME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.LEADER_NAME,
        100
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 郵便番号1をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkPostNumber1(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.POST_NUMBER1,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.POST_NUMBER1,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.POST_NUMBER1,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(
        value,
        colum.POST_NUMBER1,
        3
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 郵便番号2をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkPostNumber2(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.POST_NUMBER1,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.POST_NUMBER2,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.POST_NUMBER2,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(
        value,
        colum.POST_NUMBER2,
        4
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
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
     * 工種をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkSelectWorkTypeList(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.WORK_TYPE, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.WORK_TYPE,
        type.OBJECT
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(value, colum.WORK_TYPE, 5);
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
    return util.stringFormat(successMessage.SAVE_INPPUT, "協力会社情報");
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

module.exports = SUbCompanyLogic;
