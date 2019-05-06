import { fork } from 'redux-saga/effects';

import home from './modules/home/sagas';
import repositories from './modules/repositories/sagas';
import profile from './modules/profile/sagas';

export default function* root() {
  yield fork(home);
  yield fork(repositories);
  yield fork(profile);
}
