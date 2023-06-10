import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AdventureListScreen from './AdventureList';
import AdventureMapScreen from './AdventureMap';
import AdventureTrackingScreen from './AdventureTracking';
import ProfileScreen from './Profile';
import MessagingScreen from './Messaging';

const Tab = createBottomTabNavigator();

function Nav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AdventureList" component={AdventureListScreen} />
      <Tab.Screen name="AdventureMap" component={AdventureMapScreen} />
      <Tab.Screen name="AdventureTracking" component={AdventureTrackingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Messaging" component={MessagingScreen} />
    </Tab.Navigator>
  );
}

export default Nav;
