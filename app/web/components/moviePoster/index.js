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
    return (
      <div
      className={style.moviePoster}
      ref={el => { this.holder = el; }}
      onClick={() => {this.handleOnClick(this.props.movie.id)}}
      >
      {
        this.state.visible &&
        <img
          onLoad={this.handleImageOnLoad}
          src={'https://image.tmdb.org/t/p/w342/' + this.props.movie.poster_path}
          className={this.state.loaded ? style.loaded : style.image}/>
      }
      </div>
    );
  }
}
