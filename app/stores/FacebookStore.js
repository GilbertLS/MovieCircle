import alt from '../alt';
import FacebookActions from '../actions/FacebookActions';

class FacebookStore {
  constructor() {
    this.bindListeners({
      _handleGetLoginStatus: FacebookActions.GET_LOGIN_STATUS,
      _handleLogin: FacebookActions.LOGIN,
      _handleLogout: FacebookActions.LOGOUT,
      _handleGetMe: FacebookActions.GET_ME,
    });

    this.exportPublicMethods({
      getMe: this.getMe,
      getIsLoggedIn: this.getIsLoggedIn,
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
    console.log('login or getloginstatus', response);
    this.setState({
      auth: response,
    });
  }

  _handleLogout(response) {
    console.log('logout', response);
    this.setState({
      auth: undefined,
      me: undefined,
    });
  }

  _handleGetMe(response) {
    console.log('getme', response);
    this.setState({
      me: response,
    });
  }

  getAuth() {
    return this.state.auth;
  }

  getMe() {
    return this.state.me;
  }

  getIsLoggedIn() {
    return this.state.auth && this.state.auth.accessToken;
  }
}

export default alt.createStore(FacebookStore, 'FacebookStore');
