import alt from '../alt';
import AuthActions from '../actions/AuthActions';

class AuthStore {
  constructor() {
    this.bindListeners({
      _loginFacebook: AuthActions.LOGIN_FACEBOOK,
      _logoutFacebook: AuthActions.LOGOUT_FACEBOOK,
    });

    this.exportPublicMethods({
      getLoggedIn: this.getLoggedIn,
    });

    this.state = {
      isLoggedIn: false,
    };
  }

    _loginFacebook(response) {
      this.setState({
        isLoggedIn: (response.status == 200 || response.status == 201) ? true : false,
      });
    }

    _logoutFacebook() {
      this.setState({
        isLoggedIn: false,
      });
    }

    getLoggedIn() {
      return this.state.isLoggedIn;
    }
}

export default alt.createStore(AuthStore, 'AuthStore');
