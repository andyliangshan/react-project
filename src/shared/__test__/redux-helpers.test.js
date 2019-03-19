import {
  ASYNC_ACTION,
  createActionTypes,
  createAsyncAction,
  createAsyncActions,
  createAction,
  createActions,
} from '../redux-helpers';

function attachAsyncMeta(payload) {
  return {
    ...payload,
    meta: {
      ...payload.meta,
      [ASYNC_ACTION]: true
    }
  };
}

test('createActionTypes: create action types without a namespace', () => {
  expect(createActionTypes({
    ADD: 'ADD'
  })).toEqual({ ADD: 'ADD' });
});

test('createActionTypes: create action types with a namespace', () => {
  expect(createActionTypes({
    ADD: 'ADD'
  }, 'USER')).toEqual({ ADD: 'USER/ADD' });
});

test('createAsyncAction: create an asynchronous action', () => {
  expect(createAsyncAction('NOOP')(42)).toEqual(attachAsyncMeta(
    createAction('NOOP')(42)
  ));

  expect(createAsyncAction('NOOP', b => b)(42)).toEqual(attachAsyncMeta(
    createAction('NOOP', b => b)(42)
  ));

  expect(createAsyncAction(
    'NOOP',
    b => b,
    () => ({ admin: true })
  )({ name: 'Foo' })).toEqual(attachAsyncMeta(
    createAsyncAction(
      'NOOP',
      b => b,
      () => ({ admin: true })
    )({ name: 'Foo' })
  ));
});

test('createAsyncAction: sets error to true if payload is an Error object with asynchronous action', () => {
  const error = new TypeError('not a number');

  expect(createAsyncAction('NOOP')(error)).toEqual(attachAsyncMeta(
    createAsyncAction('NOOP')(error)
  ));
});

test('createAsyncActions: creates asynchronous action from an action map and action types', () => {
  const acitonMap = {
    APP: {
      COUNTER: {
        INCREMENT: [amount => ({ amount }), amount => ({ key: 'value', amount })],
        DECREMENT: amount => ({ amount: -amount }),
        SET: undefined // given undefined, the identity function will be used
      },
      NOTIFY: [
        (username, message) => ({ message: `${username}: ${message}` }),
        (username, message) => ({ username, message })
      ]
    },
    ADD_TODO: [
      todo => ({ todo }), // payload creator
      (todo, warn) => ({ todo, warn }) // meta
    ]
  };
  const asyncActions = createAsyncActions(acitonMap, 'REMOVE');
  const actions = createActions(acitonMap, 'REMOVE');

  expect(asyncActions.addTodo({ foo: 1 }, 'this is a warning')).toEqual(attachAsyncMeta(
    actions.addTodo({ foo: 1 }, 'this is a warning')
  ));

  expect(asyncActions.app.counter.increment(1)).toEqual(attachAsyncMeta(
    actions.app.counter.increment(1)
  ));

  expect(asyncActions.app.counter.decrement(1)).toEqual(attachAsyncMeta(
    actions.app.counter.decrement(1)
  ));

  expect(asyncActions.app.counter.set(100)).toEqual(attachAsyncMeta(
    actions.app.counter.set(100)
  ));

  expect(asyncActions.app.notify('yangmillstheory', 'Hello World')).toEqual(attachAsyncMeta(
    actions.app.notify('yangmillstheory', 'Hello World')
  ));

  expect(asyncActions.remove(3)).toEqual(attachAsyncMeta(
    actions.remove(3)
  ));
});
