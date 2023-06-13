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
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  friendImage: {
    // width: '10%',
    // height: '10%',
    resizeMode: 'cover',
    margin: 5,
  },
  friendContainer: {
    display: 'flex',
    flex: 'flex-row',
  },
  detailImage: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
    margin: 5,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  default: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  location: {
    fontSize: 12,
    padding: 10,
  },
  description: {
    padding: 10,
  },
});

function AdventureDetail({ navigation, route }) {
  const { event } = route.params;
  // const friends = event.friend ? event.friend : [];
  // temp friend data
  const friends = [
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

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: event.imageUrl,
        }}
        style={styles.detailImage}
      />
      <View style={styles.heading}>
        <Text style={styles.name}>
          {event.name}
        </Text>
        <Text style={styles.location}>
          {event.location}
        </Text>
        <ScrollView>
          <Text style={styles.description}>
            {event.description}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.default}>
        {friends.length ? (
          <View style={styles.default}>
            <Text style={styles.friends}>
              Friends signed up for the event
            </Text>
            <FlatList
              data={friends}
              renderItem={({ item: friend }) => (
                <View style={styles.friendContainer}>
                  {friend.profilePic ? (
                    <Image
                      source={{
                        uri: friend.profilePic,
                        height: 100,
                        width: 100,
                      }}
                      testID="profile.pic"
                      style={styles.friendImage}
                    />
                  ) : null}
                  <Text>
                    {friend.userName}
                  </Text>
                </View>
              )}
              keyExtractor={(friend) => friend.id}
            />
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
