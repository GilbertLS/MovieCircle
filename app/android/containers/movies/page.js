import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import MovieActions from '../../../actions/MovieActions';
import MovieStore from '../../../stores/MovieStore';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';

import {
  MovieGridLogic,
  MovieGrid,
} from '../../components';

export default class MoviesPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={styles.container}
          tabBarUnderlineStyle={styles.underline}
          tabBarBackgroundColor='#5e35b1'
          tabBarInactiveTextColor='rgba(255, 255, 255, 0.7)'
          tabBarActiveTextColor='white'
          tabBarTextStyle={{fontSize: 14, fontWeight: '500'}}>
          <View style={styles.page} tabLabel='POPULAR'>
            <MovieGridLogic listName='popular' store='movie'/>
          </View>
          <View style={styles.page} tabLabel='TOP RATED'>
            <MovieGridLogic listName='top_rated' store='movie'/>
          </View>
          <View style={styles.page} tabLabel='PLAYING'>
            <MovieGridLogic listName='now_playing' store='movie'/>
          </View>
          <View style={styles.page} tabLabel='UPCOMING'>
            <MovieGridLogic listName='upcoming' store='movie'/>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flexDirection: 'column',
    flex: 1,
  },
  underline: {
    backgroundColor: '#ffc107',
  },
});
