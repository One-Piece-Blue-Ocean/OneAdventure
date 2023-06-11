import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { decode, encode } from 'base-64';

import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import NavScreen from './screens/Nav';

if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user ? (
            <Stack.Screen name="Nav">
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {(props) => <NavScreen {...props} extraData={user} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
