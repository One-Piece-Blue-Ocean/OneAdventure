import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdventureListScreen from './AdventureList';
import AdventureMapScreen from './AdventureMap';

const AdventureStack = createStackNavigator();

function AdventureToggleScreen() {
  return (
    <AdventureStack.Navigator>
      <AdventureStack.Screen
        name="AdventureList"
        component={AdventureListScreen}
        options={{ headerShown: false }}
      />
      <AdventureStack.Screen
        name="AdventureMap"
        component={AdventureMapScreen}
        options={{ headerShown: false }}
      />
    </AdventureStack.Navigator>
  );
}

export default AdventureToggleScreen;
