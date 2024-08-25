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
    if (column.SUB_CONTRACTOR_ID == colum) {
      check = response.find((res) => res.subContractorId == value);
    }
    //役職IDのチェックです。
    if (column.POST_ID == colum) {
      check = response.find((res) => res.postId == value);
    }
    //jobNoのチェックです。
    if (column.JOB_NO == colum) {
      check = response.find((res) => res.jobNo == value);
    }
    //勤怠パターンのチェックです。
    if (column.ATTENDANCE_PATTERN == colum) {
      check = response.find((res) => res.patternId == value);
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
    if (column.EMPLOYEE_ID == colum) {
      check = response.find((res) => res.employeeId == value);
    }
    if (!check) {
      return util.stringFormat(errorMessage.IS_NOT_EXISTS, colum);
    }
    return "";
  }
  /**
   * フォーマットした日付を返します。
   *
   * @param {Date} date フォーマットしたい日付です。
   *
   * @returns date
   */
  createFormatDate(date) {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (Number(date.getMonth()) + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2)
    );
  }
  /**
   * 電話番号を国際電話形式に変換します。
   * @param {String} tel1 変換前の電話番号1です。
   * @param {String} tel2 変換前の電話番号2です。
   * @param {String} tel3 変換前の電話番号3です。
   *
   * @returns
   */
  convertTelNumberForGlobal(tel1, tel2, tel3) {
    return "+81" + tel1.substr(1, tel1.length) + tel2 + tel3;
  }

  /**
   * logicやfirebaseから受け取ったエラー情報をもとに返却するエラーレスポンスを作成します。
   *
   * @param {object} err エラー情報です。
   *
   * @returns 返却するエラーレスポンスです。
   */
  createErrorResponse(err) {
    //サーバー側での入力値チェックエラーです。
    if (err.messageList !== undefined) {
      err.status = 400;
      //firebase側でのチェックエラーです。
    } else if (err.errorInfo !== undefined) {
      err.checkResult = false;
      err.status = createErrorStatusForFirebase(err.errorInfo.code);
      err.messageList = [createErrorMessageForFirebase(err.errorInfo.code)];
      //サーバー側でのシステムエラーです。
    } else {
      err.checkResult = false;
      err.status = 500;
      err.messageList = [errorMessage.SYSTEM_ERROR];
    }
    console.log(err);
    return err;

    /**
     * firebaseから返却されるerrorInfoのcodeをもとにエラーメッセージを返却します。
     *
     * @param {String} code irebaseから返却されるerrorInfoのcodeです。
     *
     * @returns エラーメッセージ
     */
    function createErrorMessageForFirebase(code) {
      switch (code) {
        case "auth/claims-too-large":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/email-already-exists":
          return "メールアドレスは既に存在する値です。";
        case "auth/id-token-expired":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/id-token-revoked":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/insufficient-permission":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/internal-error":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-argument":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-claims":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-continue-uri":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-creation-time":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-credential":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-disabled-field":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-display-name":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-dynamic-link-domain":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-email":
          return "メールアドレスが不正な値です。";
        case "auth/invalid-email-verified":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-hash-algorithm":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-hash-block-size":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-hash-derived-key-length":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-hash-key":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-hash-memory-cost":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-hash-parallelization":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-hash-rounds":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-hash-salt-separator":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-id-token":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-last-sign-in-time":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-page-token":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-password":
          return "パスワードが不正な値です。";
        case "auth/invalid-password-hash":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-password-salt":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-phone-number":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-photo-url":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-provider-data":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-provider-id":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-oauth-responsetype":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-session-cookie-duration":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/invalid-uid":
          return "employeeIdが不正な値です。";
        case "auth/invalid-user-import":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/maximum-user-count-exceeded":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/missing-android-pkg-name":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/missing-continue-uri":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/missing-hash-algorithm":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/missing-ios-bundle-id":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/missing-uid":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/missing-oauth-client-secret":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/operation-not-allowed":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/phone-number-already-exists":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/project-not-found":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/reserved-claims":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/session-cookie-expired":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/session-cookie-revoked":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/too-many-requests":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/uid-already-exists":
          return "employeeIdは既に存在する値です。";
        case "auth/unauthorized-continue-uri":
          return "システムエラーです。管理者に問い合わせてください。";
        case "auth/user-not-found":
          return "employeeIdは存在しない値です。";
        default:
          return "システムエラーです。管理者に問い合わせてください。";
      }
    }

    /**
     * firebaseから返却されるerrorInfoのcodeをもとにエラーステータスを返却します。
     *
     * @param {String} code irebaseから返却されるerrorInfoのcodeです。
     *
     * @returns ステータス
     */
    function createErrorStatusForFirebase(code) {
      switch (code) {
        case "auth/claims-too-large":
          return 500;
        case "auth/email-already-exists":
          return 400;
        case "auth/id-token-expired":
          return 500;
        case "auth/id-token-revoked":
          return 500;
        case "auth/insufficient-permission":
          return 500;
        case "auth/internal-error":
          return 500;
        case "auth/invalid-argument":
          return 500;
        case "auth/invalid-claims":
          return 500;
        case "auth/invalid-continue-uri":
          return 500;
        case "auth/invalid-creation-time":
          return 500;
        case "auth/invalid-credential":
          return 500;
        case "auth/invalid-disabled-field":
          return 500;
        case "auth/invalid-display-name":
          return 500;
        case "auth/invalid-dynamic-link-domain":
          return 500;
        case "auth/invalid-email":
          return 400;
        case "auth/invalid-email-verified":
          return 500;
        case "auth/invalid-hash-algorithm":
          return 500;
        case "auth/invalid-hash-block-size":
          return 500;
        case "auth/invalid-hash-derived-key-length":
          return 500;
        case "auth/invalid-hash-key":
          return 500;
        case "auth/invalid-hash-memory-cost":
          return 500;
        case "auth/invalid-hash-parallelization":
          return 500;
        case "auth/invalid-hash-rounds":
          return 500;
        case "auth/invalid-hash-salt-separator":
          return 500;
        case "auth/invalid-id-token":
          return 500;
        case "auth/invalid-last-sign-in-time":
          return 500;
        case "auth/invalid-page-token":
          return 500;
        case "auth/invalid-password":
          return 400;
        case "auth/invalid-password-hash":
          return 500;
        case "auth/invalid-password-salt":
          return 500;
        case "auth/invalid-phone-number":
          return 500;
        case "auth/invalid-photo-url":
          return 500;
        case "auth/invalid-provider-data":
          return 500;
        case "auth/invalid-provider-id":
          return 500;
        case "auth/invalid-oauth-responsetype":
          return 500;
        case "auth/invalid-session-cookie-duration":
          return 500;
        case "auth/invalid-uid":
          return 400;
        case "auth/invalid-user-import":
          return 500;
        case "auth/maximum-user-count-exceeded":
          return 500;
        case "auth/missing-android-pkg-name":
          return 500;
        case "auth/missing-continue-uri":
          return 500;
        case "auth/missing-hash-algorithm":
          return 500;
        case "auth/missing-ios-bundle-id":
          return 500;
        case "auth/missing-uid":
          return 500;
        case "auth/missing-oauth-client-secret":
          return 500;
        case "auth/operation-not-allowed":
          return 500;
        case "auth/phone-number-already-exists":
          return 500;
        case "auth/project-not-found":
          return 500;
        case "auth/reserved-claims":
          return 500;
        case "auth/session-cookie-expired":
          return 500;
        case "auth/session-cookie-revoked":
          return 500;
        case "auth/too-many-requests":
          return 500;
        case "auth/uid-already-exists":
          return 400;
        case "auth/unauthorized-continue-uri":
          return 500;
        case "auth/user-not-found":
          return 400;
        default:
          return 400;
      }
    }
  }
}
module.exports = CommonLogic;
