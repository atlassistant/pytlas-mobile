/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import {
  View, ScrollView, PermissionsAndroid,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Message, ChatInput } from '../components';
import { token, serverUrl } from '../store/auth/getters';
import { ChatService, VoiceService } from '../services';
import { brandColorInverse } from '../styles';

class Chat extends Component {
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

  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);

    this.chat = null;
    this.state = {
      messages: [],
      input: '',
    };
  }

  async componentWillMount() {
    const { componentId } = this.props;

    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'settings',
            icon: await Icons.getImageSource('settings', 18),
            color: brandColorInverse,
          },
        ],
      },
    });
  }

  async componentDidMount() {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

    const { storeServerUrl, storeToken } = this.props;

    this.chat = new ChatService(storeServerUrl, storeToken);
    this.chat.on('ready', async (d) => {
      alert('ready');
      this.voice = new VoiceService(d.lang);

      await this.voice.setup();

      this.voice.on('speech', t => this.chat.parse(t));
      // this.chat.parse('Coucou');
    });
    this.chat.on('closed', () => console.log('disconnected'));
    this.chat.on('answer', d => this.append(d.data));
    this.chat.on('ask', d => this.append(d.data));
  }

  append(data) {
    const { messages } = this.state;

    this.setState({
      messages: [...messages, data],
    });

    if (data.raw_text) {
      this.voice.speak(data.raw_text);
    }
  }

  async navigationButtonPressed({ buttonId }) {
    if (buttonId === 'settings') {
      const { componentId } = this.props;

      Navigation.push(componentId, {
        component: {
          name: 'screens.Settings',
        },
      });
    }
  }

  send() {
    const { input } = this.state;

    if (input) {
      this.chat.parse(input);

      this.setState({ input: '' });
    }
  }

  render() {
    const { messages, input } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flexGrow: 1, paddingTop: 56 }}>
          {messages.map((o, i) => <Message key={`message_${i}`} {...o} />)}
        </ScrollView>
        <ChatInput
          style={{ flexShrink: 0, flexGrow: 0 }}
          value={input}
          onChange={t => this.setState({ input: t })}
          onSend={() => this.send()}
          onListen={() => this.voice.listen()}
        />
      </View>
    );
  }
}

export default connect(state => ({
  storeToken: token(state),
  storeServerUrl: serverUrl(state),
}))(Chat);
