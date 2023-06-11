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
import myTheme from './Themes';

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
    flexDirection: 'row',
    backgroundColor: myTheme.colors.border,
  },
  friendsHeader: {
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
  friendCardContainer: {
    width: 350,
    height: 100,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  profileImageContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
  },
  profileImage: {
    flex: 1,
    marginLeft: 10,
  },
  userNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  profileOptions: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProps: {
    shadowOffset: { width: -2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  text: {

  },
  textWrap: {
    backgroundColor: 'white',
    padding: 10,
    margin: 3,
    borderRadius: 3,
    overflow: 'hidden',
  },

});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    profilePic: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
  },
];

function FriendCard({ friend }) {
  console.log('this is friend', friend.name);
  return (
    <View style={styles.friendCardContainer}>
      <View>
        <Text style={styles.text}>{friend.name}</Text>
      </View>
      <View>
        <Text style={styles.text}>{friend.id}</Text>
      </View>
    </View>
  );
}

function ProfileScreen() {
  const [userName, setUserName] = useState('@Buckey');
  const [location, setLocation] = useState('lat, lon?');
  const [searchRadius, setSearchRadius] = useState(50);
  const [typePreference, setTypePreference] = useState('hiking');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          styles={styles.profileImage}
          source={{
            uri: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
            height: 100,
            width: 100,
          }}
        />
        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.profileOptions}>
          <View style={styles.textWrap}>
            <Text style={styles.text}>{location}</Text>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.text}>{searchRadius}</Text>
          </View>
        </View>
        <View style={styles.profileOptions}>
          <View style={styles.textWrap}>
            <Text style={styles.text}>email</Text>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.text}>{typePreference}</Text>
          </View>
        </View>
      </View>
      <View style={styles.friendsHeader}>
        <Text style={styles.friendsHeaderText}>Friends List</Text>
      </View>
      <View style={styles.friendsListContainer}>
        <FlatList
          data={DATA}
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
