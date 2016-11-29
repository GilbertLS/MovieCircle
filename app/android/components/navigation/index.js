import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import { Avatar } from 'react-native-material-ui';

import FacebookActions from '../../../actions/FacebookActions';
import UserActions from '../../../actions/UserActions';
import RouterActions from '../../router/actions';
import FacebookStore from '../../../stores/FacebookStore';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      me: FacebookStore.getMe(),
    };

    this.handleFacebookStoreChange = this.handleFacebookStoreChange.bind(this);
  }

  componentDidMount() {
    FacebookStore.listen(this.handleFacebookStoreChange);
  }

  componentWillUnmount() {
    FacebookStore.unlisten(this.handleFacebookStoreChange);
  }

  handleFacebookStoreChange() {
    this.setState({
      me: FacebookStore.getMe(),
    });
  }

  handleOnClick(key) {
    if(!!key) {
      RouterActions.addModal(key);
    }
    this.props.onClick();
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
      { type: 'button', label: 'Watched', iconName: 'visibility', onclick: () => this.handleOnClick('watched')},
      { type: 'button', label: 'Watch Later', iconName: 'schedule', onclick: () => this.handleOnClick('watch_later')},
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
        {
          this.props.isLoggedIn && !!this.state.me &&
          <View style={styles.accountInfo}>
            <Image
              style={styles.accountInfoImage}
              source={{uri: this.state.me.picture.data.url}}
            />
            <Text
              style={styles.accountInfoText}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {this.state.me.name}
            </Text>
          </View>
        }
        {
          this.props.isLoggedIn && !!this.state.me &&
          <View style={styles.divider}></View>
        }
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

Navigation.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  isLoggedIn: React.PropTypes.bool,
};

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
  },
  accountInfo: {
    margin: 16,
    flexDirection: 'row',
  },
  accountInfoImage: {
    width: 50,
    height: 52,
    borderRadius: 30,
  },
  accountInfoText: {
    color: '#bdbdbd',
    fontSize: 18,
    margin: 16,
  }
});
