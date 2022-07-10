"use strict";

const Util = require("../public/util");
var util = new Util();
const constractor = require("../public/const");
var format = constractor.Format;
var type = constractor.Type;
var errorMessage = constractor.ErrorMessage;
var column = constractor.Colum;

/**
 * Logicクラスの共通パーツです。
 */
class CommonLogic {
  /**
   * 未入力をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} colum カラム名です。
   * @param {boolean} isRequire　必須かどうかです。
   *
   * @returns errorMessageList エラーメッセージリストです。
   */
  checkEmpty(value, colum, isRequire) {
    //未入力チェックです。
    if (util.isEmpty(value) && isRequire) {
      return util.stringFormat(errorMessage.IS_EMPTY, colum);
    }
    return "";
  }
  /**
   * 型をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} colum カラム名です。
   * @param {string} type 型です。
   */
  checkType(value, colum, type) {
    //TODO null,undefinedチェック
    //型チェックです。
    if (!util.isType(value, type)) {
      return util.stringFormat(errorMessage.IS_NOT_TYPE, colum, type);
    }
    return "";
  }
  /**
   * 入力形式をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} colum カラム名です。
   * @param {string} selectFormat 指定の入力形式です。
   */
  chehckFormat(value, colum, selectFormat) {
    var checkFlg = false;
    //入力形式チェックです。
    switch (selectFormat) {
      case format.HALF:
        checkFlg = util.isHalf(value);
      case format.HALF_WITH_CHAR:
        checkFlg = util.isHalfWidthChar(value);
      case format.HALF_WITH_NUMBER:
        checkFlg = util.isHalfWidthNumber(value);
      default:
        checkFlg = false;
    }
    if (checkFlg) {
      return util.stringFormat(errorMessage.IS_NOT_FORMAT, colum, selectFormat);
    }
    return "";
  }
  /**
   * 時間形式をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} colum カラム名です。
   */
  checkTimeFormat(value, colum) {
    //時間形式チェックです。
    if (!util.isTime(value)) {
      return util.stringFormat(errorMessage.IS_NOT_TIME_FORMAT, colum);
    }
    return "";
  }
  /**
   * 日付形式をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} colum カラム名です。
   */
  checkDateFormat(value, colum) {
    //日付形式チェック
    if (!util.isDate(value)) {
      return util.stringFormat(errorMessage.IS_NOT_DATE_FORMAT, colum);
    }
    return "";
  }
  /**
   * 最大文字数をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} colum カラム名です。
   * @param {integer} length 最大文字数です。
   */
  checkMaxLength(value, colum, length) {
    //最大文字数チェック
    if (value.length > length) {
      return util.stringFormat(errorMessage.IS_OVER_MAX_LENGTH, colum, length);
    }
    return "";
  }
  /**
   * 入力範囲をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} colum カラム名です。
   * @param {integer} minLength 最小文字数です。
   * @param {integer} maxLength 最大文字数です。
   */
  checkInputRange(value, colum, minLength, maxLength) {
    var checkFlg = false;
    //string型の場合
    if (typeof value == type.STRING) {
      //入力範囲チェックです。
      checkFlg = value.length < minLength || value.length > maxLength;
      //number型の場合
    } else if (typeof value == type.NUMBER) {
      //入力範囲チェックです。
      checkFlg = value < minLength || value > maxLength;
    }
    if (checkFlg) {
      return util.stringFormat(
        errorMessage.IS_NOT_INPUT_RANGE,
        colum,
        minLength + "～" + maxLength
      );
    }
    return "";
  }
  /**
   * 存在をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} response DBの情報です。
   * @param {string} colum カラム名です。
   */
  checkExists(value, response, colum) {
    var check = true;
    //工種IDのチェックです。
    if (column.WORK_TYPE_ID == colum) {
      check = response.find((res) => res.workTypeId == value);
    }
    //客先IDのチェックです。
    if (column.CLIENT_FIELD_ID == colum) {
      check = response.find((res) => res.clientFieldId == value);
    }
    //現場IDのチェックです。
    if (column.WORK_FIELD_ID == colum) {
      check = response.find((res) => res.workFieldId == value);
    }
    //協力会社IDのチェックです。
    if (column.SUB_COMPANY_ID == colum) {
      check = response.find((res) => res.subCompanyId == value);
    }
    //役職IDのチェックです。
    if (column.POST_ID == colum) {
      check = response.find((res) => res.postId == value);
    }
    if (!check) {
      return util.stringFormat(errorMessage.IS_NOT_EXISTS, colum);
    }
    return "";
  }
  /**
   * 重複をチェックします。
   *
   * @param {string} value 入力内容です。
   * @param {string} response DBの情報です。
   * @param {string} colum カラム名です。
   */
  checkDuplicate(value, response, colum) {
    var check = true;
    //ログインIDのチェックです。
    if (column.LOGIN_ID == colum) {
      check = response.find((res) => res.workTypeId == value);
    }
    if (check) {
      return util.stringFormat(errorMessage.IS_NOT_EXISTS, colum);
    }
    return "";
  }
}
module.exports = CommonLogic;
