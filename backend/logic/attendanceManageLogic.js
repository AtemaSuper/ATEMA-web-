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
//本日の日時を取得
var date = new Date();
var todayDate = commonLogic.createFormatDate(date);

/**
 * 出退勤のLogicクラスです。
 */
class AttendanceManageLogic {
  /**
   * 出退勤の入力情報(現場情報以外)をチェックします。
   *
   * @param {string} param 画面パラメータです。
   *
   * @returns
   */
  checkInputData(param) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //ステータスチェック
      checkStatus(errorMessageList, param.items, param.clumns);
      //出勤開始時間チェック
      checkStart(errorMessageList, param.items, param.clumns);
      //休憩開始時間チェック
      checkRestStart(errorMessageList, param.items, param.clumns);
      //出勤終了時間チェック
      checkEnd(errorMessageList, param.items, param.clumns);
      //休憩終了時間チェック
      checkRestEnd(errorMessageList, param.items, param.clumns);
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
     * ステータスをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} clumns チェック対象です。
     */
    function checkStatus(errorMessageList, value, clumns) {
      if (clumns != "status") {
        return;
      }
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
        8
      );
      if (!util.isEmpty(errorMessage4)) {
        errorMessageList.push(errorMessage4);
        return;
      }
    }

    /**
     * 出勤時間をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} clumns チェック対象です。
     */
    function checkStart(errorMessageList, value, clumns) {
      if (clumns != "start") {
        return;
      }
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.START, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.START,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(value, colum.START);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 休憩開始時間をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} clumns チェック対象です。
     */
    function checkRestStart(errorMessageList, value, clumns) {
      if (clumns != "restStart") {
        return;
      }
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.REST_START, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.REST_START,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(value, colum.REST_START);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 退勤時間をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} clumns チェック対象です。
     */
    function checkEnd(errorMessageList, value, clumns) {
      if (clumns != "end") {
        return;
      }
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.END, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(value, colum.END, type.STRING);
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(value, colum.END);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }

    /**
     * 休憩終了時間をチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} clumns チェック対象です。
     */
    function checkRestEnd(errorMessageList, value, clumns) {
      if (clumns != "restEnd") {
        return;
      }
      //未入力チェックです。
      var errorMessage1 = commonLogic.checkEmpty(value, colum.REST_END, true);
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      //型チェックです。
      var errorMessage2 = commonLogic.checkType(
        value,
        colum.REST_END,
        type.STRING
      );
      if (!util.isEmpty(errorMessage2)) {
        errorMessageList.push(errorMessage2);
        return;
      }
      //時間形式チェックです。
      var errorMessage3 = commonLogic.checkTimeFormat(value, colum.REST_END);
      if (!util.isEmpty(errorMessage3)) {
        errorMessageList.push(errorMessage3);
        return;
      }
    }
  }
  /**
   * 出退勤の入力情報(現場情報)をチェックします。
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
      //出退勤情報の入力値の存在チェックを行います。
      //社員IDチェック
      checkEmployeeId(errorMessageList, param.employeeId, employeeResponse);
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
  }

  /**
   * 現場詳細の入力値(現場情報)の存在チェックします。
   *
   * @param {string} param 画面パラメータです。
   * @param {string} employeeResponse 社員情報です。
   * @param {string} workFieldDetailResponse 現場詳細情報です。
   *
   * @returns
   */
  checkExistsJobNo(param, employeeResponse, workFieldDetailResponse) {
    return new Promise(function (resolve, reject) {
      var errorMessageList = [];
      //出退勤情報の入力値の存在チェックを行います。
      //社員IDチェック
      checkEmployeeId(errorMessageList, param.employeeId, employeeResponse);
      if (param.fieldEditTab === 0) {
        //jobNoチェック
        checkJobNo(errorMessageList, param.jobNo, workFieldDetailResponse);
      } else {
        //現場詳細チェック
        checkWorkFieldDetailId(
          errorMessageList,
          param.workFieldDetailId,
          workFieldDetailResponse
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

    /**
     * 現場詳細IDをチェックします。
     *
     * @param {object} errorMessageList エラーメッセージリストです。
     * @param {string} value 入力内容です。
     * @param {string} workFieldDetailResponse 現場詳細情報です。
     */
    function checkWorkFieldDetailId(
      errorMessageList,
      value,
      workFieldDetailResponse
    ) {
      var errorMessage1 = commonLogic.checkExists(
        value,
        workFieldDetailResponse,
        colum.WORK_FIELD_DETAIL_ID
      );
      if (!util.isEmpty(errorMessage1)) {
        errorMessageList.push(errorMessage1);
        return;
      }
      return errorMessageList;
    }
  }

  /**
   * 出退勤テーブル更新用のデータ情報を作成します。
   *
   * @param {string} param 画面パラメータです。
   * @param {object} workFieldDetailResponse 現場詳細情報です。
   * @param {boolean} isNew 新規登録かどうかです。
   *
   *
   */
  createUpdateItemForAttendance(param, workFieldDetailResponse, isNew) {
    var selecAtttendancePattern = param.selecAtttendancePattern;
    var selectStatus = param.selectStatus;
    var updateKey = getUpdateKey(selectStatus.value);
    var workFieldDetail = getWorkFieldDetail(
      workFieldDetailResponse,
      param.selectJob
    );
    //新規登録の場合
    if (isNew) {
      return {
        attendancePatternId: selecAtttendancePattern.patternId,
        contractStatus: workFieldDetail.contractStatus,
        noteContents: util.isEmpty(param.noteContents)
          ? ""
          : param.noteContents,
        status: selectStatus.value,
        workFieldDetailId: workFieldDetail.workFieldDetailId,
        start: updateKey == "start" ? param.saveTime : "",
        restStart: updateKey == "restStart" ? param.saveTime : "",
        restEnd: updateKey == "restEnd" ? param.saveTime : "",
        end: updateKey == "end" ? param.saveTime : "",
        createDate: todayDate,
        createUserId: param.employeeId,
        updateDate: todayDate,
        updateUserId: param.employeeId,
        deleteFlg: false,
      };
      //更新の場合
    } else {
      return {
        attendancePatternId: selecAtttendancePattern.patternId,
        noteContents: util.isEmpty(param.noteContents)
          ? ""
          : param.noteContents,
        status: selectStatus.value,
        workFieldDetailId: workFieldDetail.workFieldDetailId,
        [updateKey]: param.saveTime,
        updateDate: todayDate,
        updateUserId: param.employeeId,
      };
    }

    /**
     * 選択したステータスで、更新するカラムを取得します。
     *
     * @param {string} selectStatus
     * @returns
     */
    function getUpdateKey(selectStatus) {
      switch (selectStatus) {
        case "0":
          return "start";
        case "1":
          return "restStart";
        case "2":
          return "restEnd";
        case "3":
          return "end";
        default:
          return "start";
      }
    }

    /**
     * 選択した現場詳細情報を取得します。
     *
     * @param {string} selectStatus
     * @returns
     */
    function getWorkFieldDetail(workFieldDetailResponse, selectJob) {
      for (var i in workFieldDetailResponse) {
        var workFieldDetail = workFieldDetailResponse[i];
        //入力したjobNoから取得
        if (!util.isEmpty(selectJob.jobNo)) {
          if (selectJob.jobNo === workFieldDetail.jobNo) {
            return workFieldDetail;
          }
          //選択した現場詳細情報から取得
        } else {
          if (
            selectJob.selectWorkFieldDetail.workFieldDetailId ===
            workFieldDetail.workFieldDetailId
          ) {
            return workFieldDetail;
          }
        }
      }
    }
  }

  /**
   * サクセスメッセージを作成します。
   *
   * @returns {string} サクセスメッセージです。
   */
  createSuccessMessage() {
    return util.stringFormat(successMessage.SAVE_INPPUT, "出退勤情報");
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

module.exports = AttendanceManageLogic;
