import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

import FacebookActions from '../../../actions/FacebookActions';
import UserActions from '../../../actions/UserActions';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';


const facebookLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNTgwMTE3NDA3MjA2ODExODA4M0NDMTM4MEMyQTVFQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCN0YwMzNGQUE2MTYxMUUyOEJFQUJDRTMzOERDQjM5MCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCN0YwMzNGOUE2MTYxMUUyOEJFQUJDRTMzOERDQjM5MCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUM3QUJGQTkzODIwNjgxMThDMTQ5OEFGOTgxQUJBQ0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDU4MDExNzQwNzIwNjgxMTgwODNDQzEzODBDMkE1RUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5VkWTUAAABF0lEQVR42mK0Dp/LyMDAUATEDUDMw0A78AVqRy8L1MIeBtoDHpg9TEDcyEBf0AiylJvOlnIzMQwAYKGK0znZGALdNBgcLRQYFKQFGNjZWBi+//jN8OHzT4bQ3FXUt1RFQZihvdiZQVIUNeFzcrCCMdV9ysPFxtBb4cYgLMBJkj6K4jTSR5dkCyn2qb25PAp//e6bDDOXn2b48u0X7XwqK8GHwp+/9jxBCym2lJkZVfv7j99oH6fo4P9/BvpbSpOEdGRFEknyv//8Y3CJX8Tw9+8/+vn00fOPGBbS3NIHjz/QP04fPP1AeZzaRMzDG4fo8oMq9Y5aOmrp0Lb0K53t/AqytJ3OlraDLG0D4hI6+Pgr1J5WgAADACLKR4SeAF87AAAAAElFTkSuQmCC';

const paths = {
  movies: '/',
  favorites: '/list/favorites',
  watched: '/list/watched',
  watchLater: '/list/watch_later',
};

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
      Actions[key]();
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
    UserActions.logoutFacebook();
  }

  handleSignInOnClick() {
    FacebookActions.login();
  }

  render() {
    const button = function(label, iconName, onclick) {
      return (
        <TouchableNativeFeedback
          key={'button-' + label}
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple('#424242')}
          onPress={onclick}>
          <View style={styles.buttonView}>
            <Icon style={styles.buttonIcon} name={iconName} />
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
      { type: 'button', label: 'Movies', iconName: 'theaters', onclick: () => this.handleOnClick('movies') },
      { type: 'divider' },
      { type: 'title', label: 'Your Lists' },
      { type: 'button', label: 'Favorites', iconName: 'favorite', onclick: () => this.handleOnClick('movie') },
      { type: 'button', label: 'Watched', iconName: 'visibility' },
      { type: 'button', label: 'Watch Later', iconName: 'schedule' },
      { type: 'divider' },
      { type: 'title', label: 'Your Account' },
      { type: 'button', label: 'Sign Out', iconName: 'cancel'},
      { type: 'divider' },
      { type: 'button', label:'About', iconName: 'help' },
    ];

    return (
      <ScrollView>
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
