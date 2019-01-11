import React from 'react';
import PropTypes from 'prop-types';
import { Text as RNText, StyleSheet } from 'react-native';
import { textOnBackgroundColor } from '../styles';

const styles = StyleSheet.create({
  text: {
    color: textOnBackgroundColor,
  },
});

const Text = ({ children, style, ...props }) => (
  <RNText style={[styles.text, style]} {...props}>{children}</RNText>
);

Text.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape(),
};

Text.defaultProps = {
  children: null,
  style: null,
};

export default Text;
