import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import ServerChoice from './ServerChoice';
import Login from './Login';
import createStore from '../store';

export {
  ServerChoice,
  Login,
};

/**
 * Register every screens for react-native-navigation
 */
export async function registerScreens() {
  const store = await createStore();

  Navigation.registerComponentWithRedux(ServerChoice.name, () => ServerChoice, Provider, store);
  Navigation.registerComponentWithRedux(Login.name, () => Login, Provider, store);
}
