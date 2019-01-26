import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { login } from '../store/auth/actions';
import {
  Page, Button, TextInput, Spacer,
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
      <Page
      // eslint-disable-next-line global-require
        image={require('../images/lock.png')}
        title="Authenticate"
        description="Please fill the form below to confirm your identity."
      >
        <TextInput
          label="Username"
          centered
          value={username}
          onChange={e => this.setState({ username: e })}
        />
        <TextInput
          label="Password"
          centered
          value={password}
          secureTextEntry
          onChange={e => this.setState({ password: e })}
        />
        <Spacer />
        <Button
          onPress={() => this.next()}
          title="Login"
          inversed
        />
      </Page>
    );
  }
}

export default connect(null, dispatch => ({
  storeLogin: (username, password) => dispatch(login(username, password)),
}))(Login);
