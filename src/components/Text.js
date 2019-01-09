import React from 'react';
import PropTypes from 'prop-types';
import { Text as RNText, StyleSheet } from 'react-native';
import { textPrimaryColor } from '../styles';

const styles = StyleSheet.create({
  text: {
    color: textPrimaryColor,
  },
});

const Text = ({ children, style, ...props }) => (
  <RNText style={[styles.text, style]} {...props}>{children}</RNText>
);

Text.propTypes = {
  children: PropTypes.node,
  style: PropTypes.string,
};

Text.defaultProps = {
  children: null,
  style: null,
};

export default Text;
