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
  checSubCompanyInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
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
      // checkSelectWorkTypeList(errorMessageList, param.selectWorkTypeList);
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

    // /**
    //  * 工種をチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkSelectWorkTypeList(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(value, colum.WORK_TYPE, true);
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.WORK_TYPE,
    //     type.OBJECT
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //最大文字数チェックです。
    //   var errorMessage3 = commonLogic.checkMaxLength(value, colum.WORK_TYPE, 5);
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }
  }

  /**
   * 協力会社員編集の入力情報をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkSubCompnayEmployeeInputData(param) {
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

    // /**
    //  * 入社日をチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkEntryFirstDate(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.ENTRY_FIRST_DATE,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.ENTRY_FIRST_DATE,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //日付チェックです。
    //   var errorMessage3 = commonLogic.checkDateFormat(
    //     value,
    //     colum.ENTRY_FIRST_DATE
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

    // /**
    //  * 退社日をチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkEntryEndDate(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.ENTRY_END_DATE,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.ENTRY_END_DATE,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //日付チェックです。
    //   var errorMessage3 = commonLogic.checkDateFormat(
    //     value,
    //     colum.ENTRY_END_DATE
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    // }

    // /**
    //  * 雇用形態をチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkEmployment(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(value, colum.EMPLOYMENT, true);
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.EMPLOYMENT,
    //     type.STRING
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //半角数字チェックです。
    //   var errorMessage3 = commonLogic.chehckFormat(
    //     value,
    //     colum.EMPLOYMENT,
    //     format.HALF_WITH_NUMBER
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
    //     return;
    //   }
    //   //入力範囲チェックです。
    //   var errorMessage4 = commonLogic.checkInputRange(
    //     value,
    //     colum.EMPLOYMENT,
    //     0,
    //     3
    //   );
    //   if (!util.isEmpty(errorMessage4)) {
    //     errorMessageList.push(errorMessage4);
    //     return;
    //   }
    // }

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

    // /**
    //  * 資格取得日をチェックします。
    //  *
    //  * @param {object} errorMessageList エラーメッセージリストです。
    //  * @param {string} value 入力内容です。
    //  */
    // function checkLicenseGetDate(errorMessageList, value) {
    //   //未入力チェックです。
    //   var errorMessage1 = commonLogic.checkEmpty(
    //     value,
    //     colum.LICENSE_GET_DATE,
    //     true
    //   );
    //   if (!util.isEmpty(errorMessage1)) {
    //     errorMessageList.push(errorMessage1);
    //     return;
    //   }
    //   //型チェックです。
    //   var errorMessage2 = commonLogic.checkType(
    //     value,
    //     colum.LICENSE_GET_DATE,
    //     type.OBJECT
    //   );
    //   if (!util.isEmpty(errorMessage2)) {
    //     errorMessageList.push(errorMessage2);
    //     return;
    //   }
    //   //最大文字数チェックです。
    //   var errorMessage3 = commonLogic.checkMaxLength(
    //     value,
    //     colum.LICENSE_GET_DATE,
    //     5
    //   );
    //   if (!util.isEmpty(errorMessage3)) {
    //     errorMessageList.push(errorMessage3);
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
  checkSubCompnayExistsData(param, workTypeResponse) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //工種チェック
      checkWorkTypeIdList(
        errorMessageList,
        param.workTypeIdList,
        workTypeResponse
      );
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
   * 協力会社員の入力値の存在チェックします。
   *
   * @param {string} param 画面パラメータです。
   * @param {string} subEmployeeResponse 協力会社員情報です。
   * @param {string} subCompanyResponse 協力会社情報です。
   *
   * @returns
   */
  checkSubCompnayEmployeeExistsData(param, employeeResponse, companyResponse) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //ログインIDチェック
      checkLoginId(errorMessageList, param.loginId, employeeResponse);
      //協力会社チェック
      checkSubCompanyId(errorMessageList, param.subCompanyId, companyResponse);
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
    /**
     * 工種をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} companyResponse 協力会社情報です。
     */
    function checkSubCompanyId(errorMessageList, value, companyResponse) {
      var errorMessage1 = commonLogic.checkExists(
        value,
        companyResponse,
        colum.SUB_COMPANY_ID
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      return errorMessageList;
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
    return successMessage.SYSTEM_ERROR;
  }
}

module.exports = SUbCompanyLogic;
