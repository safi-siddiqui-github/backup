import { View } from 'react-native';

// { slug }: { slug: string }
export default function Page(props) {
  console.log(props);

  return (
    <View className="flex flex-1 flex-col items-center justify-center">
      {/* <TextComponent>Categories {slug}</TextComponent> */}
    </View>
  );
}
