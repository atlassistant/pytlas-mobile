import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, TextInput, Button,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { login } from '../store/auth/actions';

class Login extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    storeLogin: PropTypes.func.isRequired,
  }

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };
  }

  async next() {
    const { storeLogin, componentId } = this.props;
    const { username, password } = this.state;

    try {
      await storeLogin(username, password);

      Navigation.setStackRoot(componentId, {
        component: {
          name: 'screens.Chat',
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <View>
        <Text>Username</Text>
        <TextInput value={username} onChangeText={e => this.setState({ username: e })} />

        <Text>Password</Text>
        <TextInput
          value={password}
          secureTextEntry
          onChangeText={e => this.setState({ password: e })}
        />

        <Button onPress={() => this.next()} title="Login" />
      </View>
    );
  }
}

export default connect(null, dispatch => ({
  storeLogin: (username, password) => dispatch(login(username, password)),
}))(Login);
