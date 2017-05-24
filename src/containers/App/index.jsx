import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from 'routes';
import NProgress from 'nprogress';

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

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const {
      store,
      history
    } = this.props;

    return (
      <Provider store={store}>
        <Router history={history} routes={applyNProgress(routes)} createElement={createElement} />
      </Provider>
    );
  }
}
