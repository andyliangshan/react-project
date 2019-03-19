import axios from '@/shared/axios';
import { call, takeEvery, put } from 'redux-saga/effects';

import { REQUEST_REPOS, successRepos, failureRepos } from './actions';

function fetchReposApi(name) {
  return axios.get(`/github/api/users/${name}/repos`);
}

export function* fetchRepos({ payload: name, __promise__ }) {
  try {
    let repos = yield call(fetchReposApi, name);

    repos = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      desc: repo.description,
      lang: repo.language,
      url: repo.html_url
    }));

    yield put(successRepos(repos));
    __promise__.resolve();
  } catch (err) {
    yield put(failureRepos(err));
    __promise__.reject();
  }
}


export default function* watchActions() {
  yield takeEvery(REQUEST_REPOS, fetchRepos);
}
