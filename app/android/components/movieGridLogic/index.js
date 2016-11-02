import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import MovieActions from '../../../actions/MovieActions';
import MovieStore from '../../../stores/MovieStore';
import ListStore from '../../../stores/ListStore';
import ListActions from '../../../actions/ListActions';

import {
  MovieGrid,
} from '../';

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
    this.getMovies();
  }

  componentWillUnmount() {
    MovieStore.unlisten(this.handleMovieStoreChange);
    ListStore.unlisten(this.handleMovieStoreChange);
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
    if(!this.state.loading && !this.state.end) {
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
    } else if (currentPage) {
      //Page is empty
      //Do not get anymore movies
      this.setState({
        loading: false,
        end: true,
      });
    }
  }

  handleScroll() {
    //Needs to be written for scrollview
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    if (!this.state.loading && !this.state.end && (scrollTop + window.innerHeight) >= scrollHeight) {
      console.log('handleScroll');
      this.getMovies();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          <MovieGrid movies={this.state.movies}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
