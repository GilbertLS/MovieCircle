import React from 'react';
import { browserHistory } from 'react-router';
import FacebookStore from '../../stores/FacebookStore';
import FacebookActions from '../../actions/FacebookActions';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      FacebookActions.initFacebook();
    }

    componentDidMount() {
      FacebookStore.listen(this._onFacebookChange);
    }

    componentWillUnmount() {
      FacebookStore.unlisten(this._onFacebookChange);
    }

    _onFacebookChange(state) {
      if(FacebookStore.getLoggedIn()) {
        browserHistory.push('/loading');
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
