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

    this.exportPublicMethods({
      getMe: this.getMe,
      getLoggedIn: this.getLoggedIn,
      getAuth: this.getAuth,
    });

    this.state = {
      auth: undefined,
      me: undefined,
    };
  }

  _handleGetLoginStatus(response) {
    this._handleLogin(response);
  }

  _handleLogin(response) {
    console.log("login or getloginstatus", response);
    this.setState({
      auth: response.auth.authResponse,
      me: response.me,
    });
  }

  _handleLogout(response) {
    console.log("logout", response);
    this.setState({
      auth: undefined,
      me: undefined,
    });
  }

  _handleVerifyToken(verified) {
    console.log('verified');
  }

  getAuth() {
    return this.state.auth;
  }

  getMe() {
    return this.state.me;
  }

  getLoggedIn() {
    return this.state.me && this.state.me.id;
  }
}

export default alt.createStore(FacebookStore, 'FacebookStore');
