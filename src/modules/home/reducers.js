import { handleActions } from '@/shared/redux-helpers';

import {
  REQUEST_INTRO,
  SUCCESS_INTRO
} from './actions';

const introReducer = handleActions({
  [REQUEST_INTRO]: state => ({
    ...state,
    isFetching: true
  }),
  [SUCCESS_INTRO]: (state, { payload: intro }) => ({
    ...state,
    content: intro,
    isFetching: false
  })
}, {
  content: ''
});

export default introReducer;
