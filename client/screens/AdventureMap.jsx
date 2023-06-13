import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, Modal, TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
// import { config } from 'dotenv';

// config();
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { EventContext } from '../context';

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

function AdventureMapScreen({ navigation }) {
  const [selectedEvent, setSelectedEvent] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitudeDelta: 0.922,
    longitudeDelta: 0.421,
  });
  const value = useContext(EventContext);
  // const { events } = route.params;
  // const {zip} = useContext('userContext');
  const zip = 'San Francisco';

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
          setRegion((prevState) => ({
            ...prevState,
            latitude: lat,
            longitude: lng,
          }));
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

  useEffect(() => {
    const fetchMarkers = async () => {
      const markerPromises = value.map((event) => axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: event.address[0] + event.address[1],
          key: 'AIzaSyC4Up0GjtGbZpA2ZukzgLz0o4HinVx1AW0',
        },
      }));

      try {
        const markerResponses = await Promise.all(markerPromises);
        const newMarkers = markerResponses.map((res, index) => {
          if (res.data.results.length) {
            const { lat, lng } = res.data.results[0].geometry.location;
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
                onPress={() => handleMarkerPress(value[index])}
              />
            );
          }
          return null;
        });
        setMarkers(newMarkers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarkers();
  }, [value]);

  return (
    <View style={styles.container}>
      {region.latitude && (
        <MapView
          style={styles.map}
          initialRegion={region}
        >
          {markers}
        </MapView>
      )}
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
};

export default AdventureMapScreen;
