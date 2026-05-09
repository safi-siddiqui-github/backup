import TextComponent from '@/components/text-component';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Page() {
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <Link
          href="/"
          className="rounded border p-4 dark:border-white"
        >
          <TextComponent>Go to home screen</TextComponent>
        </Link>
      </View>
    </>
  );
}
