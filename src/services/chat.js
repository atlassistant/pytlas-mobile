import EventEmitter from 'wolfy87-eventemitter';

const MAX_RETRY = 3;

class ChatService extends EventEmitter {
  constructor(url, token) {
    super();

    this.isSecure = url.indexOf('https://') !== -1;
    this.hasBeenConnected = false;
    this.retryCount = 0;
    this.url = `${url.replace(/https?/, this.isSecure ? 'wss' : 'ws')}/ws/assistant/`;
    this.token = token;
    this.mustClose = false;

    this.connect();
  }

  connect() {
    console.info(`Connecting to ${this.url}`);

    this.ws = new WebSocket(this.url);
    this.ws.onerror = e => console.log(e);

    this.retryCount += 1;

    this.ws.onopen = () => {
      this.retryCount = 0;
      this.hasBeenConnected = true;
      this.mustClose = false;
      this.ws.send(JSON.stringify({
        type: 'authenticate',
        token: this.token,
      }));
    };

    this.ws.onclose = (e) => {
      if (e.code === 1000) {
        this.emit('rejected');
      } else {
        this.emit('closed');

        if (this.hasBeenConnected && !this.mustClose && this.retryCount < MAX_RETRY) {
          setTimeout(this.connect.bind(this), 2000);
        }
      }
    };

    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      this.emit(data.type, data);
    };
  }

  close() {
    this.mustClose = true;
    this.ws.close();
  }

  parse(message) {
    this.ws.send(JSON.stringify({
      message,
    }));
  }
}

export default ChatService;
