
import {
  USER_INFO
} from 'constants/home';

function receiveUserInfo(data) {
  return {
    type: USER_INFO,
    user: data
  }
}

export function userInfo(uid) {
  return async (dispatch) => {
    try {
      let result = await fetch(`/api/user/${uid}`);
      let info = await result.json();
      dispatch(receiveUserInfo(info.data));
    } catch (err) {

    }
  }
}
