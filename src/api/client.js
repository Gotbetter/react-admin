import axios from "axios";

axios.defaults.withCredentials = true;
export const client = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true, // 쿠키나 인증 정보를 포함해서 요청함 허용
});

client.interceptors.request.use(async (config) => {
  if (!config.headers) {
    return config;
  }

  if (config.url === "users/login") {
    return config;
  }

  const sessionSearch = window.sessionStorage.getItem("sessionStorage");
  const loginToken = JSON.parse(sessionSearch).loginToken;
  let token = null;

  if (config.url === "users/reissue") {
    token = loginToken.refreshToken;
  } else {
    token = loginToken.accessToken;
  }

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    /** 1 */
    if (config.url === `users/reissue` || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    /** 2 */
    config.sent = true;

    return client(config);
  }
);
