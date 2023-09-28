import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --color-black: #000;
    --color-white: #fff;

    --vh: 1dvh;
  }
  @supports not (height: 1dvh) {
    --vh: 1vh;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: currentColor;
    -webkit-overflow-scrolling: touch;
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  html {
    height: 100%;
    min-width: 350px;
    display: flex;
    flex-direction: column;
  }
  body, #root {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
  button, select {
    border: none;
    background: none;
    cursor: pointer;
    &:disabled {
      -webkit-text-fill-color: currentColor;
      opacity: 1;
      cursor: not-allowed;
    }
  }
  input, textarea {
    border: none;
    background: none;
    &:disabled {
      -webkit-text-fill-color: currentColor;
      opacity: 1;
      cursor: not-allowed;
    }
  }
`;
