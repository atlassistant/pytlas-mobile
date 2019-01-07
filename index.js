import { Navigation } from 'react-native-navigation';
import { registerScreens, ServerChoice, Chat } from './src/screens';
import createStore from './src/store';
import { token } from './src/store/auth/getters';

Navigation.setDefaultOptions({
  statusBar: {
    visible: true,
    style: 'light',
    backgroundColor: '#393B51',
  },
  topBar: {
    background: {
      color: '#393B51',
    },
    backButton: {
      color: 'white',
    },
    drawBehind: true,
    visible: true,
    hideOnScroll: true,
    title: {
      text: 'Atlas',
      color: 'white',
    },
  },
  layout: {
    backgroundColor: '#393B51',
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
