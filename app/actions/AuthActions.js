import alt from '../alt';
import LoginAPI from '../api/LoginAPI';

class AuthActions {
  verifyFacebook(authObject) {
    return (dispatch) => {
      LoginAPI.verifyFacebook(authObject, (response) => {
        if(response.status == 200) {
          dispatch(response);
        } else {
          //Error handling
        }
      });
    }
  }
}

export default alt.createActions(AuthActions);
