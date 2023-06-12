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

function AdventureDetail() {
  return (
    <View style={styles.container}>
      <Text> Adventure Detail </Text>
      <Text> Photo </Text>
      <Text> Title </Text>
      <Text> Location </Text>
      <Text> Full Description </Text>
      <Text> The Description </Text>
    </View>
  );
}

export default AdventureDetail;
