import React, { Component } from 'react';
import FitImage from 'react-native-fit-image';
import { Actions } from 'react-native-router-flux';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class MoviePoster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };

    this.handleOnPress = this.handleOnPress.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  handleOnPress() {
    Actions.movie({movie: this.props.movie})
  }

  handleOnLoad() {
    console.log('hello')
    this.setState({
      loaded: true,
    })
  }

  render() {
    return (
      <View style={styles.poster}>
            <FitImage
              originalWidth={342}
              originalHeight={513}
              source={{ uri: 'http://image.tmdb.org/t/p/w342' + this.props.movie.poster_path}}
            />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  poster: {
    flex: 1,
    paddingLeft: 3,
    paddingTop: 3,
    backgroundColor: 'red',
    borderWidth: 1,
    minHeight: 100,
  },
  hidden: {
    width: 0,
    height: 0,
  },
});
