import { handleActions } from 'redux-actions';

import {
  REQUEST_REPOS,
  SUCCESS_REPOS,
  FAILURE_REPOS
} from './actions';

const reposReducer = handleActions({
  [REQUEST_REPOS]: state => ({
    ...state,
    isFetching: true
  }),
  [SUCCESS_REPOS]: (state, { payload: repos }) => ({
    ...state,
    list: repos,
    isFetching: false
  }),
  [FAILURE_REPOS]: (state, { payload: error }) => ({
    ...state,
    error: error.message,
    isFetching: false
  })
}, {
  isFetching: false,
  list: [],
  error: ''
});

export default reposReducer;
