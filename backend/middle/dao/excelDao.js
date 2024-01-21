"use strict";

const admin = require("firebase-admin");
const exceljs = require("exceljs");

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
class StubDao {
  /**
   * 指定したコレクションからドキュメントを取得してExcel形式で返します。
   * @param {object} collectionName 取得したいコレクション名です。
   * @param {object} documentName 取得したいドキュメント名です。
   * @returns {Promise<Buffer>} Excel形式のデータ
   */
  async excelDownload() {
    const db = admin.firestore();
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    const docRef = db.collection("attendance").doc("00000001");

    try {
      const querySnapshot = await docRef.collection("2022-07-01").get();
      console.log(querySnapshot);

      querySnapshot.forEach((attendanceDetail) => {
        const data = attendanceDetail.data();
        worksheet.addRow(data);
      });
      const buffer = await workbook.xlsx.writeBuffer();
      return buffer;
    } catch (error) {
      console.error("Error getting subdocuments: ", error);
      throw error;
    }
  }
}

module.exports = StubDao;
