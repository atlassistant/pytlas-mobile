/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({

});

const Message = ({ raw_text }) => (
  <View>
    <Text>{raw_text}</Text>
  </View>
);

Message.propTypes = {
  raw_text: PropTypes.string.isRequired,
};

export default Message;
