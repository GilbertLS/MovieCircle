import React, { Component} from 'react';
import MovieInfoStore from '../../../stores/MovieInfoStore';
import MovieInfoActions from '../../../actions/MovieInfoActions';

import style from './style.scss';

import {
  Button,
  IconMenu,
  MenuItem,
  FontIcon,
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
  ButtonMenu,
} from '../../components/';

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
      this.setState({
        watched: false,
        favorite: false,
        watchLater: false,
      });
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
                {
                  !!this.state.favorite &&
                  <FontIcon value='favorite' />
                }
                {
                  !!this.state.watched &&
                  <FontIcon value='visibility' />
                }
                {
                  !!this.state.watchLater &&
                  <FontIcon value='watch_later' />
                }
                {
                  <div className={style.menu}>
                    <ButtonMenu>
                      <MenuItem
                        caption={
                          (!this.state.favorite) ? 'Add To Favorites' :
                                                   'Remove From Favorites'
                        }
                        onClick={this.handleOnFavoriteClick}
                        icon='favorite'/>
                      <MenuItem
                        caption={
                          (!this.state.watched) ? 'Add To Watched' :
                                                  'Remove From Watched'
                        }
                        onClick={this.handleOnWatchedClick}
                        icon='visibility_on'/>
                      <MenuItem
                        caption={
                          (!this.state.watchLater) ? 'Add To Watch Later' :
                                                     'Remove From Watch Later'
                        }
                        onClick={this.handleOnWatchLaterClick}
                        icon='watch_later'/>
                    </ButtonMenu>
                  </div>
                }
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
              <Recommendations recommendations={movie.recommendations.results}/>
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

MoviePage.propTypes = {
  isLoggedIn: React.PropTypes.bool,
};
