import alt from '../alt';
import AuthActions from '../actions/AuthActions';

class AuthStore {
  constructor() {
    this.bindListeners({
      _handleVerifyFacebook: AuthActions.VERIFY_FACEBOOK,
    });

    this.exportPublicMethods({
      getValid: this.getValid,
    });

    this.state = {
      is_valid: false,
    };
  }

    _handleVerifyFacebook(response) {
      this.setState({
        is_valid: response.is_valid,
      });
    }

    getValid() {
      return this.state.is_valid;
    }
}

export default alt.createStore(AuthStore, 'FacebookStore');
