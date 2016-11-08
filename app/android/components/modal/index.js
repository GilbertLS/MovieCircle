import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  View,
  Animated,
  Easing,
  BackAndroid,
} from 'react-native';

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationValue: new Animated.Value(0),
      closing: false,
    };

    this.handleOnIconClick = this.handleOnIconClick.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleOnIconClick);
    this.state.animationValue.setValue(0.2);
    Animated.timing(
      this.state.animationValue,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.quad,
      },
    ).start();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleOnIconClick);
  }

  handleOnIconClick() {
    if(!!this.state.closing)
      return;

    this.setState({
      closing: true,
    });

    this.state.animationValue.setValue(1);
    Animated.timing(
      this.state.animationValue,
      {
        toValue: 0.2,
        duration: 200,
        easing: Easing.quad,
      },
    ).start();

    //setTimeout(() => {Actions.pop()}, 200);
  }

  render() {
    return (
      <Animated.View style={[{
        opacity: this.state.animationValue,
        transform: [{
          translateY: this.state.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 0]
          }),
        }],
      }, styles.container]}>
        {
          this.props.children
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgb(51, 51, 51)',
  },
  toolbar: {
    backgroundColor: '#5e35b1',
    height: 56,
  },
});
