
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export function fetchUser(uid) {
  return (dispatch) => {
    dispatch({type: USER_REQUEST});

    fetch(`/api/user/${uid}`)
    .then(response => response.json())
    .then(({data}) => {
      dispatch({
        type: USER_SUCCESS,
        user: data
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

export const NOW_DATE = 'NOW_DATE';

export function fetchNowDate() {
  return (dispatch) => {
    fetch('/api/date')
    .then(response => response.json())
    .then(({data}) => {
      dispatch({
        type: NOW_DATE,
        date: new Date(data)
      });
    })
  }
}
