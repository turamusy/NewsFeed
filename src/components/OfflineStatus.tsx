import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import R from '../resources/R';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.aquamarineBlue,
  },
  text: {
    color: R.colors.white,
    fontSize: 30,
    lineHeight: 34,
    marginBottom: 20,
  },
});

export const OfflineStatus: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{R.string.error.noСonnection}</Text>
      <ActivityIndicator color={R.colors.white} size={'large'} />
    </View>
  );
};
