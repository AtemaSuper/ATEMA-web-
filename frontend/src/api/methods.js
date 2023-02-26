import Api from "./index";

export default {
  /*
    exsample画面
  */

  // exsample処理

  /*
    出退勤管理画面
    attendanceManege
  */

  // 初期表示処理
  findAttendanceListAsync(
    contractorId,
    specifiedDateRangeFrom,
    specifiedDateRangeTo
  ) {
    const item = {
      contractorId: contractorId,
      specifiedDateRangeFrom: specifiedDateRangeFrom,
      specifiedDateRangeTo: specifiedDateRangeTo
    };
    return Api().post("/attendanceManage/list", item);
  },
  // 更新
  updateAttendanceListAsync(contractorId, employeeId, clumns, items) {
    const item = {
      contractorId: contractorId,
      employeeId: employeeId,
      clumns: clumns,
      items: items
    };
    return Api().put("/attendanceManage/list/update", item);
  },
  // 更新
  updateJobNo(
    contractorId,
    employeeId,
    fieldEditTab,
    jobNo,
    workFieldDetailId
  ) {
    const item = {
      contractorId: contractorId,
      employeeId: employeeId,
      fieldEditTab: fieldEditTab,
      jobNo: jobNo,
      workFieldDetailId: workFieldDetailId
    };
    return Api().put("/attendanceManage/list/updateJobNo", item);
  },

  auth() {
    return Api().post("/auth");
  },

  testPost() {
    const item = { text: "Success!" };
    return Api().post("/test", item);
  },
  serviceTestGet() {
    return Api().get("/serviceTest");
  },
  ownWorkerAllService() {
    return Api().get("/ownWorkerAll");
  },

  /*
    スタブ
  */
  // スタブデータ追加
  stubImport(collectionName, documentName) {
    const item = { collectionName: collectionName, documentName: documentName };
    return Api().post("/stub", item);
  },

  /*
    ログイン画面
  */
  // ログインユーザ情報取得処理
  loginGetUserInfo(employeeId) {
    const item = { employeeId: employeeId };
    return Api().post("/login/getUserInfo", item);
  } /*
    自社設定画面
  */,

  // 初期表示処理
  getOwnComapanyInfo(contractorId) {
    const item = { contractorId: contractorId };
    return Api().post("/ownCompany", item);
  },
  // 入力内容保存処理
  saveOwnCompanyInfo(param) {
    return Api().post("/ownCompany/save", param);
  },

  /*
    工事編集画面
  */
  // 初期表示処理
  getWorkFieldInfo(contractorId) {
    const item = { contractorId: contractorId };
    return Api().post("/workField", item);
  },
  // 入力内容保存処理
  saveWorkFieldInfo(param) {
    return Api().post("/workField/save", param);
  },
  // 削除処理
  deleteWorkFieldInfo(param) {
    return Api().post("/workField/delete", param);
  },
  /*
    客先・現場編集画面
  */
  // 初期表示処理
  getClientFieldInfo(contractorId) {
    const item = { contractorId: contractorId };
    return Api().post("/clientField", item);
  },
  // 入力内容保存処理(客先)
  saveClientField(param) {
    return Api().post("/clientField/saveClientField", param);
  },
  // 入力内容保存処理(現場)
  saveWorkField(param) {
    return Api().post("/clientField/saveWorkField", param);
  },
  // 削除処理(客先)
  deleteClientField(param) {
    return Api().post("/clientField/deleteClientField", param);
  },
  // 削除処理(現場)
  deleteWorkField(param) {
    return Api().post("/clientField/deleteWorkField", param);
  },
  /*
    自社員管理画面
  */
  // 初期表示処理
  getEmployeeInfo(contractorId) {
    const item = { contractorId: contractorId };
    return Api().post("/ownWorkerAll", item);
  },
  // 入力内容保存処理(自社員)
  saveEmployee(param) {
    return Api().post("/ownWorkerAll/saveEmployee", param);
  },
  // 入力内容保存処理(役職)
  savePost(param) {
    return Api().post("/ownWorkerAll/savePost", param);
  },
  // 削除処理(自社員)
  deleteEmployee(param) {
    return Api().post("/ownWorkerAll/deleteEmployee", param);
  },
  // 削除処理(役職)
  deletePost(param) {
    return Api().post("/ownWorkerAll/deletePost", param);
  },
  /*
    協力会社管理画面
  */
  // 初期表示処理
  getSubCompanyInfo(contractorId) {
    const item = { contractorId: contractorId };
    return Api().post("/subCompanyAll", item);
  },
  // 入力内容保存処理(協力会社)
  saveSubCompany(param) {
    return Api().post("/subCompanyAll/saveSubCompany", param);
  },
  // 入力内容保存処理(協力会社員)
  saveSubEmployee(param) {
    return Api().post("/subCompanyAll/saveSubEmployee", param);
  },
  // 削除処理(協力会社)
  deleteSubCompany(param) {
    return Api().post("/subCompanyAll/deleteSubCompany", param);
  },
  // 削除処理(協力会社員)
  deleteSubEmployee(param) {
    return Api().post("/subCompanyAll/deleteSubEmployee", param);
  },
  /*
    通知管理画面
  */
  // 初期表示処理
  getAlertInfo(contractorId) {
    const item = { contractorId: contractorId };
    return Api().post("/contactBox", item);
  },
  // 入力内容保存処理
  saveStatus(param) {
    return Api().post("/contactBox/saveStatus", param);
  },
  /*
    トップ画面（勤怠入力）
  */
  // 勤怠入力ダイアログ初期表示処理
  getAttendance(contractorId, employeeId) {
    const item = { contractorId: contractorId, employeeId: employeeId };
    return Api().post("/main/showAttendanceDialog", item);
  },
  // 勤怠先入力チェック処理
  checkAttendance(param) {
    return Api().post("/main/check", param);
  },
  // 勤怠先入力保存処理
  saveAttendance(param) {
    return Api().post("/main/save", param);
  }
};
