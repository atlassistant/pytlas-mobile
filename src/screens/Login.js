import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { ToastAndroid } from 'react-native';
import { login } from '../store/auth/actions';
import {
  OnBoardingPage, Button, TextInput, Spacer,
} from '../components';
import { brandColor } from '../styles';

class Login extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
      },
      statusBar: {
        backgroundColor: brandColor,
      },
      layout: {
        backgroundColor: brandColor,
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
      loading: false,
    };
  }

  async next() {
    const { storeLogin, componentId } = this.props;
    const { username, password } = this.state;

    this.setState({ loading: true });

    try {
      await storeLogin(username, password);

      Navigation.setStackRoot(componentId, {
        component: {
          name: 'screens.Chat',
        },
      });
    } catch (e) {
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { username, password, loading } = this.state;

    return (
      <OnBoardingPage
      // eslint-disable-next-line global-require
        image={require('../images/lock.png')}
        title="Authenticate"
        description="Please fill the form below to confirm your identity."
      >
        <TextInput
          label="Username"
          centered
          disabled={loading}
          value={username}
          onChange={e => this.setState({ username: e })}
        />
        <TextInput
          label="Password"
          centered
          disabled={loading}
          value={password}
          secureTextEntry
          onChange={e => this.setState({ password: e })}
        />
        <Spacer />
        <Button
          onPress={() => this.next()}
          disabled={loading || !username || !password}
          title="Login"
          inversed
        />
      </OnBoardingPage>
    );
  }
}

export default connect(null, dispatch => ({
  storeLogin: (username, password) => dispatch(login(username, password)),
}))(Login);
