import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Login from './Login';

export default class ServerChoice extends Component {
  static name = 'screens.ServerChoice'

  static options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  static propTypes = {
    componentId: PropTypes.string.isRequired,
  }

  render() {
    const { componentId } = this.props;

    return (
      <View>
        <Text>Choose your server</Text>
        <Button
          title="Next"
          onPress={() => Navigation.push(componentId, {
            component: {
              name: Login.name,
            },
          })}
        />
      </View>
    );
  }
}
