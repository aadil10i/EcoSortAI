import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import decodePolyline from '~/lib/decode';

const USER_REGION = {
  latitude: 25.138861,
  longitude: 55.196671,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function RouteTab() {
  const [routePolyline, setRoutePolyline] = useState('');

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const fetchRoutesResponse = await axios.get(
          `https://api.optimoroute.com/v1/get_routes?key=5a5b51daac4d57be23754adca44c763aljVXQ5k1x6M&date=2024-04-20&includeRoutePolyline=true`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (fetchRoutesResponse.status === 200 && fetchRoutesResponse.data.routes) {
          const polyline = fetchRoutesResponse.data.routes[0].routePolyline;
          setRoutePolyline(polyline);
        } else {
          console.error('Error fetching routes:', fetchRoutesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <View className="flex-1">
      <MapView style={styles.map} initialRegion={USER_REGION}>
        {routePolyline ? (
          <Polyline
            coordinates={decodePolyline(routePolyline)}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={['#7F0000']}
            strokeWidth={6}
          />
        ) : null}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
