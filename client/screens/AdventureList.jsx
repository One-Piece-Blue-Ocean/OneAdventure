import React, { useContext } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { UserContext } from '../context';

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
  const { user, updateUserContext } = useContext(UserContext);
  // const [category, setCategory] = useState('');

  // console.log('USER: ', user);
  // console.log('update context: ', updateUserContext);
  // updateUserContext('category', 'Hiking');
  // console.log('context after update', user);
  // const handleUpdateClick = (key, value) => {
  //   updateUserContext(key, value);
  // };

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
        onPress={() => updateUserContext('radius', '20')}
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
