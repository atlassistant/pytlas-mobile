import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { brandColor, textOnBrandColor } from '../../styles';

const styles = StyleSheet.create({
  micButton: {
    // flex: 1,
  },
  micButton__button: {
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

const MicButton = ({ onListen, listening }) => (
  <View style={styles.micButton}>
    <TouchableOpacity style={styles.micButton__button} onPress={onListen}>
      <Icon name={listening ? 'minus' : 'mic'} color={textOnBrandColor} size={26} />
    </TouchableOpacity>
  </View>
);

MicButton.propTypes = {
  onListen: PropTypes.func.isRequired,
  listening: PropTypes.bool.isRequired,
};

MicButton.defaultProps = {

};

export default MicButton;
