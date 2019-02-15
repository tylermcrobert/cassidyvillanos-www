import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
  }

  html,
  body {
    height: 100%;
  }

  body {
    font-family: 'helvetica neue', 'helvetica', sans-serif;
  }

  a,
  body {
    color: #141414;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
