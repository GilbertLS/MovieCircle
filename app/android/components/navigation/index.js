import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import { Toolbar } from 'react-native-material-ui';

import FacebookActions from '../../../actions/FacebookActions';
import UserActions from '../../../actions/UserActions';
import RouterActions from '../../router/actions';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogActive: false,
    };

    this.handleAboutOnClick = this.handleAboutOnClick.bind(this);
  }

  handleOnClick(key) {
    if(!!key) {
      RouterActions.addModal(key);
    }
    this.props.onClick();
  }

  handleAboutOnClick() {
    this.setState({
      isDialogActive: !this.state.isDialogActive,
    });
  }

  handleSignOutOnClick() {
    FacebookActions.logout();
  }

  handleSignInOnClick() {
    FacebookActions.login();
  }

  render() {
    const button = function(label, iconName, onclick) {
      let icon = undefined

      if(!!iconName && !iconName.includes('sc-')) {
        icon = <Icon style={styles.buttonIcon} name={iconName} />
      } else if (!!iconName) {
        icon = <EvilIcon style={styles.buttonIcon} name={iconName} />
      }

      return (
        <TouchableNativeFeedback
          key={'button-' + label}
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple('#424242')}
          onPress={onclick}>
          <View style={styles.buttonView}>
            {icon}
            <Text style={styles.buttonText}>{label}</Text>
          </View>
        </TouchableNativeFeedback>
      );
    };

    const divider = function() {
      return (
        <View key={'divider-' + dividerNumber} style={styles.divider}></View>
      );
    };

    const title = function(label) {
      return (
        <View key={'title-' + label}>
          <Text style={styles.title}>{label}</Text>
        </View>
      );
    };

    let dividerNumber = 0;

    let list = [
      { type: 'title', label: 'Your Lists' },
      { type: 'button', label: 'Favorites', iconName: 'favorite', onclick: () => this.handleOnClick('favorites')},
      { type: 'button', label: 'Watched', iconName: 'visibility' },
      { type: 'button', label: 'Watch Later', iconName: 'schedule' },
      { type: 'divider' },
      { type: 'title', label: 'Your Account' },
      { type: 'button', label: 'Sign Out', iconName: 'cancel', onclick: () => this.handleSignOutOnClick()},
      { type: 'divider' },
      { type: 'button', label:'About', iconName: 'help', onclick: () => this.handleOnClick('about')},
    ];

    if(!this.props.isLoggedIn) {
      list = [
        { type: 'button', label: 'Sign In With Facebook', iconName: 'sc-facebook', onclick: () => this.handleSignInOnClick() },
        { type: 'divider' },
        { type: 'button', label:'About', iconName: 'help', onclick: () => this.handleOnClick('about')},
      ]
    }

    return (
      <ScrollView>
        <Toolbar
          style={{
            container: { backgroundColor: 'rgba(0,0,0,0)' },
            leftElement: { color: '#bdbdbd' },
          }}
          leftElement='arrow-back'
          onLeftElementPress={() => this.props.onClick()}/>
        {
          list.map((item) => {
            if(item.type == 'button') {
              return button(item.label, item.iconName, item.onclick);
            } else if(item.type == 'divider') {
              return divider(dividerNumber++);
            } else if(item.type == 'title') {
              return title(item.label);
            }
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonIcon: {
    color: '#bdbdbd',
    fontSize: 24,
    margin: 16,
  },
  buttonText: {
    color: '#bdbdbd',
    fontSize: 16,
    margin: 16,
  },
  buttonView: {
    flexDirection: 'row',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#616161',
  },
  title: {
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    color: '#9e9e9e',
    fontWeight: '500',
  }
});
