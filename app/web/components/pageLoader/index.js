import React from 'react';

import {
  ProgressBar,
} from 'react-toolbox';

import style from './style.scss';

export default class PageLoader extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <ProgressBar
          className={style.circle}
          type='circular'
          mode='indeterminate'
          multicolor />
      </div>
    );
  }
}
