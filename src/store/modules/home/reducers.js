import produce from 'immer';
import { handleActions } from '@/shared/redux-helpers';

import {
  REQUEST_INTRO,
  SUCCESS_INTRO
} from './actions';

const introReducer = handleActions({
  [REQUEST_INTRO]: produce((draft) => {
    draft.isFetching = true;
  }),
  [SUCCESS_INTRO]: produce((state, { payload: intro }) => {
    state.content = intro;
    state.isFetching = false;
  })
}, {
  content: '',
  isFetching: false
});

export default introReducer;
