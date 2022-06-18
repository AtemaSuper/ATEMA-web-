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
 * 客先編集のLogicクラスです。
 */
class ClientFieldLogic {
  /**
   * 客先編集の入力情報をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //客先IDチェック
      checkClientFieldId(errorMessageList, param.clientFieldId);
      //客先名チェック
      checkClientFieldName(errorMessageList, param.clientFieldName);
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
     * 客先名をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkClientFieldName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.CLIENT_FIELD_NAME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.CLIENT_FIELD_NAME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.CLIENT_FIELD_NAME,
        100
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
    return util.stringFormat(successMessage.SAVE_INPPUT, "客先情報");
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

module.exports = ClientFieldLogic;
