import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class MoviePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {'Movie Page: ' + this.props.movie.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
