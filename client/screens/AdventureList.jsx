import React, { useContext, useEffect } from 'react';
import {
  StyleSheet, Text, SafeAreaView, ScrollView,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { collection, getDocs } from '../firebase/utils';
import { db } from '../../database/db';
import Card from '../components/card';

import { EventContext, UserContext } from '../context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
});

function AdventureListScreen({ navigation }) {
  const { events } = useContext(EventContext);
  const value = useContext(UserContext);
  const { user } = value;
  const { uid, zipcode } = user.user;

  useEffect(() => {
    console.log('events--', events);
    console.log('user--', uid, zipcode);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Foundation
          style={styles.map}
          name="map"
          size={48}
          color="black"
          onPress={() => {
            navigation.navigate('AdventureMap');
          }}
        />
        <Text style={styles.title}> Adventures </Text>
        {/* <>
          {events.map((event) => (
            <TouchableOpacity>
            </TouchableOpacity>
          ))}
        </> */}
      </ScrollView>
    </SafeAreaView>
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
