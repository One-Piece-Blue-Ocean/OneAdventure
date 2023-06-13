import React from 'react';
import { render } from '@testing-library/react-native';
import {
  expect, it, jest,
} from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';

import LoginScreen from '../screens/Login';

jest.mock('../firebase/utils');
jest.mock('../../database/db');

jest.mock('react-native-keyboard-aware-scroll-view', () => (
  {
    KeyboardAwareScrollView: jest
      .fn()
      .mockImplementation(({ children }) => children),
  }
));

const Stack = createStackNavigator();

const inset = {
  frame: {
    x: 0, y: 0, width: 0, height: 0,
  },
  insets: {
    top: 0, left: 0, right: 0, bottom: 0,
  },
};

it('renders default elements', () => {
  const { getByText } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>,
  );

  expect(getByText('Log in')).toBeDefined();
  expect(getByText('Continue as guest')).toBeDefined();
  expect(getByText('Sign up')).toBeDefined();
});
