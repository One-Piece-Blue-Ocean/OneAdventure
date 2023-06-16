import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Foundation, FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import {
  collection, where, query, getDocs, addDoc,
} from '../firebase/utils';
import { db } from '../../database/db';
import Card from '../components/card';
import { muted } from './Themes';

import { EventContext, UserContext } from '../context';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: muted.blue,
  },
  mapLogo: {
    flex: 1,
    position: 'absolute',
    top: 5,
    right: 30,
    color: muted.white,
  },
  searchLogo: {
    flex: 1,
    position: 'absolute',
    top: 12,
    left: 30,
    color: muted.white,
  },
  scrollContainer: {
    width: '100%',
    marginTop: 75,
  },
  largeScrollContainer: {
    width: '100%',
    marginTop: 20,
  },
  title: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
    color: muted.white,
  },
  searchContainer: {
    position: 'absolute',
    top: 105,
    left: 50,
    right: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: muted.white,
    padding: 10,
    borderRadius: 8,
  },
  cardContainer: {
    marginBottom: 20,
    width: '82%',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

function AdventureListScreen({ navigation, setSearch }) {
  const { events } = useContext(EventContext);
  const value = useContext(UserContext);
  const { user } = value;
  const { uid } = user.user;
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  // let adventureId;

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
          // setInterestedContext(docId, false);
          // console.log('after update: ', user);
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
    setLoading(true);
  };

  useEffect(() => {
    if (events.length > 0) setLoading(false);
  }, [events]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FontAwesome5
          style={styles.searchLogo}
          name="search"
          size={24}
          onPress={() => setShowSearch(!showSearch)}
        />
        <Foundation
          style={styles.mapLogo}
          name="map"
          size={36}
          onPress={() => {
            navigation.navigate('AdventureMap');
          }}
        />
        <Text style={styles.title}> Adventures </Text>
      </View>
      {
        showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Button
            color={muted.white}
            title="Search"
            onPress={() => {
              handleSearchSubmit();
              setShowSearch(false);
            }}
          />
        </View>
        )
      }
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={muted.white} />
        </View>
      ) : (
        <ScrollView style={[(showSearch) ? styles.scrollContainer : styles.largeScrollContainer]}>
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
      )}
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
