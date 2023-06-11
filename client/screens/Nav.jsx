import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';

import AdventureListScreen from './AdventureList';
import AdventureMapScreen from './AdventureMap';
import AdventureTrackingScreen from './AdventureTracking';
import ProfileScreen from './Profile';
import MessagingScreen from './Messaging';

const Tab = createBottomTabNavigator();

function Nav({ route }) {
  // route.params contains email, fullName, zipcode of current user
  console.log('USER OBJ: ', route.params); // logging for visibility - remove later
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

Nav.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    params: PropTypes.shape({
      user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    path: PropTypes.string,
  }).isRequired,
};

export default Nav;
