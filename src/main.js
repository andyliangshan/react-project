/**
 * Application entry
 * @date 2016/07/12
 * @author evan2x(evan2zaw@gmail.com)
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';

import routes from './routes';
import rootReducer from './reducers';

/**
 * initial state tree
 *
 * @type {Object}
 */
let initialState = {};

/**
 * redux store
 *
 * @type {Object}
 * @see http://redux.js.org/docs/api/createStore.html
 */
let store = createStore(rootReducer, initialState, compose(
  applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : (fn) => fn
));

/**
 * sync history with redux store
 *
 * @type {Object}
 * @see https://github.com/reactjs/react-router-redux#history--synchistorywithstorehistory-store-options
 */
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('app')
);
