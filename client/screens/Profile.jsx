import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import myTheme from './Themes';
import FriendCard from '../components/FriendCard';

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  details: {
    backgroundColor: myTheme.colors.border,
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsHeaderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsHeaderText: {
    fontSize: 24,
  },
  friendsListContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: myTheme.colors.border,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  profileHeader: {
    flexDirection: 'row',
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 10,
  },
  userNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  userNameText: {
    fontSize: 25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  shadowProps: {
    shadowOffset: { width: -2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  text: {
    fontSize: 12,
  },
  textWrap: {
    backgroundColor: 'white',
    width: '90%',
    padding: 2,
    margin: 5,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

function ProfileScreen() {
  const [data, setData] = useState(DATA);
  const [userName, setUserName] = useState('Buckey');
  const [location, setLocation] = useState('lat, lon?');
  const [searchRadius, setSearchRadius] = useState(50);
  const [typePreference, setTypePreference] = useState('hiking');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
              height: 100,
              width: 100,
            }}
          />
        </View>
        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.textWrap}>
          <View style={styles.option}>
            <Text style={styles.text}>Email:</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.text}>buckey@mail.com</Text>
            <AntDesign name="edit" size={20} color="black" />
          </View>
        </View>
        <View style={styles.textWrap}>
          <View style={styles.option}>
            <Text style={styles.text}>Default Type:</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.text}>{typePreference}</Text>
            <AntDesign name="edit" size={20} color="black" />
          </View>
        </View>
        <View style={styles.textWrap}>
          <View style={styles.option}>
            <Text style={styles.text}>Defualt Location:</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.text}>{location}</Text>
            <AntDesign name="edit" size={20} color="black" />
          </View>
        </View>
        <View style={styles.textWrap}>
          <View style={styles.option}>
            <Text style={styles.text}>Default Search Radius:</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.text}>{searchRadius}</Text>
            <AntDesign
              name="edit"
              size={20}
              color="black"
              onPress={() => {

              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.friendsHeaderContainer}>
        <Text style={styles.friendsHeaderText}>Friends List</Text>
      </View>
      <View style={styles.friendsListContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <FriendCard friend={item} />}
          keyExtractor={(friend) => friend.id}
        />
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
