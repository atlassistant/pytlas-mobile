import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import createStore from './src/store';
import { token } from './src/store/auth/getters';
import { backgroundColor, textOnBackgroundColor } from './src/styles';

Navigation.setDefaultOptions({
  statusBar: {
    visible: true,
    style: 'light',
    backgroundColor,
    // backgroundColor: 'rgba(57, 59, 81, 0.9)',
    drawBehind: false,
  },
  topBar: {
    buttonColor: textOnBackgroundColor,
    background: {
      // color: backgroundColor,
      color: 'rgba(57, 59, 81, 0.9)',
    },
    backButton: {
      color: textOnBackgroundColor,
    },
    elevation: 0,
    drawBehind: true,
    visible: false,
    hideOnScroll: false,
    title: {
      color: textOnBackgroundColor,
    },
  },
  layout: {
    backgroundColor,
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  const store = await createStore();

  registerScreens(store);

  const hasToken = token(store.getState());

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: hasToken ? 'screens.Chat' : 'screens.ServerChoice',
            },
          },
        ],
      },
    },
  });
});
