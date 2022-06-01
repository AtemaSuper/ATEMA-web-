"use strict";
const Util = require("../public/util");
var util = new Util();

/**
 * Logicクラスの共通パーツです。
 */
class CommonLogic {
  /**
   * 入力した会社名をチェックします。
   *
   * @param {object} errorMessageList エラーメッセージリストです。
   * @param {string} value 入力内容です。
   * @param {boolean} isRequire　必須かどうかです。
   */
  checkOwnCompanyName(errorMessageList, value, isRequire) {
    //未入力チェックです。
    if (util.isEmpty(value) && isRequire) {
      errorMessageList.push(util.stringFormat(ErrorMessage.IS_EMPTY, "会社名"));
    }
  }
}
module.exports = CommonLogic;
