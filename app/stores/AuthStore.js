import alt from '../alt';
import FacebookActions from '../actions/AuthAction';

class AuthStore {
  constructor() {
    this.bindListeners({});

    this.exportPublicMethods({});

    this.state = {};
  }


}

export default alt.createStore(AuthStore, 'FacebookStore');
