import ProductCardOne from "@/components/store/product/productCardOne";
import { getSearchProducts } from "@/sanity/query/product";

export default async function Page({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;
  const products = await getSearchProducts(query);

  return (

    <div className="flex flex-col gap-10 p-5">

      <h2 className="text-xl font-medium">
        Search Results for <span className="tracking-wide">&quot;{query}&rdquo;</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (<ProductCardOne key={product._id} product={product} />))}
      </div>

    </div>
  )
}