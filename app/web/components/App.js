import React from 'react';
import { browserHistory } from 'react-router';
import FacebookStore from '../../stores/FacebookStore';
import FacebookActions from '../../actions/FacebookActions';
import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      FacebookActions.initFacebook();
    }

    componentDidMount() {
      FacebookStore.listen(this._onFacebookChange);
      AuthStore.listen(this._onAuthChange);
    }

    componentWillUnmount() {
      FacebookStore.unlisten(this._onFacebookChange);
      AuthStore.unlisten(this._onAuthChange);
    }

    _onFacebookChange(state) {
      if(FacebookStore.getLoggedIn()) {
        browserHistory.push('loading');
        AuthActions.verifyFacebook(FacebookStore.getAuth());
      }
    }

    _onAuthChange(state) {
      if(AuthStore.getValid()) {
        browserHistory.push('m');
      } else {
        browserHistory.push('login');
      }
    }

    render() {
        return (
          <div id="container">
            {this.props.children}
          </div>
        );
    }
}
