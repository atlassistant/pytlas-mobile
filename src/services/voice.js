import tts from 'react-native-tts';
import Voice from 'react-native-voice';
import EventEmitter from 'wolfy87-eventemitter';

class VoiceService extends EventEmitter {
  constructor(lang) {
    super();

    this.voices = [];
    this.lang = lang;
    this.languageCode = lang;
  }

  async setup() {
    const availableVoices = await tts.voices();
    // eslint-disable-next-line max-len
    this.voices = availableVoices.filter(v => !v.notInstalled && v.language.substring(0, 2) === this.lang);

    console.info('Found', this.voices);

    if (this.voices) {
      this.languageCode = this.voices[0].language;
      tts.setDefaultLanguage(this.languageCode);
    }

    // tts.setDefaultVoice('fr-fr-x-vlf#male_3-local');

    tts.setDucking(true);
    tts.addEventListener('tts-finish', event => console.log('finish', event));

    Voice.onSpeechEnd = () => console.log('speech ended');
    Voice.onSpeechResults = (r) => {
      console.log(r.value);

      if (r.value.length > 0) {
        this.emit('speech', r.value[0]);
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
