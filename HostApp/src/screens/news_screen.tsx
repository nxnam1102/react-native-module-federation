import {Federated} from '@callstack/repack/client';
import React from 'react';
import {Text} from 'react-native';
import ErrorBoundary from '../components/error_boundary';

const News = React.lazy(() => Federated.importModule('app2', './App'));

const NewsScreen = () => {
  return (
    <ErrorBoundary name={'news container'}>
      <React.Suspense fallback={<Text>{'Loading News'}</Text>}>
        <News />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default NewsScreen;
