import React from 'react';
import { browserHistory } from 'react-router';
import OnVisible from 'react-on-visible';

import style from './style.scss';

export default class moviePoster extends OnVisible {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }

    this.handleImageOnLoad = this.handleImageOnLoad.bind(this);
  }

  handleImageOnLoad(a) {
    this.setState({
      loaded: true,
    });
  }

  handleOnClick(id) {
    browserHistory.push('/movie/' + id);
  }

  render() {
    const movie = this.props.movie;
    const posterClasses = (!!movie.poster_path) ? style.moviePoster : style.moviePoster +' '+ style.empty;

    return (
      <div
        className={posterClasses}
        ref={el => { this.holder = el; }}
        onClick={() => {this.handleOnClick(movie.id)}}>
        {
          this.state.visible &&
          !!movie.poster_path &&
          <div className={this.state.loaded ? style.loaded : style.imageContainer}>
            <img
              onLoad={this.handleImageOnLoad}
              src={'https://image.tmdb.org/t/p/w342/' + movie.poster_path}
              className={style.image}/>
            <div className={style.title}>{movie.title}</div>
          </div>
        }
        {
          this.state.visible &&
          !movie.poster_path &&
          <div className={style.noPoster}>
            <div className={style.title}>{movie.title}</div>
          </div>
        }
      </div>
    );
  }
}
