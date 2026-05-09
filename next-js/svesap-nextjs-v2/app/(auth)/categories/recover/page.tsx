import { trashedCategoriesAction } from '@/actions/categoryActions';
import RecoverCategoryTableComponent from '@/components/tables/RecoverCategoryTableComponent';

export default async function Page() {
  const { data } = await trashedCategoriesAction();

  return <RecoverCategoryTableComponent data={data?.categories} />;
}
