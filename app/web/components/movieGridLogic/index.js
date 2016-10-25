import React from 'react';
import { browserHistory } from 'react-router';
import MovieActions from '../../../actions/MovieActions';
import MovieStore from '../../../stores/MovieStore';
import ListStore from '../../../stores/ListStore';
import ListActions from '../../../actions/ListActions';

import {
  MoviePoster,
  PageLoader,
  MovieGrid,
} from '..';

export default class MovieGridLogic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: this.props.listName || 'popular',
      page: 1,
      movies: [],
      loading: false,
      end: false,
    };

    this.handleMovieStoreChange = this.handleMovieStoreChange.bind(this);
    this.handleScroll           = this.handleScroll.bind(this);
  }

  componentDidMount() {
    MovieStore.listen(this.handleMovieStoreChange);
    ListStore.listen(this.handleMovieStoreChange);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.getMovies();
  }

  componentWillUnmount() {
    MovieStore.unlisten(this.handleMovieStoreChange);
    ListStore.unlisten(this.handleMovieStoreChange);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.listName !== this.state.listName) {
      this.setState({
        listName: nextProps.listName || 'popular',
        page: 1,
        movies: [],
        loading: false,
        end: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.listName !== prevState.listName) {
      console.log('componentDidUpdate');
      this.getMovies();
    }
  }

  getMovies() {
    let currentPage = [];
    if(this.props.store == 'list') {
      currentPage = ListStore[getFunctionName(this.state.listName, this.props.store)](this.state.page);
    } else {
      currentPage = MovieStore[getFunctionName(this.state.listName, this.props.store)](this.state.page);
    }

    if(currentPage && currentPage.length > 0) {
      //Page has movies in it
      //So we display it
      this.setState({
        page: this.state.page + 1,
        movies: this.state.movies.concat(currentPage),
        loading: false,
      });
    } else if (currentPage){
      //Page is empty
      //Do not get anymore movies
      this.setState({
        loading: false,
        end: true,
      });
    } else if(!this.state.loading) {
      //Page does not exist yet
      //Perform action to get page
      if(this.props.store == 'list') {
        ListActions[getFunctionName(this.state.listName, this.props.store)](this.state.page);
      } else {
        MovieActions[getFunctionName(this.state.listName, this.props.store)](this.state.page);
      }

      this.setState({
        loading: true,
      });
    }
  }

  handleMovieStoreChange(store) {
    console.log('handleMovieStoreChange')
    this.getMovies();
  }

  handleScroll() {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    if (!this.state.loading && !this.state.end && (scrollTop + window.innerHeight) >= scrollHeight) {
      console.log('handleScroll');
      this.getMovies();
    }
  }

  handleOnClick(id) {
    browserHistory.push('/movie/' + id);
  }

  render() {
    return (
      <div>
        {
          this.state.movies &&
          <MovieGrid movies={this.state.movies}/>
        }
        {
          this.state.loading &&
          <PageLoader/>
        }
      </div>
    );
  }
}

const getFunctionName = function(listName, store) {
  if(store == 'list') {
    switch(listName) {
      case 'watched':
        return 'getWatchedMovies';
        break;
      case 'watch_later':
        return 'getWatchLaterMovies';
        break;
      default:
        return 'getFavoriteMovies';
    }
  } else {
    switch(listName) {
      case 'now_playing':
        return 'getNowPlayingMovies';
        break;
      case 'upcoming':
        return 'getUpcomingMovies';
        break;
      case 'top_rated':
        return 'getTopRatedMovies';
        break;
      default:
        return 'getPopularMovies';
    }
  }
}
