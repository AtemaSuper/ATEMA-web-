const express = require("express");
const app = express();

const attendanceManageDao = require("../middle/dao/attendanceDao");
const clientFieldDao = require("../middle/dao/clientFieldDao");
const workFieldDao = require("../middle/dao/workFieldDao");
const workFieldDetailDao = require("../middle/dao/workFieldDetailDao");

const attendance = new attendanceManageDao();
const clientField = new clientFieldDao();
const workField = new workFieldDao();
const workFieldDetail = new workFieldDetailDao();

var clientFieldAll = [];
var workFieldAll = [];
var workFieldDetailAll = [];

// const exampleDao = require('../middle/dao/exampleDao')
// var exampleDao = new exampleDao()

/**
 * トップ画面のService
 */

app.get("/", function (req, res) {
  res.status(200);
});

app.get("/findclientField", async function (req, res) {
  await clientField
    .selectClientFieldAll()
    .then(async function (result) {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/findWorkField", async function (req, res) {
  await workField
    .findWorkField(req.body.objectId)
    .then(async function (result) {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/findWorkFieldDetail", async function (req, res) {
  await workFieldDetail
    .findWorkFieldDetail(req.body.objectId)
    .then(async function (result) {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.post("/registerAttendance", async function (req, res) {
  await attendance
    .registerAttendance(
      "smO9DRbq1AaLFOuX",
      {
        attendanceStatus: 0,
        workTimeClumn: "start",
        workTime: {
          type: "Date",
          iso: "2022-02-26T15:00:00.000Z",
        },
      },
      ["2022-02-26T15:00:00.000Z", "2022-02-27T14:59:59.999Z"],
      ["2022-02-26T15:00:00.000Z", "2022-02-28T14:59:59.999Z"]
      //   req.body.userObjectId,
      //   req.body.attendanceData,
      //   req.body.specifiedDateRangeOfStart,
      //   req.body.specifiedDateRangeOfEnd
    )
    .then(async function (result) {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = app;
