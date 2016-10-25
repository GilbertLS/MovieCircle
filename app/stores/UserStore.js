import alt from '../alt';
import UserActions from '../actions/UserActions';

class UserStore {
  constructor() {
    this.bindListeners({
      _loginFacebook: UserActions.LOGIN_FACEBOOK,
      _logoutFacebook: UserActions.LOGOUT_FACEBOOK,
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

export default alt.createStore(UserStore, 'UserStore');
