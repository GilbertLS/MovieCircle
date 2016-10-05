import React, { Component} from 'react';
import MovieInfoStore from '../../../stores/MovieInfoStore';
import MovieInfoActions from '../../../actions/MovieInfoActions';

import style from './style.scss';

import {
  Card,
  CardTitle,
  CardText,
  ProgressBar,
} from 'react-toolbox';

import {
  StarRating,
} from '../../components';

export default class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      videos: undefined,
      credits: undefined,
      recommended: undefined,
      images: undefined,
      vibrant: '#222',
    }

    this.handleMovieInfoStoreChange = this.handleMovieInfoStoreChange.bind(this);
  }

  componentDidMount() {
    MovieInfoStore.listen(this.handleMovieInfoStoreChange);
    MovieInfoActions.clearMovieInfo();
  }

  componentWillUnmount() {
    MovieInfoStore.unlisten(this.handleMovieInfoStoreChange);
  }

  handleMovieInfoStoreChange(store) {
    this.setState({
      movie: store.movie,
      videos: store.videos,
      credits: store.credits,
      recommended: store.recommended,
      images: store.images,
    });
    console.log(store);

    this.getMissing();
  }

  getMissing() {
    if(!this.state.movie) {
      MovieInfoActions.getMovieInfo(this.props.params.id);
    }
  }

  render() {
    const movie = this.state.movie;

    return (
      <div>
      {
        movie &&
        <div>
          <div className={style.backdrop}
               style={{
                 background: 'url(https://image.tmdb.org/t/p/w1280/' + movie.backdrop_path + ')',
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}>
          </div>
          <div className={style.ribbon} style={{backgroundColor: this.state.vibrant}}>
            <div className={style.ribbonContainer}>
              <div className={style.ribbonContainerLeft}>
                <img className={style.poster} src={'https://image.tmdb.org/t/p/w342/' + movie.poster_path}/>
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
                <br />
                <span>
                  {movie.runtime + ' minutes'}
                </span>
              </div>
            </div>
          </div>
          <Card className={style.firstCard}>
            <CardTitle subtitle={movie.tagline}/>
            <CardText>{movie.overview}</CardText>
          </Card>
        </div>
      }
      {
        !movie &&
        <ProgressBar type='circular' mode='indeterminate' multicolor />
      }
      </div>
    );
  }
}
