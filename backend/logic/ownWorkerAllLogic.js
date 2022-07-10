"use strict";
//共通Logic
const CommonLogic = require("../logic/commonLogic");
var commonLogic = new CommonLogic();
const Util = require("../public/util");
var util = new Util();
const constractor = require("../public/const");
var successMessage = constractor.SuccessMessage;
var errorMessage = constractor.ErrorMessage;
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
  checkEmployeeInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      var data = {};
      //ログインIDチェック
      checkLoginId(errorMessageList, param.loginId);
      //パスワードチェック
      checkPassword(errorMessageList, param.password);
      //社員名(姓)チェック
      checkEmployeeFirstname(errorMessageList, param.employeeFirstname);
      //社員名(名)チェック
      checkEmployeeLastname(errorMessageList, param.employeeLastname);
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
      checkLicense(errorMessageList, param.license);
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

    // /**
    //  * 社員IDをチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkEmployeeId(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.EMPLOYEE_ID,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.EMPLOYEE_ID,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //半角文字チェックです。
    //   var errorMessage3 = commonLogic.chehckFormat(
    //     value,
    //     colum.EMPLOYEE_ID,
    //     format.HALF
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

    // /**
    //  * 契約IDをチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkContractorId(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.CONTRACTOR_ID,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.CONTRACTOR_ID,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //半角文字チェックです。
    //   var errorMessage3 = commonLogic.chehckFormat(
    //     value,
    //     colum.CONTRACTOR_ID,
    //     format.HALF
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

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
    function checkEmployeeFirstname(errorMessageList, value) {
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
    function checkEmployeeLastname(errorMessageList, value) {
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

    // /**
    //  * 会社IDをチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkCompanyId(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(value, colum.COMPANY_ID, true);
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.COMPANY_ID,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //半角文字チェックです。
    //   var errorMessage3 = commonLogic.chehckFormat(
    //     value,
    //     colum.COMPANY_ID,
    //     format.HALF
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

    // /**
    //  * 役職IDをチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkPostId(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(value, colum.POST_ID, true);
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.POST_ID,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //半角文字チェックです。
    //   var errorMessage3 = commonLogic.chehckFormat(
    //     value,
    //     colum.POST_ID,
    //     format.HALF
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

    // /**
    //  * 出退勤IDをチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkAttendanceId(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.ATTENDANCE_ID,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.ATTENDANCE_ID,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //半角文字チェックです。
    //   var errorMessage3 = commonLogic.chehckFormat(
    //     value,
    //     colum.ATTENDANCE_ID,
    //     format.HALF
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

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
      //入力時のみチェックします。
      if (!util.isEmpty(value)) {
        //型チェックです。
        var errorMessage1 = commonLogic.checkType(
          value,
          colum.ENTRY_END_DATE,
          type.STRING
        );
        if (!util.isEmpty(errorMessage1)) {
          errorMessageList.push(errorMessage1);
          return;
        }
        //日付チェックです。
        var errorMessage2 = commonLogic.checkDateFormat(
          value,
          colum.ENTRY_END_DATE
        );
        if (!util.isEmpty(errorMessage2)) {
          errorMessageList.push(errorMessage2);
          return;
        }
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
    function checkLicense(errorMessageList, value) {
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
  }

  /**
   * 自社員管理の入力値の存在チェックします。
   *
   * @param {string} param 画面パラメータです。
   * @param {string} postCheckResponse 役職情報です。
   *
   * @returns
   */
  checkEmployeeExistsData(param, postCheckResponse) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //役職チェック
      checkPostIdList(errorMessageList, param.postId, postCheckResponse);
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
     * 役職をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} postCheckResponse 役職情報です。
     */
    function checkPostIdList(errorMessageList, value, postCheckResponse) {
      var errorMessage1 = commonLogic.checkExists(
        value,
        postCheckResponse,
        colum.POST_ID
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      return errorMessageList;
    }
  }

  /**
   * 協力会社員の入力値の存在チェックします。
   *
   * @param {string} param 画面パラメータです。
   * @param {string} subEmployeeResponse 協力会社員情報です。
   *
   * @returns
   */
  checkEmployeeExistsData(param, employeeResponse) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //ログインIDチェック
      checkLoginId(errorMessageList, param.loginId, employeeResponse);
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
     * ログインIDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} employeeResponse 協力会社員情報です。
     */
    function checkLoginId(errorMessageList, value, employeeResponse) {
      var errorMessage1 = commonLogic.checkDuplicate(
        value,
        employeeResponse,
        colum.LOGIN_ID
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      return errorMessageList;
    }
  }

  /**
   * 役職編集の入力情報をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checPostInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      var data = {};
      //役職名チェック
      checkPostName(errorMessageList, param.postName);
      //出退勤管理権限チェック
      checkaAtendanceAuth(errorMessageList, param.attendanceAuth);
      //自社員管理権限チェック
      checkOwnWokerManageAuth(errorMessageList, param.ownWokerManageAuth);
      //協力会社管理権限チェック
      checkSubCompanyManageAuth(errorMessageList, param.subCompanyManageAuth);
      //自社設定権限チェック
      checkOwnCompanyManageAuth(errorMessageList, param.ownCompanyManageAuth);
      //支払い設定権限チェック
      checkPayPlanAuth(errorMessageList, param.payPlanAuth);
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
     * 役職名をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkPostName(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.POST_NAME, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.POST_NAME,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //最大文字数チェックです。
      var errorMessage3 = commonLogic.checkMaxLength(
        value,
        colum.POST_NAME,
        100
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 出退勤管理権限をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkaAtendanceAuth(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.ATTENDANCE_AUTH,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.ATTENDANCE_AUTH,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.ATTENDANCE_AUTH,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.ATTENDANCE_AUTH,
        0,
        3
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 自社員管理権限をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkOwnWokerManageAuth(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.OWNWORKER_MANAGE_AUTH,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.OWNWORKER_MANAGE_AUTH,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.OWNWORKER_MANAGE_AUTH,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.OWNWORKER_MANAGE_AUTH,
        0,
        3
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 協力会社管理権限をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkSubCompanyManageAuth(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.SUB_COMPANY_MANAGE_AUTH,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.SUB_COMPANY_MANAGE_AUTH,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.SUB_COMPANY_MANAGE_AUTH,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.SUB_COMPANY_MANAGE_AUTH,
        0,
        3
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 自社設定権限をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkOwnCompanyManageAuth(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.OWN_COMPANY_MANAGE_AUTH,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.OWN_COMPANY_MANAGE_AUTH,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.OWN_COMPANY_MANAGE_AUTH,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.OWN_COMPANY_MANAGE_AUTH,
        0,
        3
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 支払い設定権限をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkPayPlanAuth(errorMessageList, value) {
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.PAY_PLAN_AUTH,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.PAY_PLAN_AUTH,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //半角数字チェックです。
      var errorMessage3 = commonLogic.chehckFormat(
        value,
        colum.PAY_PLAN_AUTH,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
      //入力範囲チェックです。
      var errorMessage4 = commonLogic.checkInputRange(
        value,
        colum.PAY_PLAN_AUTH,
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
    return errorMessage.SYSTEM_ERROR;
  }
}

module.exports = OwnWorkerAllLogic;
