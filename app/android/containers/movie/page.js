import React, { Component, Dimensions } from 'react';
import { ActionButton } from 'react-native-material-ui';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Toolbar } from 'react-native-material-ui';
import RouterActions from '../../router/actions';

import MovieInfoStore from '../../../stores/MovieInfoStore';
import MovieInfoActions from '../../../actions/MovieInfoActions';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {
  Overview,
  Cast,
} from './components';

import {
  MovieGrid,
} from '../../components/';

export default class MoviePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: props.movie,
      backdrop_path: props.movie.backdrop_path,
      id: props.movie.id,
      watched: false,
      favorite: false,
      watchLater: false,
    }

    this.handleMovieInfoStoreChange  = this.handleMovieInfoStoreChange.bind(this);
    this.handleOnWatchedClick        = this.handleOnWatchedClick.bind(this);
    this.handleOnWatchLaterClick     = this.handleOnWatchLaterClick.bind(this);
    this.handleOnFavoriteClick       = this.handleOnFavoriteClick.bind(this);
    this.handleOnLeftElementPress    = this.handleOnLeftElementPress.bind(this);
    this.handleOnActionButtonPress = this.handleOnActionButtonPress.bind(this)
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
    if(store.movie.id === this.state.id) {
      this.setState({
        movie: store.movie,
        id: store.movie.id,
        watched: store.watched,
        favorite: store.favorite,
        watchLater: store.watchLater,
      });
    }

    RouterActions.replaceMovie.defer(store.movie);
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

  handleOnLeftElementPress() {
    RouterActions.removeMovie();
  }

  handleOnActionButtonPress(key) {
    switch(key) {
      case 'favorite':
        this.handleOnFavoriteClick();
        break;
      case 'visibility':
        this.handleOnWatchedClick();
        break;
      case 'watch-later':
        this.handleOnWatchLaterClick();
        break;
    }
  }

  render() {
    const movie = this.state.movie;

    return (
      <View style={styles.container}>
        <Toolbar
          leftElement='arrow-back'
          centerElement={(!!movie) ? movie.title + ' (' + movie.release_date.substring(0,4) + ')' : ''}
          onLeftElementPress={() => this.handleOnLeftElementPress()}
        />
        <ScrollableTabView
          style={(!!movie) ? {flex: 1} : {flex: -1}}
          tabBarUnderlineStyle={styles.underline}
          tabBarBackgroundColor='#5e35b1'
          tabBarInactiveTextColor='rgba(255, 255, 255, 0.7)'
          tabBarActiveTextColor='white'
          tabBarTextStyle={{fontSize: 14, fontWeight: '500'}}
          prerenderingSiblingsNumber={Infinity}
        >
          <View tabLabel='DETAILS'>
            {
              !!movie &&
              <Overview
                movie={movie}
                backdrop_path={this.state.backdrop_path}/>
            }
          </View>
          <View tabLabel='CAST'>
            {
              !!movie && !!movie.credits && !!movie.credits.crew &&
              <Cast cast={movie.credits.cast}/>
            }
          </View>
          <View style={{flex: 1}} tabLabel='SIMILAR'>
            {
              !!movie && !!movie.recommendations &&
              !!movie.recommendations.results &&
              <MovieGrid movies={movie.recommendations.results}/>
            }
          </View>
        </ScrollableTabView>
        {
          !movie &&
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size={60} color='#ffc107' />
          </View>
        }
        {
          !!movie &&  !!this.props.isLoggedIn &&
          <ActionButton
            icon='add'
            onPress={(key) => this.handleOnActionButtonPress(key)}
            actions={[
              {
                icon: 'favorite',
                label: (this.state.favorite) ? 'Remove From Favorites' : 'Add To Favorites'
              },
              {
                icon: 'visibility',
                label: (this.state.watched) ? 'Remove From Watched' : 'Add To Watched'
              },
              {
                icon: 'watch-later',
                label: (this.state.watchLater) ? 'Remove from Watch Later' : 'Add To Watch Later'
              },
            ]}
            transition={'speedDial'}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'pink',
  },
  container: {
    backgroundColor: '#222',
    flex: 1,
    flexDirection: 'column',
  },
  underline: {
    backgroundColor: '#ffc107',
  },
  indicatorContainer: {
    paddingTop: 20,
  },
});
