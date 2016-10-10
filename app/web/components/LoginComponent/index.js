import React from 'react';

import {
  Avatar,
  Button,
} from 'react-toolbox';

import style from './style.scss';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.container}>
        <Avatar className={style.avatar}>
          <span className='material-icons'>person</span>
        </Avatar>
        <Button style={{backgroundColor: '#4267B2', color: 'white'}}label='SIGN IN WITH FACEBOOK'/>
      </div>
    );
  }
}
