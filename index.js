import { Navigation } from 'react-native-navigation';
import { registerScreens, ServerChoice, Chat } from './src/screens';
import createStore from './src/store';
import { token } from './src/store/auth/getters';
import { backgroundColor, brandColorInverse } from './src/styles';

Navigation.setDefaultOptions({
  statusBar: {
    visible: true,
    style: 'light',
    backgroundColor,
  },
  topBar: {
    buttonColor: brandColorInverse,
    background: {
      color: backgroundColor,
    },
    backButton: {
      color: brandColorInverse,
    },
    drawBehind: true,
    visible: true,
    hideOnScroll: true,
    title: {
      color: brandColorInverse,
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
              name: hasToken ? Chat.screenName : ServerChoice.screenName,
            },
          },
        ],
      },
    },
  });
});
