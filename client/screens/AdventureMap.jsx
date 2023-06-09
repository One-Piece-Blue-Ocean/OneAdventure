/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Button, ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { addDoc, collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { EventContext, UserContext } from '../context';
import Card from '../components/card';
import { db } from '../../database/db';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
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
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 105,
    right: 105,
    backgroundColor: '#2e86c1',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    top: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

function AdventureMapScreen({ navigation, search, setSearch }) {
  const [selectedEvent, setSelectedEvent] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitudeDelta: 0.1194,
    longitudeDelta: 0.0821,
  });
  const [searchText, setSearchText] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [currentLatLng, setCurrentLatLng] = useState('');
  const { events } = useContext(EventContext);
  const value = useContext(UserContext);
  const { user, setInterestedContext, setPiratesAdventuresContext } = value;
  const { uid, zipcode } = user.user;
  const { interested, pirates_adventures } = user;
  const [loading, setLoading] = useState(false);

  console.log(user);
  console.log('why', pirates_adventures);

  const handleSearchArea = () => {
    setLoading(true);
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: currentLatLng,
        key: 'AIzaSyC4Up0GjtGbZpA2ZukzgLz0o4HinVx1AW0',
      },
    })
      .then((res) => {
        if (res.data.results.length) {
          let city = '';
          let state = '';
          const addressComponent = res.data.results[0].address_components;
          for (let i = 0; i < addressComponent.length; i += 1) {
            if (addressComponent[i].types[0] === 'locality') {
              city = addressComponent[i].short_name;
            }
            if (addressComponent[i].types[0] === 'administrative_area_level_1') {
              state = addressComponent[i].short_name;
            }
          }
          console.log('handlesearcharea', city, state);
          const address = `${city}, ${state}`;
          setSearch(address);
          changeRegion(address);
        }
      })
      .catch((err) => {
        console.log(searchText);
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(false);
    setShowSearchPopup(false);
  }, [markers]);

  const changeRegion = (input) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: input,
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
  }

  const handleSearchSubmit = () => {
    changeRegion(searchText);
    setSearchText('');
    setSearch(searchText);
  };

  const handleRegionChange = (theRegion) => {
    const {
      latitude, longitude,
    } = theRegion;

    const latlng = `${latitude},${longitude}`;

    const latDelta = Math.abs(latitude - region.latitude);
    const lngDelta = Math.abs(longitude - region.longitude);

    // Set a threshold for how far the user needs to scroll
    const threshold = 0.1; // Adjust this value according to your needs

    // Check if the user has scrolled beyond the threshold
    if (latDelta > threshold || lngDelta > threshold) {
      setShowSearchPopup(true);
      setCurrentLatLng(latlng);
    } else {
      setShowSearchPopup(false);
    }
  };

  useEffect(() => {
    // if (search === '') {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: zipcode,
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
        console.log(zipcode);
        console.log(err);
      });
    setSearch(zipcode);
    // }
  }, []);

  const handleMarkerPress = (event) => {
    if (interested === undefined) {
      setSelectedEvent(event);
      return;
    }
    if (interested.length) {
      interested.map((eventId) => {
        getDoc(doc(db, 'adventures', eventId))
        .then((res) => {
          const data = res.data();
          if (data.description === event.description && data.date === event.date.start_date) {
            event.interested = true;
          } else {
            event.interested = false;
          }
        })
        .then(() => {
          setSelectedEvent(event);
        })
      })
    } else {
      setSelectedEvent(event);
    }
  };

  useEffect(() => {
    if (Object.keys(selectedEvent).length) {
      setModalVisible(true);
    }
  }, [selectedEvent])

  useEffect(() => {
    const fetchMarkers = async () => {
      const markerPromises = events.map((event) => axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
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
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
                onPress={() => handleMarkerPress(events[index])}
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
  }, [events]);

  const toggleField = (blah, blah2, interestedValue) => {
    // eslint-disable-next-line camelcase
    const pirates_adventures_collection = collection(db, 'pirates_adventures');
    // eslint-disable-next-line camelcase
    const adventures_collection = collection(db, 'adventures');
    getDocs(query(adventures_collection, where('description', '==', selectedEvent.description)), where('date', '==', selectedEvent.date.start_date))
      .then((possibleAdventureDoc) => {
        if (!possibleAdventureDoc.docs.length) {
          addDoc(
            adventures_collection,
            {
              address: selectedEvent.address[0],
              date: selectedEvent.date.start_date,
              description: selectedEvent.description,
              imageUrl: selectedEvent.image,
              title: selectedEvent.title,
            },
          ).then((docRef) => {
            addDoc(
              pirates_adventures_collection,
              {
                adventureId: docRef.id,
                attending: false,
                interested: true,
                userId: uid,
              },
            );
            setPiratesAdventuresContext(docRef.id, true);
            setInterestedContext(docRef.id, true);
          })
          .catch((err) => {
            console.log('this', err);
          })
        } else {
          const docId = possibleAdventureDoc.docs[0].id;
          if (!pirates_adventures.includes(docId)) {
            addDoc(
              pirates_adventures_collection,
              {
                adventureId: docId,
                attending: false,
                interested: true,
                userId: uid,
              },
            );
            setPiratesAdventuresContext(docId, true);
            setInterestedContext(docId, true);
          } else {
            getDocs(query(collection(db, 'pirates_adventures'), where("userId", "==", uid), where("adventureId", "==", docId)))
            .then((snapshot) => {
              console.log(interestedValue);
              console.log(snapshot.docs[0].id);
              updateDoc(doc(db, "pirates_adventures", snapshot.docs[0].id), {interested: !interestedValue[0]});
              setInterestedContext(docId, !interestedValue[0]);
            })
            .catch((err) => {
              console.log('here');
              console.log(err);
            })
          }
        }
      });
  };

  return (
    <View style={styles.container}>
      {region.latitude && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={handleRegionChange}
        >
          {markers}
        </MapView>
      )}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a city or zipcode"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
        />
        <Button title="Search" onPress={handleSearchSubmit} />
      </View>
      {showSearchPopup && (
        <TouchableOpacity onPress={handleSearchArea} style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ): (
            <Text style={styles.buttonText}>Search This Area</Text>
          )}
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedEvent({});
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {modalVisible && (
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
                console.log('Pressed from Map', selectedEvent);
                navigation.navigate('Detail', { selectedEvent, uid });
              }}
              >
                <Card
                  event={{
                    address: selectedEvent.address[0],
                    date: selectedEvent.date.start_date,
                    description: selectedEvent.description,
                    imageUrl: selectedEvent.image,
                    title: selectedEvent.title,
                  }}
                  userEvent={{
                    interested: selectedEvent.interested || false,
                    attending: false,
                  }}
                  userEventId=""
                  loaded
                  toggleField={toggleField}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => {
              setSelectedEvent({});
              setModalVisible(false);
              }}>
              <Text style={styles.closeButtonText}>Close Modal</Text>
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
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default AdventureMapScreen;