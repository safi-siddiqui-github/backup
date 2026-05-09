import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Shop',
            tabBarIcon: ({ color, size }) => (
              <Feather
                name="home"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color, size }) => (
              <Feather
                name="book-open"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
