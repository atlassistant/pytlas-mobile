import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import Chat from './Chat';
import Login from './Login';
import ServerChoice from './ServerChoice';

export {
  Chat,
  Login,
  ServerChoice,
};

/**
 * Register every screens for react-native-navigation
 */
export async function registerScreens(store) {
  // eslint-disable-next-line max-len
  Navigation.registerComponentWithRedux(ServerChoice.screenName, () => ServerChoice, Provider, store);
  Navigation.registerComponentWithRedux(Login.screenName, () => Login, Provider, store);
  Navigation.registerComponentWithRedux(Chat.screenName, () => Chat, Provider, store);
}
