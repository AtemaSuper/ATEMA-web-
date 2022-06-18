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
 * 工事編集のLogicクラスです。
 */
class WorkFieldLogic {
  /**
   * 工事編集の入力情報をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //現場詳細IDチェック
      checkWorkFieldDetailId(errorMessageList, param.workFieldDetailId);
      //jobNoチェック
      checkJobNo(errorMessageList, param.jobNo);
      //現場名チェック
      checkWorkFieldDetailName(errorMessageList, param.workFieldDetailName);
      //客先IDチェック
      checkClientFieldId(errorMessageList, param.clientFieldId);
      //現場IDチェック
      checkWorkFieldId(errorMessageList, param.workFieldId);
      //ステータスチェック
      checkStatus(errorMessageList, param.status);
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
     * jobNoをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkJobNo(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.JOB_NO, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.JOB_NO,
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
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //最大文字数チェックです。
      var errorMessage4 = commonLogic.checkMaxLength(value, colum.WORK_TYPE, 7);
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 現場名をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkWorkFieldDetailName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.WORK_FIELD_DETAIL_NAME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.WORK_FIELD_DETAIL_NAME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.WORK_FIELD_DETAIL_NAME,
        100
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 客先IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkClientFieldId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.CLIENT_FIELD_ID,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.CLIENT_FIELD_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.CLIENT_FIELD_ID,
        format.HALF
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 現場IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkWorkFieldId(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.WORK_FIELD_ID,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.WORK_FIELD_ID,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角文字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.WORK_FIELD_ID,
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
  }

  /**
   * サクセスメッセージを作成します。
   *
   * @param {string} pageContents
   * @returns {string} サクセスメッセージです。
   */
  createSuccessMessage(pageContents) {
    return util.stringFormat(successMessage.SAVE_INPPUT, "工事情報");
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

module.exports = WorkFieldLogic;
