import { fork } from 'redux-saga/effects';

import home from './home/sagas';
import repositories from './repositories/sagas';
import profile from './profile/sagas';

export default function* root() {
  yield fork(home);
  yield fork(repositories);
  yield fork(profile);
}
