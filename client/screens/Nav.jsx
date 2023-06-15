/* eslint-disable import/no-named-as-default */
import React, { useState, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import { FontAwesome, Entypo, FontAwesome5 } from '@expo/vector-icons';

import AdventureToggle from './AdventureToggle';
import AdventureTrackingScreen from './AdventureTracking';
import ProfileScreen from './Profile';
import { UserContext } from '../context';
import MessagingScreen from './Messaging';

const Tab = createBottomTabNavigator();

const adventureIcon = ({ focused }) => (
  <FontAwesome
    name="list"
    size={32}
    color={focused ? 'white' : 'black'}
  />
);
const messageIcon = ({ focused }) => (
  <Entypo
    name="message"
    size={32}
    color={focused ? 'white' : 'black'}
  />
);
const trackerIcon = ({ focused }) => (
  <FontAwesome5
    name="walking"
    size={32}
    color={focused ? 'white' : 'black'}
  />
);
const profileIcon = ({ focused }) => (
  <FontAwesome
    name="user"
    size={32}
    color={focused ? 'white' : 'black'}
  />
);

function Nav({ route }) {
  const [user, setUser] = useState(route.params);

  // console.log(user);

  const updateUserContext = (key, value) => {
    user.user[key] = value;
    setUser({ ...user });
  };

  const contextObj = useMemo(() => ({ user, updateUserContext }), [user]);
  // console.log(contextObj);
  console.log('IN NAV: Which route?', route);
  return (
    <UserContext.Provider value={contextObj}>
      <Tab.Navigator
        // eslint-disable-next-line no-shadow
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: route.name === 'Adventures'
              || route.name === 'AdventureTracking' ? '#00A5E0' : '#FF2F00',
          },
        })}
      >
        <Tab.Screen
          name="Adventures"
          component={AdventureToggle}
          options={{
            tabBarLabel: '',
            tabBarIcon: adventureIcon,
            // headerShown: false,
          }}
        />
        <Tab.Screen
          name="Messaging"
          component={MessagingScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: messageIcon,
            // headerShown: false,
          }}
        />
        <Tab.Screen
          name="AdventureTracking"
          component={AdventureTrackingScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: trackerIcon,
            // headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: profileIcon,
            // headerShown: false,
          }}
        />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

Nav.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    params: PropTypes.shape({
      user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        // zipcode: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    path: PropTypes.string,
  }).isRequired,
};

export default Nav;
