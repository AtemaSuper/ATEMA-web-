const express = require("express");
const app = express();

//共通Logic
const CommonLogic = require("../logic/commonLogic");
var commonLogic = new CommonLogic();
//客先Logic
const AttendanceManageLogic = require("../logic/attendanceManageLogic");
var attendanceManageLogic = new AttendanceManageLogic();
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

var date = new Date();
var todayDate = commonLogic.createFormatDate(date);

var attendanceManageResponse = [];
var clientFieldResponse = [];
var contractorResponse = [];
var employeeResponse = [];
var workFieldResponse = [];
var workFieldDetailResponse = [];

var setWorkFieldDetail = {
  jobNo: String,
  clientFieldName: String,
  workFieldName: String,
  workFieldDetailName: String,
  contractStatus: Number,
  selectClientField: Object,
  selectWorkField: Object,
  selectWorkFieldDetail: Object,
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
};

const attendanceManageFecthAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    attendanceManageDao
      .fetchAll(contractorId)
      .then(function (items) {
        attendanceManageResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const attendanceManageFind = function (
  contractorId,
  specifiedDateRangeFrom,
  specifiedDateRangeTo
) {
  return new Promise(function (resolve, reject) {
    attendanceManageDao
      .find(contractorId, specifiedDateRangeFrom, specifiedDateRangeTo)
      .then(function (items) {
        attendanceManageResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const attendanceManageUpdate = function (
  contractorId,
  employeId,
  clumns,
  items
) {
  return new Promise(function (resolve, reject) {
    attendanceManageDao
      .singleUpdate(contractorId, employeId, clumns, items)
      .then(function (data) {
        checkResult = data.checkResult;
        messageList = data.messageList;
        resolve();
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const attendanceManageUpdateJobNo = function (param, workFieldDetailResponse) {
  return new Promise(function (resolve, reject) {
    var workFieldDetailId = "";
    if (param.fieldEditTab === 0) {
      workFieldDetailId = getWorkFieldDetailId(
        param.jobNo,
        workFieldDetailResponse
      );
    } else {
      workFieldDetailId = param.workFieldDetailId;
    }
    attendanceManageDao
      .singleUpdate(
        param.contractorId,
        param.employeeId,
        "workFieldDetailId",
        workFieldDetailId
      )
      .then(function (data) {
        checkResult = data.checkResult;
        messageList = data.messageList;
        resolve();
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });

  /**
   * JobNoをもとにworkFieldDetailIdを取得します。
   *
   * @param {String} jobNo
   * @param {Object} workFieldDetailResponse
   */
  function getWorkFieldDetailId(jobNo, workFieldDetailResponse) {
    var workFieldDetailId = "";
    for (var i = 0; i < workFieldDetailResponse.length; i++) {
      if (jobNo === workFieldDetailResponse[i].jobNo) {
        workFieldDetailId = workFieldDetailResponse[i].workFieldDetailId;
        break;
      }
    }
    return workFieldDetailId;
  }
};
/**
 * 契約IDをもとに自社情報を取得します。
 *
 * @param {string} contractorId 契約IDです。
 * @returns
 */
const ownCompanyFecthAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    contactDao
      .selectContactAll(contractorId)
      .then(function (items) {
        contractorResponse = items;
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

const joinAttendanceManage = function () {
  for (i = 0; i < attendanceManageResponse.length; i++) {
    setWorkFieldDetail = {};
    //userName
    for (var j = 0; j < employeeResponse.length; j++) {
      if (
        attendanceManageResponse[i].employeeId == employeeResponse[j].employeeId
      ) {
        attendanceManageResponse[i].userName =
          employeeResponse[j].employeeFirstname +
          employeeResponse[j].employeeLastname;
      }
    }

    //setWorkFieldDetail
    for (var k = 0; k < workFieldDetailResponse.length; k++) {
      if (
        attendanceManageResponse[i].workFieldDetailId ==
        workFieldDetailResponse[k].workFieldDetailId
      ) {
        setWorkFieldDetail.jobNo = workFieldDetailResponse[k].jobNo;
        setWorkFieldDetail.clientFieldName =
          workFieldDetailResponse[k].clientFieldName;
        setWorkFieldDetail.workFieldName =
          workFieldDetailResponse[k].workFieldName;
        setWorkFieldDetail.workFieldDetailName =
          workFieldDetailResponse[k].workFieldDetailName;
        setWorkFieldDetail.contractStatus =
          workFieldDetailResponse[k].contractStatus;
        setWorkFieldDetail.selectClientField = {
          clientFieldName: workFieldDetailResponse[k].clientFieldName,
          clientFieldId: workFieldDetailResponse[k].clientFieldId,
        };
        setWorkFieldDetail.selectWorkField = {
          workFieldName: workFieldDetailResponse[k].workFieldName,
          workFieldId: workFieldDetailResponse[k].workFieldId,
        };
        setWorkFieldDetail.selectWorkFieldDetail = {
          workFieldDetailName: workFieldDetailResponse[k].workFieldDetailName,
          workFieldDetailId: workFieldDetailResponse[k].workFieldDetailId,
        };
      }
      attendanceManageResponse[i].workFieldDetail = setWorkFieldDetail;
    }
  }
  return attendanceManageResponse;
};

/**
 * 出勤簿画面のService
 */

app.get("/", function (req, res) {});

app.post("/list", async function (req, res) {
  const promises = [];
  attendanceManageResponse = [];

  promises.push(
    attendanceManageFind(
      req.body.contractorId,
      req.body.specifiedDateRangeFrom,
      req.body.specifiedDateRangeTo
    )
  );
  promises.push(ownCompanyFecthAll(req.body.contractorId));
  promises.push(clientFieldFecthAll(req.body.contractorId));
  promises.push(employeeFecthAll(req.body.contractorId));
  promises.push(workFieldFecthAll(req.body.contractorId));
  promises.push(workFieldDetailFecthAll(req.body.contractorId));
  Promise.all(promises)
    .then(async function (result) {
      formatWorkFieldDetail();
      joinAttendanceManage();
      //日付を取得します。
      var date = new Date();
      var todayDate =
        date.getFullYear() +
        "-" +
        (Number(date.getMonth()) + 1) +
        "-" +
        date.getDate();
      var data = {
        attendanceManageResponse: attendanceManageResponse,
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
        contractorResponse: contractorResponse,
        todayDate: "2022-07-01",
      };
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json(err);
    });
});

app.put("/list/update", async function (req, res) {
  const promises = [];
  attendanceManageResponse = [];

  promises.push(attendanceManageLogic.checkInputData(req.body));
  promises.push(ownCompanyFecthAll(req.body.contractorId));
  promises.push(workFieldDetailFecthAll(req.body.contractorId));
  promises.push(employeeFecthAll(req.body.contractorId));
  promises.push(
    attendanceManageLogic.checkExistsData(
      req.body,
      employeeResponse,
      workFieldDetailResponse
    )
  );
  promises.push(workFieldFecthAll(req.body.contractorId));
  promises.push(clientFieldFecthAll(req.body.contractorId));
  promises.push(
    attendanceManageUpdate(
      req.body.contractorId,
      req.body.employeeId,
      req.body.clumns,
      req.body.items
    )
  );
  Promise.all(promises)
    .then(async function (result) {
      //promiseallで一緒にやると最新のデータとってきてくれなかったので、別に実行
      return attendanceManageFecthAll(req.body.contractorId);
    })
    .then(function (items) {
      formatWorkFieldDetail();
      joinAttendanceManage();
      //日付を取得します。
      var date = new Date();
      var todayDate =
        date.getFullYear() +
        "-" +
        (Number(date.getMonth()) + 1) +
        "-" +
        date.getDate();
      var data = {
        attendanceManageResponse: attendanceManageResponse,
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
        contractorResponse: contractorResponse,
        todayDate: "2022-07-01",
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

app.put("/list/updateJobNo", async function (req, res) {
  const promises = [];
  attendanceManageResponse = [];
  await attendanceManageLogic
    .checkInputJobNo(req.body)
    .then(function () {
      return workFieldDetailFecthAll(req.body.contractorId);
    })
    .then(function () {
      return employeeFecthAll(req.body.contractorId);
    })
    .then(function () {
      //promiseallだとworkFieldDetailResponseが空になっちゃうので、別に実行
      promises.push(
        attendanceManageLogic.checkExistsJobNo(
          req.body,
          employeeResponse,
          workFieldDetailResponse
        )
      );
      promises.push(ownCompanyFecthAll(req.body.contractorId));
      promises.push(workFieldFecthAll(req.body.contractorId));
      promises.push(clientFieldFecthAll(req.body.contractorId));
      promises.push(
        attendanceManageUpdateJobNo(req.body, workFieldDetailResponse)
      );
      return Promise.all(promises);
    })
    .then(async function (result) {
      //promiseallで一緒にやると最新のデータとってきてくれなかったので、別に実行
      return attendanceManageFecthAll(req.body.contractorId);
    })
    .then(function (items) {
      formatWorkFieldDetail();
      joinAttendanceManage();
      var data = {
        attendanceManageResponse: attendanceManageResponse,
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
        contractorResponse: contractorResponse,
        todayDate: todayDate,
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

app.get("/test", function (req, res) {
  attendanceManageFind();
  res.status(200).json();
});

module.exports = app;
