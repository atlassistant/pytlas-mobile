import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, TouchableOpacity, View, TextInput,
} from 'react-native';
import Text from '../Text';
import MicButton from './MicButton';
import { textOnBrandColor } from '../../styles';

const styles = StyleSheet.create({
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatInput__textInput: {
    flex: 1,
    color: textOnBrandColor,
  },
});

const ChatInput = ({
  value, onChange, onSend, onListen, listening, style, mode, ...props
}) => (
  <View style={[styles.chatInput, style]} {...props}>
    {mode === 'mic' ? (
      <View style={[styles.chatInput, { paddingTop: 16, paddingBottom: 16 }]}>
        <MicButton onListen={onListen} listening={listening} />
      </View>
    ) : (
      <View>
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
    )}
  </View>
);

ChatInput.propTypes = {
  mode: PropTypes.string,
};

ChatInput.defaultProps = {
  mode: 'mic',
};

export default ChatInput;
