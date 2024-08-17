"use strict";
const admin = require("firebase-admin");
const exceljs = require("exceljs");
const { Blob } = require("buffer");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const dayjs = require("dayjs");

if (admin.apps.length === 0) {
  const serviceAccount = require("../../atema-develop-firebase-adminsdk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const stubData = require("../../stub/data.json");

/**
 * Excelダウンロード用のDaoクラスです。
 */
class ExcelDao {
  /**
   * 指定したコレクションからドキュメントを取得してExcel形式で返します。
   * @param {object} collectionName 取得したいコレクション名です。
   * @param {object} documentName 取得したいドキュメント名です。
   * @returns {Promise<Blob>} Excel形式のデータ
   */
  async excelDownload(dates, employeeAttendanceList) {
    // 1. 各種定義
    const { Storage } = require("@google-cloud/storage");
    const storage = new Storage({
      keyFilename: "atema-develop-firebase-adminsdk.json",
    });
    const bucket = storage.bucket("gs://atema-develop.appspot.com");
    const file = bucket.file("excel/Template.xlsx");
    const expires = Date.now() + 1000 * 60 * 60; // URLの有効期限は1時間後
    const localFilePath = path.join(__dirname, "downloaded-file.xlsx");

    // 署名付きのURLを発行
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: expires, // Set expiration date for the URL
    });

    // 3. URL からダウンロードして、レスポンスを得る
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync(localFilePath, buffer);

    // 4. Excelファイルを編集用に読み込む
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(localFilePath);

    //　TODO: 個人ごとシート分けできるようにする

    var ws1 = workbook.getWorksheet(1);
    let copySheet = workbook.addWorksheet("newdemo");

    copySheet.model = Object.assign(ws1.model, {
      mergeCells: ws1.model.merges,
    });
    copySheet.name = "new demo";

    console.log(employeeAttendanceList[1].attendanceList[0]);
    // // TODO: 個人ごとシート分けできるようにする
    // for (const employee of employeeAttendanceList) {
    //   let sheetToClone = workbook.getWorksheet(1);
    //   let copySheet = workbook.addWorksheet(employee.employeeName);
    //   copySheet.model = sheetToClone.model;
    // }

    // 5. Excelファイルを編集
    const worksheet = workbook.getWorksheet(1); // 1番目のシートを取得
    // 5-1 . すべてのセルをスキャンして{year_month}を置換する
    await addYearMonth(worksheet);

    // 5-2 . A列すべてのセルをスキャンして{day}を置換する
    await addDays(worksheet, dates);

    // 次回やること　→　ひとまずエクセルに値をバインドする

    await workbook.xlsx.writeFile(localFilePath);

    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      return blob;
    } catch (error) {
      console.error("Error getting subdocuments: ", error);
      throw error;
    }
  }
}

// 与えられたDatesから日付をシートに反映する
async function addDays(sheet, dates) {
  let dateIndex = 0;

  /// A列すべてのセルをスキャンして{day}を置換する
  await sheet.eachRow((row, rowNumber) => {
    const cell = row.getCell(1); // A列のセルを取得する（ここでは1を指定しているが、必要に応じて調整する）
    if (cell.value && cell.value.includes("{day}")) {
      if (dateIndex < dates.length) {
        cell.value = cell.value.replace(
          "{day}",
          dayjs(dates[dateIndex]).format("D")
        );
        dateIndex++; // 次の日付に進む
      } else {
        // 日付が足りない場合は空白にするなど、適切な処理を行う
        cell.value = ""; // 例として空白にする
      }
    }
  });
}

// 年月を入れる
async function addYearMonth(sheet) {
  /// A列すべてのセルをスキャンして{day}を置換する
  await sheet.eachRow((row, rowNumber) => {
    const cell = row.getCell(rowNumber); // A列のセルを取得する
    if (cell.value && cell.value.includes("{year_month}")) {
      cell.value = cell.value.replace(
        "{year_month}",
        dayjs("2023/12").format("YYYY年MM月")
      );
    }
  });
}

module.exports = ExcelDao;
