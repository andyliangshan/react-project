import {
  createAction, createActions, handleAction, handleActions, combineActions
} from 'redux-actions';
import {
  isFunction, isString, isPlainObject, isUndefined, isNull
} from 'lodash';

const SEPARATOR = '/';

export const ASYNC_ACTION = Symbol('@@async/action');

/**
 * create a actionTypes
 * @param {Object} types a plain object
 * @param {String} ns namespace
 * @example
 *  createActionTypes({
 *    ADD: 'ADD',
 *    REMOVE: 'REMOVE'
 *  }, 'BAZ')
 */
export function createActionTypes(types, ns = '') {
  if (!ns) return types;

  return Object.keys(types).reduce((newTypes, key) => {
    newTypes[key] = `${ns}${SEPARATOR}${types[key]}`;

    return newTypes;
  });
}

/**
 * redux中间件，配合saga使用
 * @example
 *  applyMiddleware(createSagaPromiseMiddleware(), createSagaMiddleware())
 */
export function createSagaPromiseMiddleware() {
  return () => next => (action) => {
    if (action.meta && action.meta[ASYNC_ACTION]) {
      return new Promise((resolve, reject) => {
        next({
          ...action,
          __promise__: {
            resolve,
            reject
          }
        });
      });
    }
    return next(action);
  };
}

/**
 * 创建异步action，必须添加createSagaPromiseMiddleware中间件才有效
 * 参数请查看 https://redux-actions.js.org/api/createaction#createaction
 */
export function createAsyncAction(type, payloadCreator, metaCreator) {
  return createAction(type, payloadCreator, (...args) => {
    let meta = {};

    if (isFunction(metaCreator)) {
      meta = metaCreator(...args);
    }

    return {
      ...meta,
      [ASYNC_ACTION]: true
    };
  });
}

function patchMetaCreator(actionMap) {
  Object.keys(actionMap).forEach((key) => {
    let action = actionMap[key];

    if (isUndefined(action) || isNull(action)) {
      action = p => p;
    }

    if (isFunction(action)) {
      actionMap[key] = [action, () => ({
        [ASYNC_ACTION]: true
      })];
    }

    if (Array.isArray(action)) {
      const [payloadCreator, metaCreator] = action;

      actionMap[key] = [payloadCreator, (...args) => {
        let meta = {};

        if (isFunction(metaCreator)) {
          meta = metaCreator(...args);
        }

        return {
          ...meta,
          [ASYNC_ACTION]: true
        };
      }];
    }

    if (isPlainObject(action)) {
      patchMetaCreator(action);
    }
  });
}

/**
 * 批量创建异步action，必须添加createSagaPromiseMiddleware中间件才有效
 * 参数请查看 https://redux-actions.js.org/api/createaction#createactions
 */
export function createAsyncActions(actionMap, ...identityActions) {
  const options = isPlainObject(identityActions.slice(-1)) ? identityActions.pop() : {};

  if (isPlainObject(actionMap)) {
    patchMetaCreator(actionMap);
  }

  for (let i = 0; i < identityActions.length; i++) {
    const identityAction = identityActions[i];

    if (isString(identityAction)) {
      actionMap[identityAction] = [
        payload => payload,
        () => ({
          [ASYNC_ACTION]: true
        })
      ];
    }
  }

  return createActions(actionMap, options);
}

export {
  createAction,
  createActions,
  handleAction,
  handleActions,
  combineActions
};
