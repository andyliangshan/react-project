import axios from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';

import { REQUEST_USER, successUser, failureUser } from './actions';

function fetchUserApi(name) {
  return axios.get(`/github/api/users/${name}`)
    .then(({ data: repos }) => {
      if (repos.message) {
        throw new Error(repos.message);
      } else {
        return repos;
      }
    });
}

function* fetchUser({ payload: name }) {
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
  } catch (err) {
    yield put(failureUser(err));
  }
}

export default function* () {
  yield takeEvery(REQUEST_USER, fetchUser);
}
