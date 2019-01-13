/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TouchableOpacity, Linking, Image,
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
  card__media: {
    height: 200,
    borderTopLeftRadius: borderRadius / 2,
    borderTopRightRadius: borderRadius / 2,
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
      {media ? (
        <Image
          source={{ uri: media }}
          style={styles.card__media}
          // resizeMode="cover"
        />
      ) : null}
      <Text style={styles.card__header}>{raw_header}</Text>
      {raw_subhead ? <Text style={styles.card__subhead}>{raw_subhead}</Text> : null}
      <Text style={styles.card__content}>{raw_text}</Text>
    </WrapperComponent>
  );
};

Card.propTypes = {
  raw_header: PropTypes.string.isRequired,
  raw_subhead: PropTypes.string,
  raw_text: PropTypes.string.isRequired,
  header_link: PropTypes.string,
  media: PropTypes.string,
  first: PropTypes.bool,
};

Card.defaultProps = {
  raw_subhead: null,
  media: null,
  header_link: null,
  first: false,
};

export default Card;
