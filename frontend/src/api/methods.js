import Api from "./index";

export default {
  /*
    exsample画面
  */

  // exsample処理

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
  // ログインテスト処理
  testLoginPosting() {
    const item = { id: "AtemAdmin", password: "1234" };
    return Api().post("/user/login", item);
  },
  // ログイン確認処理（JSON）
  testProtectedPosting() {
    return Api().post("/user/protected");
  },
  // ログアウトテスト処理
  testlogoutPosting() {
    return Api().post("/user/logout");
  },
  // 他の処理も追加可能
  testNcmb() {
    return Api().post("/ncmb");
  },

  /*
    自社設定画面
  */

  // 初期表示処理
  getOwnComapanyInfo(contactId) {
    const item = { contactId: contactId };
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
  getWorkFieldInfo() {
    return Api().post("/workField");
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
  getClientFieldInfo() {
    return Api().post("/clientField");
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
  getEmployeeInfo() {
    return Api().post("/ownWorkerAll");
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
  getSubCompanyInfo() {
    return Api().post("/subCompanyAll");
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
  getAlertInfo() {
    return Api().post("/contactBox");
  }
};
