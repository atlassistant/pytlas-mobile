import tts from 'react-native-tts';
import Voice from 'react-native-voice';
import EventEmitter from 'wolfy87-eventemitter';
import regexCreator from 'emoji-regex';

const emojiRegex = regexCreator();

class VoiceService extends EventEmitter {
  constructor(language) {
    super();

    this.voices = [];
    this.language = language;
  }

  async setup() {
    Voice.onSpeechStart = () => this.emit('speechStart');
    Voice.onSpeechEnd = () => this.emit('speechEnd');
    Voice.onSpeechError = () => this.emit('speechEnd');
    Voice.onSpeechResults = (r) => {
      if (r.value.length > 0) {
        this.emit('speechResult', r.value[0]);
      }
    };

    const availableVoices = await tts.voices();

    // eslint-disable-next-line max-len
    this.voices = availableVoices.filter(v => !v.notInstalled && v.language === this.language);

    tts.setDefaultLanguage(this.language);

    // tts.setDefaultVoice('fr-fr-x-vlf#male_3-local');

    tts.setDucking(true);
    tts.addEventListener('tts-finish', () => this.emit('speakEnd'));
  }

  // eslint-disable-next-line class-methods-use-this
  speak(text) {
    tts.speak(text.replace(emojiRegex, ''));
  }

  listen() {
    Voice.start(this.languageCode, { REQUEST_PERMISSIONS_AUTO: false });
  }
}

export default VoiceService;
