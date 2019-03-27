import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TextInput,
} from 'react-native';
import IconButton from './IconButton';
import {
  textOnBrandColor, brandColor, borderRadius, toRGBA, iconOnBackgroundColor,
  iconActiveOnBackgroundColor,
} from '../styles';
import { Loader } from '.';

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
  onSwitch, onSettings, disabled, micAvailable, working, ...props
}) => (mode === 'mic' ? (
  <View style={[styles.chatInput, style]} {...props}>
    <IconButton
      disabled={disabled}
      name="message-circle"
      onPress={() => onSwitch('text')}
    />
    <View style={styles.chatInput__center}>
      {listening
        ? (
          <View style={{ padding: 4 }}>
            <Loader />
          </View>
        )
        : (
          <IconButton
            disabled={disabled}
            onPress={onListen}
            style={styles.chatInput__mic}
            name="mic"
            color={textOnBrandColor}
            size={24}
          />
        )}
    </View>
    <IconButton
      name="settings"
      onPress={onSettings}
    />
  </View>
) : (
  <View style={[styles.chatInput, style]} {...props}>
    {(micAvailable && !disabled)
      ? (
        <IconButton
          disabled={disabled}
          name="mic"
          onPress={() => onSwitch('mic')}
        />
      )
      : (
        <IconButton
          name="settings"
          onPress={onSettings}
        />
      )}
    <TextInput
      style={styles.chatInput__textInput}
      value={value}
      placeholder="What's on your mind?"
      placeholderTextColor={toRGBA('#ffffff', 0.54)}
      onChangeText={onChange}
      onEndEditing={onSend}
      editable={!disabled}
    />
    <IconButton
      disabled={disabled}
      name="send"
      color={value ? iconActiveOnBackgroundColor : iconOnBackgroundColor}
      onPress={onSend}
    />
  </View>
));

ChatInput.propTypes = {
  disabled: PropTypes.bool,
  micAvailable: PropTypes.bool,
  mode: PropTypes.oneOf('mic', 'text'),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSend: PropTypes.func,
  onListen: PropTypes.func,
  listening: PropTypes.bool,
  working: PropTypes.bool,
  style: PropTypes.shape({}),
  onSwitch: PropTypes.func,
  onSettings: PropTypes.func,
};

ChatInput.defaultProps = {
  disabled: false,
  micAvailable: false,
  mode: 'mic',
  value: '',
  onChange: () => {},
  onSend: () => {},
  onListen: () => {},
  onSwitch: () => {},
  onSettings: () => {},
  style: null,
  listening: false,
  working: false,
};

export default ChatInput;
