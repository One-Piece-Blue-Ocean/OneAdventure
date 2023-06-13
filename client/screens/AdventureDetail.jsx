import React,
{
  // useContext,
  // useState,
  // useEffect,
} from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView, FlatList, SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

// import { setDoc, doc } from 'firebase/firestore';
// import { app, db } from '../../database/db';

const imageTestUrl = 'https://images.unsplash.com/photo-1682686580950-960d1d513532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%',
    marginTop: StatusBar.currentHeight || 0,
  },
  heading: {
    alignItems: 'center',
    flex: 2,
    height: '70%',
  },
  friends: {
    // position: 'absolute',
    // bottom: 50,
  },
  detailImage: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
    margin: 5,
    // backgroundColor: 'grey',
  },
  friendImage: {
    width: '10%',
    height: '10%',
    resizeMode: 'cover',
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
  const friends = [
    { name: 'bill', imageUrl: imageTestUrl },
    { name: 'bob', imageUrl: imageTestUrl },
    { name: 'bobb', imageUrl: imageTestUrl },
    { name: 'bobbb', imageUrl: imageTestUrl },
    { name: 'bobbbbb', imageUrl: imageTestUrl },
    { name: 'bobbbbbb', imageUrl: imageTestUrl },
    { name: 'bobbbbbbz', imageUrl: imageTestUrl },
    { name: 'bobbbbbba', imageUrl: imageTestUrl },
  ];

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
        <ScrollView>
          <Text style={{ padding: 10 }}>
            {event.description}
          </Text>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        {friends.length ? (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 10 }}>
              Friends signed up for the event
            </Text>
            <SafeAreaView style={{
              flex: 1,
            }}
            >
              <FlatList
                data={friends}
                renderItem={({ item: friend }) => (
                  <View style={{ flex: 1 }}>
                    {friend.imageUrl ? (
                      <Image
                        source={{
                          uri: friend.imageUrl,
                        }}
                        style={styles.friendImage}
                      />
                    ) : null}
                    <Text>
                      what
                      {friend.name}
                    </Text>
                  </View>
                )}
                keyExtractor={(friend) => friend.name}
                ListFooterComponent={<View style={{ height: 20 }} />}
              >
                {/* {friends.map((friend) => (
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
                ))} */}
              </FlatList>
            </SafeAreaView>
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
