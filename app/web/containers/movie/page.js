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
    }

    this.handleMovieInfoStoreChange = this.handleMovieInfoStoreChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //If the movie id param has changed load new movie
    if(nextProps.params.id != this.state.id) {
      this.setState({
        id: nextProps.params.id,
        movie: undefined,
      });
      MovieInfoActions.getMovieInfo(nextProps.params.id);
    }
  }

  componentDidMount() {
    MovieInfoStore.listen(this.handleMovieInfoStoreChange);
    MovieInfoActions.getMovieInfo(this.state.id);
  }

  componentWillUnmount() {
    MovieInfoStore.unlisten(this.handleMovieInfoStoreChange);
  }

  handleMovieInfoStoreChange(store) {
    this.setState({
      movie: store.movie,
    });
  }

  render() {
    const movie = this.state.movie;

    return (
      <div>
      {
        !!movie &&
        <div className={style.container}>
          <Backdrop backdropPath={movie.backdrop_path}>
            <div className={style.buttonContainer}>
              <TooltipButton icon='favorite_border' floating accent tooltip='Favorite' />
              <TooltipButton icon='visibility_off' floating accent mini tooltip='Watched' />
              <TooltipButton icon='watch_later' floating accent mini tooltip='Watch Later' />
            </div>
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
