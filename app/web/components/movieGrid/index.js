import React from 'react';
import { browserHistory } from 'react-router';

import {
  MoviePoster,
} from '..';

import style from './style.scss';

export default class MovieGrid extends React.Component {
  render() {
    return (
      <div className={style.grid + ' ' + this.props.className}>
        {
          this.props.movies && this.props.movies.length > 0 &&
          this.props.movies.map((movie) => {
            return (
              <MoviePoster percent={-50} key={movie.id} movie={movie}/>
            )
          })
        }
      </div>
    );
  }
}

MovieGrid.propTypes = {
  className: React.PropTypes.string,
  movies: React.PropTypes.array.isRequired,
};
