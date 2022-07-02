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
 * 自社設定のLogicクラスです。
 */
class OwnCompanyLogic {
  /**
   * 自社設定の入力情報をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //基本情報の入力チェックを行います。
      if (param.pageContents == 1) {
        //会社名チェック
        checkContractorName(errorMessageList, param.contractorName);
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
        checkWorkTypeIdList(errorMessageList, param.workTypeIdList);
        //勤怠情報の入力チェックを行います。
      } else {
        //通常業務時間(開始)チェック
        checkNormalWorkStartTime(errorMessageList, param.normalWorkStartTime);
        //通常業務時間(終了)チェック
        checkNormalWorkFinishTime(errorMessageList, param.normalWorkFinishTime);
        //時間外業務時間(開始)チェック
        checkExceptionWorkStartTime(
          errorMessageList,
          param.exceptionWorkStartTime
        );
        //時間外業務時間(終了)チェック
        checkExceptionWorkFinishTime(
          errorMessageList,
          param.exceptionWorkFinishTime
        );
        //遅刻の発生チェック
        checkTardyTime(errorMessageList, param.tardyTime);
        //丸めチェック
        checkRoundingTime(errorMessageList, param.roundingTime);
        //丸め(指定)チェック
        checkSelectRoundingTime(
          errorMessageList,
          param.selectRoundingTime,
          param.roundingTime === "2"
        );
        //切り捨て・切り上げチェック
        checkUpdownSelect(errorMessageList, param.updownSelect);
      }
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
     * 会社名をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkContractorName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.COMPANY_NAME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.COMPANY_NAME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.COMPANY_NAME,
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
    function checkWorkTypeIdList(errorMessageList, value) {
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

    /**
     * 通常業務時間(開始)をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkNormalWorkStartTime(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.NORMAL_WORK_START_TIME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.NORMAL_WORK_START_TIME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(
        value,
        colum.NORMAL_WORK_START_TIME
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 通常業務時間(終了)をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkNormalWorkFinishTime(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.NORMAL_WORK_FINISH_TIME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.NORMAL_WORK_FINISH_TIME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(
        value,
        colum.NORMAL_WORK_FINISH_TIME
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 時間外業務時間(開始)をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkExceptionWorkStartTime(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.EXCEPTION_WORK_START_TIME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.EXCEPTION_WORK_START_TIME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(
        value,
        colum.EXCEPTION_WORK_START_TIME
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 時間外業務時間(終了)をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkExceptionWorkFinishTime(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.EXCEPTION_WORK_FINISH_TIME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.EXCEPTION_WORK_FINISH_TIME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(
        value,
        colum.EXCEPTION_WORK_FINISH_TIME
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 遅刻の発生をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkTardyTime(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.TARDY_TIME, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.TARDY_TIME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.TARDY_TIME,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.TARDY_TIME,
        0,
        1
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 丸めをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkRoundingTime(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.ROUNDING_TIME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.ROUNDING_TIME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.ROUNDING_TIME,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.ROUNDING_TIME,
        0,
        2
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 丸め(指定)をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkSelectRoundingTime(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.SELECT_ROUNDING_TIME,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.SELECT_ROUNDING_TIME,
        type.NUMBER
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //入力範囲チェックです。
      var errorMessage3 = commonLogic.checkInputRange(
        value,
        colum.SELECT_ROUNDING_TIME,
        1,
        60
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 切り捨て・切り上げをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkUpdownSelect(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.UP_DOWN_SELECT,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.UP_DOWN_SELECT,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.UP_DOWN_SELECT,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.UP_DOWN_SELECT,
        0,
        2
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    // /**
    //  * 作成者IDをチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkCreateUserId(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.CREATE_USER_ID,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.CREATE_USER_ID,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //半角数字チェックです。
    //   var errorMessage3 = commonLogic.chehckFormat(
    //     value,
    //     colum.CREATE_USER_ID,
    //     format.HALF
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    //   //最大文字数チェックです。
    //   var errorMessage4 = commonLogic.checkMaxLength(
    //     value,
    //     colum.CREATE_USER_ID,
    //     3
    //   );
    //   if (!util.isEmpty(errorMessage4)) {
    //     errorMessageList.push(errorMessage4);
    //     return;
    //   }
    // }
    // /**
    //  * 作成日をチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkCreateDate(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.CREATE_DATE,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.CREATE_DATE,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //時間形式チェックです。
    //   var errorMessage3 = commonLogic.checkTimeFormat(value, colum.CREATE_DATE);
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

    // /**
    //  * 更新者IDをチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkUpdateUserId(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.UPDATE_USER_ID,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.UPDATE_USER_ID,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //半角数字チェックです。
    //   var errorMessage3 = commonLogic.chehckFormat(
    //     value,
    //     colum.UPDATE_USER_ID,
    //     format.HALF
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    //   //最大文字数チェックです。
    //   var errorMessage4 = commonLogic.checkMaxLength(
    //     value,
    //     colum.UPDATE_USER_ID,
    //     3
    //   );
    //   if (!util.isEmpty(errorMessage4)) {
    //     errorMessageList.push(errorMessage4);
    //     return;
    //   }
    // }

    // /**
    //  * 更新日をチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkUpdateDate(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.UPDATE_DATE,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.UPDATE_DATE,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //時間形式チェックです。
    //   var errorMessage3 = commonLogic.checkTimeFormat(value, colum.UPDATE_DATE);
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

    // /**
    //  * 削除フラグをチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkDeleteFlg(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(value, colum.DELETE_FLG, true);
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.DELETE_FLG,
    //     type.BOOLEAN
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    // }
  }
  /**
   * 自社設定の入力値の存在チェックします。
   *
   * @param {string} param 画面パラメータです。
   * @param {string} workTypeResponse 工種情報です。
   *
   * @returns
   */
  checkExistsData(param, workTypeResponse) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      console.log(param);
      //基本情報の入力値の存在チェックを行います。
      if (param.pageContents == 1) {
        //工種チェック
        checkWorkTypeIdList(
          errorMessageList,
          param.workTypeIdList,
          workTypeResponse
        );
      }
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
     * 工種をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} workTypeResponse 工種情報です。
     */
    function checkWorkTypeIdList(errorMessageList, value, workTypeResponse) {
      for (var i = 0; i < value.length; i++) {
        var errorMessage1 = commonLogic.checkExists(
          value[i],
          workTypeResponse,
          colum.WORK_TYPE_ID
        );
        if (!util.isEmpty(errorMessage1)) {
          errorMessageList.push(errorMessage1);
          return;
        }
      }
      return errorMessageList;
    }
  }

  /**
   * サクセスメッセージを作成します。
   *
   * @param {string} pageContents
   * @returns {string} サクセスメッセージです。
   */
  createSuccessMessage(pageContents) {
    if (pageContents === 1) {
      return util.stringFormat(
        successMessage.SAVE_INPPUT,
        "自社設定(基本情報)"
      );
    } else {
      return util.stringFormat(
        successMessage.SAVE_INPPUT,
        "自社設定(勤怠情報)"
      );
    }
  }

  /**
   * システムエラーメッセージを作成します。
   *
   * @returns {string} システムエラーメッセージです。
   */
  createSytemErrorMessage() {
    return errorMessage.SYSTEM_ERROR;
  }
}

module.exports = OwnCompanyLogic;
