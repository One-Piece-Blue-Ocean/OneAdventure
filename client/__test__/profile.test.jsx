import React from 'react';
import { render } from '@testing-library/react-native';
import {
  describe,
  expect,
  it,
} from '@jest/globals';

import Profile from '../screens/Profile';

describe('Profile', () => {
  it('Should render the profile page', () => {
    const { getByText } = render(<Profile />);

    expect(getByText('Email:')).toBeVisible();
    expect(getByText('Favorite Type:')).toBeVisible();
    expect(getByText('Location:')).toBeVisible();
    expect(getByText('Search Radius:')).toBeVisible();
  });
});
