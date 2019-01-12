import tts from 'react-native-tts';
import Voice from 'react-native-voice';
import EventEmitter from 'wolfy87-eventemitter';

class VoiceService extends EventEmitter {
  constructor(language) {
    super();

    this.voices = [];
    this.language = language;
  }

  async setup() {
    const availableVoices = await tts.voices();

    // eslint-disable-next-line max-len
    this.voices = availableVoices.filter(v => !v.notInstalled && v.language === this.language);

    console.info('Found', this.voices);

    tts.setDefaultLanguage(this.language);

    // tts.setDefaultVoice('fr-fr-x-vlf#male_3-local');

    tts.setDucking(true);
    tts.addEventListener('tts-finish', () => this.emit('speakEnd'));

    Voice.onSpeechStart = () => this.emit('speechStart');
    Voice.onSpeechEnd = () => this.emit('speechEnd');
    Voice.onSpeechError = () => this.emit('speechEnd');
    Voice.onSpeechResults = (r) => {
      if (r.value.length > 0) {
        this.emit('speechResult', r.value[0]);
      }
    };
  }

  // eslint-disable-next-line class-methods-use-this
  speak(text) {
    tts.speak(text);
  }

  listen() {
    Voice.start(this.languageCode, { REQUEST_PERMISSIONS_AUTO: false });
  }
}

export default VoiceService;
