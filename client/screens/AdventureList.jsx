import React, { useContext } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, ScrollView, TouchableOpacity,
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
    marginTop: 25,
  },
  title: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 25,
  },
});

function AdventureListScreen({ navigation }) {
  const { events } = useContext(EventContext);
  const value = useContext(UserContext);
  const { user } = value;
  const { uid } = user.user;

  const handleStarPress = (event) => {
    // eslint-disable-next-line camelcase
    const pirates_adventures_collection = collection(db, 'pirates_adventures');
    // eslint-disable-next-line camelcase
    const adventures_collection = collection(db, 'adventures');
    console.log('star event --- ', event);
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
      <ScrollView style={styles.scrollContainer}>
        {events.map((event) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', event)}
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
              key={event.image + event.date.when}
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
};

export default AdventureListScreen;
