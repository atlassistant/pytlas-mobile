import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Image, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  page__container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'stretch',
  },
  page__text: {
    textAlign: 'center',
  },
  page__image: {
    alignSelf: 'center',
    height: 300,
    width: 300,
  },
});

const Page = ({
  title, description, image, children,
}) => (
  <ScrollView style={styles.page} contentContainerStyle={styles.page__container}>
    <Image
      style={styles.page__image}
      resizeMode="contain"
      source={image}
    />
    <Text
      level="title"
      style={styles.page__text}
    >
      {title}
    </Text>
    <Text
      level="secondary"
      style={styles.page__text}
    >
      {description}
    </Text>
    {children}
  </ScrollView>
);

Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.any,
  children: PropTypes.node,
};

Page.defaultProps = {
  title: null,
  description: null,
  image: null,
  children: [],
};

export default Page;
