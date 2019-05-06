import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createSagaPromiseMiddleware } from '@/shared/redux-helpers';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

/**
 * initial state tree
 * @type {Object}
 */
let initialState = {};

/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * redux store
 * @type {Object}
 * @see http://redux.js.org/docs/api/createStore.html
 */
const store = createStore(rootReducer, initialState, composeEnhancers(
  applyMiddleware(createSagaPromiseMiddleware(), sagaMiddleware)
));

sagaMiddleware.run(rootSaga);

export default store;
