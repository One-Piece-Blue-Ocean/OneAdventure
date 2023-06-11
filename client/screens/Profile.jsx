import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  details: {
    flexDirection: 'row',
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
    top: 0,
    left: 0,
  },
  userNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileOptions: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 10,
  },
});

function ProfileScreen() {
  const [userName, setUserName] = useState('@Buckey');
  const [location, setLocation] = useState('lat, lon?');
  const [searchRadius, setSearchRadius] = useState(50);
  const [typePreference, setTypePreference] = useState('hiking');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
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
          <Text>{userName}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.profileOptions}>
          <Text style={styles.text}>{location}</Text>
          <Text style={styles.text}>{searchRadius}</Text>
        </View>
        <View style={styles.profileOptions}>
          <Text style={styles.text}>email</Text>
          <Text style={styles.text}>{typePreference}</Text>
        </View>
      </View>
      <View>
        <Text>Friends List</Text>
      </View>
      <View style={styles.friendsListContainer}>

      </View>
    </View>
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
