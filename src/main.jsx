import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body{
    background: #323334;
    min-height: 100vh;
    color: white;
    font-family: "Inter", sans-serif;
  }
;
`
ReactDOM.render(
  <React.StrictMode>
    <Global/>
  <App />
  </React.StrictMode>,
  document.getElementById('root')
  );
