import React from 'react';
import { render, screen } from '@testing-library/react-native';
import {
  describe, expect, it, jest,
} from '@jest/globals';
import { NativeBaseProvider } from 'native-base';

import Card from '../components/card';

const testEvent = {
  name: 'Testing the Test',
  category: 'Hiking',
  location: 'To the unknown',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  date: '11/3/23',
  star: true,
  friends: [],
  imageUrl: 'https://images.unsplash.com/photo-1682686580950-960d1d513532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
};

const inset = {
  frame: {
    x: 0, y: 0, width: 0, height: 0,
  },
  insets: {
    top: 0, left: 0, right: 0, bottom: 0,
  },
};

// There's a know issue with Jest and React Native where internal timers are non functional.
// This allows JEST to use it's own timers
// https://stackoverflow.com/questions/50793885/referenceerror-you-are-trying-to-import-a-file-after-the-jest-environment-has
jest.useFakeTimers();

describe('<Card />', () => {
  it('renders correct', () => {
    render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Card event={testEvent} loaded />
      </NativeBaseProvider>,
    );

    expect(screen.getByText(testEvent.name)).toBeDefined();
    expect(screen.getByText(testEvent.category)).toBeDefined();
    expect(screen.getByText(testEvent.date)).toBeDefined();
    expect(screen.getByText(testEvent.location)).toBeDefined();
    expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...')).toBeDefined();
  });
});
