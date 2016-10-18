import React from 'react';
import FacebookActions from '../../../actions/FacebookActions';

import {
  Avatar,
  Button,
} from 'react-toolbox';

import theme from './theme.scss';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  didClickFacebookLoginButton(e) {
    FacebookActions.login();
  }

  render() {
    return (
      <div>
        {
          !this.props.isLoggedIn &&
          <Button
            theme={theme}
            label='SIGN IN WITH FACEBOOK'
            onClick={this.didClickFacebookLoginButton}/>
        }
      </div>
    );
  }
}
