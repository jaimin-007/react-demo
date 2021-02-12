
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LocalizeProvider } from "react-localize-redux";
import App from './App';
import { Provider } from 'react-redux';
import { AppStore } from './store/AppStore';
//import '@babel/polyfill'
import 'react-app-polyfill/ie11';
import HttpsRedirect from 'react-https-redirect';
import './styles/reduction.scss';

const Main = props => (
  <div>
    <LocalizeProvider>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </LocalizeProvider>
  </div>
);
ReactDOM.render((
  <Provider store={AppStore}>
    <HttpsRedirect>
      <Main />
    </HttpsRedirect>
  </Provider>
), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
