import React from 'react';
import FacebookActions from '../../actions/FacebookActions';

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
