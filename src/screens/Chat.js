import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text,
} from 'react-native';
import { token, serverUrl } from '../store/auth/getters';
import { ChatService } from '../services';

class Chat extends Component {
  static screenName = 'screens.Chat'

  static options = {
    topBar: {
      title: {
        text: '',
      },
    },
  }

  static propTypes = {
    storeServerUrl: PropTypes.string.isRequired,
    storeToken: PropTypes.string.isRequired,
  }

  constructor() {
    super();

    this.service = null;
  }

  componentDidMount() {
    const { storeServerUrl, storeToken } = this.props;

    this.service = new ChatService(storeServerUrl, storeToken);
    this.service.on('ready', () => this.service.parse('Coucou'));
    this.service.on('closed', () => console.log('disconnected'));
    this.service.on('answer', d => console.log(d.data));
  }

  render() {
    return (
      <View style={{ paddingTop: 56 }}>
        <Text>Chat here</Text>
      </View>
    );
  }
}

export default connect(state => ({
  storeToken: token(state),
  storeServerUrl: serverUrl(state),
}))(Chat);
