import React, { useState, useEffect } from 'react';
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
// import myTheme from './Themes';
import FriendCard from '../components/FriendCard';

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
    backgroundColor: 'gray',
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
  },
  editDropDown: {
    backgroundColor: 'gray',
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
    backgroundColor: 'white',
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
  input: {
    height: 40,
    width: 250,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  modalBtnContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: 'lightgray',
    margin: 20,
    marginBottom: 0,
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTextWrap: {
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 10,
    backgroundColor: 'white',
  },
  userNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
  },
});

// temp friend data
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    userName: 'Dave',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    userName: 'Steve',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    userName: 'Jim',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bz',
    userName: 'Sara',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6z',
    userName: 'Billy',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7z',
    userName: 'Chris',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
];

const tempUser = {
  id: '58694a0f-3da1-471f-bd96-145571e29zzz',
  name: 'Buckey',
  email: 'buckey@mail.com',
  profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  zip: 98765,
  radius: 50,
  type: 'Hiking',
  friends: DATA,
};

function ProfileScreen() {
  const [friendData, setFriendData] = useState([]);
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

  const types = ['Sailing', 'Hiking', 'Biking', 'Climbing', 'Surfing', 'Kayaking', 'Rafting', 'Skiing', 'Camping'];
  const radius = [10, 25, 50, 100, 200];

  // eslint-disable-next-line no-unused-vars
  const infoSet = () => {
    // Todo: get user info from db or useContext, then set
    // using tempUser until I figure out the db
    setUserId(tempUser.id);
    setUserName(tempUser.name);
    setEmail(tempUser.email);
    setProfilePic(tempUser.profilePhoto);
    setLocation(tempUser.zip);
    setSearchRadius(tempUser.radius);
    setTypePreference(tempUser.type);
    setFriendData(tempUser.friends);
  };

  const updateProfile = (update) => {
    // Todo: replace console logs with four put requests to db
    if (editMode === 1) {
      console.log('udpate email, id:', userId, update.email);
      setInput({ email: '', zip: '' });
    } else if (editMode === 2) {
      console.log('udpate type, id:', userId, update);
    } else if (editMode === 3) {
      console.log('udpate location, id:', userId, update.zip);
      setInput({ email: '', zip: '' });
    } else if (editMode === 4) {
      console.log('udpate radius, id:', userId, update);
    }
    infoSet();
  };

  useEffect(() => {
    // set user info
    infoSet();
  }, []);

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
        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText} testID="profile.userName">{userName}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.textWrap}>
          <View style={styles.optionTitle}>
            <Text style={styles.text}>Email:</Text>
            <Text style={styles.text}>{email}</Text>
          </View>
          <View style={styles.optionEdit}>
            <AntDesign
              testID="profile.editEmail"
              name="edit"
              size={20}
              color="black"
              onPress={() => {
                setEditMode(1);
                setModalVisible(true);
              }}
            />
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
              editMode === 1
                ? (
                  <View>
                    <View style={styles.modalTextWrap}>
                      <Text>Update Email</Text>
                    </View>
                    <TextInput
                      placeholder="email"
                      value={input.email}
                      style={styles.input}
                      onChangeText={(text) => {
                        setInput({ email: text, zip: 0 });
                      }}
                    />
                  </View>
                ) : null
            }
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

      <View style={styles.friendsHeaderContainer}>
        <Text style={styles.friendsHeaderText}>Friends List</Text>
      </View>
      <View style={styles.friendsListContainer} testID="profile.friendsList">
        <ScrollView style={styles.editDropDown}>
          {friendData.map((friend, index) => (
            <View key={friend.id} testID={`profile.friend.${index}`}>
              <FriendCard friend={friend} index={index} />
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
