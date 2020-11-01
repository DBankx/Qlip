import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/layout/App';
import * as serviceWorker from './serviceWorker';
// ======== prime react css =============
import 'primereact/resources/themes/arya-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "./application/layout/index.css";
// ========= routing ================
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();


ReactDOM.render(
      <Router history={history}>
    <App />
      </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
