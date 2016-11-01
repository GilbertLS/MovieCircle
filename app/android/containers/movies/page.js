import React, { Component } from 'react';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class MoviesPage extends Component {
  render() {
    console.log('render')
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarUnderlineStyle={styles.underline}
          tabBarBackgroundColor='#673ab7'
          tabBarInactiveTextColor='rgba(255, 255, 255, 0.7)'
          tabBarActiveTextColor='white'
          tabBarTextStyle={{fontSize: 14, fontWeight: '500'}}
          renderTabBar={() => <ScrollableTabBar />}>
          <View tabLabel="POPULAR"></View>
          <View tabLabel="TOP RATED"></View>
          <View tabLabel="NOW PLAYING"></View>
          <View tabLabel="UPCOMING"></View>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  underline: {
    backgroundColor: '#ffc107',
  }
});
