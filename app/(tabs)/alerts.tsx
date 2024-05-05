import axios from 'axios';
import { AlertTriangle } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Alert as RNAlert } from 'react-native';

import { Alert, AlertDescription, AlertTitle } from '~/components/Alert';
import { useBinStatus } from '~/components/BinStatus';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Large, Lead } from '~/components/typography';

export const orderNo = 'ORD001';
export const type = 'P';
// export const date = '2024-04-20';
// export const address = 'Mall of The Emirates';

export default function AlertTab() {
  const binFull = useBinStatus();
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const handleYesPress = async () => {
    try {
      const createOrderResponse = await axios.post(
        'https://api.optimoroute.com/v1/create_order?key=d162e758af77ecaa0e316d0496872fb7c4SNBehUzU',
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
        // RNAlert.alert('Your order has been created');
        console.log('Order created:', createOrderResponse.data);

        //Start Planning Routes
        const startPlanningResponse = await axios.post(
          'https://api.optimoroute.com/v1/start_planning?key=d162e758af77ecaa0e316d0496872fb7c4SNBehUzU',
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
    <View className="flex-1 p-4 gap-6 pt-28 bg-green-400">
      {binFull && (
        <Alert icon={AlertTriangle} iconSize={24} variant="destructive" className="bg-white">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            <Lead className="text-lg">
              Your bin is full, would you like to schedule a pickup order?
            </Lead>
          </AlertDescription>
          <View className="pt-4 flex-col ">
            <View className="pb-2">
              <Input placeholder="Please Enter Address" value={address} onChangeText={setAddress} />
            </View>
            <Input placeholder="Please Enter Date YYYY-MM-DD" value={date} onChangeText={setDate} />
          </View>
          <View className="pt-8">
            <Button variant="outline" size="sm" className="bg-green-500" onPress={handleYesPress}>
              <Large className="text-white">Yes</Large>
            </Button>
            <View className="pt-3">
              <Button onPress={handleNoPress} size="sm">
                <Large className="text-green-500">No</Large>
              </Button>
            </View>
          </View>
        </Alert>
      )}
    </View>
  );
}
