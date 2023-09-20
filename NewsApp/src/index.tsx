import React, {ReactElement} from 'react';
import {AppRegistry, Platform} from 'react-native';
import App from './App';

import appConfig from './app.json';

export function MainApp(): ReactElement {
  return <App />;
}

AppRegistry.registerComponent(appConfig.name, () => MainApp);
if (Platform.OS === 'web') {
  AppRegistry.runApplication(appConfig.name, {
    rootTag: document.getElementById('root'),
  });
}
