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
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#222',
  }
});
