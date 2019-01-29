/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Button, Text } from '../components';
import { logout } from '../store/auth/actions';
import { backgroundColor, toRGBA, textOnBackgroundColor } from '../styles';

const styles = StyleSheet.create({
  block: {
    marginBottom: 16,
  },
});

class Settings extends Component {
  static options = {
    topBar: {
      buttonColor: textOnBackgroundColor,
      background: {
        // color: backgroundColor,
        color: toRGBA(backgroundColor, 0.9),
      },
      backButton: {
        color: textOnBackgroundColor,
      },
      elevation: 0,
      drawBehind: true,
      visible: true,
      hideOnScroll: false,
      title: {
        text: 'Settings',
        color: textOnBackgroundColor,
      },
    },
    statusBar: {
      backgroundColor,
    },
    layout: {
      backgroundColor,
    },
  }

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    storeLogout: PropTypes.func.isRequired,
  }

  async logout() {
    const { storeLogout, componentId } = this.props;

    await storeLogout();

    Navigation.setStackRoot(componentId, {
      component: {
        name: 'screens.ServerChoice',
      },
    });
  }

  render() {
    return (
      <View style={{
        paddingTop: 56,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
      }}
      >
        <Button
          onPress={() => this.logout()}
          title="Logout"
          style={styles.block}
        />
        <Text
          level="secondary"
          centered
          style={styles.block}
        >
          This application uses the excellent Feather icons pack and some others made by DinosoftLabs, Roundicons from www.flaticon.com
        </Text>
      </View>
    );
  }
}

export default connect(null, dispatch => ({
  storeLogout: () => dispatch(logout()),
}))(Settings);
