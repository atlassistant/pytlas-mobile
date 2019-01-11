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
  },
  topBar: {
    buttonColor: textOnBackgroundColor,
    background: {
      color: backgroundColor,
    },
    backButton: {
      color: textOnBackgroundColor,
    },
    drawBehind: true,
    visible: true,
    hideOnScroll: true,
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
