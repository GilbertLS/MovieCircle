import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Toolbar } from 'react-native-material-ui';
import RouterActions from '../../router/actions';

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

export default class FavoritesPage extends Component {
  constructor(props) {
    super(props);

    this.handleOnLeftElementPress = this.handleOnLeftElementPress.bind(this);
  }

  handleOnLeftElementPress() {
    RouterActions.removeModal();
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement='arrow-back'
          centerElement='Your Lists'
          onLeftElementPress={this.handleOnLeftElementPress}
        />
        <ScrollableTabView
          style={styles.container}
          tabBarUnderlineStyle={styles.underline}
          tabBarBackgroundColor='#5e35b1'
          tabBarInactiveTextColor='rgba(255, 255, 255, 0.7)'
          tabBarActiveTextColor='white'
          tabBarTextStyle={{fontSize: 14, fontWeight: '500'}}
          initialPage={this.props.initialTab || 0}
        >
          <View style={styles.page} tabLabel='FAVORITES'>
            <MovieGridLogic listName='favorites' store='list'/>
          </View>
          <View style={styles.page} tabLabel='WATCHED'>
            <MovieGridLogic listName='watched' store='list'/>
          </View>
          <View style={styles.page} tabLabel='WATCH LATER'>
            <MovieGridLogic listName='watch_later' store='list'/>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

FavoritesPage.propTypes = {
  initialTab: React.PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  page: {
    flexDirection: 'column',
    flex: 1,
  },
  underline: {
    backgroundColor: '#ffc107',
  },
});
