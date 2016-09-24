
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
  return async (dispatch) => {
    let info = await fetch(`/api/user/${uid}`).then(result => result.json());

    dispatch(receiveUserInfo(info.data));
  };
}
