import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

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
  image: {
    width: '100%',
    height: '35%',
    resizeMode: 'contain',
    margin: 5,
    backgroundColor: 'grey',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});

function AdventureDetail({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: route.params.event.imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.heading}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
          {route.params.event.name}
        </Text>
        <Text style={{ fontSize: 12, padding: 10 }}>
          {route.params.event.location}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10 }}> Full Description </Text>
        <Text style={{ padding: 10 }}>
          {route.params.event.description}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 10 }}>
          Friends signed up for the event
        </Text>
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
};

export default AdventureDetail;
