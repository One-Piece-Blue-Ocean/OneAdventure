import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../database/db';
import Card from '../components/card';

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
  const [pastIndex, setPastIndex] = useState(0);

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
          return getDoc(adventureDoc).then((adventureDocData) => (
            {
              [eventDoc.id]: {
                userAdventureInfo: currentUserEvent,
                adventureInfo: adventureDocData.data(),
              },
            }
          ));
        });
        Promise.all(promiseArr).then((resolvedAdventures) => {
          setAdventuresList(resolvedAdventures.sort((a, b) => {
            const aDate = new Date(Object.values(a)[0].adventureInfo.date);
            const bDate = new Date(Object.values(b)[0].adventureInfo.date);
            return aDate < bDate ? -1 : 1;
          }));
        }).then(() => {
          const copy = adventuresList.slice();
          const idx = copy.findIndex(
            (val) => Object.values(val)[0].adventureInfo.date < Date.now(),
          );
          if (idx > 0) {
            setPastIndex(idx);
          }
        });
      });
  };

  const toggleField = (userEventId, field, value) => {
    const docReference = doc(db, 'pirates', userId, 'events', userEventId);
    updateDoc(docReference, { [field]: !value[0] })
      .then(() => {
        getDoc(docReference)
          .then((updatedDoc) => {
            const objIndToUpdate = adventuresList.findIndex(
              (obj) => Object.keys(obj)[0] === userEventId,
            );
            const newState = [...adventuresList];
            newState[objIndToUpdate][userEventId].userAdventureInfo = updatedDoc.data();
            setAdventuresList(newState);
          });
      });
  };

  useEffect(() => {
    if (!adventuresList.length) {
      getAdventures();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text> AdventureTracking </Text>
        <Text> Upcoming Adventures </Text>
        {adventuresList.length
          ? adventuresList.map((adventure, idx) => (
            idx === pastIndex
              ? (
                <>
                  <Text>Past Adventures</Text>
                  <Card
                    key={Math.random()}
                    event={Object.values(adventure)[0].adventureInfo}
                    userEvent={Object.values(adventure)[0].userAdventureInfo}
                    userEventId={Object.keys(adventure)[0]}
                    loaded
                    toggleField={toggleField}
                  />
                </>
              )
              : (
                <Card
                  key={Math.random()}
                  event={Object.values(adventure)[0].adventureInfo}
                  userEvent={Object.values(adventure)[0].userAdventureInfo}
                  userEventId={Object.keys(adventure)[0]}
                  loaded
                  toggleField={toggleField}
                />
              )
          ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AdventureTrackingScreen;
