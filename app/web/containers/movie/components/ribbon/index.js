import React from 'react';

import {
  StarRating,
} from '../../../../components';

import style from './style.scss';

export default class Ribbon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }

    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const movie = this.props.movie;
    const imageClasses = (!!this.state.loaded) ? style.poster + ' ' + style.loaded : style.poster;

    return(
      <div className={style.ribbon}>
        {
          movie &&
          <div className={style.ribbonContainer}>
            {
              !!movie.poster_path &&
              <div className={style.ribbonContainerLeft}>
                <img
                  onLoad={this.handleOnLoad}
                  className={imageClasses}
                  src={'http://image.tmdb.org/t/p/w342/' + movie.poster_path}/>
              </div>
            }
            <div className={style.ribbonContainerRight}>
              <span className={style.title}>{movie.title}</span>
              <span className={style.year}> ({movie.release_date.substring(0, 4)})</span>
              <StarRating rating={movie.vote_average}/>
              <span className={style.genres}>
                {
                  movie.genres.map((genre) => {
                    return genre.name;
                  }).join(', ')
                }
              </span>
              <span className={style.runtime}>
                {movie.runtime + ' minutes'}
              </span>
            </div>
          </div>
        }
      </div>
    )
  }
}

Ribbon.propTypes = {
  movie: React.PropTypes.object.isRequired,
};
