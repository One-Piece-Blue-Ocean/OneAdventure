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
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: 30,
    marginTop: 100,
  },
});

function AdventureListScreen({ navigation }) {
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
