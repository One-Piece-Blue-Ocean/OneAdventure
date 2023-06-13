import React from 'react';
import { render, screen } from '@testing-library/react-native';
import {
  describe, expect, it, jest,
} from '@jest/globals';
import { NativeBaseProvider } from 'native-base';

import Card from '../components/card';

const testEvent = {
  title: 'a title',
  address: 'a unique address',
  description: 'a unique description',
  date: 'a non unique date',
  imageUrl: 'a totally normal image url',
};

const testUserEvent = {
  interested: false,
  attending: false,
};

const testUserEventId = 'maysdflkjw34q';

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
        <Card
          event={testEvent}
          userEvent={testUserEvent}
          userEventId={testUserEventId}
          loaded
          handleInterested={() => {}}
        />
      </NativeBaseProvider>,
    );

    expect(screen.getByText(testEvent.title)).toBeDefined();
    expect(screen.getByText(testEvent.date)).toBeDefined();
    expect(screen.getByText(testEvent.address)).toBeDefined();
    // expect(screen.getByText('a unique description')).toBeDefined();
  });
});
