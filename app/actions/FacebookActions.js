import alt from '../alt';
import config from '../config.js';
const APP_ID = config.appID;

class FacebookActions {
  init() {
    if(!!window.FB) {
      window.FB.init({
        appId      : APP_ID,
        xfbml      : true,
        version    : 'v2.8'
      });

      this.getLoginStatus();
    } else {
      window.fbAsyncInit = () => {
        FB.init({
          appId      : APP_ID,
          xfbml      : true,
          version    : 'v2.8'
        });

        this.getLoginStatus();
      };
    }

    return true;
  }

  getLoginStatus() {
    return (dispatch) => {
      window.FB.getLoginStatus((response) => {
        if(response.status == 'connected' && !!response.authResponse) {
          dispatch(response.authResponse);
        } else {
          dispatch(undefined);
        }
      });
    };
  }

  login() {
    return (dispatch) => {
      window.FB.login((response) => {
        if(response.status == 'connected' && !!response.authResponse) {
          dispatch(response.authResponse);
        } else {
          dispatch(undefined);
        }
      });
    };
  }

  logout() {
    return (dispatch) => {
      window.FB.logout((response) => {
        dispatch(response);
      });
    };
  }

  getMe() {
    return (dispatch) => {
      window.FB.api('/me', {fields: ['name', 'friends', 'picture']},
      (response) => {
        if(!!response && response.id) {
          dispatch(response);
        } else {
          dispatch(undefined);
        }
      });
    };
  }
}

export default alt.createActions(FacebookActions);
