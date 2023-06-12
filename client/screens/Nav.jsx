import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
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

function Nav({ route }) {
  const UserContext = useContext(route.params);
  // route.params contains email, fullName, zipcode of current user
  console.log('USER OBJ: ', route.params); // logging for visibility - remove later

  return (
    <UserContext.Provider>
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
        city: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    path: PropTypes.string,
  }).isRequired,
};

export default Nav;
