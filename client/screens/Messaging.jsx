import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function MessaginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> Messaging </Text>
      <Button
        title="Nav"
        onPress={() => {
          navigation.navigate('AdventureList');
        }}
      />
    </View>
  );
}

MessaginScreen.propTypes = {
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

export default MessaginScreen;
