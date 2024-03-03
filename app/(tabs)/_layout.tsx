import { Link, Tabs } from 'expo-router';
import { Trash, UserCircle, Bell, MapPinLine } from 'phosphor-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Bin Status',
          tabBarIcon: ({ color }) => <Trash size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <Bell size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <UserCircle size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="route"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color }) => <MapPinLine size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
