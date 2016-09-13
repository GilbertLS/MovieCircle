import React from 'react';
import FacebookActions from '../../actions/FacebookActions';

export default class FacebookLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button ref="loginButton" onClick={this.didClickFacebookLoginButton}>Log Into Facebook</button>
        );
    }

    didClickFacebookLoginButton(e) {
      FacebookActions.login()
    }
}
