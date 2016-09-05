
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import homeReducer from './home';

const rootReducer = combineReducers({
  home: homeReducer,
  routing: routerReducer
});

export default rootReducer;
