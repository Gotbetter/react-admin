import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginTokenState } from "../recoil/login/loginTokenState";
import format from 'pretty-format';

axios.defaults.withCredentials = true;
//const accessToken = localStorage.getItem('access_token');
export const client = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true, // 쿠키나 인증 정보를 포함해서 요청함 허용
  //headers: { Authorization: `Bearer ${accessToken}`},
});

client.interceptors.request.use(async (config) => {
  if (!config.headers) {
    return config;
  }

  if (config.url === 'users/login/admin') {
    return config;
  }

  const loginToken = useRecoilValue(loginTokenState);
  let token = null;
  if (config.url === '/users/reissue') {
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
    if (config.url === `/users/reissue` || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    /** 2 */
    config.sent = true;

    const [loginToken, setLoginToken] = useRecoilState(loginTokenState);
    const refresh_token = loginToken.refreshToken;

    try {
      const accessToken = await refreshToken(refresh_token, setLoginToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return client(config);
    } catch (err) {
      console.log(format(err.response));
    }
  },
);

const refreshToken = async (refreshToken, setLoginToken) => {
  console.log('refresh access_token');

  const {
    data: { access_token, refresh_token },
  } = await client
    .post(
      `/users/reissue`,
      {},
      {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    )
    .catch((err) => {
      console.log(err);
    });

  setLoginToken({
    accessToken: access_token,
    refreshToken: refresh_token
  })

  return access_token;
};