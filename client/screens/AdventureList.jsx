import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, ScrollView, TouchableOpacity, TextInput, Button,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import {
  collection, where, query, getDocs, addDoc,
} from '../firebase/utils';
import { db } from '../../database/db';
import Card from '../components/card';

import { EventContext, UserContext } from '../context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    position: 'absolute',
    top: 5,
    right: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 75,
  },
  title: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
  },
  searchContainer: {
    position: 'absolute',
    top: 105,
    left: 35,
    right: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  searchButton: {
    color: '#2e86c1',
  },
  cardContainer: {
    marginBottom: 20,
  },
});

function AdventureListScreen({ navigation, setSearch }) {
  const { events } = useContext(EventContext);
  const value = useContext(UserContext);
  const { user } = value;
  const { uid } = user.user;
  const [searchText, setSearchText] = useState('');
  const handleStarPress = (event) => {
    // eslint-disable-next-line camelcase
    const pirates_adventures_collection = collection(db, 'pirates_adventures');
    // eslint-disable-next-line camelcase
    const adventures_collection = collection(db, 'adventures');
    getDocs(query(adventures_collection, where('description', '==', event.description)), where('date', '==', event.date))
      .then((possibleAdventureDoc) => {
        if (!possibleAdventureDoc.docs.length) {
          addDoc(
            adventures_collection,
            {
              address: event.address,
              date: event.date,
              description: event.description,
              imageUrl: event.imageUrl,
              title: event.title,
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
          }).catch((error) => {
            console.log('Error updating event as interested', error.code, error.message);
          });
        } else {
          const docId = possibleAdventureDoc.docs[0].id;
          addDoc(
            pirates_adventures_collection,
            {
              adventureId: docId,
              attending: false,
              interested: true,
              userId: uid,
            },
          );
        }
      })
      .catch((error) => {
        console.log('Error querying db for adventure doc: ', error.code, error.message);
      });
  };

  const toggleField = () => {

  };

  const handleSearchSubmit = () => {
    setSearchText('');
    setSearch(searchText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Foundation
          style={styles.logo}
          name="map"
          size={48}
          color="black"
          onPress={() => {
            navigation.navigate('AdventureMap');
          }}
        />
        <Text style={styles.title}> Adventures </Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button style={styles.searchButton} title="Search" onPress={handleSearchSubmit} />
      </View>
      <ScrollView style={styles.scrollContainer}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.image + event.date.when}
            style={styles.cardContainer}
            onPress={() => navigation.navigate('Detail', { selectedEvent: event, uid })}
          >
            <Card
              event={{
                address: event.address[0],
                date: event.date.start_date,
                description: event.description,
                imageUrl: event.image,
                title: event.title,
              }}
              userEvent={{
                interested: false,
                attending: false,
              }}
              userEventId=""
              loaded
              toggleField={toggleField}
              onStarPress={handleStarPress}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

AdventureListScreen.propTypes = {
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
  setSearch: PropTypes.func.isRequired,
};

export default AdventureListScreen;
