import axios from "axios";

export default () => {
  const instance = axios.create({
    // APIべーすURL
    baseURL: `http://localhost:3000/`,
    // 異なるポート間でCookieを保存するために必要
    withCredentials: true
  });

  instance.interceptors.request.use(function(config) {
    const localStorageAccessToken = JSON.parse(
      localStorage.getItem("accessToken")
    );
    const token = localStorageAccessToken.authentication.accessToken;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};
