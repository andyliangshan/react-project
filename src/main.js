import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import NProgress from 'nprogress';
import { hot } from 'react-hot-loader';

import routes from 'routes';
import rootReducer from 'modules/reducers';
import rootSaga from 'modules/sagas';

import 'nprogress/nprogress.css';

/**
 * 装饰路由，添加进度条展示
 * @param {Object} route 旧路由
 * @return {Object} 新路由
 */
function decorateRoute(route) {
  let newRoute = { ...route };

  let enter = newRoute.onEnter;

  newRoute.onEnter = function(...args) {
    enter && enter.apply(this, args);
    NProgress.start();
  };

  if (newRoute.indexRoute && newRoute.indexRoute.component) {
    let indexRouteEnter = newRoute.indexRoute.onEnter;

    newRoute.indexRoute.onEnter = function(...args) {
      indexRouteEnter && indexRouteEnter.apply(this, args);
      NProgress.start();
    };
  }

  return newRoute;
}

/**
 * apply NProgress
 * @param {Array} routeList
 * @return {Array} 应用过 NProgress 插件的路由列表
 */
function applyNProgress(routeList) {
  let newRoutes = [];

  for (let i = 0, route; route = routeList[i++];) {
    let newRoute = decorateRoute(route);

    if (Array.isArray(route.childRoutes)) {
      newRoute.childRoutes = applyNProgress(route.childRoutes);
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

const sagaMiddleware = createSagaMiddleware();

/**
 * initial state tree
 * @type {Object}
 */
let initialState = {};

/**
 * redux store
 * @type {Object}
 * @see http://redux.js.org/docs/api/createStore.html
 */
let store = createStore(rootReducer, initialState, compose(
  applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : fn => fn
));

sagaMiddleware.run(rootSaga);

/**
 * sync history with redux store
 * @type {Object}
 * @see https://github.com/reactjs/react-router-redux#history--synchistorywithstorehistory-store-options
 */
const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={applyNProgress(routes)} createElement={createElement} />
  </Provider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default hot(module)(App);
