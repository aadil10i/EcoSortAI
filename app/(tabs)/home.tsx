import { Text, View } from 'react-native';

import BinStatus from '~/components/BinStatus';
import { Button } from '~/components/Button';

export default function HomeTab() {
  return (
    <View className={styles.container}>
      <BinStatus />
      <View className={styles.separator} />
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
