import TextComponent from '@/components/text-component';
import { View } from 'react-native';

export default function Page() {
  return (
    <View className="flex flex-1 flex-col items-center justify-center">
      <TextComponent>Auth</TextComponent>
    </View>
  );
}
