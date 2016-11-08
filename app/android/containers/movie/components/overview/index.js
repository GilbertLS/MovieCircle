import React, { Component } from 'react';
import FitImage from 'react-native-fit-image';

import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

export default class Overview extends Component {
  render() {
    const movie = this.props.movie;

    return (
      <View style={styles.container}>
        <Text style={styles.tagline}>{movie.tagline}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 6,
  },
  overview: {
    color: 'white',
    fontSize: 14
  }
});
