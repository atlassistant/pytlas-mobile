/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import {
  backgroundColorLight, textOnBackgroundColorLight, borderRadius, brandColor, textOnBrandColor,
} from '../styles';

const styles = StyleSheet.create({
  message: {
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  message__bubble__self: {
    backgroundColor: brandColor,
    color: textOnBrandColor,
    alignSelf: 'flex-end',
  },
  message__bubble: {
    backgroundColor: backgroundColorLight,
    borderRadius,
    color: textOnBackgroundColorLight,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    alignSelf: 'flex-start',
  },
  message__text: {
    fontSize: 16,
  },
});

const Message = ({ raw_text, self }) => (
  <View style={[styles.message]}>
    <View style={[styles.message__bubble, self ? styles.message__bubble__self : null]}>
      <Text style={styles.message__text}>{raw_text}</Text>
    </View>
  </View>
);

Message.propTypes = {
  raw_text: PropTypes.string.isRequired,
  self: PropTypes.bool,
};

Message.defaultProps = {
  self: false,
};

export default Message;
