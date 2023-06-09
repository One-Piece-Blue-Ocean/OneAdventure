import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  doc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../database/db';
import { useChatContext } from '../chatContext';
import createChat from '../utilities/createChat';
import useChatClient from '../hooks/useChatClient';
import { muted } from '../screens/Themes';

const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsHeaderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    MarginTop: 10,
  },
  friendsHeaderText: {
    fontSize: 24,
  },
  friendsListContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  friendCardContainer: {
    width: 350,
    height: 70,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    flexDirection: 'row',
    flex: 1,
  },
  friendCardDetails: {
    flexDirection: 'row',
    flex: 4,
  },
  friendNameContainer: {
    padding: 10,
    margin: 3,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.25,
  },
  friendNameText: {
    fontSize: 23,
  },
  friendBtnContainer: {
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  friendProfileImageContainer: {
    height: '100%',
    flex: 1,
  },
  modalBtnContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: muted.red,
    margin: 20,
    marginBottom: 0,
  },
  modalText: {
    padding: 10,
  },
  modalTextWrap: {
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageWrap: {
    height: 50,
    margin: 10,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
});

function FriendCard({
  friend,
  index,
  userId,
  getFriends,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { profilePhoto, fullName, uid } = friend;
  const navigation = useNavigation();
  const { setChannel } = useChatContext();
  const clientIsReady = useChatClient();

  const onMessage = () => {
    if (clientIsReady) {
      createChat([friend], setChannel, navigation, userId);
    }
  };

  const onRemove = (friendId) => {
    // eslint-disable-next-line no-console
    const trimmedFriendId = friendId.trim();
    const trimmedUserId = userId.trim();
    getDocs(query(collection(db, 'pirates', trimmedUserId, 'friends'), where('friendId', '==', trimmedFriendId)))
      .then((friendDocs) => {
        deleteDoc(doc(db, 'pirates', trimmedUserId, 'friends', friendDocs.docs[0].id))
          .then(() => {
            getFriends();
          })
          .catch(() => {});
      });
  };

  return (
    <View style={[styles.friendCardContainer, styles.shadow]}>

      <View style={styles.friendProfileImageContainer}>
        <View style={styles.profileImageWrap}>
          <Image
            source={{
              uri: profilePhoto,
              height: 50,
              width: 50,
            }}
          />
        </View>
      </View>

      <View style={styles.friendCardDetails}>
        <View style={styles.friendNameContainer}>
          <Text style={styles.friendNameText}>{fullName}</Text>
        </View>
        <View style={styles.friendBtnContainer}>
          <TouchableOpacity>
            <Entypo
              name="message"
              size={24}
              color="black"
              onPress={() => onMessage()}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="remove"
              size={24}
              color="gray"
              testID={`profile.removeFriend.${index}`}
              onPress={() => setModalVisible(true)}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
      >
        <View style={styles.centerModal}>
          <View style={[styles.modalContainer, styles.shadow]}>
            <View style={styles.modalTextWrap}>
              <Text style={styles.modalText}>Remove from friends list?</Text>
            </View>
            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  onRemove(uid);
                  setModalVisible(false);
                }}
              >
                <Text>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.shadow]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

FriendCard.propTypes = {
  friend: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  getFriends: PropTypes.func.isRequired,
};

export default FriendCard;
