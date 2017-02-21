/**
 * create a reducer
 * @param {Object} handlers
 * @param {Any} initialState
 * @author aiweizhang <evan2zaw@gmail.com>
 * @return {Function}
 */
export default function createReducer(handlers = {}, initialState = {}) {
  return (state = initialState, action = {}) => {
    if (Object.prototype.toString.call(action) !== '[object Object]') {
      throw new Error('Expected action to be a plain object');
    }

    if (action.type) {
      let handler = handlers[action.type];

      return (handler ? handler(state, action) : state);
    }

    return state;
  };
}
