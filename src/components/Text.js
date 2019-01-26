import React from 'react';
import PropTypes from 'prop-types';
import { Text as RNText, StyleSheet } from 'react-native';
import { textOnBackgroundColor, textSecondaryColor } from '../styles';

const styles = StyleSheet.create({
  text: {
    color: textOnBackgroundColor,
  },
  label: {
    color: textSecondaryColor,
    fontSize: 13,
    marginTop: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
  },
  secondary: {
    color: textSecondaryColor,
  },
});

const Text = ({
  children, level, style, ...props
}) => (
  <RNText
    style={[styles.text, styles[level], style]}
    {...props}
  >
    {children}
  </RNText>
);

Text.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  level: PropTypes.oneOf([
    'text',
    'title',
    'secondary',
    'label',
  ]),
};

Text.defaultProps = {
  children: null,
  style: null,
  level: 'text',
};

export default Text;
