import Api from './index'

export default {
  testPosting () {
    const item = { id: 'AtemAdmin', password: '1234' }
    return Api().post('/login', item)
  }
  // 他の処理も追加可能
}
