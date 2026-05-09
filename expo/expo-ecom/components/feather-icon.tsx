import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

type FeatherIconName = keyof typeof Feather.glyphMap;

export default function FeatherIcon({ name, size = 24 }: { name: FeatherIconName; size?: number }) {
  const { colorScheme } = useColorScheme();
  return (
    <Feather
      name={name}
      size={size}
      color={colorScheme === 'dark' ? 'white' : 'black'}
    />
  );
}
