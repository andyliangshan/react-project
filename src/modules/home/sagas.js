import axios from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';

import {
  REQUEST_INTRO, successIntro, failureIntro
} from './actions';

function fetchIntroApi() {
  return axios.get('/api/hello')
    .then(({ data: ret }) => {
      if (ret.status) {
        throw new Error(ret.msg);
      } else {
        return ret.data;
      }
    });
}

function* fetchIntro() {
  try {
    const intro = yield call(fetchIntroApi);

    yield put(successIntro(intro));
  } catch (err) {
    yield put(failureIntro(err));
  }
}

export default function* () {
  yield takeEvery(REQUEST_INTRO, fetchIntro);
}
