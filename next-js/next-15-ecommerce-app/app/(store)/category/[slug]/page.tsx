import ProductCardOne from "@/components/store/product/productCardOne";
import { capitalizeFirstLetter } from "@/sanity/helper/formats";
import { getCategoryProducts } from "@/sanity/query/product";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const slug = (await params).slug;
  const products = await getCategoryProducts(slug);
  const cSlug = capitalizeFirstLetter(slug);

  return (
    <div className="flex flex-col gap-10 p-5">

      <h2 className="text-xl font-medium">
        Category: <span className="tracking-wide">{cSlug}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (<ProductCardOne key={product._id} product={product} />))}
      </div>

    </div>
  )
}