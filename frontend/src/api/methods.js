import Api from './index'

export default {
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
  //
  // 自社設定画面
  //
  // 初期表示処理
  getOwnComapanyInfo () {
    return Api().post('/ownCompay')
  }
}
