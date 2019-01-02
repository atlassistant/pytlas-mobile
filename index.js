import React from 'react';
import { ScrollView, Text } from 'react-native';
import { registerScreens, SCREEN_SERVER_CHOICE } from './src/screens';
import { Navigation } from 'react-native-navigation';

const App = () => (
  <ScrollView style={{flex: 1, paddingTop: 56 }}>
    <Text style={{ fontSize: 26 }}>Discovery — Constraints, Dependencies, Use Cases

The way we interact with our world is highly shaped by our technological, environmental, and sociological constraints. The speed at which we can process information, the accuracy at which we can translate that data into action, the language/dialect we use to communicate that data, and the recipient of that action (whether it’s ourselves or someone else).

Before we dive into our interactive design, we must first identify the environmental context that frames the voice interaction.
Determine the Device Genre

The device type influences the modes and inputs that underly the spectrum and scope of the voice interaction.


Before we dive into our interactive design, we must first identify the environmental context that frames the voice interaction.
Determine the Device Genre</Text>
  </ScrollView>
);

registerScreens();

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
    drawBehind: true,
    visible: true,
    hideOnScroll: true,
    title: {
      text: 'Atlas',
      color: 'white',
    },
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREEN_SERVER_CHOICE,
            },
          },
        ],
      },
    },
  });
});
