import { combineReducers } from 'redux';

import homeReducer from './modules/home/reducers';
import profileReduer from './modules/profile/reducers';
import reposReducer from './modules/repositories/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  profile: profileReduer,
  repos: reposReducer
});

export default rootReducer;
