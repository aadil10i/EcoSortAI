import { Text, View } from 'react-native';

import BinStatus from '~/components/BinStatus';
import { Button } from '~/components/Button';

export default function HomeTab() {
  return (
    <View className="flex items-center justify-center">
      <View className="ring ring-green-500">
        <BinStatus />
      </View>
      <View className={styles.separator} />
    </View>
  );
}

const styles = {
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
};
