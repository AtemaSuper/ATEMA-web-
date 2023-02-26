const express = require("express");
const app = express();

//客先Logic
const MainLogic = require("../logic/mainLogic");
var mainLogic = new MainLogic();
//出退勤テーブル
const AttendanceManageDao = require("../middle/dao/attendanceDao");
var attendanceManageDao = new AttendanceManageDao();
//契約テーブル
const ContactDao = require("../middle/dao/contactDao");
var contactDao = new ContactDao();
//客先テーブル
const ClientFieldDao = require("../middle/dao/clientFieldDao");
var clientFieldDao = new ClientFieldDao();
//現場テーブル
const WorkFieldDao = require("../middle/dao/workFieldDao");
var workFieldDao = new WorkFieldDao();
//現場詳細テーブル
const WorkFieldDetailDao = require("../middle/dao/workFieldDetailDao");
var workFieldDetailDao = new WorkFieldDetailDao();
//社員テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();
//役職テーブル
const PostDao = require("../middle/dao/postDao");
var postDao = new PostDao();

var attendanceManageResponse = [];
var clientFieldResponse = [];
var contactResponse = [];
var employeeResponse = [];
var postResponse = {};
var workFieldResponse = [];
var workFieldDetailResponse = [];
var selectJob = {};
var selecAtttendancePattern = {};
var attendancePatternList = [];
var checkResult = false;
var messageList = [];

var setWorkFieldDetail = {
  jobNo: String,
  clientFieldName: String,
  workFieldName: String,
  workFieldDetailName: String,
  contractStatus: Number,
  selectClientField: Object,
  selectWorkField: Object,
  selectWorkFieldDetail: Object,
  isSaveFlag: Boolean,
};

var selectClientField = {
  workFieldId: String,
  workFieldName: String,
};
var selectWorkField = {
  workFieldId: String,
  workFieldName: String,
};
var selectWorkFieldDetail = {
  workFieldDetailId: String,
  workFieldDetailName: String,
  jobNo: String,
};

var attendancePattern = {
  patternId: String,
  workStartTime: String,
  workFinishTime: String,
  workingHours: String,
};

/**
 * 契約ID、社員IDをもとに社員情報を取得します。
 *
 * @param {string} contractorId 契約IDです。
 * @param {string} employeeId 社員IDです。
 *
 * @returns
 */
const selectEmployee = function (contractorId, employeeId) {
  return new Promise(function (resolve, reject) {
    employeeDao
      .selectEmployee(contractorId, employeeId)
      .then(function (items) {
        employeeResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};
/**
 * 契約IDをもとに社員情報を取得します。
 *
 * @param {string} contractorId 契約IDです。
 * @returns
 */
const employeeFecthAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    employeeDao
      .selectfetchAll(contractorId)
      .then(function (items) {
        employeeResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};
/**
 * 契約IDをもとに契約情報を取得します。
 *
 * @param {string} contractorId 契約IDです。
 * @returns
 */
const contactFecthAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    contactDao
      .selectContactAll(contractorId)
      .then(function (items) {
        contactResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};
/**
 * 契約IDをもとに客先情報を取得します。
 *
 * @param {string} contractorId 契約IDです。
 * @returns
 */
const clientFieldFecthAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    clientFieldDao
      .selectClientFieldAll(contractorId)
      .then(function (items) {
        clientFieldResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};
/**
 * 契約IDをもとに現場情報を取得します。
 *
 * @param {string} contractorId 契約IDです。
 * @returns
 */
const workFieldFecthAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    workFieldDao
      .selectWorkFieldAll(contractorId)
      .then(function (items) {
        workFieldResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};
/**
 * 契約IDをもとに現場詳細情報を取得します。
 *
 * @param {string} contractorId 契約IDです。
 * @returns
 */
const workFieldDetailFecthAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    workFieldDetailDao
      .selectWorkFieldDetailAll(contractorId)
      .then(function (items) {
        workFieldDetailResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};
/**
 * 現場情報をフォーマットします。
 *
 */
const formatWorkFieldDetail = function () {
  for (var i = 0; i < workFieldDetailResponse.length; i++) {
    //clientField
    for (var j = 0; j < clientFieldResponse.length; j++) {
      if (
        workFieldDetailResponse[i].clientFieldId ==
        clientFieldResponse[j].clientFieldId
      ) {
        workFieldDetailResponse[i].clientFieldName =
          clientFieldResponse[j].clientFieldName;
      }
    }
    //workField
    for (var k = 0; k < workFieldResponse.length; k++) {
      if (
        workFieldDetailResponse[i].workFieldId ==
        workFieldResponse[k].workFieldId
      ) {
        workFieldDetailResponse[i].workFieldName =
          workFieldResponse[k].workFieldName;
      }
    }
  }
};
/**
 * 選択している現場詳細情報をフォーマットします。
 *
 */
const setSelectJob = function () {
  for (var i = 0; i < workFieldDetailResponse.length; i++) {
    if (employeeResponse.jobNo == workFieldDetailResponse[i].jobNo) {
      setWorkFieldDetail.jobNo = workFieldDetailResponse[i].jobNo;
      setWorkFieldDetail.selectClientField = {
        clientFieldName: workFieldDetailResponse[i].clientFieldName,
        clientFieldId: workFieldDetailResponse[i].clientFieldId,
      };
      setWorkFieldDetail.selectWorkField = {
        workFieldName: workFieldDetailResponse[i].workFieldName,
        workFieldId: workFieldDetailResponse[i].workFieldId,
      };
      setWorkFieldDetail.selectWorkFieldDetail = {
        workFieldDetailName: workFieldDetailResponse[i].workFieldDetailName,
        workFieldDetailId: workFieldDetailResponse[i].workFieldDetailId,
        jobNo: workFieldDetailResponse[i].jobNo,
      };
      setWorkFieldDetail.isSaveFlag = true;
      break;
    }
  }
  if (selectJob === {}) {
    selectJob.jobNo = "";
    setWorkFieldDetail.selectClientField = {};
    setWorkFieldDetail.selectWorkField = {};
    setWorkFieldDetail.selectWorkFieldDetail = {};
    setWorkFieldDetail.isSaveFlag = false;
  }
  selectJob = setWorkFieldDetail;
};
/**
 * 契約ID、社員IDをもとに勤怠情報を取得します。
 *
 * @param {string} contractorId 契約IDです。
 * @param {string} employeeId 社員IDです。
 *
 * @returns
 */
const attendanceManageFind = function (contractorId, employeeId) {
  return new Promise(function (resolve, reject) {
    attendanceManageDao
      .findToToday(contractorId, employeeId)
      .then(function (items) {
        attendanceManageResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};
/**
 * 勤怠情報を保存します。
 *
 * @param {string} param 画面パラメータです。
 *
 * @returns
 */
const attendanceManageUpdate = function (param) {
  return new Promise(function (resolve, reject) {
    var selecAtttendancePattern = param.selecAtttendancePattern;
    var selectStatus = param.selectStatus;
    var updateKey = getUpdateKey(selectStatus.value);
    var updateItem = {
      attendancePatternId: selecAtttendancePattern.patternId,
      status: selectStatus.value,
      noteContents: param.noteContents,
      [updateKey]: param.saveTime,
    };

    attendanceManageDao
      .saveAttendance(param.contractorId, param.employeeId, updateItem)
      .then(function (data) {
        checkResult = data.checkResult;
        messageList = data.messageList;
        resolve();
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
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
};
/**
 * 勤怠ステータスを取得します。
 *
 */
const getAttendancePattern = function () {
  attendancePatternList = [];
  for (var i in contactResponse.attendancePattern) {
    if (!contactResponse.attendancePattern[i].deleteFlg) {
      var attendancePattern = {
        patternId: contactResponse.attendancePattern[i].patternId,
        text:
          contactResponse.attendancePattern[i].workStartTime +
          "～" +
          contactResponse.attendancePattern[i].workFinishTime,
        workStartTime: contactResponse.attendancePattern[i].workStartTime,
        workFinishTime: contactResponse.attendancePattern[i].workFinishTime,
        workingHours: contactResponse.attendancePattern[i].workingHours,
      };
      attendancePatternList.push(attendancePattern);
    }
  }
};
/**
 * 勤怠ステータスを取得します。
 *
 * @param {string} attenDancePatternId
 */
const getSelectAttendancePattern = function (attenDancePatternId) {
  selecAtttendancePattern = {};
  for (var i in attendancePatternList) {
    if (attendancePatternList[i].patternId === attenDancePatternId) {
      selecAtttendancePattern = attendancePatternList[i];
    }
  }
};
/**
 * 勤怠ステータスを取得します。
 *
 * @param {*} selectStatus
 */
const getSelectStatus = function (status) {
  switch (status) {
    case "0":
      return { text: "出勤", value: "0" };
    case "1":
      return { text: "休憩", value: "1" };
    case "2":
      return { text: "戻り", value: "2" };
    case "3":
      return { text: "退勤", value: "3" };
    default:
      return { text: "出勤", value: "0" };
  }
};
/**
 * 勤怠ステータスのリストを取得します。
 * 以前のステータスで入力させたくないので、不要なステータスを削除します。
 *
 * @param {*} statusValue
 */
const getStatusList = function (statusValue) {
  var statusList = [];
  var tmpStatusList = [
    { text: "出勤", value: "0" },
    { text: "休憩", value: "1" },
    { text: "戻り", value: "2" },
    { text: "退勤", value: "3" },
  ];
  if (!statusValue == "0") {
    for (var i = statusValue; i <= 3; i++) {
      statusList.push(tmpStatusList[i]);
    }
  }
  return statusList;
};
/**
 * トップ画面のService
 */
//メイン画面の初期表示処理です。
app.get("/", function (req, res) {
  res.status(200);
});

//勤怠先入力ダイアログの初期表示処理をします。
app.post("/showAttendanceDialog", async function (req, res) {
  const promises = [];

  promises.push(clientFieldFecthAll(req.body.contractorId));
  promises.push(workFieldFecthAll(req.body.contractorId));
  promises.push(workFieldDetailFecthAll(req.body.contractorId));
  promises.push(selectEmployee(req.body.contractorId, req.body.employeeId));

  Promise.all(promises)
    .then(async function (result) {
      formatWorkFieldDetail();
      setSelectJob();
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
        selectJob: selectJob,
      };
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json(err);
    });
});
//勤怠先入力情報のチェック処理をします。
app.post("/check", async function (req, res) {
  const promises = [];

  promises.push(mainLogic.checkInputData(req.body.selectJob));
  promises.push(workFieldDetailFecthAll(req.body.contractorId));
  promises.push(employeeFecthAll(req.body.contractorId));
  promises.push(contactFecthAll(req.body.contractorId));
  Promise.all(promises)
    .then(async function () {
      //promiseallだとresponseが空になっちゃうので、別に実行
      return await mainLogic.checkExistsData(
        req.body,
        employeeResponse,
        workFieldDetailResponse
      );
    })
    .then(async function () {
      return await attendanceManageFind(
        req.body.contractorId,
        req.body.employeeId
      );
    })
    .then(async function () {
      getAttendancePattern();
      getSelectAttendancePattern(attendanceManageResponse.attendancePatternId);
      var selectStatus = {};
      // 取得できない場合は、まだ出勤していないので「0：出勤」を設定
      if (attendanceManageResponse === undefined) {
        selectStatus = { text: "出勤", value: "0" };
      } else {
        selectStatus = getSelectStatus(attendanceManageResponse.status);
      }
      var statusList = getStatusList(selectStatus.value);
      var data = {
        selectStatus: selectStatus,
        selecAtttendancePattern: selecAtttendancePattern,
        statusList: statusList,
        attendancePatternList: attendancePatternList,
        contactResponse: contactResponse,
        noteContents: attendanceManageResponse.noteContents,
      };
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList = clientFieldLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});

//勤怠先入力情報の保存処理をします。
app.post("/save", async function (req, res) {
  const promises = [];

  promises.push(mainLogic.checkInputData(req.body.selectJob));
  promises.push(workFieldDetailFecthAll(req.body.contractorId));
  promises.push(employeeFecthAll(req.body.contractorId));
  Promise.all(promises)
    .then(async function () {
      //promiseallだとresponseが空になっちゃうので、別に実行
      return await mainLogic.checkExistsData(
        req.body,
        employeeResponse,
        workFieldDetailResponse
      );
    })
    .then(async function () {
      return await attendanceManageFind(
        req.body.contractorId,
        req.body.employeeId
      );
    })
    .then(async function () {
      return await attendanceManageUpdate(req.body);
    })
    .then(async function () {
      //返却用のdata
      var data = {
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList = clientFieldLogic.createSytemErrorMessage();
        res.status(500).json(err);
      }
    });
});

module.exports = app;
