import axios from '@/shared/axios';
import { call, takeEvery, put } from 'redux-saga/effects';

import { REQUEST_USER, successUser, failureUser } from './actions';

function fetchUserApi(name) {
  return axios.get(`/github/api/users/${name}`);
}

function* fetchUser({ payload: name, __promise__ }) {
  try {
    const user = yield call(fetchUserApi, name);

    yield put(successUser({
      id: user.id,
      name,
      avatar: user.avatar_url,
      location: user.location,
      email: user.email,
      github: user.html_url,
      createdAt: user.created_at
    }));
    __promise__.resolve();
  } catch (err) {
    yield put(failureUser(err));
    __promise__.reject();
  }
}

export default function* watchActions() {
  yield takeEvery(REQUEST_USER, fetchUser);
}
