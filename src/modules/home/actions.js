import { createAction } from 'redux-actions';

export const REQUEST_INTRO = 'REQUEST_INTRO';
export const SUCCESS_INTRO = 'SUCCESS_INTRO';
export const FAILURE_INTRO = 'FAILURE_INTRO';

export const requestIntro = createAction(REQUEST_INTRO);
export const successIntro = createAction(SUCCESS_INTRO);
export const failureIntro = createAction(FAILURE_INTRO);
