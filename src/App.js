/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import axios from 'axios';
import {
  Platform, StyleSheet, Text, View,
  TextInput, Button,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      text: null,
      user: null,
      password: null,
    };
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:8000/ws/assistant/');

    this.ws.onmessage = (msg) => {
      console.log(msg.data);
    }
  }

  async login() {
    const { user: username, password } = this.state;

    try {
      const { data: { access: token } } = await axios.post('http://localhost:8000/assistant/api/token', {
        username,
        password,
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      this.ws.send(JSON.stringify({
        type: 'authenticate',
        token,
      }));
    } catch (e) {
      console.log(e);
    }
  }

  sendMessage() {
    const { text: message } = this.state;

    this.ws.send(JSON.stringify({
      type: 'message',
      message,
    }));

    this.setState({ text: null });
  }

  render() {
    const { text, user, password } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          value={user} 
          placeholder="username" 
          onChangeText={(e) => this.setState({ user: e })} />
        <TextInput 
          style={styles.input}
          value={password} 
          placeholder="password" 
          onChangeText={(e) => this.setState({ password: e })} />
        <Button title="Send token" onPress={() => this.login()}></Button>

        <TextInput 
          style={styles.input}
          value={text} 
          placeholder="message" 
          onChangeText={(e) => this.setState({ text: e })} />

        <Button title="Send message" onPress={() => this.sendMessage()}></Button>
      </View>
    );
  }
}
