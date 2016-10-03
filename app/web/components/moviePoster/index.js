import React from 'react';
import { browserHistory } from 'react-router';
import OnVisible from 'react-on-visible';

export default class moviePoster extends OnVisible {
  constructor(props) {
    super(props);
  }

  handleImageOnLoad(a) {
    a.target.className = 'loaded';
  }

  handleOnClick(id) {
    browserHistory.push('/movie/' + id);
  }

  render() {
    return (
      <div
      style={style.moviePoster}
      ref={el => { this.holder = el; }}
      onClick={() => {this.handleOnClick(this.props.movie.id)}}
      >
      {
        this.state.visible &&
        <img
          onLoad={this.handleImageOnLoad}
          className='loading'
          src={'https://image.tmdb.org/t/p/w342/' + this.props.movie.poster_path}
          style={style.image}/>
      }
      </div>
    );
  }
}

const style = {
  moviePoster: {
    minHeight: '100px',
    width: '16.6%',
    padding: '4px 3px 4px 3px',
    boxSizing: 'border-box',
  },
  image: {
    width: '100%',
    display: 'block',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)',
  }
}
