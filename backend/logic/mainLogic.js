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
 * 勤怠入力のLogicクラスです。
 */
class MainLogic {
  /**
   * 勤怠入力の入力情報(現場情報以外)をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //jobNoチェック
      checkJobNo(errorMessageList, param.jobNo);
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
  }
  /**
   * 勤怠入力の入力情報(勤怠ステータス、勤怠パターン)をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputAttendanceData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //勤怠ステータスチェック
      var selectStatus = param.selectStatus;
      checkAttendanceSatus(errorMessageList, selectStatus.value);
      //勤怠パターンチェック
      var selecAtttendancePattern = param.selecAtttendancePattern;
      checkAttendancePattern(
        errorMessageList,
        selecAtttendancePattern.patternId
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
     * 勤怠ステータスをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     */
    function checkAttendanceSatus(errorMessageList, value) {
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.ATTENDANCE_STATUS,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      var errorMessage2 = commonLogic.chehckFormat(
        value,
        colum.ATTENDANCE_STATUS,
        format.HALF_WITH_NUMBER
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      return errorMessageList;
    }

    /**
     * 勤怠パターンをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} attendanceResponse 勤怠パターン情報です。
     */
    function checkAttendancePattern(errorMessageList, value) {
      var errorMessage1 = commonLogic.checkEmpty(
        value,
        colum.ATTENDANCE_PATTERN,
        true
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      return errorMessageList;
    }
  }
  /**
   * 勤怠入力の入力情報(現場情報)をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputJobNo(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      if (param.fieldEditTab === 0) {
        //jobNoチェック
        checkJobNo(errorMessageList, param.jobNo);
      } else {
        //現場詳細IDチェック
        checkWorkFieldDetailId(errorMessageList, param.workFieldDetailId);
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
     * jobNoをチェックします。
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
    }
  }

  /**
   * 現場詳細の入力値(現場情報以外)の存在チェックします。
   *
   * @param {string} param 画面パラメータです。
   * @param {string} employeeResponse 社員情報です。
   * @param {string} workFieldDetailResponse 現場詳細情報です。
   *
   * @returns
   */
  checkExistsData(param, employeeResponse, workFieldDetailResponse) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //勤怠入力情報の入力値の存在チェックを行います。
      //社員IDチェック
      checkEmployeeId(errorMessageList, param.employeeId, employeeResponse);
      //jobNoチェック
      var selectJob = param.selectJob;
      checkJobNo(errorMessageList, selectJob.jobNo, workFieldDetailResponse);
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
     * 社員IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} employeeResponse 客先情報です。
     */
    function checkEmployeeId(errorMessageList, value, employeeResponse) {
      var errorMessage1 = commonLogic.checkExists(
        value,
        employeeResponse,
        colum.EMPLOYEE_ID
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      return errorMessageList;
    }

    /**
     * jobNoをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} workFieldDetailResponse 現場詳細情報です。
     */
    function checkJobNo(errorMessageList, value, workFieldDetailResponse) {
      var errorMessage1 = commonLogic.checkExists(
        value,
        workFieldDetailResponse,
        colum.JOB_NO
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      return errorMessageList;
    }
  }

  /**
   * 選択した勤怠ステータス、勤怠パターンをチェックします。
   *
   * @param {string} param 画面パラメータです。
   * @param {string} attendanceResponse 勤怠パターン情報です。
   *
   * @returns
   */
  checkExistsAttendanceData(param, contactResponse) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //勤怠入力情報の入力値の存在チェックを行います。
      //TODO 勤怠ステータスチェック 存在チェックいるか確認
      //勤怠パターンチェック
      var selecAtttendancePattern = param.selecAtttendancePattern;
      var attendanceManageResponse = contactResponse.attendancePattern;
      checkAttendancePattern(
        errorMessageList,
        selecAtttendancePattern.patternId,
        attendanceManageResponse
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
     * 勤怠パターンをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} attendanceResponse 勤怠パターン情報です。
     */
    function checkAttendancePattern(
      errorMessageList,
      value,
      attendanceResponse
    ) {
      var errorMessage1 = commonLogic.checkExists(
        value,
        attendanceResponse,
        colum.ATTENDANCE_PATTERN
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      return errorMessageList;
    }
  }

  // /**
  //  * 現場詳細の入力値(現場情報)の存在チェックします。
  //  *
  //  * @param {string} param 画面パラメータです。
  //  * @param {string} employeeResponse 社員情報です。
  //  * @param {string} workFieldDetailResponse 現場詳細情報です。
  //  *
  //  * @returns
  //  */
  // checkExistsJobNo(param, employeeResponse, workFieldDetailResponse) {
  //   return new Promise(function (resolve, reject) {
  //     var errorMessageList = [];
  //     //勤怠入力情報の入力値の存在チェックを行います。
  //     //社員IDチェック
  //     checkEmployeeId(errorMessageList, param.employeeId, employeeResponse);
  //     if (param.fieldEditTab === 0) {
  //       //jobNoチェック
  //       checkJobNo(errorMessageList, param.jobNo, workFieldDetailResponse);
  //     } else {
  //       //現場詳細チェック
  //       checkWorkFieldDetailId(
  //         errorMessageList,
  //         param.workFieldDetailId,
  //         workFieldDetailResponse
  //       );
  //     }
  //     var data = {};
  //     //エラーがある場合
  //     if (errorMessageList.length !== 0) {
  //       data = {
  //         checkResult: false,
  //         messageList: errorMessageList,
  //       };
  //       reject(data);
  //     }
  //     resolve();
  //   });

  //   /**
  //    * 社員IDをチェックします。
  //    *
  //    * @param {object} errorMessageList エラーメッセージリストです。
  //    * @param {string} value 入力内容です。
  //    * @param {string} employeeResponse 客先情報です。
  //    */
  //   function checkEmployeeId(errorMessageList, value, employeeResponse) {
  //     var errorMessage1 = commonLogic.checkExists(
  //       value,
  //       employeeResponse,
  //       colum.EMPLOYEE_ID
  //     );
  //     if (!util.isEmpty(errorMessage1)) {
  //       errorMessageList.push(errorMessage1);
  //       return;
  //     }
  //     return errorMessageList;
  //   }

  //   /**
  //    * jobNoをチェックします。
  //    *
  //    * @param {object} errorMessageList エラーメッセージリストです。
  //    * @param {string} value 入力内容です。
  //    * @param {string} workFieldDetailResponse 現場詳細情報です。
  //    */
  //   function checkJobNo(errorMessageList, value, workFieldDetailResponse) {
  //     var errorMessage1 = commonLogic.checkExists(
  //       value,
  //       workFieldDetailResponse,
  //       colum.JOB_NO
  //     );
  //     if (!util.isEmpty(errorMessage1)) {
  //       errorMessageList.push(errorMessage1);
  //       return;
  //     }
  //     return errorMessageList;
  //   }

  //   /**
  //    * 現場詳細IDをチェックします。
  //    *
  //    * @param {object} errorMessageList エラーメッセージリストです。
  //    * @param {string} value 入力内容です。
  //    * @param {string} workFieldDetailResponse 現場詳細情報です。
  //    */
  //   function checkWorkFieldDetailId(
  //     errorMessageList,
  //     value,
  //     workFieldDetailResponse
  //   ) {
  //     var errorMessage1 = commonLogic.checkExists(
  //       value,
  //       workFieldDetailResponse,
  //       colum.WORK_FIELD_DETAIL_ID
  //     );
  //     if (!util.isEmpty(errorMessage1)) {
  //       errorMessageList.push(errorMessage1);
  //       return;
  //     }
  //     return errorMessageList;
  //   }
  // }

  /**
   * サクセスメッセージを作成します。
   *
   * @returns {string} サクセスメッセージです。
   */
  createSuccessMessage() {
    return util.stringFormat(successMessage.SAVE_INPPUT, "勤怠入力情報");
  }

  /**
   * システムエラーメッセージを作成します。
   *
   * @returns {string} システムエラーメッセージです。
   */
  createSytemErrorMessage() {
    return util.stringFormat(errorMessage.SYSTEM_ERROR);
  }
}

module.exports = MainLogic;
