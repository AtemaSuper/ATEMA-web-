const express = require("express");
const user = require("ncmb/lib/user");
const app = express();

const attendanceManageDao = require("../middle/dao/attendanceDao");
const clientFieldDao = require("../middle/dao/clientFieldDao");
const employeeDao = require("../middle/dao/employeeDao");
const workFieldDao = require("../middle/dao/workFieldDao");
const workFieldDetailDao = require("../middle/dao/workFieldDetailDao");

const attendanceManage = new attendanceManageDao();
const clientField = new clientFieldDao();
const employee = new employeeDao();
const workField = new workFieldDao();
const workFieldDetail = new workFieldDetailDao();

var attendanceManageFecthResults = [];
var clientFieldAll = [];
var employeeAll = [];
var workFieldAll = [];
var workFieldDetailAll = [];

var setWorkFieldDetail = {
  jobNo: String,
  workName: String,
  clientFieldName: String,
  workFieldName: String,
  contractStatus: Number,
};

const attendanceManageFecthAll = function () {
  return new Promise(function (resolve, reject) {
    attendanceManage
      .fetchAll()
      .then(function (items) {
        attendanceManageFecthResults = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const attendanceManageFind = function (
  specifiedDateRangeFrom,
  specifiedDateRangeTo
) {
  return new Promise(function (resolve, reject) {
    attendanceManage
      .find(specifiedDateRangeFrom, specifiedDateRangeTo)
      .then(function (items) {
        attendanceManageFecthResults = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const attendanceManageUpdate = function (objectId, clumns, items) {
  return new Promise(function (resolve, reject) {
    attendanceManage
      .update(objectId, clumns, items)
      .then(function (items) {
        attendanceManageFecthResults[0] = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const clientFieldFecthAll = function () {
  return new Promise(function (resolve, reject) {
    clientField
      .selectClientFieldAll()
      .then(function (items) {
        clientFieldAll = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const employeeFecthAll = function () {
  return new Promise(function (resolve, reject) {
    employee
      .selectEmployeeAll()
      .then(function (items) {
        employeeAll = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const workFieldAllFecthAll = function () {
  return new Promise(function (resolve, reject) {
    workField
      .selectWorkFieldAll()
      .then(function (items) {
        workFieldAll = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const workFieldDetailFecthAll = function () {
  return new Promise(function (resolve, reject) {
    workFieldDetail
      .selectWorkFieldDetailAll()
      .then(function (items) {
        workFieldDetailAll = items;
        resolve(items);
      })
      .catch(function (err) {
        console.log(err, reject);
      });
  });
};

const formatWorkFieldDetail = function () {
  for (i = 0; i < workFieldDetailAll.length; i++) {
    //clientField
    for (j = 0; j < clientFieldAll.length; j++) {
      if (workFieldDetailAll[i].clientFieldId == clientFieldAll[j].objectId) {
        workFieldDetailAll[i].clientFieldName =
          clientFieldAll[j].clientFieldName;
      }
    }
    //workField
    for (j = 0; j < workFieldAll.length; j++) {
      if (workFieldDetailAll[i].workId == workFieldAll[j].objectId) {
        workFieldDetailAll[i].workName = workFieldAll[j].workName;
      }
    }
  }
};

const joinAttendanceManage = function () {
  for (i = 0; i < attendanceManageFecthResults.length; i++) {
    setWorkFieldDetail = {};
    //userName
    for (j = 0; j < employeeAll.length; j++) {
      if (
        attendanceManageFecthResults[i].employeeId == employeeAll[j].objectId
      ) {
        attendanceManageFecthResults[i].userName =
          employeeAll[j].employeeFirstname + employeeAll[j].employeeLastname;
      }
    }

    //setWorkFieldDetail
    for (j = 0; j < workFieldDetailAll.length; j++) {
      if (
        attendanceManageFecthResults[i].workFieldDetailId ==
        workFieldDetailAll[j].objectId
      ) {
        setWorkFieldDetail.jobNo = workFieldDetailAll[j].jobNo;
        setWorkFieldDetail.clientFieldName =
          workFieldDetailAll[j].clientFieldName;
        setWorkFieldDetail.workName = workFieldDetailAll[j].workName;
        setWorkFieldDetail.workFieldName = workFieldDetailAll[j].workFieldName;
        setWorkFieldDetail.contractStatus =
          workFieldDetailAll[j].contractStatus;
      }
      attendanceManageFecthResults[i].workFieldDetail = setWorkFieldDetail;
    }
  }
  return attendanceManageFecthResults;
};

/**
 * 出勤簿画面のService
 */

app.get("/", function (req, res) {});

app.post("/list", async function (req, res) {
  const promises = [];
  attendanceManageFecthResults = [];
  promises.push(
    attendanceManageFind(
      req.body.specifiedDateRangeFrom,
      req.body.specifiedDateRangeTo
    )
  );
  promises.push(clientFieldFecthAll());
  promises.push(employeeFecthAll());
  promises.push(workFieldAllFecthAll());
  promises.push(workFieldDetailFecthAll());
  Promise.all(promises)
    .then(async function (result) {
      formatWorkFieldDetail();
      joinAttendanceManage();
      res.status(200).json(attendanceManageFecthResults);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.put("/list/update", async function (req, res) {
  const promises = [];
  attendanceManageFecthResults = [];
  promises.push(
    attendanceManageUpdate(req.body.objectId, req.body.clumns, req.body.items)
  );
  promises.push(clientFieldFecthAll());
  promises.push(employeeFecthAll());
  promises.push(workFieldAllFecthAll());
  promises.push(workFieldDetailFecthAll());
  Promise.all(promises)
    .then(async function (result) {
      formatWorkFieldDetail();
      joinAttendanceManage();
      res.status(200).json(attendanceManageFecthResults);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/test", function (req, res) {
  attendanceManageFind();
  res.status(200).json();
});

module.exports = app;
