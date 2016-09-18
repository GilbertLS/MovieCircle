import alt from '../alt';
const APP_ID = '1065027943579868';

class FacebookActions {
  initFacebook() {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : APP_ID,
        xfbml      : true,
        version    : 'v2.5'
      });

      // after initialization, get the login status
      this.getLoginStatus();
    };

    // async load facebook-jssdk
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    return true;
  }

  getLoginStatus() {
    return (dispatch) => {
      window.FB.getLoginStatus((response) => {
        if(response.status == 'connected') {
          window.FB.api('/me', {fields: ['first_name', 'last_name']}, (meResponse) => {
            dispatch(meResponse);
          });
        }
      });
    }
  }

  login() {
    return (dispatch) => {
      window.FB.login((response) => {
        if(response.status == 'connected') {
          window.FB.api('/me', {fields: ['first_name', 'last_name']}, (meResponse) => {
            dispatch(meResponse);
          });
        }
      });
    }
  }

  logout() {
    return (dispatch) => {
      window.FB.logout((response) => {
        dispatch(response);
      });
    }
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
