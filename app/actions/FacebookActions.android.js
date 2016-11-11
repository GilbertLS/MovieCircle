import alt from '../alt';
const FBSDK = require('react-native-fbsdk');

const {
  LoginManager,
  AccessToken,
} = FBSDK;

class FacebookActions {
  init() {
    return true;
  }

  getLoginStatus() {
    return true;
  }

  login() {
    return (dispatch) => {
      LoginManager.logInWithReadPermissions(['public_profile']).then(
        function(result) {
          if (!result.isCancelled) {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                dispatch({auth: { authResponse: {accessToken: data}}});
              }
            );
          }
        },
      );
    }
  }

  logout() {
    return true;
  }
}

export default alt.createActions(FacebookActions);
