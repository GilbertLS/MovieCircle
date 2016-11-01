import React, { Component } from 'react';
import { DefaultRenderer } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ToolbarAndroid,
  DrawerLayoutAndroid,
} from 'react-native';

import { Navigation } from '../';

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
    const state = this.props.navigationState;
    const children = state.children;
    console.log(children.length)
    return (
        <DrawerLayoutAndroid
          ref={(ref) => {this.drawer = ref}}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => {return <Navigation onClick={this.handleOnClick}/>}}
          drawerBackgroundColor='#222'
          style={styles.layout}>
            <StatusBar backgroundColor='#4F2C94'/>
            <Icon.ToolbarAndroid
              onIconClicked={this.handleOnIconClick}
              navIconName='menu'
              style={styles.toolbar}
              title='MovieCircle'
              titleColor='#ffffff'/>
            <View style={styles.container}>
              {<DefaultRenderer
                navigationState={(children.length > 0) ? children[children.length-1] : undefined}
                onNavigate={this.props.onNavigate}/>}
            </View>
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
