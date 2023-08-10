import { createGlobalStyle } from "styled-components";
import MulishRegular from "./assets/fonts/Mulish-Regular.ttf";
import MulishSemiBold from "./assets/fonts/Mulish-SemiBold.ttf";
import MulishBold from "./assets/fonts/Mulish-Bold.ttf";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  @font-face {
        font-family: 'MulishRegular';
        src: local('MulishRegular'), local('MulishRegular');
        font-style: normal;
        src: url(${MulishRegular}) format('truetype');
  }
  @font-face {
        font-family: 'MulishSemiBold';
        src: local('MulishSemiBold'), local('MulishSemiBold');
        font-style: normal;
        src: url(${MulishSemiBold}) format('truetype');
  }
  @font-face {
        font-family: 'MulishBold';
        src: local('MulishBold'), local('MulishBold');
        font-style: normal;
        src: url(${MulishBold}) format('truetype');
  }
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 700;
      font-style: normal;
  }
  body, html {
    /* height: 100%; */
    margin: 0;
    padding: 0;
    background-color: #363740;
    font-family: "MulishRegular";
  }
  /* html {
    font-size: 10px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  } */
`;
export default GlobalStyle;
