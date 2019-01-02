import { Navigation } from 'react-native-navigation';
import ServerChoice from './ServerChoice';

export const SCREEN_SERVER_CHOICE = 'screens.ServerChoice';

export function registerScreens() {
  Navigation.registerComponent(SCREEN_SERVER_CHOICE, () => ServerChoice);
}
