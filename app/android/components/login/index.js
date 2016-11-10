import React, { Component } from 'react';
import FBSDK from 'react-native-fbsdk';
import { View } from 'react-native';

const {
  LoginButton,
  AccessToken,
} = FBSDK;

export default class Login extends React.Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then((accessToken) => console.log(accessToken.accessToken))
                alert("Login was successful with permissions: " + result.grantedPermissions);
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
};