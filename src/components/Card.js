/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TouchableOpacity, Linking,
} from 'react-native';
import Text from './Text';
import { backgroundColorLight, borderRadius, textSecondaryColor } from '../styles';

const styles = StyleSheet.create({
  card: {
    backgroundColor: backgroundColorLight,
    borderRadius: borderRadius / 2,
    marginRight: 16,
    width: 300,
  },
  card__first: {
    marginLeft: 16,
  },
  card__header: {
    fontSize: 20,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    fontWeight: 'bold',
  },
  card__subhead: {
    marginLeft: 16,
    marginRight: 16,
    fontWeight: 'bold',
    color: textSecondaryColor,
  },
  card__content: {
    color: textSecondaryColor,
    margin: 16,
  },
});

const Card = ({
  raw_header, raw_text, raw_subhead, media, header_link, first,
}) => {
  const WrapperComponent = header_link ? TouchableOpacity : View;

  return (
    <WrapperComponent
      activeOpacity={0.7}
      onPress={() => Linking.openURL(header_link)}
      style={[styles.card, first ? styles.card__first : null]}
    >
      <Text style={styles.card__header}>{raw_header}</Text>
      {raw_subhead ? <Text style={styles.card__subhead}>{raw_subhead}</Text> : null}
      <Text style={styles.card__content}>{raw_text}</Text>
    </WrapperComponent>
  );
};

Card.propTypes = {

};

Card.defaultProps = {

};

export default Card;
