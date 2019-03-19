import { handleActions } from '@/shared/redux-helpers';

import {
  REQUEST_USER,
  SUCCESS_USER,
  FAILURE_USER
} from './actions';

const userReducer = handleActions({
  [REQUEST_USER]: state => ({
    ...state,
    isFetching: true
  }),
  [SUCCESS_USER]: (state, { payload: user }) => ({
    ...state,
    ...user,
    isFetching: false
  }),
  [FAILURE_USER]: (state, { payload: error }) => ({
    ...state,
    error: error.message,
    isFetching: false
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
