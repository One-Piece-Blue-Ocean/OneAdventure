import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Modal, TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
// import { config } from 'dotenv';

// config();
import Icon from 'react-native-vector-icons/Foundation';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    backgroundColor: 'white',
    zIndex: 10,
  },
});

function AdventureMapScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://api.amp.active.com/v2/search?', {
      params: {
        api_key: '5rbx3x7bsej2zp66p3wnwxfa',
        near: 'San Francisco,CA,US',
        query: 'outdoor adventure',
        per_page: 1,
      },
    })
      .then((response) => {
        setEvents(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMarkerPress = () => {
    setModalVisible(!modalVisible);
  };

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (events[0]) {
    console.log(Object.keys(events[0]));
    console.log(events[0].place.geoPoint.lat);
  }
  // console.log(events[0].place.geoPoint.lat);
  // let markerRegion = {};
  // if (events[0]) {
  //   markerRegion = {
  //     latitude: events[0].place.geoPoint.lat,
  //     longitude: events[0].place.geoPoint.lon,
  //   };
  //   console.log(events[0].assetDescriptions[0].description);
  // }
  // console.log(events);
  // console.log(events[0].place);

  if (events[0]) {
    return (
      <View style={styles.container}>
        <Icon.Button
          name="list-bullet"
          color="black"
          size="32"
          style={styles.icon}
          title="AdventureList"
          onPress={() => {
            navigation.navigate('AdventureList');
          }}
        />
        <MapView
          style={styles.map}
          initialRegion={region}
        // eslint-disable-next-line no-shadow
        // onRegionChangeComplete={() => setRegion(region)}
        >
          {events.forEach((event) => {
            console.log(Object.keys(event));
            // <Marker
            //   coordinate={{
            //     latitude: event.place.geoPoint.lat,
            //     longitude: event.place.geoPoint.lon,
            //   }}
            //   onPress={handleMarkerPress}
            // />;
          })}
        </MapView>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.container}>
            <View style={styles.modal}>
              <Text>{events[0].assetDescriptions[0].description}</Text>
              <TouchableOpacity onPress={handleMarkerPress}>
                <Text>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

AdventureMapScreen.propTypes = {
  navigation: PropTypes.func.isRequired,
};

export default AdventureMapScreen;
