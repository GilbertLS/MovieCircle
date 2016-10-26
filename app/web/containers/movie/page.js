import React, { Component} from 'react';
import MovieInfoStore from '../../../stores/MovieInfoStore';
import MovieInfoActions from '../../../actions/MovieInfoActions';

import style from './style.scss';

import {
  Card,
  Button,
  Tooltip,
} from 'react-toolbox';

import {
  Ribbon,
  Cast,
  Overview,
  Recommendations,
  Backdrop,
} from './components';

import {
  MovieGrid,
  PageLoader,
} from '../../components/';

const TooltipButton = Tooltip(Button);

export default class MoviePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      movie: undefined,
      watched: false,
      favorite: false,
      watchLater: false,
    }

    this.handleMovieInfoStoreChange = this.handleMovieInfoStoreChange.bind(this);
    this.handleOnWatchedClick       = this.handleOnWatchedClick.bind(this);
    this.handleOnWatchLaterClick    = this.handleOnWatchLaterClick.bind(this);
    this.handleOnFavoriteClick      = this.handleOnFavoriteClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //If the movie id param has changed load new movie
    if(nextProps.params.id != this.state.id) {
      this.setState({
        id: nextProps.params.id,
        movie: undefined,
        watched: false,
        favorite: false,
        watchLater: false,
      });
      this.getMovieInfo(nextProps.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.getMovieInfo(this.props.params.id);
    }
  }

  componentDidMount() {
    MovieInfoStore.listen(this.handleMovieInfoStoreChange);
    this.getMovieInfo(this.state.id);
  }

  componentWillUnmount() {
    MovieInfoStore.unlisten(this.handleMovieInfoStoreChange);
  }

  getMovieInfo(id) {
    if(this.props.isLoggedIn) {
      MovieInfoActions.getAuthMovieInfo(id);
    } else {
      MovieInfoActions.getMovieInfo(id);
    }
  }

  handleMovieInfoStoreChange(store) {
    this.setState({
      movie: store.movie,
      watched: store.watched,
      favorite: store.favorite,
      watchLater: store.watchLater,
    });
  }

  handleOnWatchedClick() {
    if(!this.state.watched) {
      MovieInfoActions.watchedMovie(this.state.id);
    } else {
      MovieInfoActions.removeWatchedMovie(this.state.id)
    }
    this.setState({ watched: true });
  }

  handleOnWatchLaterClick() {
    if(!this.state.watchLater) {
      MovieInfoActions.watchLaterMovie(this.state.id);
    } else {
      MovieInfoActions.removeWatchLaterMovie(this.state.id)
    }
    this.setState({ watchLater: true });
  }

  handleOnFavoriteClick() {
    if(!this.state.favorite) {
      MovieInfoActions.favoriteMovie(this.state.id);
    } else {
      MovieInfoActions.removeFavoriteMovie(this.state.id)
    }
    this.setState({ favorite: true });
  }

  render() {
    const movie = this.state.movie;

    return (
      <div>
      {
        !!movie &&
        <div className={style.container}>
          <Backdrop backdropPath={movie.backdrop_path}>
            {
              !!this.props.isLoggedIn &&
              <div className={style.buttonContainer}>
                <TooltipButton
                  icon={(this.state.favorite) ? 'favorite' : 'favorite_border'}
                  floating accent
                  tooltip={(this.state.favorite) ? 'Remove Favorite' : 'Favorite'}
                  onClick={this.handleOnFavoriteClick}/>
                <TooltipButton
                  icon={(this.state.watched) ? 'visibility_on' : 'visibility_off'}
                  floating accent mini
                  tooltip={(this.state.watched) ? 'Remove Watched' : 'Watched'}
                  onClick={this.handleOnWatchedClick}/>
                <TooltipButton
                  icon={(this.state.watchLater) ? 'cancel' : 'watch_later'}
                  floating accent mini
                  tooltip={(this.state.watchLater) ? 'Remove Watch Later' : 'Watch Later'}
                  onClick={this.handleOnWatchLaterClick}/>
              </div>
            }
          </Backdrop>

          <Ribbon movie={movie}/>

          <div className={style.content}>
            <Overview movie={movie}/>
          </div>

          {
            !!movie.credits && movie.credits.cast.length > 0 &&
            <div className={style.content}>
              <div className={style.sectionTitle}>Cast</div>
              <Cast percent={0} cast={movie.credits.cast}/>
            </div>
          }

          {
            !!movie.recommendations && movie.recommendations.results.length > 0 &&
            <div className={style.content}>
              <div className={style.sectionTitle}>Recommendations</div>
              <Recommendations recommendations={movie.recommendations}/>
            </div>
          }
        </div>
      }
      {
        !movie &&
        <PageLoader/>
      }
      </div>
    );
  }
}
