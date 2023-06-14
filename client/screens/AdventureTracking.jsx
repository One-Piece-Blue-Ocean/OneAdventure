/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { db } from '../../database/db';
import { UserContext } from '../context';
import Card from '../components/card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function AdventureTrackingScreen({ navigation }) {
  const [adventuresList, setAdventuresList] = useState([]);
  const [pastIndex, setPastIndex] = useState(adventuresList.length);
<<<<<<< HEAD
  const value = useContext(UserContext).user;
  const { user } = value;
  const userId = user.uid || 'yBjkdAwIoXgoczmWPtiX';
=======
  const value = useContext(UserContext);
  const { user } = value.user;
  const userId = user.uid || '8eSNW7SqbpVpe1NzD9XR3f4yclg1';
>>>>>>> 2c5d24a7de65f9d0500c26c33d87b602028290d1
  const userAdventuresRef = collection(db, 'pirates_adventures');
  const adventureRef = collection(db, 'adventures');

  const getAdventures = () => {
    let currentUserAdventure;
    let adventureDocReference;
    getDocs(query(userAdventuresRef, where('userId', '==', userId)))
      .then((userAdventureDocs) => {
        const promiseArr = userAdventureDocs.docs.map((userAdventureDoc) => {
          currentUserAdventure = userAdventureDoc.data();
          adventureDocReference = doc(adventureRef, currentUserAdventure.adventureId);
          return getDoc(adventureDocReference).then((adventureDocData) => (
            {
              [userAdventureDoc.id]: {
                userAdventureInfo: currentUserAdventure,
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

  const toggleField = (userEventId, field, dbValue) => {
    updateDoc(doc(userAdventuresRef, userEventId), { [field]: !dbValue[0] })
      .then(() => {
        getDoc(doc(userAdventuresRef, userEventId))
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
    if (adventuresList.length) {
      setPastIndex(adventuresList.length);
    }
  }, [adventuresList]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text> AdventureTracking </Text>
        <Text> Upcoming Adventures </Text>
        {adventuresList.length
          ? adventuresList.map((adventure, idx) => (
            <>
              {idx === pastIndex
                ? (<Text>Past Adventures</Text>)
                : null}
              <TouchableOpacity onPress={() => {
                // console.log('Pressed', Object.values(adventure)[0].adventureInfo);
                navigation.navigate('Detail', Object.values(adventure)[0].adventureInfo);
              }}
              >
                <Card
                  event={Object.values(adventure)[0].adventureInfo}
                  userEvent={Object.values(adventure)[0].userAdventureInfo}
                  userEventId={Object.keys(adventure)[0]}
                  loaded
                  toggleField={toggleField}
                />
              </TouchableOpacity>
            </>
          ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}

AdventureTrackingScreen.propTypes = {
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

export default AdventureTrackingScreen;
