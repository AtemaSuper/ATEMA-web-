import Api from './index'

export default {
  /*
    exsample画面
  */

  // exsample処理

  testPost () {
    const item = { text: 'Success!' }
    return Api().post('/test', item)
  },
  serviceTestGet () {
    return Api().get('/serviceTest')
  },
  ownWorkerAllService () {
    return Api().get('/ownWorkerAll')
  },
  // ログインテスト処理
  testLoginPosting () {
    const item = { id: 'AtemAdmin', password: '1234' }
    return Api().post('/user/login', item)
  },
  // ログイン確認処理（JSON）
  testProtectedPosting () {
    return Api().post('/user/protected')
  },
  // ログアウトテスト処理
  testlogoutPosting () {
    return Api().post('/user/logout')
  },
  // 他の処理も追加可能
  testNcmb () {
    return Api().post('/ncmb')
  },

  /*
    自社設定画面
  */

  // 初期表示処理
  getOwnComapanyInfo (contactId) {
    const item = {contactId: contactId}
    return Api().post('/ownCompany', item)
  },
  // 入力内容保存処理
  saveOwnCompanyInfo (param) {
    return Api().post('/ownCompany/save', param)
  },

  /*
    客先・現場編集画面
  */
  getWorkFieldInfo () {
    return Api().post('/workField')
  }
}
