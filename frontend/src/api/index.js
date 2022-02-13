import axios from 'axios'

export default () => {
  return axios.create({
    // APIべーすURL
    baseURL: `http://localhost:3000/`,
    // 異なるポート間でCookieを保存するために必要
    withCredentials: true
  })
}
