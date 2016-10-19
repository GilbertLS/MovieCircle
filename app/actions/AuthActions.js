import alt from '../alt';
import LoginAPI from '../api/LoginAPI';

class AuthActions {
  loginFacebook(authObject) {
    return (dispatch) => {
      LoginAPI.loginFacebook(authObject, (response) => {
        if(response.status == 200) {
          dispatch(response);
        } else {
          //Error handling
        }
      });
    }
  }

  logoutFacebook() {
    return true;
  }
}

export default alt.createActions(AuthActions);
