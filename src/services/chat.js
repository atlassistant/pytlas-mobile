import EventEmitter from 'wolfy87-eventemitter';

class ChatService extends EventEmitter {
  constructor(url, token) {
    super();

    this.isSecure = url.indexOf('https://') !== -1;
    this.url = `${url.replace(/https?/, this.isSecure ? 'wss' : 'ws')}/ws/assistant/`;
    this.token = token;

    this.connect();
  }

  connect() {
    console.info(`Connecting to ${this.url}`);

    this.ws = new WebSocket(this.url);
    this.ws.onerror = e => console.log(e);

    this.ws.onopen = () => this.ws.send(JSON.stringify({
      type: 'authenticate',
      token: this.token,
    }));

    this.ws.onclose = () => {
      this.emit('closed');
      setTimeout(this.connect.bind(this), 1000);
    };

    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      this.emit(data.type, data);
    };
  }

  parse(message) {
    this.ws.send(JSON.stringify({
      message,
    }));
  }
}

export default ChatService;
