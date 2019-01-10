import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Text } from '../components';
import { logout } from '../store/auth/actions';

class Settings extends Component {
  static options = {
    topBar: {
      title: {
        text: 'Settings',
      },
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
      <View style={{ paddingTop: 56 }}>
        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, dispatch => ({
  storeLogout: () => dispatch(logout()),
}))(Settings);
