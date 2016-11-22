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
      <View style={{flex: 1}}>
        <Toolbar
          leftElement='arrow-back'
          centerElement='About'
          onLeftElementPress={this.handleOnLeftElementPress}
        />
        <View style={styles.container}>
          <Text style={styles.text}>MovieCircle is created by Gilbert Lavergne-Shank.</Text>
          <Text style={styles.text}>The source can be found on my Github.</Text>
          <Image
            style={styles.logo}
            source={{ uri: 'https://www.themoviedb.org/assets/dd25a8d6d44072f1be5a9daf03470526/images/v4/logos/293x302-powered-by-square-green.png'}}
          />
          <Text style={styles.tmdb}>This product uses the TMDb API but is not endorsed or certified by TMDb.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#222',
  },
  logo: {
    marginTop: 40,
    width: 100,
    height: 100,
  },
  text: {
    color: 'white',
  },
  tmdb: {
    color: 'white',
  }
});
