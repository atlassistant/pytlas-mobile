import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { iconOnBackgroundColor } from '../styles';

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 100,
    padding: 16,
  },
});

const IconButton = ({
  onPress, name, size, color, style, ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.iconButton, style]}
    {...props}
  >
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.shape(),
};

IconButton.defaultProps = {
  size: 20,
  color: iconOnBackgroundColor,
  style: null,
};

export default IconButton;
