/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import {
  View, ScrollView, PermissionsAndroid, ToastAndroid, StyleSheet,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  Message, ChatInput, Text, Button,
} from '../components';
import { token, serverUrl } from '../store/auth/getters';
import { ChatService, VoiceService } from '../services';
import {
  toRGBA, backgroundColor, brandColor, textOnBackgroundColor,
} from '../styles';
import {
  mode, setMode, setMicPermissions, micAvailable,
} from '../store/assistant';

const styles = StyleSheet.create({
  blankslate__text: {
    color: toRGBA('#ffffff', 0.4),
    fontSize: 18,
    marginTop: 16,
  },
  choice: {
    backgroundColor,
    borderColor: brandColor,
  },
});

class Chat extends Component {
  static options = {
    topBar: {
      buttonColor: textOnBackgroundColor,
      background: {
        // color: backgroundColor,
        color: toRGBA(backgroundColor, 0.9),
      },
      backButton: {
        color: textOnBackgroundColor,
      },
      elevation: 0,
      drawBehind: true,
      visible: false,
      hideOnScroll: false,
      title: {
        color: textOnBackgroundColor,
      },
    },
    statusBar: {
      backgroundColor,
    },
    layout: {
      backgroundColor,
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
      choices: null,
      // choices: ['Oui', 'Non'],
      messages: [
        // {
        //   raw_text: 'Et voilà',
        //   cards: [{
        //     raw_header: 'Toto',
        //     media: 'https://thumbs-prod.si-cdn.com/EcxywuteBaRhUuD8I3TssmUwM5M=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/06/b4/06b4036b-ee17-47c5-a2d2-05338fdf6e31/gettyimages-1076407442.jpg',
        //     raw_subhead: 'A subhead here',
        //     raw_text: 'You can also wait for the Image onLayout callback to get its layout properties and use that to update the dimensions. I created a component for that:',
        //     header_link: 'https://google.com',
        //   }, {
        //     raw_header: 'Toto 1',
        //     raw_text: 'blab lberkl ekl',
        //   }, {
        //     raw_header: 'Toto 2',
        //     raw_text: 'blab lberkl ekl',
        //   }],
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
        //   raw_text: 'Donne moi les infos',
        //   self: true,
        // },
        // {
        //   raw_text: 'Que puis-je faire pour toi ?',
        // },
        // {
        //   raw_text: 'Je suis sur le coup !',
        //   grouped: true,
        // },
        // {
        //   raw_text: 'Voici les résultats :',
        //   grouped: true,
        // },
        // {
        //   raw_text: 'Donne moi les infos de toute une vie de débauche et tout',
        //   self: true,
        // },
        // {
        //   raw_text: 'Donne moi les infos',
        //   self: true,
        //   grouped: true,
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
      ready: false,
    };
  }

  async componentDidMount() {
    const { storeServerUrl, storeToken, storeSetMicPermissions } = this.props;

    // eslint-disable-next-line max-len
    storeSetMicPermissions(await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO));

    this.chat = new ChatService(storeServerUrl, storeToken);
    this.chat.on('ready', async (d) => {
      if (!this.voice) {
        this.voice = new VoiceService(d.language);

        await this.voice.setup();

        this.voice.on('speechStart', () => this.setState({ listening: true }));
        this.voice.on('speechEnd', () => this.setState({ listening: false }));
        this.voice.on('speechResult', t => this.send(t));

        this.voice.on('speakEnd', () => {
          if (this.mustListenOnSpeechEnd) {
            this.voice.listen();
            this.mustListenOnSpeechEnd = false;
          }
        });
      }

      this.setState({ ready: true });
      ToastAndroid.show('Connected!', ToastAndroid.SHORT);
    });
    this.chat.on('closed', () => {
      this.setState({ ready: false });
      ToastAndroid.show('Disconnected', ToastAndroid.SHORT);
    });
    this.chat.on('answer', d => this.append(d.data));
    this.chat.on('ask', d => this.append(d.data));
    this.chat.on('done', (d) => {
      const { storeMode } = this.props;
      this.mustListenOnSpeechEnd = (storeMode === 'mic' && d.require_input) || false;
    });
  }

  componentWillUnmount() {
    if (this.chat) {
      this.chat.close();
    }
  }

  append(data, mustSpeak = true) {
    const { messages } = this.state;

    if (messages.length > 0) {
      // eslint-disable-next-line no-param-reassign
      data.grouped = messages[messages.length - 1].self === data.self;
    }

    this.setState({
      messages: [...messages, data],
      choices: data.choices,
    });

    if (mustSpeak && data.raw_text) {
      this.voice.speak(data.raw_text);
    }
  }

  goToSettings() {
    const { componentId } = this.props;

    Navigation.push(componentId, {
      component: {
        name: 'screens.Settings',
      },
    });
  }

  send(text) {
    const { input } = this.state;
    const toBeSent = text || input;

    if (toBeSent) {
      this.chat.parse(toBeSent);
      this.append({
        raw_text: toBeSent,
        self: true,
      }, false);

      this.setState({ input: '' });
    }
  }

  render() {
    const {
      messages, input, listening, choices, ready,
    } = this.state;
    const { storeSetMode, storeMode, storeMicAvailable } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {messages.length
          ? (
            <ScrollView
          // eslint-disable-next-line no-return-assign
              ref={ref => this.scrollView = ref}
              onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
              style={{ flexGrow: 1/* , marginTop: 56 */ }}
              contentContainerStyle={{
                paddingBottom: 96 + (choices && choices.length > 0 ? 48 : 0),
              }}
            >
              {messages.map((o, i) => <Message key={`message_${i}`} {...o} />)}
            </ScrollView>
          )
          : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                size={96}
                color={toRGBA('#ffffff', 0.3)}
                name="radio"
              />
              <Text style={styles.blankslate__text}>How can I help?</Text>
            </View>
          )}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: toRGBA(backgroundColor, 0.9),
          }}
        >
          {choices && choices.length > 0 ? (
            <ScrollView
              horizontal
              style={styles.choices}
              contentContainerStyle={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 16,
                marginTop: 16,
                paddingBottom: 16,
              }}
            >
              {choices.map(o => (
                <Button
                  onPress={() => this.send(o)}
                  disabled={!ready}
                  style={styles.choice}
                  key={o}
                  last={false}
                  title={o}
                />
              ))}
            </ScrollView>
          ) : null}
          <ChatInput
            style={{
              paddingTop: choices && choices.length > 0 ? 0 : 16,
            }}
            micAvailable={storeMicAvailable}
            disabled={!ready}
            mode={storeMode}
            value={input}
            listening={listening}
            onSettings={() => this.goToSettings()}
            onSwitch={m => storeSetMode(m)}
            onChange={t => this.setState({ input: t })}
            onSend={() => this.send()}
            onListen={() => this.voice.listen()}
          />
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  storeToken: token(state),
  storeServerUrl: serverUrl(state),
  storeMode: mode(state),
  storeMicAvailable: micAvailable(state),
}), dispatch => ({
  storeSetMode: m => dispatch(setMode(m)),
  storeSetMicPermissions: r => dispatch(setMicPermissions(r)),
}))(Chat);
