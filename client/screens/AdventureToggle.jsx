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
  const [search, setSearch] = useState('');

  const AdventureStack = createStackNavigator();

  // useEffect(() => {
  //   setEvents({
  //     title: 'Family Nature Fun Hour: Fish Fun',
  //     date: {
  //       start_date: 'Jun 17',
  //       when: 'Sat, Jun 17, 1:30 – 2:30 PM PDT',
  //     },
  //     address: [
  //       'Robert W. Crown Memorial State Beach, 8th Street, Otis Dr',
  //       'Alameda, CA',
  //     ],
  //     link: 'https://baynature.org/event/family-nature-fun-hour-fish-fun/',
  //     event_location_map: {
  //       image: 'https://www.google.com/maps/vt/data=3phttjgbcPijIRDFCCFNDaxMHgkWrICC6DM7p4R7n0h4Gq7cqil-1L5krYgZTiGO0Rg5_xU4QCg_mdk4yVhCXv4jsbxXNibf2fZrtsANk4rrc-Bmcyw',
  //       link: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x808f86b516428677:0x91da17540e2f2ff3?sa=X&hl=en',
  //       serpapi_link: 'https://serpapi.com/search.json?data=%214m2%213m1%211s0x808f86b516428677%3A0x91da17540e2f2ff3&engine=google_maps&google_domain=google.com&hl=en&q=outdoor+activities+in+san+francisco&type=place',
  //     },
  //     description: 'Bay Nature connects the people of the San Francisco Bay Area to our natural world and motivates people to solve problems with nature in mind. Header illustrations by Jane Kim, InkDwell',
  //     ticket_info: [
  //       {
  //         source: 'Bay Nature',
  //         link: 'https://baynature.org/event/family-nature-fun-hour-fish-fun/',
  //         link_type: 'more info',
  //       },
  //     ],
  //     venue: {
  //       name: 'Robert W. Crown Memorial State Beach',
  //       rating: 4.5,
  //       reviews: 4105,
  //       link: 'https://www.google.com/search?hl=en&q=Robert+W.+Crown+Memorial+State+Beach&ludocid=10509738330205138931&ibp=gwp%3B0,7',
  //     },
  //     thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlsD6R1G5lK946_xymWqWd2VroLd----vbrfy34kwxYiC-xm37d57zgBU&s',
  //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-kECS7HJf0NWvDv2W3eq8ZffI8gTckwfogTsQjkJPw&s=10',
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get('https://serpapi.com/search?engine=google_events', {
  //     params: {
  //       api_key: keys[Math.round(Math.random() * 5)],
  //       q: `outdoor activities in ${search}`,
  //     },
  //   })
  //     .then((response) => {
  //       setEvents(response.data.events_results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [search]);

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
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
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
