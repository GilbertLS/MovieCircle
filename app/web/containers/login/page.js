import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import FacebookActions from '../../../actions/FacebookActions';
import FacebookStore from '../../../stores/FacebookStore';
import FacebookLogin from '../../components/FacebookLogin';

export default class LoginPage extends Component {
  componentDidMount() {
    FacebookActions.initFacebook();
  }

  render() {
    return (
      <div>
        <FacebookLogin/>
      </div>
    );
  }
}
