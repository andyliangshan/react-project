import produce from 'immer';
import { handleActions } from '@/shared/redux-helpers';

import {
  REQUEST_USER,
  SUCCESS_USER,
  FAILURE_USER
} from './actions';

const userReducer = handleActions({
  [REQUEST_USER]: produce((draft) => {
    draft.isFetching = true;
  }),
  [SUCCESS_USER]: (state, { payload: user }) => ({
    ...state,
    ...user,
    isFetching: false
  }),
  [FAILURE_USER]: produce((draft, { payload: error }) => {
    draft.error = error.message;
    draft.isFetching = false;
  })
}, {
  isFetching: false,
  error: '',
  name: '',
  avatar: '',
  id: '',
  location: '',
  createdAt: '',
  github: '',
  email: ''
});

export default userReducer;
