import ProductCardOneCartButton from "@/components/store/product/productCardOneCartButton";
import { urlFor } from "@/sanity/lib/image";
import { getSingleProduct } from "@/sanity/query/product";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const slug = (await params).slug;
  const product = await getSingleProduct(slug);
  if (!product) notFound();
  const { name, description, image, price } = product;

  return (
    <div className="flex flex-col p-5 md:p-10">

      <div className="flex flex-col md:max-w-lg md:mx-auto">

        <div className="relative h-44 md:h-56 lg:h-64">
          <Image src={urlFor(image || '').url()} alt={name || 'Product Image'} fill priority className="object-contain" />
        </div>

        <div className="flex flex-col gap-1 mb-5">
          <h2 className="text-xl font-medium">{name}</h2>
          <p className="text-2xl font-bold lining-nums">${price}</p>
          <ProductCardOneCartButton product={product} />
        </div>

        {Array.isArray(description) && <PortableText value={description} />}

      </div>
    </div>
  )
}