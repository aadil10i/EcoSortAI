import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const USER_REGION = {
  latitude: 25.138861,
  longitude: 55.196671,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function RouteTab() {
  return (
    <View className="flex-1">
      <MapView
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        initialRegion={USER_REGION}
        // provider={PROVIDER_GOOGLE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
