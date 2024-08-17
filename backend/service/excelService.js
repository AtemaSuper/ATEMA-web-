const express = require("express");
const app = express();

const ExcelDao = require("../middle/dao/excelDao");
const excelDao = new ExcelDao();
const dayjs = require("dayjs");

//従業員テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();

//従業員テーブル
const AttendanceDao = require("../middle/dao/attendanceDao");
var attendancaDao = new AttendanceDao();

/**
 * csv service
 */

app.use("/", async function (req, res) {
  console.log(req.query);
  const contractorId = req.query.contractorId;
  const employeeIds = req.query.employeeIds;
  // TODO: targetYearMonthから年と月を分ける
  const targetyear = 2023;
  const targetMonth = 12;
  // 日付のリストを生成
  const dates = generateDates(targetyear, targetMonth);
  const employeeList = [];
  for (const employeeId of employeeIds) {
    const employeeName = await employeeDao.selectEmployeeName(
      contractorId,
      employeeId
    );

    // `employeeList` に新しいオブジェクトを追加
    employeeList.push({
      employeeId: employeeId, // employeeIdをオブジェクト内に持たせる
      employeeName: employeeName, // 取得したemployeeNameを設定
      attendanceList: [], // attendanceListを空の配列で初期化
    });
  }

  await attendancaDao
    .fetchMonthlyData(
      contractorId,
      employeeList,
      dates[0],
      dates[dates.length - 1]
    )
    .then((employeeAttendanceList) => {
      console.log("取得したデータ: ", employeeAttendanceList);

      // エクセル帳票を作る
      // データをバインドする
      excelDao
        .excelDownload(dates, employeeAttendanceList)
        .then(async (result) => {
          res.type(result.type);
          result.arrayBuffer().then((buf) => {
            res.send(Buffer.from(buf));
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json();
        });
    })
    .catch((error) => {
      console.error("エラーが発生しました: ", error);
    });
});

// 指定された月の全ての日付を生成する関数
function generateDates(year, month) {
  const dates = [];
  let date = dayjs(`${year}-${month}-01`);

  while (date.month() === month - 1) {
    dates.push(date.format());
    date = date.add(1, "day");
  }

  return dates;
}

module.exports = app;
