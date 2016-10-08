
import {
  USER_INFO
} from 'constants/home';

function receiveUserInfo(data) {
  return {
    type: USER_INFO,
    user: data
  };
}

export function userInfo(uid) {
  return (dispatch) => {
    fetch(`/api/user/${uid}`)
      .then(result => result.json())
      .then((info) => {
        dispatch(receiveUserInfo(info.data));
      });
  };
}
