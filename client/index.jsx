import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import { decode, encode } from 'base-64';

import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import NavScreen from './screens/Nav';
import AdventureDetail from './screens/AdventureDetail';
import { ChatProvider } from './chatContext';

if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <ChatProvider>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Nav" component={NavScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={AdventureDetail} options={{ headerShown: false }} />
          </Stack.Navigator>
        </ChatProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
