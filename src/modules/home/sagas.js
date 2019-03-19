import axios from '@/shared/axios';
import { call, takeEvery, put } from 'redux-saga/effects';

import { REQUEST_INTRO, successIntro, failureIntro } from './actions';

function fetchIntroApi() {
  return axios.get('/api/hello');
}

function* fetchIntro({ __promise__ }) {
  try {
    const intro = yield call(fetchIntroApi);

    yield put(successIntro(intro));
    __promise__.resolve();
  } catch (err) {
    yield put(failureIntro(err));
    __promise__.reject();
  }
}

export default function* watchActions() {
  yield takeEvery(REQUEST_INTRO, fetchIntro);
}
