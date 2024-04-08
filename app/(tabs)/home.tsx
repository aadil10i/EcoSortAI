import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useBinStatus } from '~/components/BinStatus';
import { H1, Lead } from '~/components/typography';

export default function HomeScreen() {
  const binStatus = useBinStatus();

  return (
    <View className="flex-1 items-center justify-center">
      <View className="relative">
        <Svg width={300} height={300} viewBox="0 0 36 36">
          <Path
            d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#D1D5DB"
            strokeDasharray="100, 100"
            strokeWidth="1"
          />
          <Path
            d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#4ADE80"
            strokeDasharray={binStatus ? '100, 100' : '70, 100'}
            strokeLinecap="round"
            strokeWidth="1"
          />
        </Svg>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <H1 className="text-green-500 text-5xl">
            {binStatus === null
              ? 'Checking bin status...'
              : binStatus
                ? 'Bin full'
                : 'Bin not full'}
          </H1>
          <Lead className="text-gray-400">
            {binStatus === null ? 'checking bin status....' : binStatus ? '100% Full' : '70% Full'}
          </Lead>
        </View>
      </View>
    </View>
  );
}
