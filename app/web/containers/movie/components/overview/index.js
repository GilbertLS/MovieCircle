import React, { Component} from 'react';

import style from './style.scss';

export default class Overview extends Component {
  render() {
    const movie = this.props.movie;

    return (
      movie.videos && movie.videos.results.length > 0 &&
      <div className={style.container}>
        <div className={style.left}>
          <iframe
          src={'https://www.youtube.com/embed/' + movie.videos.results[0].key}
          frameBorder="0">
          </iframe>
        </div>
        <div className={style.right}>
          <p className={style.tagline}>{movie.tagline}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    );
  }
}
