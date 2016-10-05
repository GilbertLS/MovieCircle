import React from 'react';

import {
  StarRating,
} from '../../../../components';

import style from './style.scss';

export default class Ribbon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vibrant: '#222',
    }

    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  handleOnLoad(e) {
    //This is very hacky
    //Vibrant is loaded in index.html
    //Do not use https for poster, causes error
    const vibrant = new Vibrant(e.target);
    this.setState({
      vibrant: vibrant.DarkVibrantSwatch.getHex() || '#222'
    });

    //Delete canvas that stays after error
    //Keeping this in case
    const canvases = document.getElementsByTagName('canvas');
    for(var i = 0; i < canvases.length; i++) {
      document.body.removeChild(canvases[i]);
    }
  }

  render() {
    const movie = this.props.movie;

    return(
      <div className={style.ribbon} style={{backgroundColor: this.state.vibrant}}>
        {
          movie &&
          <div className={style.ribbonContainer}>
            <div className={style.ribbonContainerLeft}>
              <img className={style.poster}
                   src={'http://image.tmdb.org/t/p/w342/' + movie.poster_path}
                   onLoad={this.handleOnLoad}
                   ref='poster'
                   crossOrigin='anonymous'/>
            </div>
            <div className={style.ribbonContainerRight}>
              <span>{movie.title}</span>
              <span> {movie.release_date.substring(0, 4)}</span>
              <StarRating rating={movie.vote_average}/>
              <span>
                {
                  movie.genres.map((genre) => {
                    return genre.name;
                  }).join(', ')
                }
              </span>
              <span>
                {movie.runtime + ' minutes'}
              </span>
            </div>
          </div>
        }
      </div>
    )
  }
}
