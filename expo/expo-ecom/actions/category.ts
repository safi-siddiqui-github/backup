import { Category } from '@/app/lib/types';
import axios from 'axios';

type GetCategory = { id: number; name: string; slug: string; image: string };

export async function getCategories(): Promise<Category[]> {
  const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
  const { data }: { data: GetCategory[] } = res;

  const optimize = data.map((each) => {
    return {
      id: each.id,
      title: each.name,
      slug: each.slug,
      image: each.image,
    };
  });

  return optimize;
}

export async function firstCategory(slug: string): Promise<Category> {
  const res = await axios.get(`https://api.escuelajs.co/api/v1/categories/slug/${slug}`);
  const { data }: { data: GetCategory } = res;

  return {
    id: data.id,
    title: data.name,
    slug: data.slug,
    image: data.image,
  };
}
