import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function AdventureListScreen() {
  return (
    <View style={styles.container}>
      <Text> AdventureList </Text>
    </View>
  );
}

export default AdventureListScreen;
