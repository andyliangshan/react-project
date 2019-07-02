import produce from 'immer';
import { handleActions } from '@/shared/redux-helpers';

import {
  REQUEST_REPOS,
  SUCCESS_REPOS,
  FAILURE_REPOS
} from './actions';

const reposReducer = handleActions({
  [REQUEST_REPOS]: produce((draft) => {
    draft.isFetching = true;
  }),
  [SUCCESS_REPOS]: produce((draft, { payload: repos }) => {
    draft.list = repos;
    draft.isFetching = false;
  }),
  [FAILURE_REPOS]: produce((draft, { payload: error }) => {
    draft.error = error.message;
    draft.isFetching = false;
  })
}, {
  isFetching: false,
  list: [],
  error: ''
});

export default reposReducer;
