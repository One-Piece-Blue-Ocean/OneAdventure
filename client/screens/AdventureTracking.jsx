/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, } from 'react-native';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../database/db';
import Card from '../components/card.jsx';

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
    let currentUserEvent;
    getDocs(userAdventuresRef)
      .then((userEventsDocs) => {
        const promiseArr = userEventsDocs.docs.map((eventDoc) => {
          currentUserEvent = eventDoc.data();
          const adventureDoc = doc(adventureRef, eventDoc.data().adventureId);
          return getDoc(adventureDoc).then((adventureDocData) => {
            return {[eventDoc.id]: {
              userAdventureInfo: currentUserEvent,
              adventureInfo: adventureDocData.data()}
            }
          });
        });
        Promise.all(promiseArr).then((resolvedAdventures) => {
          setAdventuresList(resolvedAdventures);
        });
      });
  };

  const handleInterested = (userEventId, interested) => {
    const docReference = doc(db, 'pirates', userId, 'events', userEventId)
    updateDoc(docReference, {'interested': !interested[0]})
    .then(() => {
      getDoc(docReference)
      .then((updatedDoc) => {
        let objIndToUpdate = adventuresList.findIndex((obj) => Object.keys(obj)[0] === userEventId);
        let newState = [...adventuresList];
        newState[objIndToUpdate][userEventId]['userAdventureInfo'] = updatedDoc.data();
        setAdventuresList(newState);
      })
    })
  }

  useEffect(() => {
    if (!adventuresList.length) {
      getAdventures();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text> AdventureTracking </Text>
        {adventuresList.length
          ? adventuresList.map((adventure) => (
            <Card
              key={Math.random()}
              event={Object.values(adventure)[0].adventureInfo}
              userEvent={Object.values(adventure)[0].userAdventureInfo}
              userEventId={Object.keys(adventure)[0]}
              loaded
              handleInterested={handleInterested} />
          ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AdventureTrackingScreen;
