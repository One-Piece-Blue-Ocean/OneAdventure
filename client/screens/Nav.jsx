import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Entypo, FontAwesome5 } from '@expo/vector-icons';

// import AdventureListScreen from './AdventureList';
// import AdventureMapScreen from './AdventureMap';
import AdventureToggle from './AdventureToggle';
import AdventureTrackingScreen from './AdventureTracking';
import ProfileScreen from './Profile';
import MessagingScreen from './Messaging';

const Tab = createBottomTabNavigator();

const adventureIcon = () => <FontAwesome name="list" size={24} color="black" />;
const messageIcon = () => <Entypo name="message" size={24} color="black" />;
const trackerIcon = () => <FontAwesome5 name="walking" size={24} color="black" />;
const profileIcon = () => <FontAwesome name="user" size={24} color="black" />;

function Nav() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="AdventureList" component={AdventureListScreen} /> */}
      {/* <Tab.Screen name="AdventureMap" component={AdventureMapScreen} /> */}
      <Tab.Screen
        name="Adventures"
        component={AdventureToggle}
        options={{
          tabBarLabel: '',
          tabBarIcon: adventureIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Messaging"
        component={MessagingScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: messageIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AdventureTracking"
        component={AdventureTrackingScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: trackerIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: profileIcon,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default Nav;
