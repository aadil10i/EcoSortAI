import { View, Alert as RNAlert } from 'react-native';

import { Alert, AlertDescription, AlertTitle } from '~/components/Alert';
import { Button } from '~/components/Button';
import { Text } from '~/components/typography';

export default function AlertTab() {
  const HandleYesPress = () => {
    RNAlert.alert('Yes, pressed button');
  };

  const HandleNoPress = () => {
    RNAlert.alert('No, pressed button');
  };
  return (
    <View className="flex-1 justify-center p-6 items-center gap-6 bg-green-500">
      <Alert icon="AlertOctagon" className="max-w-xl bg-white">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Your bin is full, would you like to schedule a pickup order?
        </AlertDescription>
        <View className="pt-4">
          <Button variant="outline" size="sm" className="bg-green-500" onPress={HandleYesPress}>
            <Text>Yes</Text>
          </Button>
          <View className="pt-3">
            <Button variant="outline" onPress={HandleNoPress} size="sm">
              <Text>No</Text>
            </Button>
          </View>
        </View>
      </Alert>
    </View>
  );
}
