import { Navigation } from 'react-native-navigation';
import { registerScreens, ServerChoice } from './src/screens';
import createStore from './src/store';

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

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: ServerChoice.screenName,
            },
          },
        ],
      },
    },
  });
});
