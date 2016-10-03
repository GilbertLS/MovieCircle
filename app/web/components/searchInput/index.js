import React from 'react';
import { browserHistory } from 'react-router';

import style from './style.scss';

export default class SearchInput extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <input type='text'/>
      </div>
    );
  }
}
