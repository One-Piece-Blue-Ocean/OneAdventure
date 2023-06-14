import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  updateDoc,
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../database/db';

// temp friend data
const DATA = [
  {
    uid: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Dave',
    profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    uid: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fullName: 'Steve',
    profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    uid: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Jim',
    profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    uid: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bz',
    fullName: 'Sara',
    profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    uid: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6z',
    fullName: 'Billy',
    profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    uid: '58694a0f-3da1-471f-bd96-145571e29d7z',
    fullName: 'Chris',
    profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
];

const styles = StyleSheet.create({
  addFriendBtn: {
    width: 250,
    height: 50,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  cardOrganizer: {
    flexDirection: 'row',
    width: '100%',
  },
  headerText: {
    margin: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 60,
    padding: 40,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: 'lightgray',
    margin: 20,
    marginBottom: 0,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
  },
  profileImageWrap: {
    width: 50,
    borderRadius: 50,
    overflow: 'hidden',
    margin: 3,
  },
  pirateScrollWrap: {
    alignItems: 'center',
  },
  scroll: {
    backgroundColor: 'lightgray',
    width: 300,
    borderRadius: 10,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 2,
  },
});

function FriendSearchModal({
  friendSearchModal,
  setFriendSearchModal,
  userId,
}) {
  const [pirates, setPirates] = useState([]);
  // const pirateCollection = collection(db, 'pirates');

  const getAllPirates = () => {
    // query for all pirates
    getDocs(collection(db, 'pirates'))
      .then((piratesDocs) => {
        const myPirateFriendArr = piratesDocs.docs.map((pirateDoc) => ({
          uid: pirateDoc.data().uid,
          fullName: pirateDoc.data().fullName,
          profilePhoto: pirateDoc.data().profilePhoto,
          chatToken: pirateDoc.data().chatToken,
        }));
        setPirates(myPirateFriendArr);
      })
      .catch((err) => {
        console.log('err', err.message);
      });
  };

  const addFriend = (friend) => {
    console.log('trying to add this friend', friend, 'to this user id', userId);
    addDoc(collection(db, 'pirates', userId, 'friends'), { friendId: friend.uid })
      .then(() => {
        console.log('sucess')
        // getPirates(); get new friend list
      })
      .catch((err) => console.log(err.message))
  };

  useEffect(() => {
    getAllPirates();
  }, []);

  return (
    <SafeAreaView>
      <Modal
        animationType="fade"
        transparent
        visible={friendSearchModal}
      >
        <View style={styles.centerModal}>
          <View style={[styles.modalContainer, styles.shadow]}>

            <View style={styles.scrollContainer}>
              <View>
                <Text style={styles.headerText}>Add Friends</Text>
              </View>
              <ScrollView style={styles.scroll}>
                <View style={styles.pirateScrollWrap}>

                  {pirates.map((pirate) => (
                    <TouchableOpacity
                      key={pirate.uid}
                      style={[styles.addFriendBtn, styles.shadow]}
                      onPress={() => {
                        addFriend(pirate);
                        setFriendSearchModal(false);
                      }}
                    >
                      <View style={styles.cardOrganizer}>

                        <View style={styles.profileImageWrap}>
                          <Image
                            source={{
                              uri: pirate.profilePhoto,
                              height: 50,
                              width: 50,
                            }}
                          />
                        </View>

                        <View style={styles.nameContainer}>
                          <Text style={styles.nameText}>{pirate.fullName}</Text>
                        </View>

                      </View>
                    </TouchableOpacity>
                  ))}

                </View>
              </ScrollView>
            </View>

            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.shadow]}
                onPress={() => setFriendSearchModal(false)}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Modal>
    </SafeAreaView>

  );
}

// this will need to be updated
FriendSearchModal.propTypes = {
  friendSearchModal: PropTypes.bool.isRequired,
  setFriendSearchModal: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default FriendSearchModal;
