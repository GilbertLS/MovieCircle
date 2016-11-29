import React, { Component} from 'react';

import style from './style.scss';

import {
  MovieGrid
} from '../../../../components';

export default class Recommendations extends Component {
  render() {
    const recommendations = this.props.recommendations;

    return (
      !!recommendations && recommendations.length > 0 &&
      <div className={style.container}>
        {
          <div className={style.recommendations}>
            <MovieGrid className={style.movieGrid} movies={recommendations.slice(0,6)}/>
          </div>
        }
      </div>
    );
  }
}

Recommendations.propTypes = {
  recommendations: React.PropTypes.array.isRequired,
};
