import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import PropTypes from 'prop-types';
// import { collection, getDocs, db } from '../firebase/utils';
// import UserContext from '../context';
// import Card from '../components/card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: 30,
    marginTop: 100,
  },
  button: {
    backgroundColor: '#1c8fd2',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function AdventureListScreen({ navigation }) {
  // const { user, updateUserContext } = useContext(UserContext);
  // console.log('context after update', user);

  // // import card component
  // useEffect(() => {
  //   getDocs(collection(db, 'adventures'))
  //     .then((adventures) => {
  //       adventures.forEach((adventure) => {
  //         console.log(adventure.id, ' => ', adventure.data());
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('Error retrieving adventures from db', error.code, error.message);
  //     });
  // });
  // get all events from database within radius (get radius from user context)
  // dynamically render card components using event information
  // display the card components in a scrollable list

  return (
    <View style={styles.container}>
      <Foundation
        name="map"
        size={48}
        color="black"
        onPress={() => {
          navigation.navigate('AdventureMap');
        }}
      />
      <TouchableOpacity
        style={styles.button}
        // onPress={() => updateUserContext('radius', '20')}
      >
        <Text style={styles.buttonTitle}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

AdventureListScreen.propTypes = {
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

export default AdventureListScreen;
