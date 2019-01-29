import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import {
  textOnBackgroundColor, dividerColor, borderRadius, textOnBrandColor, brandColor,
} from '../styles';

const styles = StyleSheet.create({
  button: {
    backgroundColor: brandColor,
    color: textOnBackgroundColor,
    borderWidth: 1,
    fontSize: 16,
    borderColor: dividerColor,
    borderRadius,
    padding: 8,
    paddingRight: 16,
    paddingLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  button__disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  button__inversed: {
    backgroundColor: textOnBrandColor,
  },
  button__text: {
    fontWeight: 'bold',
  },
  button__textInversed: {
    color: brandColor,
  },
  button__last: {
    marginRight: 0,
  },
});

const Button = ({
  title, onPress, last, inversed, style, disabled, ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      inversed && styles.button__inversed,
      last && styles.button__last,
      disabled && styles.button__disabled,
      style,
    ]}
    disabled={disabled}
    {...props}
  >
    <Text style={[
      styles.button__text,
      inversed && styles.button__textInversed,
    ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  last: PropTypes.bool,
  style: PropTypes.shape({}),
};

Button.defaultProps = {
  last: true,
  style: null,
};

export default Button;
