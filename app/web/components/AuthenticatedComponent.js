import React from 'react';
import FacebookActions from '../../actions/FacebookActions';
import { browserHistory } from 'react-router';

export default class AuthenticatedComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div id="authenticatedContainer">
            {this.props.children}
          </div>
        );
    }
}
