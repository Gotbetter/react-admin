import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, html {
    /* height: 100%; */
    margin: 0;
    padding: 0;
    background-color: #363740;
  }
  /* html {
    font-size: 10px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  } */
`;
export default GlobalStyle;