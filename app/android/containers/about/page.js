import React, { Component} from 'react';
import { Toolbar } from 'react-native-material-ui';
import RouterActions from '../../router/actions';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

export default class AboutPage extends Component {
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
          centerElement='About'
          onLeftElementPress={this.handleOnLeftElementPress}
        />
        <Text>MovieCircle is created by Gilbert Lavergne-Shank.</Text>
        <Text>The source can be found on my Github.</Text>
        <Text>This product uses the TMDb API but is not endorsed or certified by TMDb.</Text>
        <Image
          style={styles.logo}
          source={{ uri: 'https://www.themoviedb.org/assets/dd25a8d6d44072f1be5a9daf03470526/images/v4/logos/293x302-powered-by-square-green.png'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#222',
  },
  logo: {
    width: 100,
    height: 100,
  },
});
