import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import ServerChoice from './ServerChoice';
import Login from './Login';

export {
  ServerChoice,
  Login,
};

/**
 * Register every screens for react-native-navigation
 */
export async function registerScreens(store) {
  // eslint-disable-next-line max-len
  Navigation.registerComponentWithRedux(ServerChoice.screenName, () => ServerChoice, Provider, store);
  Navigation.registerComponentWithRedux(Login.screenName, () => Login, Provider, store);
}
