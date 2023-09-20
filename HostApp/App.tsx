/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Federated} from '@callstack/repack/client';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import 'react-native-webview';
import '@react-navigation/native-stack';
import '@react-navigation/native';
import NewsScreen from './src/screens/news_screen';
import ErrorBoundary from './src/components/error_boundary';

const App1 = React.lazy(() => Federated.importModule('app1', './Button'));
const DanTri = React.lazy(() => Federated.importModule('app2', './DanTri'));
const VnExpress = React.lazy(() =>
  Federated.importModule('app2', './VnExpress'),
);

const Home = ({navigation}: any) => {
  const menu = [
    {
      key: 'employee',
      path: 'EmployeeManagement',
      icon: 'E',
      title: 'Employee Management',
      color: '#c5ffb0',
    },
    {
      key: 'news',
      path: 'NewsScreen',
      icon: 'N',
      title: 'News',
      color: '#9de2ed',
    },
    {
      key: 'dantri',
      path: 'News',
      icon: 'D',
      title: 'Dân Trí',
      color: '#fff8ab',
      params: {type: 'dantri'},
    },
    {
      key: 'vnexpress',
      path: 'News',
      icon: 'V',
      title: 'VnExpress',
      color: '#ffabab',
      params: {type: 'vnexpress'},
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingTop: 20,
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
              key={x.key}
              style={{
                width: '24%',
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onTouchStart={() => {
                navigation.navigate(x.path, x?.params);
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
              <Text
                style={{
                  height: '50%',
                  textAlign: 'center',
                  paddingTop: 5,
                }}>
                {x.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const EmployeeManagement = () => {
  return (
    <ErrorBoundary name="Employee">
      <React.Suspense fallback={<Text>{'Loading'}</Text>}>
        <App1></App1>
      </React.Suspense>
    </ErrorBoundary>
  );
};
const NewsApp = ({route}: any) => {
  let type = '';
  if (route.params) {
    type = route.params.type;
  }
  return (
    <ErrorBoundary name="News">
      <React.Suspense fallback={<Text>{'Loading'}</Text>}>
        {type === 'dantri' ? (
          <DanTri />
        ) : type === 'vnexpress' ? (
          <VnExpress />
        ) : (
          <Text>Default News</Text>
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };
  const Stack = createNativeStackNavigator();

  const theme: any = {colors: {background: '#ffffff'}};

  return (
    <NavigationContainer theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EmployeeManagement"
            component={EmployeeManagement}
            options={{
              // presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="NewsScreen"
            component={NewsScreen}
            options={{
              // presentation: 'modal',
              // headerShown: false,
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="News"
            component={NewsApp}
            options={{
              // presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
