import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, TextInput,
} from 'react-native';
import Text from './Text';
import { brandColorInverse } from '../styles';

const styles = StyleSheet.create({
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatInput__textInput: {
    flex: 1,
    color: brandColorInverse,
  },
});

const ChatInput = ({
  value, onChange, onSend, onListen, style, ...props
}) => (
  <View style={[styles.chatInput, style]} {...props}>
    <TextInput
      style={styles.chatInput__textInput}
      value={value}
      onChangeText={onChange}
      onEndEditing={onSend}
    />
    <TouchableOpacity onPress={onSend}>
      <Text>Send</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onListen}>
      <Text>Listen</Text>
    </TouchableOpacity>
  </View>
);

export default ChatInput;
