import React, { Component} from 'react';
import MovieInfoStore from '../../../stores/MovieInfoStore';
import MovieInfoActions from '../../../actions/MovieInfoActions';

import style from './style.scss';

import {
  Card,
  CardTitle,
  CardText,
  ProgressBar,
  Button,
} from 'react-toolbox';

import {
  YoutubePlayer,
} from '../../components';

import {
  Ribbon,
} from './components';

export default class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      trailerVisible: false,
    }

    this.handleMovieInfoStoreChange = this.handleMovieInfoStoreChange.bind(this);
    this.handleOnClickTrailer = this.handleOnClickTrailer.bind(this);
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
    });

    if(!this.state.movie) {
      MovieInfoActions.getMovieInfo(this.props.params.id);
    }
  }

  handleOnClickTrailer() {
    console.log('hel')
    this.setState({
      trailerVisible: !this.state.trailerVisible,
    });
  }

  render() {
    const movie = this.state.movie;

    return (
      <div>
      {
        !!movie &&
        <div>
          <YoutubePlayer youtubeKey='GLPJSmUHZvU' visible={this.state.trailerVisible}/>
          <div className={style.backdrop}
               style={{
                 background: 'url(http://image.tmdb.org/t/p/w1280/' + movie.backdrop_path + ')',
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center top',
               }}>
          </div>
          <Ribbon movie={movie}/>
          <Card className={style.firstCard}>
            <Button label={'Play Trailer'} onClick={this.handleOnClickTrailer} flat primary/>
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
