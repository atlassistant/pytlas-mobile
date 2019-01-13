import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { textOnBackgroundColor, dividerColor, borderRadius } from '../styles';

const styles = StyleSheet.create({
  button: {
    color: textOnBackgroundColor,
    borderWidth: 1,
    fontSize: 16,
    borderColor: dividerColor,
    borderRadius,
    padding: 8,
    paddingRight: 16,
    paddingLeft: 16,
    marginRight: 16,
  },
  button__last: {
    marginRight: 0,
  },
});

const Button = ({ title, onPress, isLast }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, isLast ? styles.button__last : null]}
  >
    <Text>{title}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isLast: PropTypes.bool,
};

Button.defaultProps = {
  isLast: false,
};

export default Button;
