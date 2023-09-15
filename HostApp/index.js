/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {ScriptManager, Script, Federated} from '@callstack/repack/client';

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let dataRemote = await fetch(
    'https://mocki.io/v1/fbc047e5-06b6-4744-a689-89496a4c0371',
  );
  let resultRemote = await dataRemote.json();
  let containers = {};
  if (Array.isArray(resultRemote) && resultRemote.length > 0) {
    for (let i = 0; i < resultRemote.length; i++) {
      const row = resultRemote[i];
      containers[row.name] = `${row.remote}/[name][ext]`;
    }
  }
  console.log('=======');
  console.log(containers);
  const resolveURL = Federated.createURLResolver({
    containers: containers,
  });
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }
  console.log(url);
  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});
AppRegistry.registerComponent(appName, () => App);
