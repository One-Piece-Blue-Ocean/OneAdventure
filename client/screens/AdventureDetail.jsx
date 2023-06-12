import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { setDoc, doc } from 'firebase/firestore';
import { app, db } from '../../database/db';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    alignItems: 'center',
  },
  friends: {
    // position: 'absolute',
    // bottom: 50,
  },
  detailImage: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain',
    margin: 5,
    // backgroundColor: 'grey',
  },
  friendImage: {
    width: '10%',
    height: '10%',
    resizeMode: 'contain',
    margin: 5,
    // backgroundColor: 'grey',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});

function AdventureDetail({ navigation, route }) {
  const { event } = route.params;
  // const friends = event.friend ? event.friend : [];
  const friends = [{ name: 'bill' }, { name: 'bob' }];

  // console.log('Hmm?', friends.length);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: event.imageUrl,
        }}
        style={styles.detailImage}
      />
      <View style={styles.heading}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
          {event.name}
        </Text>
        <Text style={{ fontSize: 12, padding: 10 }}>
          {event.location}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10 }}> Full Description </Text>
        <Text style={{ padding: 10 }}>
          {event.description}
        </Text>
      </View>
      <View>
        {friends.length ? (
          <View>
            <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 10 }}>
              Friends signed up for the event
            </Text>
            {friends.map((friend) => (
              <View key={friend.name}>
                {friend.imageUrl ? (
                  <Image
                    source={{
                      uri: friend.imageUrl,
                    }}
                    style={styles.friendImage}
                  />
                ) : null}
                <Text>{friend.name}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
      <View style={styles.icon}>
        <Ionicons
          name="close-sharp"
          size={48}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

AdventureDetail.propTypes = {
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
  route: PropTypes.shape({
    params: PropTypes.shape({
      event: PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        star: PropTypes.bool.isRequired,
        // TODO: Update once we figure out friends object
        friend: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
          }),
        ),
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,

};

export default AdventureDetail;
