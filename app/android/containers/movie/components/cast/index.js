import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

export default class Cast extends Component {
  render() {
    const cast = this.props.cast;

    return (
      <View style={styles.container}>
        <Text>Cast</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
