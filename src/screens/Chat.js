/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import {
  View, ScrollView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Message, ChatInput } from '../components';
import { token, serverUrl } from '../store/auth/getters';
import { ChatService } from '../services';
import { brandColorInverse } from '../styles';
import { logout } from '../store/auth/actions';

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
    storeLogout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);

    this.service = null;
    this.state = {
      messages: [],
      input: '',
    };
  }

  async componentWillMount() {
    const { componentId } = this.props;
    const logoutIconSrc = await Icons.getImageSource('log-out');

    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'logout',
            icon: logoutIconSrc,
            color: brandColorInverse,
          },
        ],
      },
    });
  }

  componentDidMount() {
    const { storeServerUrl, storeToken } = this.props;

    this.service = new ChatService(storeServerUrl, storeToken);
    this.service.on('ready', () => this.service.parse('Coucou'));
    this.service.on('closed', () => console.log('disconnected'));
    this.service.on('answer', d => this.append(d.data));
    this.service.on('ask', d => this.append(d.data));
  }

  append(data) {
    const { messages } = this.state;

    this.setState({
      messages: [...messages, data],
    });
  }

  async navigationButtonPressed({ buttonId }) {
    if (buttonId === 'logout') {
      const { storeLogout, componentId } = this.props;

      await storeLogout();

      Navigation.setStackRoot(componentId, {
        component: {
          name: 'screens.ServerChoice',
        },
      });
    }
  }

  send() {
    const { input } = this.state;

    if (input) {
      this.service.parse(input);

      this.setState({ input: '' });
    }
  }

  render() {
    const { messages, input } = this.state;

    return (
      <View style={{ paddingTop: 56, flex: 1 }}>
        <ScrollView style={{ flexGrow: 1 }}>
          {messages.map((o, i) => <Message key={`message_${i}`} {...o} />)}
        </ScrollView>
        <ChatInput
          style={{ flexShrink: 0, flexGrow: 0 }}
          value={input}
          onChange={t => this.setState({ input: t })}
          onSend={() => this.send()}
        />
      </View>
    );
  }
}

export default connect(state => ({
  storeToken: token(state),
  storeServerUrl: serverUrl(state),
}), dispatch => ({
  storeLogout: () => dispatch(logout()),
}))(Chat);
