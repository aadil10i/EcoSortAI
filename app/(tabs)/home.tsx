import React from 'react';
import { View, Text } from 'react-native';

import { useBinStatus } from '~/components/BinStatus';

export default function HomeScreen() {
  const binStatus = useBinStatus();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>
        {binStatus === null ? 'Checking bin status...' : binStatus ? 'Bin full' : 'Bin not full'}
      </Text>
    </View>
  );
}
