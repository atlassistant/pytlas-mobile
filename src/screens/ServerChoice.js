import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { selectServer } from '../store/auth/actions';
import { serverUrl } from '../store/auth/getters';
import { brandColor } from '../styles';
import {
  Page, TextInput, Button, Spacer,
} from '../components';

class ServerChoice extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
      },
      statusBar: {
        backgroundColor: brandColor,
      },
      layout: {
        backgroundColor: brandColor,
      },
    };
  }

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    storeSelectServer: PropTypes.func.isRequired,
    storeServerUrl: PropTypes.string.isRequired,
  }

  constructor() {
    super();

    this.state = {
      url: '',
    };
  }

  componentDidMount() {
    const { storeServerUrl } = this.props;

    this.setState({ url: storeServerUrl });
  }

  async next() {
    const { storeSelectServer, componentId } = this.props;
    const { url } = this.state;

    await storeSelectServer(url);

    Navigation.push(componentId, {
      component: {
        name: 'screens.Login',
      },
    });
  }

  render() {
    const { url } = this.state;

    return (
      <Page
      // eslint-disable-next-line global-require
        image={require('../images/satelite.png')}
        title="Ahoy!"
        description="Welcome to the wonderful world of atlas, an open-souce self-hosted assistant. Please specify the atlas instance url on which you want to connect."
      >
        <TextInput
          label="Server URL"
          placeholder="https://my.own.assistant.ai"
          centered
          value={url}
          onChange={e => this.setState({ url: e })}
        />
        <Spacer />
        <Button
          inversed
          title="Next"
          onPress={() => this.next()}
        />
      </Page>
    );
  }
}

export default connect(state => ({
  storeServerUrl: serverUrl(state),
}), dispatch => ({
  storeSelectServer: url => dispatch(selectServer(url)),
}))(ServerChoice);
