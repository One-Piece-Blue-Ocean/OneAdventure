import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
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

// Still need to place icon on top of everything else
function AdventureMapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon.Button
        name="list-bullet"
        color="black"
        size="32"
        style={styles.icon}
        title="AdventureList"
        onPress={() => {
          navigation.navigate('AdventureList');
        }}
      />
    </View>
  );
}

AdventureMapScreen.propTypes = {
  navigation: PropTypes.func.isRequired,
};

export default AdventureMapScreen;
