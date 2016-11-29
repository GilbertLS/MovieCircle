import React from 'react';

import style from './style.scss';

export default class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          !this.props.isLoggedIn &&
          <p className={style.message}>You need to be logged in to access this page.</p>
        }
        {
          !!this.props.isLoggedIn &&
          this.props.children && React.cloneElement(this.props.children, {
            isLoggedIn: this.props.isLoggedIn
          })
        }
      </div>
    );
  }
}

AuthComponent.propTypes = {
  isLoggedIn: React.PropTypes.bool,
};
