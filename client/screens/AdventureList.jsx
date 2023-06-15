import React, { useContext } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import PropTypes from 'prop-types';
// import { collection, addDoc } from '../firebase/utils';
// import { db } from '../../database/db';
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

  const toggleField = () => {

  };
  console.log('outisde ue', events);
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
      </View>
      <ScrollView>
        {events.map((event) => {
          console.log('This Event', event);
          return (
            <TouchableOpacity>
              <Card
                event={{
                  address: event.address[0],
                  date: event.date.start_date,
                  description: event.description,
                  imageUrl: event.image,
                  title: event.title,
                }}
                userEvent={{
                  interested: false,
                  attending: false,
                }}
                userEventId=""
                loaded
                toggleField={toggleField}
              />
            </TouchableOpacity>
          );
        })}
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
