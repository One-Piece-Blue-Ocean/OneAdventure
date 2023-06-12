import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  collection, doc, getDoc, getDocs,
} from 'firebase/firestore';
import { db } from '../../database/db';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function AdventureTrackingScreen() {
  const [adventuresList, setAdventuresList] = useState([]);

  const userId = useContext('userContext') || 'yBjkdAwIoXgoczmWPtiX';
  const userAdventuresRef = collection(db, 'pirates', userId, 'events');
  const adventureRef = collection(db, 'adventures');

  const getAdventures = () => {
    getDocs(userAdventuresRef)
      .then((userEventsDocs) => {
        const promiseArr = userEventsDocs.docs.map((eventDoc) => {
          const adventureDoc = doc(adventureRef, eventDoc.data().adventureId);
          return getDoc(adventureDoc).then((adventureDocData) => adventureDocData.data());
        });
        Promise.all(promiseArr).then((resolvedAdventures) => {
          setAdventuresList(resolvedAdventures);
        });
      });
  };

  useEffect(() => {
    if (!adventuresList.length) {
      getAdventures();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text> AdventureTracking </Text>
      {adventuresList.length
        ? adventuresList.map((adventure) => (
          <View key={adventure.eventName} style={styles.container}>
            <Text>
              {adventure.eventName}
            </Text>
          </View>
        ))
        : null}
    </View>
  );
}

export default AdventureTrackingScreen;
