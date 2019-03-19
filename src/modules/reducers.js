import { combineReducers } from 'redux';

import homeReducer from './home/reducers';
import profileReduer from './profile/reducers';
import reposReducer from './repositories/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  profile: profileReduer,
  repos: reposReducer
});

export default rootReducer;
