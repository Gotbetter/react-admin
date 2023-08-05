import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
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
    font-family: "Pretendard-Regular";
  }
  /* html {
    font-size: 10px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  } */
`;
export default GlobalStyle;
