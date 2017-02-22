import { call, takeEvery, put } from 'redux-saga/effects';

import {
  REQUEST_INTRO, successIntro, failureIntro,
  REQUEST_USER, successUser, failureUser,
  REQUEST_REPOS, successRepos, failureRepos
} from 'actions';

function fetchIntroApi() {
  return fetch('/api/hello')
    .then(response => response.json())
    .then((ret) => {
      if (ret.status) {
        throw new Error(ret.msg);
      } else {
        return ret.data;
      }
    });
}

function fetchUserApi(name) {
  return fetch(`/github/api/users/${name}`)
    .then(response => response.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(repos.message);
      } else {
        return repos;
      }
    });
}

function fetchReposApi(name) {
  return fetch(`/github/api/users/${name}/repos`)
    .then(response => response.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(repos.message);
      } else {
        return repos;
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

function* fetchUser({ name }) {
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

function* fetchRepos({ name }) {
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

export default function* root() {
  yield takeEvery(REQUEST_INTRO, fetchIntro);
  yield takeEvery(REQUEST_USER, fetchUser);
  yield takeEvery(REQUEST_REPOS, fetchRepos);
}
