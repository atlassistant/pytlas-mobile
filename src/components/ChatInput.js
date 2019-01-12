import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, TouchableOpacity, View, TextInput,
} from 'react-native';
import Text from './Text';
import IconButton from './IconButton';
import { textOnBrandColor, brandColor } from '../styles';

const styles = StyleSheet.create({
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  chatInput__center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatInput__textInput: {
    flex: 1,
    color: textOnBrandColor,
  },
  chatInput__mic: {
    backgroundColor: brandColor,
    borderRadius: 100,
    padding: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

const ChatInput = ({
  value, onChange, onSend, onListen, listening, style, mode,
  onSettings, ...props
}) => (mode === 'mic' ? (
  <View style={[styles.chatInput, style]} {...props}>
    <IconButton name="message-circle" onPress={() => {}} />
    <View style={styles.chatInput__center}>
      <IconButton
        onPress={onListen}
        style={styles.chatInput__mic}
        name={listening ? 'minus' : 'mic'}
        color={textOnBrandColor}
        size={24}
      />
    </View>
    <IconButton name="settings" onPress={onSettings} />
  </View>
) : (
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
));

ChatInput.propTypes = {
  mode: PropTypes.string,
};

ChatInput.defaultProps = {
  mode: 'mic',
};

export default ChatInput;
