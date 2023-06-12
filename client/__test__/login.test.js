/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';

import LoginScreen from '../screens/Login';

test('Renders default elements', () => {
  const { getAllByText } = render(<LoginScreen />);

  expect(getAllByText('Login').length).toBe(2);
});
