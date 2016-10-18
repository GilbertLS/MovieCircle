import alt from '../alt';
import AuthActions from '../actions/AuthActions';

class AuthStore {
  constructor() {
    this.bindListeners({
      _handleVerifyFacebook: AuthActions.LOGIN_FACEBOOK,
    });

    this.exportPublicMethods({
      getLoggedIn: this.getLoggedIn,
    });

    this.state = {
      isLoggedIn: false,
    };
  }

    _handleVerifyFacebook(response) {
      this.setState({
        isLoggedIn: (response.status == 200 || response.status == 201) ? true : false,
      });
    }

    getLoggedIn() {
      return this.state.isLoggedIn;
    }
}

export default alt.createStore(AuthStore, 'AuthStore');
