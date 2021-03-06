pytlas-mobile ![https://www.gnu.org/licenses/gpl-3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)
===

Mobile client to connect to a [pytlas server](https://github.com/atlassistant/pytlas-server) and interact with your assistant.

🚧 WORK IN PROGRESS. It only supports Android at the moment and may need some refactoring.

<div align="center">
  <img src="docs/onboarding-serverchoice.png" width="280px"></img>
  <img src="docs/onboarding-login.png" width="280px"></img>
  <img src="docs/chat.png" width="280px"></img>
</div>

## Installing

- Download the APK on the [releases](https://github.com/atlassistant/pytlas-mobile/releases) page
- Install it on your device

## Development

You may need some experience in mobile development.

### Prerequisites

In order to build the application, you will need:

- [React Native stuff](https://facebook.github.io/react-native/docs/getting-started#installing-dependencies-3)
- Android SDK and build tools version **27.0.3**

### Launching

```console
$ npm install # retrieve and install packages
$ react-native run-android # compiles and launch the application on a connected device / emulator
```
