import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Login extends Component {
  static name = 'screens.Login'

  static options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  render() {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
}
