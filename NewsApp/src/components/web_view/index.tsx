import React, {FC} from 'react';
import {Platform} from 'react-native';
import {WebView} from 'react-native-webview';

export interface Props {
  uri: string;
}

export const WebViewCompoennt: FC<Props> = ({uri}) => {
  return Platform.OS === 'web' ? (
    <iframe src={uri} height={'100%'} width={'100%'} />
  ) : (
    <WebView source={{uri: uri}} />
  );
};
