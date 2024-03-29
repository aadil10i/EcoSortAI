import axios from 'axios';
import { Package } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { View, Alert as RNAlert } from 'react-native';

import { type, orderNo } from './alerts';

import { Button } from '~/components/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/Card';
import SignOut from '~/components/SignOut';
import { P, H1 } from '~/components/typography';

interface Stop {
  scheduledAtDt: string;
}

interface Order {
  id: string;
  orderNo: string;
  date: string;
  type: string;
  routes?: {
    distance: number;
    duration: number;
    driverName: string;
    stops: Stop[];
  }[];
}

export default function AccountTab() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchOrdersResponse = await axios.post(
          'https://api.optimoroute.com/v1/get_orders?key=5a5b51daac4d57be23754adca44c763aljVXQ5k1x6M',
          {
            orders: [
              {
                orderNo: 'ORD001',
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (fetchOrdersResponse.status === 200 && fetchOrdersResponse.data.orders) {
          setOrders(fetchOrdersResponse.data.orders);
          console.log('Fetching orders successful:', fetchOrdersResponse.data);
        } else {
          console.error('Error fetching orders:', fetchOrdersResponse.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeletePress = async (orderNo: string) => {
    try {
      const deleteOrderResponse = await axios.post(
        'https://api.optimoroute.com/v1/delete_order?key=5a5b51daac4d57be23754adca44c763aljVXQ5k1x6M',
        {
          orderNo: 'ORD001',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (deleteOrderResponse.status === 200) {
        RNAlert.alert('Order deleted successfully');
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderNo !== orderNo));
        console.log('Successfully deleted orders:', deleteOrderResponse.data);
      } else {
        console.error('Error deleting order:', deleteOrderResponse.data);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const fetchRoutes = async (order: Order) => {
    try {
      const fetchRoutesResponse = await axios.get(
        `https://api.optimoroute.com/v1/get_routes?key=5a5b51daac4d57be23754adca44c763aljVXQ5k1x6M&date=2024-04-20&includeRoutePolyline=true'`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (fetchRoutesResponse.status === 200 && fetchRoutesResponse.data.routes) {
        const routeData = fetchRoutesResponse.data.routes.map(
          (route: {
            distance: any;
            duration: any;
            driverName: any;
            stops: { scheduledAtDt: any }[];
          }) => ({
            distance: route.distance,
            duration: route.duration,
            driverName: route.driverName,
            stops: route.stops.map((stop: { scheduledAtDt: any }) => ({
              scheduledAtDt: stop.scheduledAtDt,
            })),
          })
        );

        setOrders((prevOrders) =>
          prevOrders.map((prevOrder) => {
            if (prevOrder.orderNo === order.orderNo) {
              return { ...prevOrder, routes: routeData };
            }
            return prevOrder;
          })
        );
        console.log('Fetching routes successful:', fetchRoutesResponse.data);
      } else {
        console.error('Error fetching routes:', fetchRoutesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching routes catch:', error);
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      orders.forEach((order) => fetchRoutes(order));
    }
  }, [orders]);

  // const fetchSchedulingInformation = async (order: Order) => {
  //   try {
  //     const fecthSchedulingInfoResponse = await axios.get(
  //       `https://api.optimoroute.com/v1/get_scheduling_info?key=5a5b51daac4d57be23754adca44c763aljVXQ5k1x6M&orderNo=ORD001'`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (fecthSchedulingInfoResponse.status === 200) {
  //       setOrders((prevOrders) => prevOrders.filter((order) => order.orderNo !== orderNo));
  //       console.log('Successfully fetcehd scheduling info:', fecthSchedulingInfoResponse.data);
  //     } else {
  //       console.error('Error deleting order:', fecthSchedulingInfoResponse.data);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting order:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (orders.length > 0) {
  //     orders.forEach((order) => fetchSchedulingInformation(order));
  //   }
  // }, [orders]);

  return (
    <View className="flex-1">
      <View className="pt-14 flex-1">
        <H1 className="text-center pt-2">My Orders</H1>
        <Card className="w-full max-w-lg pl-6 pt-8">
          {orders.map((order: Order) => (
            <View key={order.id}>
              <View className="flex-row items-center">
                <View className="box-border  bg-gray-400 rounded-lg border-transparent px-2 py-2  ">
                  <Package size={28} color="black" weight="regular" />
                </View>
                <CardHeader>
                  <CardTitle>Order No: #{orderNo}</CardTitle>
                </CardHeader>
              </View>
              <CardContent className="font-bold pl-20">
                <View className="flex-row">
                  <P className="font-semibold">Id No:</P>
                  <P> #{order.id}</P>
                </View>
                <View className="flex-row">
                  <P className="font-semibold">Type:</P>
                  <P> {type}</P>
                </View>
                {order.routes && order.routes.length > 0 && (
                  <View>
                    {order.routes.map((route, index) => (
                      <View key={index}>
                        <View className="flex-row">
                          <P className="font-semibold">Distance: </P>
                          <P> {route.distance} km</P>
                        </View>
                        <View className="flex-row">
                          <P className="font-semibold">Duration: </P>
                          <P>{route.duration} minutes</P>
                        </View>
                        <View className="flex-row">
                          <P className="font-semibold">Driver Name: </P>
                          <P>{route.driverName}</P>
                        </View>
                        <View className="flex-row">
                          <P className="font-semibold">Date: </P>
                          <P> {route.stops[0].scheduledAtDt}</P>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </CardContent>

              <CardFooter className="pl-8">
                <Button
                  variant="outline"
                  className="bg-red-500"
                  onPress={() => handleDeletePress(order.orderNo)}>
                  <P className="font-semibold">Delete Orders</P>
                </Button>
              </CardFooter>
              <View className="border-b border-gray-200 my-2 w-96 ml-8" />
            </View>
          ))}
        </Card>
      </View>
      <SignOut />
    </View>
  );
}
