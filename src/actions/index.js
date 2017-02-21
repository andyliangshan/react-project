
export const REQUEST_INTRO = 'REQUEST_INTRO';
export const SUCCESS_INTRO = 'SUCCESS_INTRO';
export const FAILURE_INTRO = 'FAILURE_INTRO';

export const requestIntro = () => ({
  type: REQUEST_INTRO
});

export const successIntro = intro => ({
  type: SUCCESS_INTRO,
  intro
});

export const failureIntro = err => ({
  type: FAILURE_INTRO,
  error: err.message
});

export const REQUEST_USER = 'REQUEST_USER';
export const SUCCESS_USER = 'SUCCESS_USER';
export const FAILURE_USER = 'FAILURE_USER';

export const requestUser = name => ({
  type: REQUEST_USER,
  name
});

export const successUser = user => ({
  type: SUCCESS_USER,
  user
});

export const failureUser = err => ({
  type: FAILURE_USER,
  error: err.message
});

export const REQUEST_REPOS = 'REQUEST_REPOS';
export const SUCCESS_REPOS = 'SUCCESS_REPOS';
export const FAILURE_REPOS = 'FAILURE_REPOS';

export const requestRepos = name => ({
  type: REQUEST_REPOS,
  name
});

export const successRepos = repos => ({
  type: SUCCESS_REPOS,
  repos
});

export const failureRepos = err => ({
  type: FAILURE_REPOS,
  error: err.message
});
