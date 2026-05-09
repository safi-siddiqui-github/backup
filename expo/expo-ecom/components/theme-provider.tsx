import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { colorScheme as nativewindScheme, useColorScheme } from 'nativewind';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

export default function ThemeProviderComponent({ children }: { children: ReactNode }) {
  const { colorScheme } = useColorScheme(); // 'dark' or 'light'
  const [isMounted, setIsMounted] = useState(false);
  const mountedRef = useRef(false);

  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (!mountedRef.current) {
      nativewindScheme.set('system');
      setIsMounted(true);
      mountedRef.current = true;
    }
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <View className="flex-1 bg-white dark:bg-black">{children}</View>

        {/* <SafeAreaView></SafeAreaView> */}
      </ThemeProvider>
    </>
  );
}
