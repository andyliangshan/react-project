
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import createReducer from 'common/createReducer';

import * as ActionTypes from 'actions';

const userReducer = createReducer({
  [ActionTypes.USER_SUCCESS]: (state, {user}) => ({
    ...state,
    ...user
  })
}, {
  name: '',
  avatar: '',
  id: ''
});

const dateReducer = createReducer({
  [ActionTypes.NOW_DATE]: (state, {date}) => (date)
}, new Date(0));

const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  routing: routerReducer
});

export default rootReducer;
