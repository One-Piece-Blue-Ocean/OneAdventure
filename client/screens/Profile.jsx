import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  StatusBar,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import {
  updateDoc,
  collection,
  doc,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../database/db';
import { UserContext } from '../context';
import FriendCard from '../components/FriendCard';
import FriendSearchModal from '../components/FriendSearchModal';
import { muted } from './Themes';

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  details: {
    backgroundColor: muted.blue,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
  },
  editDropDown: {
    backgroundColor: muted.blue,
    borderRadius: 8,
  },
  editDropDownWrap: {
    height: 300,
    alignItems: 'center',
  },
  editDropDownBtn: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    margin: 20,
    marginBottom: 0,
    width: 200,
    alignItems: 'center',
  },
  friendsHeaderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    position: 'relative',
  },
  friendsHeaderText: {
    fontSize: 24,
  },
  friendsListContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: muted.blue,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: muted.red,
    margin: 20,

  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTextWrap: {
    padding: 8,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    position: 'relative',
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 10,
    backgroundColor: 'white',
    position: 'relative',
  },
  uploadPhotoBtn: {
    position: 'absolute',
    bottom: 5,
    left: 4,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  userNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  userNameText: {
    fontSize: 25,
  },
  text: {
    fontSize: 18,
    marginRight: 6,
  },
  textWrap: {
    backgroundColor: 'white',
    width: '90%',
    padding: 2,
    borderRadius: 4,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  optionEdit: {
    flex: 0.10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 3,
  },
  optionTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  searchIcon: {
    position: 'absolute',
    marginRight: 30,
    right: 0,
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
  signOutBtn: {
    backgroundColor: muted.red,
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  signOutText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

function ProfileScreen() {
  const [friendData, setFriendData] = useState([]);
  const [friendSearchModal, setFriendSearchModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png');
  const [location, setLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(0);
  const [typePreference, setTypePreference] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(0);
  const [input, setInput] = useState({ email: '', zip: '' });
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [image, setImage] = useState(null);

  const pirateCollection = collection(db, 'pirates');
  const value = useContext(UserContext);
  const { user, updateUserContext } = value;
  console.log('---->', value, '\n\nscreen rerender ^^^');

  const types = ['Sailing', 'Hiking', 'Biking', 'Climbing', 'Surfing', 'Kayaking', 'Rafting', 'Skiing', 'Camping'];
  const radius = [10, 25, 50, 100, 200];

  // eslint-disable-next-line arrow-body-style
  const getFriends = () => {
    // console.log('user id', userId);
    return getDocs(collection(db, 'pirates', userId, 'friends'))
      .then((friendsDocs) => {
        const promiseArr = friendsDocs.docs.map((singleFriendsDoc) => {
          const currentFriend = singleFriendsDoc.data().friendId;
          return getDoc(doc(db, 'pirates', currentFriend))
            .then((friendDoc) => friendDoc.data());
        });
        return Promise.all(promiseArr).then((friendDocs) => {
          setFriendData(friendDocs);
          return friendDocs;
        });
      });
  };

  const infoSet = () => {
    if (value !== undefined) {
      setUserId(user.user.uid);
      setEmail(user.user.email);
      setLocation(user.user.zipcode);
      setUserName(user.user.fullName);
      setProfilePic(user.user.profilePhoto);
      setSearchRadius(user.user.radius || 10);
      setTypePreference(user.user.category || 'Sailing');
    }
  };

  const updateProfile = (update) => {
    if (editMode === 2) {
      updateDoc(doc(pirateCollection, userId), { category: update })
        .then(() => {
          updateUserContext('category', update);
          // setTypePreference(update);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('profile update err', err.message);
        });
    } else if (editMode === 3) {
      const updatedLocation = input.zip;
      updateDoc(doc(pirateCollection, userId), { zipcode: updatedLocation })
        .then(() => {
          updateUserContext('zipcode', updatedLocation);
          // setLocation(updatedLocation);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('profile update err', err.message);
        });
      setInput({ email: '', zip: '' });
    } else if (editMode === 4) {
      const newRadius = update;
      updateDoc(doc(pirateCollection, userId), { radius: newRadius })
        .then(() => {
          updateUserContext('radius', newRadius);
          // setSearchRadius(newRadius);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('profile update err', err.message);
        });
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveNewPhotoToDb = () => {
    const imageFileName = `${userId}-${Math.random() * 10000000000}`;
    const fileRef = ref(getStorage(), `profilePhotos/${imageFileName}`);
    // eslint-disable-next-line
    const blobify = () => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          // console.log('WE RESOLVED!');
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          // eslint-disable-next-line no-console
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });
    };
    blobify()
      .then((blob) => {
        // console.log('hi our blob is ', blob);
        uploadBytes(fileRef, blob)
          .then(() => {
            blob.close();
            getDownloadURL(fileRef)
              .then((url) => {
                updateDoc(doc(pirateCollection, userId), { profilePhoto: url })
                  .then(() => {
                    updateUserContext('profilePhoto', url);
                    // user.user.profilePhoto = url;
                    // infoSet();
                  })
                  .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log('profile update err', err.message);
                  });
              });
          });
      });
  };

  const signOut = () => {
    console.log('sign out');
  };

  useEffect(() => {
    // set user info
    infoSet();
    if (userId) {
      if (friendData.length === 0) {
        // console.log('\n\n---->a', friendData, 'and this is value\n\n', value);
        // console.log('grabbing friends');
        getFriends();
      }
    }
  }, [userId]);

  useEffect(() => {
    infoSet();
  }, [user.user.category, user.user.zipcode, user.user.radius, user.user.profilePhoto]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: profilePic,
              height: 100,
              width: 100,
            }}
            testID="profile.pic"
          />
        </View>
        <View style={styles.uploadPhotoBtn}>
          <AntDesign
            testID="profile.editPhoto"
            name="edit"
            size={28}
            color="black"
            onPress={() => {
              // open edit photo modal
              setUploadPhoto(true);
            }}
          />
        </View>
        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText} testID="profile.userName">{userName}</Text>
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={signOut}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={uploadPhoto}
      >
        <View style={styles.centerModal}>
          <View style={[styles.modalContainer, styles.shadow]}>

            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.shadow]}
                onPress={pickImage}
              >
                <Text>Choose Photo</Text>
              </TouchableOpacity>
            </View>

            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, margin: 5 }}
              />
            )}

            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.shadow]}
                onPress={() => {
                  saveNewPhotoToDb();
                  setUploadPhoto(false);
                }}
              >
                <Text>Upload</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.shadow]}
                onPress={() => setUploadPhoto(false)}
              >
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.details}>
        <View style={styles.textWrap}>
          <View style={styles.optionTitle}>
            <Text style={styles.text}>Email:</Text>
            <Text style={styles.text}>{email}</Text>
          </View>
        </View>

        <View style={styles.textWrap}>
          <View style={styles.optionTitle}>
            <Text style={styles.text}>Favorite Type:</Text>
            <Text style={styles.text}>{typePreference}</Text>
          </View>
          <View style={styles.optionEdit}>
            <AntDesign
              testID="profile.editType"
              name="edit"
              size={20}
              color="black"
              onPress={() => {
                setEditMode(2);
                setModalVisible(true);
              }}
            />
          </View>
        </View>

        <View style={styles.textWrap}>
          <View style={styles.optionTitle}>
            <Text style={styles.text}>Location:</Text>
            <Text style={styles.text}>{location}</Text>
          </View>
          <View style={styles.optionEdit}>
            <AntDesign
              testID="profile.editZip"
              name="edit"
              size={20}
              color="black"
              onPress={() => {
                setEditMode(3);
                setModalVisible(true);
              }}
            />
          </View>
        </View>

        <View style={styles.textWrap}>
          <View style={styles.optionTitle}>
            <Text style={styles.text}>Search Radius:</Text>
            <Text style={styles.text}>{searchRadius}</Text>
          </View>
          <View style={styles.optionEdit}>
            <AntDesign
              testID="profile.editRadius"
              name="edit"
              size={20}
              color="black"
              onPress={() => {
                setEditMode(4);
                setModalVisible(true);
              }}
            />
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
      >
        <View style={styles.centerModal}>
          <View style={[styles.modalContainer, styles.shadow]}>
            {
              editMode === 2
                ? (
                  <View style={styles.editDropDownWrap}>
                    <View style={styles.modalTextWrap}>
                      <Text>Update Type</Text>
                    </View>
                    <ScrollView style={styles.editDropDown}>
                      {types.map((activity) => (
                        <TouchableOpacity
                          key={activity}
                          testID={`profile.${activity}`}
                          style={[styles.editDropDownBtn, styles.shadow]}
                          onPress={() => {
                            updateProfile(activity);
                            setModalVisible(false);
                          }}
                        >
                          <Text>{activity}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                ) : null
            }
            {
              editMode === 3
                ? (
                  <View>
                    <View style={styles.modalTextWrap}>
                      <Text>Update Zip</Text>
                    </View>
                    <TextInput
                      placeholder="zip"
                      value={input.zip.toString()}
                      style={styles.input}
                      onChangeText={(text) => {
                        setInput({ email: '', zip: text });
                      }}
                    />
                  </View>
                ) : null
            }
            {
              editMode === 4
                ? (
                  <View style={styles.editDropDownWrap}>
                    <View style={styles.modalTextWrap}>
                      <Text>Update Radius</Text>
                    </View>
                    <ScrollView style={styles.editDropDown}>
                      {radius.map((miles) => (
                        <TouchableOpacity
                          key={miles}
                          testID={`profile.${miles}`}
                          style={[styles.editDropDownBtn, styles.shadow]}
                          onPress={() => {
                            updateProfile(miles);
                            setModalVisible(false);
                          }}
                        >
                          <Text>{miles}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                ) : null
            }
            <View style={styles.modalBtnContainer}>
              {editMode !== 2 && editMode !== 4
                ? (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      updateProfile(input);
                      setModalVisible(false);
                    }}
                  >
                    <Text>Submit</Text>
                  </TouchableOpacity>
                ) : null}
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

      <FriendSearchModal
        friendSearchModal={friendSearchModal}
        setFriendSearchModal={setFriendSearchModal}
        userId={userId}
        getFriends={getFriends}
        friendData={friendData}
      />

      <View style={styles.friendsHeaderContainer}>
        <Text style={styles.friendsHeaderText}>Friends List</Text>
        <AntDesign
          name="search1"
          size={24}
          color="black"
          style={styles.searchIcon}
          onPress={() => {
            setFriendSearchModal(true);
          }}
        />
      </View>
      <View style={styles.friendsListContainer} testID="profile.friendsList">
        <ScrollView style={styles.editDropDown}>
          {friendData.map((friend, index) => (
            <View key={friend.uid} testID={`profile.friend.${index}`}>
              <FriendCard
                friend={friend}
                index={index}
                userId={userId}
                getFriends={getFriends}
                friendData={friendData}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

ProfileScreen.propTypes = {
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

export default ProfileScreen;
