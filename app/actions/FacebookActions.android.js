import alt from '../alt';
const FBSDK = require('react-native-fbsdk');

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class FacebookActions {
  init() {
    this.getLoginStatus();
  }

  getLoginStatus() {
    return (dispatch) => {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          dispatch(data);
        }
      );
    };
  }

  login() {
    return (dispatch) => {
      LoginManager.logInWithReadPermissions(['public_profile', 'user_friends']).then(
        (result) => {
          if (!result.isCancelled) {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                dispatch(data);
              }
            );
          }
        },
      );
    };
  }

  logout() {
    return (dispatch) => {
      LoginManager.logOut();
      dispatch(true);
    }
  }

  getMe() {
    return (dispatch) => {
      new GraphRequestManager()
      .addRequest(
        new GraphRequest('/me?fields=name,friends,picture', null,
          (error, result) => {
            if (error) {
              dispatch(undefined);
            } else {
              dispatch(result);
            }
          }
        )
      )
      .start();
    }
  }
}

export default alt.createActions(FacebookActions);
