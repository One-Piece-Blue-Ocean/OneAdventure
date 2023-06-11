import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: 'white',
    zIndex: 10,
  },
});

function AdventureListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Foundation
        name="map"
        size={24}
        color="black"
        onPress={() => {
          navigation.navigate('AdventureMap');
        }}
      />
    </View>
  );
}

AdventureListScreen.propTypes = {
  navigation: PropTypes.func.isRequired,
};

export default AdventureListScreen;
