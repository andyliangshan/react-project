import { createAction } from 'redux-actions';

export const REQUEST_REPOS = 'REQUEST_REPOS';
export const SUCCESS_REPOS = 'SUCCESS_REPOS';
export const FAILURE_REPOS = 'FAILURE_REPOS';

export const requestRepos = createAction(REQUEST_REPOS);
export const successRepos = createAction(SUCCESS_REPOS);
export const failureRepos = createAction(FAILURE_REPOS);
