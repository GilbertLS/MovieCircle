import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import FacebookActions from '../../../actions/FacebookActions';
import FacebookStore from '../../../stores/FacebookStore';
import {FacebookLogin} from '../../components';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <FacebookLogin/>
      </div>
    );
  }
}
