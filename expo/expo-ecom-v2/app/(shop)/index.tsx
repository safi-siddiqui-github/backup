import { getCategories } from '@/actions/category';
import { getProducts } from '@/actions/product';
import FeatherIcon from '@/components/feather-icon';
import ProductCard from '@/components/product-card';
import TextComponent from '@/components/text-component';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Category, Product } from '../lib/types';

export default function Page() {
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();

  async function handleProducts() {
    const res = await getProducts();
    setProducts(res);
  }

  async function handleCategories() {
    const res = await getCategories();
    setCategories(res);
  }

  useEffect(() => {
    handleProducts();
    handleCategories();
  }, []);

  return (
    <View className="flex flex-1 flex-col gap-y-4 p-4">
      <View className=""></View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerClassName="flex flex-col gap-y-4"
        columnWrapperClassName="flex flex-row gap-x-4"
        ListHeaderComponent={() => (
          <View className="flex flex-col gap-y-4">
            <View className="flex flex-row justify-between">
              <View className="flex flex-row items-center gap-x-2">
                <Image
                  source="https://images.unsplash.com/photo-1483103068651-8ce44652c331?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhhdHxlbnwwfHwwfHx8MA%3D%3D"
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                  contentFit="cover"
                  className="rounded-full"
                  transition={1000}
                />

                <TextComponent className="text-2xl font-semibold">Welcome</TextComponent>
              </View>

              <Link
                href={'/cart'}
                asChild
              >
                <TouchableOpacity className="flex flex-row items-center gap-x-2">
                  <FeatherIcon name="shopping-bag" />
                  <TextComponent className="text-2xl font-semibold">2</TextComponent>
                </TouchableOpacity>
              </Link>
            </View>

            <Image
              source="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1748939832727-a2f0abdff540?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{ width: 'auto', height: 200, borderRadius: 10 }}
              contentFit="cover"
              className="rounded-full"
              transition={1000}
            />

            <View>
              <TextComponent className="text-lg font-medium">Categories</TextComponent>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              contentContainerClassName="gap-x-4"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <Link
                    href={`/categories/${item.slug}`}
                    key={index}
                    asChild
                  >
                    <TouchableOpacity className="flex flex-1 items-center gap-y-1">
                      <Image
                        source={item.image}
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        contentFit="cover"
                        transition={1000}
                      />

                      <TextComponent className="">{item.title}</TextComponent>
                    </TouchableOpacity>
                  </Link>
                );
              }}
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
  );
}
