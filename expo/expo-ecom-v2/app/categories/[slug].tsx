import { firstCategory } from '@/actions/category';
import { getCategoryProducts } from '@/actions/product';
import ProductCard from '@/components/product-card';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Category, Product } from '../lib/types';

type Param = { slug: string };
export default function Page() {
  const { slug } = useLocalSearchParams<Param>();
  const [products, setProducts] = useState<Product[]>();
  const [category, setCategory] = useState<Category>();

  async function handleProducts() {
    const res = await getCategoryProducts(slug);
    setProducts(res);
  }

  async function handleCategory() {
    const res = await firstCategory(slug);
    setCategory(res);
  }

  useEffect(() => {
    handleCategory();
    handleProducts();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: category?.title, headerShown: true }} />
      <View className="flex flex-1 p-4">
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerClassName="flex flex-col gap-y-4"
          columnWrapperClassName="flex flex-row gap-x-4"
          ListHeaderComponent={() => (
            <View className="flex flex-col">
              <Image
                source={category?.image}
                style={{ width: 'auto', height: 200, borderRadius: 10 }}
                contentFit="cover"
                transition={1000}
              />
            </View>
          )}
          renderItem={({ item, index }) => {
            return (
              <>
                <ProductCard
                  item={item}
                  key={index}
                />
              </>
            );
          }}
        />
      </View>
    </>
  );
}
