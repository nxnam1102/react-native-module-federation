/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {ScriptManager, Script, Federated} from '@callstack/repack/client';

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  console.log('==============');
  console.log(scriptId, caller);
  let dataRemote = await fetch(
    'https://mocki.io/v1/a13ed0be-604c-424e-9f16-97ae461846c0',
  );
  let resultRemote = await dataRemote.json();
  let containers = {};
  if (Array.isArray(resultRemote) && resultRemote.length > 0) {
    for (let i = 0; i < resultRemote.length; i++) {
      const row = resultRemote[i];
      containers[row.name] = `${row.remote}/[name][ext]`;
    }
  }

  const resolveURL = Federated.createURLResolver({
    containers: containers,
  });
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }
  if (!url) {
    return undefined;
  }
  console.log(url);
  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});
AppRegistry.registerComponent(appName, () => App);
