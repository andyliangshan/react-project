
import createReducer from 'common/createReducer';

import {
  USER_INFO
} from 'constants/home';

export default createReducer({
  [USER_INFO]: (state, {user}) => ({
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
