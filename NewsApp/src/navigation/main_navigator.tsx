import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DanTri from '../components/dantri';
import VNExpress from '../components/vnexpress';
import ThanhNien from '../components/thanhnien';
import {View, Text} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';

import React from 'react';

export const Home = ({navigation}: any) => {
  return (
    <View>
      <Text
        onPress={() => {
          navigation.navigate('dantri');
        }}>
        Dân trí
      </Text>
      <Text
        onPress={() => {
          navigation.navigate('vnexpress');
        }}>
        Vn express
      </Text>
      <Text
        onPress={() => {
          navigation.navigate('thanhnien');
        }}>
        Báo thanh niên
      </Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeNews">
      <Stack.Screen
        name="HomeNews"
        component={Home}
        options={({navigation}) => {
          console.log(navigation);
          return {
            headerLeft: props => {
              if (props.canGoBack) {
                return (
                  <HeaderBackButton
                    label="Test"
                    onPress={() => {
                      navigation.goBack();
                    }}></HeaderBackButton>
                );
              }
            },
          };
        }}
      />
      <Stack.Screen name="dantri" component={DanTri} />
      <Stack.Screen name="vnexpress" component={VNExpress} />
      <Stack.Screen name="thanhnien" component={ThanhNien} />
    </Stack.Navigator>
  );
};
export default MainNavigator;
