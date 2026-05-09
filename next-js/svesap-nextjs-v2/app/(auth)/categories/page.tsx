import { allCategoriesAction } from '@/actions/categoryActions';
import CategoryTableComponent from '@/components/tables/CategoryTableComponent';

export default async function Page() {
  const { data } = await allCategoriesAction();

  return <CategoryTableComponent data={data?.categories} />;
}
