import { Product } from '@/app/lib/types';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import TextComponent from './text-component';

export default function ProductCard({ item }: { item: Product }) {
  return (
    <Link
      href={`/product/${item.slug}`}
      asChild
    >
      <TouchableOpacity className="flex flex-1">
        <Image
          // source="https://images.unsplash.com/photo-1602661287394-ccf02e1a0893?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          source={item.images[0]}
          style={{ width: 'auto', height: 200 }}
          contentFit="cover"
          transition={1000}
        />

        <TextComponent className="text-lg font-medium">{item.title}</TextComponent>
        <TextComponent>${item.price}</TextComponent>
      </TouchableOpacity>
    </Link>
  );
}
