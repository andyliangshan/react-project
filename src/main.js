import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { hot } from 'react-hot-loader';

import { createSagaPromiseMiddleware } from '@/shared/redux-helpers';
import rootReducer from '@/modules/reducers';
import rootSaga from '@/modules/sagas';
import App from './containers/App';

const sagaMiddleware = createSagaMiddleware();

/**
 * initial state tree
 * @type {Object}
 */
let initialState = {};

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

/**
 * redux store
 * @type {Object}
 * @see http://redux.js.org/docs/api/createStore.html
 */
let store = createStore(rootReducer, initialState, composeEnhancers(
  applyMiddleware(createSagaPromiseMiddleware(), sagaMiddleware)
));

sagaMiddleware.run(rootSaga);

const WrappedApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <WrappedApp />,
  document.getElementById('app')
);

export default hot(module)(WrappedApp);
