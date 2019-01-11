/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import {
  View, ScrollView, PermissionsAndroid, ToastAndroid,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Message, ChatInput } from '../components';
import { token, serverUrl } from '../store/auth/getters';
import { ChatService, VoiceService } from '../services';
import { textOnBackgroundColor } from '../styles';

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
    this.voice = null;
    this.mustListenOnSpeechEnd = false;

    this.state = {
      messages: [
        // {
        //   raw_text: 'Que puis-je faire pour toi ?',
        // },
        // {
        //   raw_text: 'Donne moi les infos',
        //   self: true,
        // },
        // {
        //   raw_text: 'Que puis-je faire pour toi ?',
        // },
        // {
        //   raw_text: 'Donne moi les infos',
        //   self: true,
        // },
        // {
        //   raw_text: 'Que puis-je faire pour toi ?',
        // },
        // {
        //   raw_text: 'Donne moi les infos',
        //   self: true,
        // },
        // {
        //   raw_text: 'Que puis-je faire pour toi ?',
        // },
        // {
        //   raw_text: 'Donne moi les infos de toute une vie de débauche et tout',
        //   self: true,
        // },
        // {
        //   raw_text: 'Donne moi les infos',
        //   self: true,
        // },
        // {
        //   raw_text: 'Que puis-je faire pour toi ?',
        // },
        // {
        //   raw_text: 'Donne moi les infos',
        //   self: true,
        // },
        // {
        //   raw_text: 'Que puis-je faire pour toi ?',
        // },
        // {
        //   raw_text: 'Donne moi les infos',
        //   self: true,
        // },
        // {
        //   raw_text: 'Que puis-je faire pour toi ?',
        // },
        // {
        //   raw_text: 'Donne moi les infos avant dernier',
        //   self: true,
        // },
        // {
        //   raw_text: 'C\'est le dernier!!',
        // },
      ],
      input: '',
      listening: false,
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
            color: textOnBackgroundColor,
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
      if (!this.voice) {
        this.voice = new VoiceService(d.language);

        await this.voice.setup();

        this.voice.on('speechStart', () => this.setState({ listening: true }));
        this.voice.on('speechEnd', () => this.setState({ listening: false }));
        this.voice.on('speechResult', t => this.send(t));

        this.voice.on('speakEnd', () => this.mustListenOnSpeechEnd && this.voice.listen());
      }

      ToastAndroid.show('Connected!', ToastAndroid.SHORT);
    });
    this.chat.on('closed', () => ToastAndroid.show('Disconnected', ToastAndroid.SHORT));
    this.chat.on('answer', d => this.append(d.data));
    this.chat.on('ask', d => this.append(d.data));
    this.chat.on('done', (d) => {
      this.mustListenOnSpeechEnd = d.require_input || false;
    });
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

  send(text) {
    const { input, messages } = this.state;
    const toBeSent = text || input;

    if (toBeSent) {
      this.chat.parse(toBeSent);

      this.setState({
        messages: [...messages, {
          raw_text: toBeSent,
          self: true,
        }],
      });

      this.setState({ input: '' });
    }
  }

  render() {
    const { messages, input, listening } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          // eslint-disable-next-line no-return-assign
          ref={ref => this.scrollView = ref}
          onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
          style={{ flexGrow: 1/* , marginTop: 56 */ }}
          contentContainerStyle={{
            paddingLeft: 16, paddingRight: 16, paddingTop: 56, paddingBottom: 16,
          }}
        >
          {messages.map((o, i) => <Message key={`message_${i}`} {...o} />)}
        </ScrollView>
        <ChatInput
          style={{ flexShrink: 0, flexGrow: 0 }}
          value={input}
          listening={listening}
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
