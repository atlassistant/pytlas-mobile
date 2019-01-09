import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View, Text, Button, TextInput,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Login from './Login';
import { selectServer } from '../store/auth/actions';
import { serverUrl } from '../store/auth/getters';

class ServerChoice extends Component {
  static screenName = 'screens.ServerChoice'

  static options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    storeSelectServer: PropTypes.func.isRequired,
    storeServerUrl: PropTypes.string.isRequired,
  }

  constructor() {
    super();

    this.state = {
      url: '',
    };
  }

  componentDidMount() {
    const { storeServerUrl } = this.props;

    this.setState({ url: storeServerUrl });
  }

  async next() {
    const { storeSelectServer, componentId } = this.props;
    const { url } = this.state;

    await storeSelectServer(url);

    Navigation.push(componentId, {
      component: {
        name: Login.screenName,
      },
    });
  }

  render() {
    const { url } = this.state;

    return (
      <View>
        <Text>Choose your server</Text>
        <TextInput
          value={url}
          onChangeText={e => this.setState({ url: e })}
        />
        <Button
          title="Next"
          onPress={() => this.next()}
        />
      </View>
    );
  }
}

export default connect(state => ({
  storeServerUrl: serverUrl(state),
}), dispatch => ({
  storeSelectServer: url => dispatch(selectServer(url)),
}))(ServerChoice);
