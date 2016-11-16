import React, { Component } from 'react';
import FitImage from 'react-native-fit-image';
import RouterActions from '../../router/actions';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
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
    RouterActions.addMovie(this.props.movie.id, this.props.movie);
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
    })
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this.handleOnPress}
        delayPressIn={0}>
        <View style={styles.poster}>
            <FitImage
              originalWidth={342}
              originalHeight={513}
              indicator
              indicatorColor='#ffc107' // react native colors or color codes like #919191
              indicatorSize='large'
              source={{ uri: 'http://image.tmdb.org/t/p/w342' + this.props.movie.poster_path}}
            />
        </View>
      </TouchableNativeFeedback>
    );
  }
};

const styles = StyleSheet.create({
  poster: {
    flex: 0.5,
    paddingLeft: 3,
    paddingTop: 3,
  },
});
