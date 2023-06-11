import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
<<<<<<< HEAD
import { NativeBaseProvider } from 'native-base';
=======
import { NativeBaseProvider } from "native-base";
>>>>>>> e652aa6 (added card component)

import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import NavScreen from './screens/Nav';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Nav" component={NavScreen} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
