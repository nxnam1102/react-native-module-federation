/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Federated} from '@callstack/repack/client';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App1 = React.lazy(() => Federated.importModule('app1', './Button'));

const Home = ({navigation}: any) => {
  const menu = [
    {
      key: 'employee',
      path: 'EmployeeManagement',
      icon: 'E',
      title: 'Employee Management',
      color: '#c5ffb0',
    },
    {key: 'news', path: 'News', icon: 'N', title: 'News', color: '#9de2ed'},
  ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
        }}>
        {menu.map(x => {
          return (
            <View
              style={{
                width: '24%',
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onTouchStart={() => {
                navigation.navigate(x.path);
              }}>
              <View
                style={{
                  width: '50%',
                  borderRadius: 5,
                  backgroundColor: x.color,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{x.icon}</Text>
              </View>
              <Text style={{height: '50%'}}>{x.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const EmployeeManagement = () => {
  return (
    <>
      <React.Suspense fallback={<Text>{'Loading'}</Text>}>
        <App1></App1>
      </React.Suspense>
    </>
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="EmployeeManagement"
            component={EmployeeManagement}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
