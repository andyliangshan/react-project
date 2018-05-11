import axios from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';

import { REQUEST_REPOS, successRepos, failureRepos } from './actions';

function fetchReposApi(name) {
  return axios.get(`/github/api/users/${name}/repos`)
    .then(({ data: repos }) => {
      if (repos.message) {
        throw new Error(repos.message);
      } else {
        return repos;
      }
    });
}

export function* fetchRepos({ payload: name }) {
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
  } catch (err) {
    yield put(failureRepos(err));
  }
}


export default function* () {
  yield takeEvery(REQUEST_REPOS, fetchRepos);
}
