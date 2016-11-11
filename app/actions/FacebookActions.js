import alt from '../alt';
const APP_ID = '1065027943579868';

class FacebookActions {
  init() {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : APP_ID,
        xfbml      : true,
        version    : 'v2.8'
      });

      //After initialization, get the login status
      this.getLoginStatus();
    };

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
      window.FB.api('/me', {fields: ['first_name', 'last_name', 'picture']}, (response) => {
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
