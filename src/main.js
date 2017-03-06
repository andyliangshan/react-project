import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import rootReducer from 'reducers';
import rootSaga from 'sagas';
import App from 'containers/App';

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

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component history={history} store={store} />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('containers/App', () => render(App));
}
