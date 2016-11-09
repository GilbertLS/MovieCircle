import React, { Component } from 'react';
import Icon from 'react-native-vector-icons';
import RouterActions from '../../router/actions';

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

    this.handleOnLeftElementPress  = this.handleOnLeftElementPress.bind(this);
    this.handleOnRightElementPress = this.handleOnRightElementPress.bind(this);
    this.handleOnClick             = this.handleOnClick.bind(this);
  }

  handleOnLeftElementPress() {
    this.drawer.openDrawer();
  }

  handleOnRightElementPress() {
    RouterActions.addModal('search');
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
          renderNavigationView={() => {
            return <Navigation isLoggedIn={false} onClick={this.handleOnClick}/>
          }}
          drawerBackgroundColor='#222'
          style={styles.layout}>
            <StatusBar backgroundColor='#4F2C94'/>
            <Toolbar
              leftElement='menu'
              centerElement='MovieCircle'
              rightElement='search'
              onLeftElementPress={this.handleOnLeftElementPress}
              onRightElementPress={this.handleOnRightElementPress}
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
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
