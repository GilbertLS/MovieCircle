import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  DrawerLayoutAndroid,
} from 'react-native';

import { Toolbar } from 'react-native-material-ui';

import {
  MoviesPage,
  MoviePage,
 } from '../../containers';

import {
  Navigation,
  Modal,
 } from '../';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleOnIconClick = this.handleOnIconClick.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnIconClick() {
    this.drawer.openDrawer();
  }

  handleOnClick() {
    this.drawer.closeDrawer();
  }

  render() {
    return (
        <DrawerLayoutAndroid
          ref={(ref) => {this.drawer = ref}}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => {return <Navigation onClick={this.handleOnClick}/>}}
          drawerBackgroundColor='#222'
          style={styles.layout}>
            <StatusBar backgroundColor='#4F2C94'/>
            <Toolbar
              leftElement='menu'
              centerElement='MovieCircle'
              rightElement='search'
              onLeftElementPress={this.handleOnIconClick}
            />
            <MoviesPage/>
        </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#5e35b1',
    height: 56,
  },
  layout: {
    backgroundColor: 'rgb(51, 51, 51)',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  }
});
