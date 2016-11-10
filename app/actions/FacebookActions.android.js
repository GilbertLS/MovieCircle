import alt from '../alt';
const FBSDK = require('react-native-fbsdk');

const {
  LoginManager,
  AccessToken,
} = FBSDK;

class FacebookActions {
  initFacebook() {
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
            )
          }
        },
      );
    }
  }

  logout() {
    return true;
  }

  verifyToken(accessToken) {
    return (dispatch) => {
      loginAPI.facebookLogin(accessToken, (response) => {
        console.log('verify', response);
      });

      dispatch(true);
    }
  }
}

export default alt.createActions(FacebookActions);
