import axios from "axios";

axios.defaults.withCredentials = true;
//const accessToken = localStorage.getItem('access_token');
const instance = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true, // 쿠키나 인증 정보를 포함해서 요청함 허용
  //headers: { Authorization: `Bearer ${accessToken}`},
});

export default instance;