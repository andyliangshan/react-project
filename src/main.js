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
import NProgress from 'nprogress';

import routes from './routes';
import rootReducer from './reducers';

import 'nprogress/nprogress.css';

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
  window.devToolsExtension ? window.devToolsExtension() : fn => fn
));

/**
 * sync history with redux store
 *
 * @type {Object}
 * @see https://github.com/reactjs/react-router-redux#history--synchistorywithstorehistory-store-options
 */
const history = syncHistoryWithStore(browserHistory, store);

/**
 * use nprogress
 * @param {Object} route
 */
function useNProgress(route) {
  let enter = route.onEnter;

  route.onEnter = function(...args) {
    enter && enter.apply(this, args);
    NProgress.start();
  };

  if (route.indexRoute && route.indexRoute.component) {
    let indexRouteEnter = route.indexRoute.onEnter;
    
    route.indexRoute.onEnter = function(...args) {
      indexRouteEnter && indexRouteEnter.apply(this, args);
      NProgress.start();
    };
  }
}

/**
 * create routes
 * @param  {Array} routeList
 * @return {Array}
 */
function processRoutes(routeList) {
  let newRoutes = [];

  for (let i = 0, route; route = routeList[i++];) {
    let newRoute = {...route};

    useNProgress(newRoute);

    if (Array.isArray(route.childRoutes)) {
      newRoute.childRoutes = processRoutes(route.childRoutes);
    }

    newRoutes.push(newRoute);
  }

  return newRoutes;
}

function createElement(Component, props) {
  NProgress.done();
  return (
    <Component {...props} />
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Router routes={processRoutes(routes)} history={history} createElement={createElement} />
  </Provider>,
  document.getElementById('app')
);
