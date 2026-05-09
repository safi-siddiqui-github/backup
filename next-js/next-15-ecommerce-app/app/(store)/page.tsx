import ProductCardOne from "@/components/store/product/productCardOne";
import { getAllProducts } from "@/sanity/query/product";
import { AnimatePresence } from "motion/react"

export default async function Home() {

  const products = await getAllProducts();

  return (
    <div className="flex flex-col p-5 gap-10">
      <h2 className="text-xl">My Store</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <AnimatePresence>
          {products.map((product) => (<ProductCardOne key={product._id} product={product} />))}
        </AnimatePresence>

      </div>

    </div>
  );
}
