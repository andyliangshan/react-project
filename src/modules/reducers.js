import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homeReducer from './home/reducers';
import profileReduer from './profile/reducers';
import reposReducer from './repositories/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  profile: profileReduer,
  repos: reposReducer,
  routing: routerReducer
});

export default rootReducer;
