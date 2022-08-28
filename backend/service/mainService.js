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

var attendanceManageResponse = [];
var clientFieldResponse = [];
var contractorResponse = [];
var employeeResponse = [];
var workFieldResponse = [];
var workFieldDetailResponse = [];
var selectJob = {};

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

const setSelectJob = function () {
  for (var i = 0; i < workFieldDetailResponse.length; i++) {
    if (employeeResponse.jobNo == workFieldDetailResponse[i].jobNo) {
      setWorkFieldDetail.jobNo = workFieldDetailResponse[i].jobNo;
      setWorkFieldDetail.clientFieldName =
        workFieldDetailResponse[i].clientFieldName;
      setWorkFieldDetail.workFieldName =
        workFieldDetailResponse[i].workFieldName;
      setWorkFieldDetail.workFieldDetailName =
        workFieldDetailResponse[i].workFieldDetailName;
      setWorkFieldDetail.contractStatus =
        workFieldDetailResponse[i].contractStatus;
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
      };
      selectJob = setWorkFieldDetail;
      break;
    }
  }
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
      //日付を取得します。
      var date = new Date();
      var todayDate =
        date.getFullYear() +
        "-" +
        (Number(date.getMonth()) + 1) +
        "-" +
        date.getDate();
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
        selectJob: selectJob,
        todayDate: "2022-07-01",
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

  promises.push(mainLogic.checkInputData(req.body));
  promises.push(ownCompanyFecthAll(req.body.contractorId));
  promises.push(workFieldDetailFecthAll(req.body.contractorId));
  promises.push(employeeFecthAll(req.body.contractorId));
  promises.push(
    mainLogic.checkExistsData(
      req.body,
      employeeResponse,
      workFieldDetailResponse
    )
  );
  promises.push(workFieldFecthAll(req.body.contractorId));
  promises.push(clientFieldFecthAll(req.body.contractorId));
  promises.push(clientFieldFecthAll(req.body.contractorId));

  Promise.all(promises)
    .then(function (items) {
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
//勤怠先入力情報の保存処理をします。
app.post("/save", async function (req, res) {});

// app.get("/findclientField", async function (req, res) {
//   await clientField
//     .selectClientFieldAll()
//     .then(async function (result) {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// app.get("/findWorkField", async function (req, res) {
//   await workField
//     .findWorkField(req.body.objectId)
//     .then(async function (result) {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// app.get("/findWorkFieldDetail", async function (req, res) {
//   await workFieldDetail
//     .findWorkFieldDetail(req.body.objectId)
//     .then(async function (result) {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// app.post("/registerAttendance", async function (req, res) {
//   await attendance
//     .registerAttendance(
//       "smO9DRbq1AaLFOuX",
//       {
//         attendanceStatus: 0,
//         workTimeClumn: "start",
//         workTime: {
//           type: "Date",
//           iso: "2022-02-26T15:00:00.000Z",
//         },
//       },
//       ["2022-02-26T15:00:00.000Z", "2022-02-27T14:59:59.999Z"],
//       ["2022-02-26T15:00:00.000Z", "2022-02-28T14:59:59.999Z"]
//       //   req.body.userObjectId,
//       //   req.body.attendanceData,
//       //   req.body.specifiedDateRangeOfStart,
//       //   req.body.specifiedDateRangeOfEnd
//     )
//     .then(async function (result) {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

module.exports = app;
