import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import Chat from './Chat';
import Login from './Login';
import ServerChoice from './ServerChoice';
import Settings from './Settings';

export {
  Chat,
  Login,
  ServerChoice,
  Settings,
};

/**
 * Register every screens for react-native-navigation
 */
export async function registerScreens(store) {
  // eslint-disable-next-line max-len
  Navigation.registerComponentWithRedux('screens.ServerChoice', () => ServerChoice, Provider, store);
  Navigation.registerComponentWithRedux('screens.Login', () => Login, Provider, store);
  Navigation.registerComponentWithRedux('screens.Chat', () => Chat, Provider, store);
  Navigation.registerComponentWithRedux('screens.Settings', () => Settings, Provider, store);
}
