import axios from 'axios';
import { AlertTriangle } from 'lucide-react-native';
import { View, Alert as RNAlert } from 'react-native';

import { Alert, AlertDescription, AlertTitle } from '~/components/Alert';
import { useBinStatus } from '~/components/BinStatus';
import { Button } from '~/components/Button';
import { P } from '~/components/typography';

export const orderNo = 'ORD001';
export const type = 'P';
export const date = '2024-04-20';
export const address = 'Mall of The Emirates';

export default function AlertTab() {
  const binFull = useBinStatus();

  const handleYesPress = async () => {
    try {
      const createOrderResponse = await axios.post(
        'https://api.optimoroute.com/v1/create_order?key=5a5b51daac4d57be23754adca44c763aljVXQ5k1x6M',
        {
          operation: 'CREATE',
          orderNo,
          type,
          date,
          location: {
            address,
            acceptPartialMatch: true,
          },
          duration: 20,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (createOrderResponse.status === 200) {
        console.log('Order created:', createOrderResponse.data);

        //Start Planning Routes
        const startPlanningResponse = await axios.post(
          'https://api.optimoroute.com/v1/start_planning?key=5a5b51daac4d57be23754adca44c763aljVXQ5k1x6M',
          {
            date,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (startPlanningResponse.status === 200) {
          console.log('Planning started:', startPlanningResponse.data);
          RNAlert.alert('Your order has been created and planning started');
        } else {
          console.error('Error starting planning:', startPlanningResponse.data);
        }
      } else {
        console.error('Error creating order:', createOrderResponse.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleNoPress = () => {
    RNAlert.alert('Order will not be created');
  };

  return (
    <View className="flex-1 p-6 gap-6 bg-green-500">
      {binFull && (
        <Alert
          icon={AlertTriangle}
          iconSize={20}
          iconClassName="px-8"
          variant="destructive"
          className="bg-white">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Your bin is full, would you like to schedule a pickup order?
          </AlertDescription>
          <View className="pt-4">
            <Button variant="outline" size="sm" className="bg-green-500" onPress={handleYesPress}>
              <P>Yes</P>
            </Button>
            <View className="pt-3">
              <Button variant="outline" onPress={handleNoPress} size="sm">
                <P>No</P>
              </Button>
            </View>
          </View>
        </Alert>
      )}
    </View>
  );
}
