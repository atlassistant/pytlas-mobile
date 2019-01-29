import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ART, Animated } from 'react-native';

const { Shape, Path } = ART;

// eslint-disable-next-line react/prefer-stateless-function
export default class Bar extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  render() {
    const { width, height } = this.props;

    const path = Path()
      .moveTo(width / -2, height * -1.5)
      .line(0, height)
      .line(width, 0)
      .line(0, height)
      .line(-width, 0)
      .close();

    return <Shape {...this.props} d={path} />;
  }
}

export const AnimatedBar = Animated.createAnimatedComponent(Bar);
