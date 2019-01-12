/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import Card from './Card';
import {
  backgroundColorLight, textOnBackgroundColorLight, borderRadius, brandColor, textOnBrandColor,
} from '../styles';

const styles = StyleSheet.create({
  message: {
    justifyContent: 'flex-start',
    marginTop: 24,
  },
  message__grouped: {
    marginTop: 8,
  },
  message__bubble__self: {
    alignSelf: 'flex-end',
  },
  message__bubble: {
    alignSelf: 'flex-start',
  },
  message__text: {
    fontSize: 16,
    backgroundColor: backgroundColorLight,
    borderRadius,
    color: textOnBackgroundColorLight,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginRight: 16,
    marginLeft: 16,
  },
  message__text__self: {
    backgroundColor: brandColor,
    color: textOnBrandColor,
  },
  message__cards: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  message__scroll: {
    marginTop: 8,
  },
});

const Message = ({
  raw_text, cards, self, grouped,
}) => (
  <View style={[styles.message, grouped ? styles.message__grouped : null]}>
    <View style={[styles.message__bubble, self ? styles.message__bubble__self : null]}>
      <Text
        style={[styles.message__text, self ? styles.message__text__self : null]}
      >
        {raw_text}
      </Text>
    </View>
    {cards ? (
      <ScrollView
        horizontal
        style={styles.message__scroll}
        contentContainerStyle={styles.message__cards}
      >
        {cards.map((c, i) => <Card key={c.raw_header} {...c} first={i === 0} />)}
      </ScrollView>
    ) : null}
  </View>
);

Message.propTypes = {
  raw_text: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape()),
  grouped: PropTypes.bool,
  self: PropTypes.bool,
};

Message.defaultProps = {
  self: false,
  grouped: false,
  cards: [],
};

export default Message;
