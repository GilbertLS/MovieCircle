import alt from '../alt';
import FacebookActions from '../actions/FacebookActions';

class FacebookStore {
  constructor() {
    this.bindListeners({
      _handleGetLoginStatus: FacebookActions.GET_LOGIN_STATUS,
      _handleLogin: FacebookActions.LOGIN,
      _handleLogout: FacebookActions.LOGOUT,
      _handleVerifyToken: FacebookActions.VERIFY_TOKEN,
    });

    this.state = {
      me: undefined,
    };
  }

  _handleGetLoginStatus(response) {
    this._handleLogin(response);
  }

  _handleLogin(response) {
    console.log("login or getloginstatus", response);
    this.setState({
      me: response,
    });
    //FacebookActions.verifyToken(this.getAccessToken);
  }

  _handleLogout(response) {
    console.log("logout", response);
    this.setState({ me: undefined });
  }

  _handleVerifyToken(verified) {
    console.log('verified');
  }

  getAccessToken() {
    return window.FB.getLoginStatus((response) => {
      return response.accessToken;
    });
  }

  getMe() {
    return this.state.me;
  }
}

export default alt.createStore(FacebookStore, 'FacebookStore');
