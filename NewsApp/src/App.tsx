import {SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/main_navigator';

const App = () => {
  const theme: any = {colors: {background: '#ffffff'}};
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={theme}>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
