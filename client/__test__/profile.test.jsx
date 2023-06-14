// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import {
//   describe,
//   expect,
//   it,
//   jest,
// } from '@jest/globals';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import Profile from '../screens/Profile';

// jest.mock('../firebase/utils');

// const Stack = createStackNavigator();

// describe('Profile', () => {
//   it('should display a users profile photo and name', () => {
//     const { getByTestId } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     expect(getByTestId('profile.pic')).toBeDefined();
//     expect(getByTestId('profile.userName')).toBeDefined();
//   });

//   it('Should render the profile page details', () => {
//     const { getByText } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     expect(getByText('Email:')).toBeDefined();
//     expect(getByText('Favorite Type:')).toBeDefined();
//     expect(getByText('Location:')).toBeDefined();
//     expect(getByText('Search Radius:')).toBeDefined();
//   });

//   it('should open modal to update email', () => {
//     const {
//       getByTestId,
//       getByText,
//       getByPlaceholderText,
//       queryByText,
//     } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     fireEvent.press(getByTestId('profile.editEmail'));
//     expect(getByText('Update Email')).toBeDefined();
//     expect(getByPlaceholderText('email')).toBeDefined();
//     expect(getByText('Submit')).toBeDefined();
//     expect(getByText('Cancel')).toBeDefined();
//     fireEvent.press(getByText('Cancel'));
//     expect(queryByText('Update Email')).toBeNull();
//   });

//   it('should open modal to update type', () => {
//     const { getByTestId, getByText, queryByText } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     fireEvent.press(getByTestId('profile.editType'));
//     expect(getByText('Update Type')).toBeDefined();
//     expect(getByTestId('profile.Sailing')).toBeDefined();
//     expect(getByTestId('profile.Hiking')).toBeDefined();
//     expect(getByTestId('profile.Biking')).toBeDefined();
//     expect(getByTestId('profile.Climbing')).toBeDefined();
//     expect(getByTestId('profile.Surfing')).toBeDefined();
//     expect(getByTestId('profile.Kayaking')).toBeDefined();
//     expect(getByTestId('profile.Rafting')).toBeDefined();
//     expect(getByTestId('profile.Skiing')).toBeDefined();
//     expect(getByTestId('profile.Camping')).toBeDefined();
//     expect(getByText('Cancel')).toBeDefined();
//     fireEvent.press(getByText('Cancel'));
//     expect(queryByText('Update Type')).toBeNull();
//   });

//   it('should open modal to update zip', () => {
//     const {
//       getByTestId,
//       getByText,
//       getByPlaceholderText,
//       queryByText,
//     } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     fireEvent.press(getByTestId('profile.editZip'));
//     expect(getByText('Update Zip')).toBeDefined();
//     expect(getByPlaceholderText('zip')).toBeDefined();
//     expect(getByText('Submit')).toBeDefined();
//     expect(getByText('Cancel')).toBeDefined();
//     fireEvent.press(getByText('Cancel'));
//     expect(queryByText('Update Zip')).toBeNull();
//   });

//   it('should open modal to update radius', () => {
//     const { getByTestId, getByText, queryByText } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     fireEvent.press(getByTestId('profile.editRadius'));
//     expect(getByText('Update Radius')).toBeDefined();
//     expect(getByTestId('profile.10')).toBeDefined();
//     expect(getByTestId('profile.25')).toBeDefined();
//     expect(getByTestId('profile.50')).toBeDefined();
//     expect(getByTestId('profile.100')).toBeDefined();
//     expect(getByTestId('profile.200')).toBeDefined();
//     expect(getByText('Cancel')).toBeDefined();
//     fireEvent.press(getByText('Cancel'));
//     expect(queryByText('Update Radius')).toBeNull();
//   });

//   it('should render the friends list header and container', () => {
//     const { getByTestId, getByText } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     expect(getByText('Friends List')).toBeDefined();
//     expect(getByTestId('profile.friendsList')).toBeDefined();
//   });
// });

// describe('Friends List and Friend Card', () => {
//   it('should display friend cards', () => {
//     const { getByTestId } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     expect(getByTestId('profile.friend.0')).toBeDefined();
//     expect(getByTestId('profile.friend.1')).toBeDefined();
//     expect(getByTestId('profile.friend.2')).toBeDefined();
//   });

//   it('should open the remove friend modal', () => {
//     const { getByTestId, getByText, queryByText } = render(
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Profile" component={Profile} />
//         </Stack.Navigator>
//       </NavigationContainer>,
//     );

//     fireEvent.press(getByTestId('profile.removeFriend.0'));
//     expect(getByText('Remove from friends list?')).toBeDefined();
//     expect(getByText('Remove')).toBeDefined();
//     expect(getByText('Cancel')).toBeDefined();
//     // fireEvent.press(getByText('Remove'));
//     // expect(queryByText('Remove from friends list?')).toBeNull();
//     // fireEvent.press(getByTestId('profile.removeFriend.0'));
//     // expect(getByText('Remove from friends list?')).toBeDefined();
//     fireEvent.press(getByText('Cancel'));
//     expect(queryByText('Remove from friends list?')).toBeNull();
//   });
// });

// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@jest/globals';

// This is the basic structure of test for JEST
// https://jestjs.io/docs/getting-started

test('Sample Test', () => {
  expect(2).toEqual(2);
});
