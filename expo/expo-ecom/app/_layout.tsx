import { Stack } from 'expo-router';
import '../global.css';

import ThemeProviderComponent from '@/components/theme-provider';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <ThemeProviderComponent>
        <Stack>
          <Stack.Screen
            name="(shop)"
            options={{ title: 'Home', headerShown: false }}
          />
          <Stack.Screen
            name="categories"
            options={{ title: 'Categories', headerShown: false }}
          />
          <Stack.Screen
            name="product"
            options={{ title: 'Product' }}
          />
          <Stack.Screen
            name="cart"
            options={{ title: 'Cart', presentation: 'modal' }}
          />
          <Stack.Screen
            name="auth"
            options={{ title: 'Auth' }}
          />
          <Stack.Screen
            name="+not-found"
            options={{ title: 'Not Found' }}
          />
        </Stack>
        <StatusBar style={'auto'} />
      </ThemeProviderComponent>
    </>
  );
}
