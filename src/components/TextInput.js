import React, { Component } from 'react';
import { TextInput as RNTextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import {
  textOnBrandColor, textOnBackgroundColor, dividerColor,
} from '../styles';

const styles = StyleSheet.create({
  textinput: {

  },
  textinput__input: {
    borderColor: dividerColor,
    borderBottomWidth: 1,
    color: textOnBrandColor,
    fontSize: 16,
  },
  textinput__inputFocused: {
    borderColor: textOnBackgroundColor,
  },
  textinput__centered: {
    textAlign: 'center',
  },
});

class TextInput extends Component {
  constructor() {
    super();

    this.state = {
      focused: false,
    };
  }

  render() {
    const {
      label, value, onChange, style, centered, ...props
    } = this.props;
    const { focused } = this.state;

    return (
      <View style={styles.textinput}>
        {label && (
        <Text
          level="label"
          style={centered && styles.textinput__centered}
        >
          {label}
        </Text>
        )}
        <RNTextInput
          style={[
            styles.textinput__input,
            focused && styles.textinput__inputFocused,
            centered && styles.textinput__centered,
            style,
          ]}
          value={value}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          onChangeText={onChange}
          {...props}
        />
      </View>
    );
  }
}

export default TextInput;
