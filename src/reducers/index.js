
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createReducer from 'common/createReducer';

import {
  REQUEST_INTRO, SUCCESS_INTRO,
  REQUEST_USER, SUCCESS_USER, FAILURE_USER,
  REQUEST_REPOS, SUCCESS_REPOS, FAILURE_REPOS
} from 'actions';

const introReducer = createReducer({
  [REQUEST_INTRO]: (state) => ({
    ...state,
    isFetching: true
  }),
  [SUCCESS_INTRO]: (state, { intro }) => ({
    ...state,
    content: intro,
    isFetching: false
  })
}, {
  content: ''
});

const userReducer = createReducer({
  [REQUEST_USER]: state => ({
    ...state,
    isFetching: true
  }),
  [SUCCESS_USER]: (state, { user }) => ({
    ...state,
    ...user,
    isFetching: false
  }),
  [FAILURE_USER]: (state, { error }) => ({
    ...state,
    error,
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

const reposReducer = createReducer({
  [REQUEST_REPOS]: state => ({
    ...state,
    isFetching: true
  }),
  [SUCCESS_REPOS]: (state, { repos }) => ({
    ...state,
    list: repos,
    isFetching: false
  }),
  [FAILURE_REPOS]: (state, { error }) => ({
    ...state,
    error,
    isFetching: false
  })
}, {
  isFetching: false,
  list: [],
  error: ''
});

const rootReducer = combineReducers({
  intro: introReducer,
  user: userReducer,
  repos: reposReducer,
  routing: routerReducer
});

export default rootReducer;
