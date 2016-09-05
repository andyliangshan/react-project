/**
 * Create a redux reducer
 * @date 2016/07/12
 * @author aiweizhang <evan2zaw@gmail.com>
 *
 */

/**
 * create a reducer
 * @param {Object} handlers
 * @param {Any} initialState
 * @return {Function}
 */
export default function createReducer(handlers = {}, initialState = {}) {
  return function(
    state = initialState,
    action = {}
  ) {
    if (action.type) {
      let handler = handlers[action.type];

      return (handler ? handler(state, action) : state);
    }

    return state;
  };
}
