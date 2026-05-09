import { Product } from "@/sanity.types";
import { formatProductDescription } from "@/sanity/helper/formats";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import ProductCardOneCartButton from "./productCardOneCartButton";

export default function ProductCardOne({ product }: { product: Product }) {

  const { _id, name, description, slug, image, price } = product;

  return (
    <div key={_id} className="flex flex-col gap-2 border p-3 rounded-md">

      <div className="relative h-44">
        <Image src={urlFor(image || '').url()} alt={name || 'Product Image'} fill priority className="object-contain" />
      </div>

      <div className="flex flex-col">
        <Link className="text-lg font-medium" href={`/product/${slug?.current}`}>{name}</Link>
        <p className="text-sm tracking-tight line-clamp-2">
          {formatProductDescription(description)}
        </p>
        <p className="text-2xl font-bold lining-nums mt-2">${price}</p>
      </div>

      <ProductCardOneCartButton product={product} />

    </div>
  )
}