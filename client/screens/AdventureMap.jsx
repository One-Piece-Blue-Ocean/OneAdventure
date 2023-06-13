import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Modal, TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
// import { config } from 'dotenv';
// import UserContext from '../context';

// config();
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: 30,
    marginTop: 100,
  },
});

function AdventureMapScreen({ navigation, events }) {
  const [selectedEvent, setSelectedEvent] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [latty, setLat] = useState(0);
  const [longy, setLng] = useState(0);
  // const { events } = route.params;
  // const {zip} = useContext('userContext');
  const zip = '98028';

  useEffect(() => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: zip,
        key: 'AIzaSyC4Up0GjtGbZpA2ZukzgLz0o4HinVx1AW0',
      },
    })
      .then((res) => {
        if (res.data.results.length) {
          const { lat, lng } = res.data.results[0].geometry.location;
          setLat(lat);
          setLng(lng);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMarkerPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  let initialRegion = {};
  if (latty !== 0 && longy !== 0) {
    initialRegion = {
      latitude: latty,
      longitude: longy,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  events.forEach((event) => {
    console.log(event);
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {events.map((event) => (
          axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: event.address[0] + event.address[1],
              key: 'AIzaSyC4Up0GjtGbZpA2ZukzgLz0o4HinVx1AW0',
            },
          })
            .then((res) => {
              if (res.data.results.length) {
                const { lat, lng } = res.data.results[0].geometry.location;
                  <Marker
                    coordinate={{
                      latitude: lat,
                      longitude: lng,
                    }}
                    onPress={() => handleMarkerPress(event)}
                  />;
              }
            })
            .catch((err) => {
              console.log(err);
            })
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            {selectedEvent && (
            <Text>{selectedEvent.description}</Text>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.icon}>
        <FontAwesome
          name="list"
          size={48}
          color="black"
          onPress={() => {
            navigation.navigate('AdventureList');
          }}
        />
      </View>
    </View>
  );

  // const handleMarkerPress = () => {
  //   setModalVisible(!modalVisible);
  // };

  // const region = {
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // };

  // if (events[0]) {
  //   console.log(Object.keys(events[0]));
  //   console.log(events[0].place.geoPoint.lat);
  // }
  // // console.log(events[0].place.geoPoint.lat);
  // // let markerRegion = {};
  // // if (events[0]) {
  // //   markerRegion = {
  // //     latitude: events[0].place.geoPoint.lat,
  // //     longitude: events[0].place.geoPoint.lon,
  // //   };
  // //   console.log(events[0].assetDescriptions[0].description);
  // // }
  // // console.log(events);
  // // console.log(events[0].place);

  // if (events[0]) {
  //   return (
  //     <View style={styles.container}>
  //       <MapView
  //         style={styles.map}
  //         initialRegion={region}
  //       // eslint-disable-next-line no-shadow
  //       // onRegionChangeComplete={() => setRegion(region)}
  //       >
  //         {events.forEach((event) => {
  //           console.log(Object.keys(event));
  //           // <Marker
  //           //   coordinate={{
  //           //     latitude: event.place.geoPoint.lat,
  //           //     longitude: event.place.geoPoint.lon,
  //           //   }}
  //           //   onPress={handleMarkerPress}
  //           // />;
  //         })}
  //       </MapView>
  //       <Modal
  //         animationType="slide"
  //         transparent
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           setModalVisible(!modalVisible);
  //         }}
  //       >
  //         <View style={styles.container}>
  //           <View style={styles.modal}>
  //             <Text>{events[0].assetDescriptions[0].description}</Text>
  //             <TouchableOpacity onPress={handleMarkerPress}>
  //               <Text>Close Modal</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </Modal>
  //       <View style={styles.icon}>
  //         <FontAwesome
  //           name="list"
  //           size={48}
  //           color="black"
  //           onPress={() => {
  //             navigation.navigate('AdventureList');
  //           }}
  //         />
  //       </View>
  //     </View>
  //   );
  // }
}

AdventureMapScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  events: PropTypes.array.isRequired,
};

export default AdventureMapScreen;
