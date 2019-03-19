import { createAction, createAsyncAction } from '@/shared/redux-helpers';

export const REQUEST_USER = 'REQUEST_USER';
export const SUCCESS_USER = 'SUCCESS_USER';
export const FAILURE_USER = 'FAILURE_USER';

export const requestUser = createAsyncAction(REQUEST_USER);
export const successUser = createAction(SUCCESS_USER);
export const failureUser = createAction(FAILURE_USER);
