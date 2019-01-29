import React, { Component } from 'react';
import { Animated, ART } from 'react-native';
import { brandColor, brandColorLight } from '../styles';
import { AnimatedBar } from './Bar';

const { Surface } = ART;

const size = 16;
const spaceBetween = 5;

export default class Loader extends Component {
  state = {
    bars: [
      new Animated.Value(size),
      new Animated.Value(size),
      new Animated.Value(size),
      new Animated.Value(size),
      new Animated.Value(size),
    ],
  };

  timers = [];

  unmounted = false;

  componentDidMount() {
    const { bars } = this.state;

    bars.forEach((val, index) => {
      const timer = setTimeout(() => this.animate(index), index * 240);
      this.timers.push(timer);
    });
  }

  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.unmounted = true;
  }

  animate(index) {
    const { bars } = this.state;
    Animated
      .sequence([
        Animated.timing(bars[index], {
          toValue: size * 2.5,
          duration: 500,
        }),
        Animated.timing(bars[index], {
          toValue: size,
          duration: 500,
        }),
      ])
      .start(() => {
        if (!this.unmounted) {
          this.animate(index);
        }
      });
  }

  renderBar(index) {
    // const { size, spaceBetween, color } = this.props;
    const { bars } = this.state;
    const width = size / 3;
    const x = width / 2 + (width + spaceBetween) * index;

    return (
      <AnimatedBar
        fill={index % 2 === 0 ? brandColor : brandColorLight}
        width={width}
        height={bars[index]}
        originY={0.5 * size}
        originX={0.5}
        y={size * 1.5}
        x={x}
      />
    );
  }

  render() {
    const width = size / 3 * 5 + spaceBetween * 4;
    const height = size * 3;

    return (
      <Surface width={width} height={height}>
        {this.renderBar(0)}
        {this.renderBar(1)}
        {this.renderBar(2)}
        {this.renderBar(3)}
        {this.renderBar(4)}
      </Surface>
    );
  }
}
