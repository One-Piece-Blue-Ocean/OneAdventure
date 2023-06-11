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
/* eslint-disable */
function AdventureTrackingScreen() {
  const [adventuresList, setAdventuresList] = useState([]);

  const userId = useContext('userContext') || 'yBjkdAwIoXgoczmWPtiX';
  const userAdventuresRef = collection(db, 'pirates', userId, 'events');
  const adventureRef = collection(db, 'adventures');

  const getAdventures = () => {
    const currentAdventures = [];

    getDocs(userAdventuresRef)
      .then((userEventsDocs) => {
        let promiseArr = userEventsDocs.docs.map((eventDoc) => {
        const adventureDoc = doc(adventureRef, eventDoc.data().adventureId);
        return getDoc(adventureDoc)
          .then((adventureDocData) => {
            console.log('pushing data in getdocs')
            currentAdventures.push(adventureDocData.data())
          })
          .catch((err) => console.log(err))
        });
        // console.log(promiseArr,' hiiiiii')
        Promise.all(promiseArr).then(() => {
          console.log('updating eventslist')
          setAdventuresList(currentAdventures)
        });
      });
    };


  useEffect(() => {
    // console.log(adventuresList)
    if (!adventuresList.length) {
      getAdventures();
    }
  }, [])

  console.log(adventuresList)
  return (
    <View style={styles.container}>
      <Text> AdventureTracking </Text>
    </View>
  );
}

export default AdventureTrackingScreen;
