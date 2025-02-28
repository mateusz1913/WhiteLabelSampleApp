import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScriptManager, Script } from '@callstack/repack/client';

import App from './src/App';
import { name as appName } from './app.json';

ScriptManager.shared.setStorage(AsyncStorage);
ScriptManager.shared.addResolver(async scriptId => {
  // In dev mode, resolve script location to dev server.
  if (__DEV__) {
    return {
      url: Script.getDevServerURL(scriptId),
      cache: false,
    };
  }

  return {
    url: Script.getRemoteURL(
      `http://somewhere-on-the-internet.com/${scriptId}`,
    ),
  };
});

AppRegistry.registerComponent(appName, () => App);
