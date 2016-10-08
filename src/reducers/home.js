
import createReducer from 'common/createReducer';

import * as ActionTypes from 'actions/home';

export default createReducer({
  [ActionTypes.USER_SUCCESS]: (state, {user}) => ({
    ...state,
    user
  })
}, {
  user: {
    name: '',
    avatar: '',
    id: ''
  },
  date: new Date()
});
