import axios from 'axios';
import { Package } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { View, Alert as RNAlert } from 'react-native';

import { Button } from '~/components/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/Card';
import SignOut from '~/components/SignOut';
import { P, H1 } from '~/components/typography';

interface Order {
  id: string;
  orderNo: string;
  date: string;
  type: string;
}

export default function AccountTab() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          'https://api.optimoroute.com/v1/get_orders?key=5a5b51daac4d57be23754adca44c763aljVXQ5k1x6M',
          {
            orders: [
              {
                orderNo: 'ORD001',
              },
              {
                orderNo: 'ORD002',
              },
              {
                orderNo: 'ORD003',
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200 && response.data.orders) {
          setOrders(response.data.orders);
        } else {
          console.error('Error fetching orders:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeletePress = () => {
    RNAlert.alert('you have deleted the order');
  };

  return (
    <View>
      <H1 className="text-center pt-2">My Orders</H1>
      <Card className="w-full max-w-lg pl-6">
        {orders.map((order: Order) => (
          <View key={order.id}>
            <View className="flex-row items-center">
              <Package size={28} color="grey" weight="duotone" />
              <CardHeader>
                <CardTitle>Order No: #{order.orderNo}</CardTitle>
              </CardHeader>
            </View>
            <CardContent className="font-bold pl-8">
              <P>Id No: #{order.id}</P>
              <P>Date: {order.date}</P>
              <P>Type: {order.type}</P>
            </CardContent>

            <CardFooter className="pl-8">
              <Button variant="outline" onPress={handleDeletePress}>
                <P>Delete Order</P>
              </Button>
            </CardFooter>
          </View>
        ))}
      </Card>
      <View className="pt-20">
        <SignOut />
      </View>
    </View>
  );
}
