
export const USER_REQUEST = 'home/USER_REQUEST';
export const USER_SUCCESS = 'home/USER_SUCCESS';
export const USER_FAILURE = 'home/USER_FAILURE';

export function fetchUser(uid) {
  return (dispatch) => {
    dispatch({type: USER_REQUEST});

    fetch(`/api/user/${uid}`)
    .then(response => response.json())
    .then((info) => {
      dispatch({
        type: USER_SUCCESS,
        user: info.data
      })
    })
    .catch((err) => {
      dispatch({
        type: USER_FAILURE,
        error: err.message
      });
    });
  }
}
