import React from 'react';
import { View } from 'react-native';

import { useBinStatus } from '~/components/BinStatus';
import { H1, Lead } from '~/components/typography';

export default function HomeScreen() {
  const binStatus = useBinStatus();

  return (
    <View className="flex-1 justify-center items-center">
      <H1 className="text-green-500 text-5xl">
        {binStatus === null ? 'Checking bin status...' : binStatus ? 'Bin full' : 'Bin not full'}
      </H1>
      <Lead className="text-gray-400">
        {binStatus === null ? 'checking bin status....' : binStatus ? '100% Full' : '70% Full'}
      </Lead>
    </View>
  );
}
