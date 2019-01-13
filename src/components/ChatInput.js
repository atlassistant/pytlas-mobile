import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TextInput,
} from 'react-native';
import { Bars } from 'react-native-loader';
import IconButton from './IconButton';
import {
  textOnBrandColor, brandColor, borderRadius, toRGBA, iconOnBackgroundColor,
  iconActiveOnBackgroundColor,
} from '../styles';

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
    backgroundColor: toRGBA('#ffffff', 0.3),
    borderRadius,
    paddingLeft: 16,
    paddingRight: 16,
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
  onSwitch, onSettings, ...props
}) => (mode === 'mic' ? (
  <View style={[styles.chatInput, style]} {...props}>
    <IconButton name="message-circle" onPress={() => onSwitch('text')} />
    <View style={styles.chatInput__center}>
      {listening
        ? (
          <View style={{ padding: 4 }}>
            <Bars color={brandColor} size={16} />
          </View>
        )
        : (
          <IconButton
            onPress={onListen}
            style={styles.chatInput__mic}
            name={listening ? 'minus' : 'mic'}
            color={textOnBrandColor}
            size={24}
          />)}
    </View>
    <IconButton name="settings" onPress={onSettings} />
  </View>
) : (
  <View style={[styles.chatInput, style]} {...props}>
    <IconButton name="mic" onPress={() => onSwitch('mic')} />
    <TextInput
      style={styles.chatInput__textInput}
      value={value}
      placeholder="What's on your mind?"
      placeholderTextColor={toRGBA('#ffffff', 0.54)}
      onChangeText={onChange}
      onEndEditing={onSend}
    />
    <IconButton
      name="send"
      color={value ? iconActiveOnBackgroundColor : iconOnBackgroundColor}
      onPress={onSend}
    />
  </View>
));

ChatInput.propTypes = {
  mode: PropTypes.string,
};

ChatInput.defaultProps = {
  mode: 'mic',
};

export default ChatInput;
