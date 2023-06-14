import React, { useContext, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AdventureListScreen from './AdventureList';
import AdventureMapScreen from './AdventureMap';
import { UserContext, EventContext } from '../context';

const keys = ['d7730fb56dd377a7f809600c8bb2ea1622d13b7ce05c86a10620a95af633c739', '1a751689270a58ec94e8d4cbf5b736e038363ef8547d5b4c566c70a333f8e34e', 'a269b59e99709ed38a523f42def0f8931b4b94c01496d831a6ab795b688971dd', '354e63609f6a81073cc39e6dd08fc7741c620fe41136f235e113287f1c418618', 'c56eb2ab8e762526f911dd86ac06aba293e66e3131bf3546f6555d9d73a56158', '7b89682fcdfde216d3e2205284b1a957e56ce3de484caf5d7f7c00b57057b27a'];

function AdventureToggleScreen() {
  const value = useContext(UserContext);
  const { user } = value;
  const { zipcode } = user;
  const [events, setEvents] = useState([]);

  const AdventureStack = createStackNavigator();

  useEffect(() => {
    axios.get('https://serpapi.com/search?engine=google_events', {
      params: {
        api_key: keys[Math.round(Math.random() * 5)],
        q: `outdoor activities in ${zipcode}`,
      },
    })
      .then((response) => {
        setEvents(response.data.events_results);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  }, []);

  return (
    <EventContext.Provider value={{ events }}>
      <AdventureStack.Navigator>
        <AdventureStack.Screen
          name="AdventureList"
          component={AdventureListScreen}
          options={{ headerShown: false }}
        />
        <AdventureStack.Screen
          name="AdventureMap"
          options={{ headerShown: false }}
          component={AdventureMapScreen}
        />
      </AdventureStack.Navigator>
    </EventContext.Provider>
  );
}

export default AdventureToggleScreen;
