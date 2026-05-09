import Link from "next/link";

export default async function ReadSingleProductComponent(
  { product }: {
    product: {
      id: number;
      title: string;
      content: string | null;
      price: number | null;
      isPublished: boolean;
      ownerId: number | null;
    }
  }) {

  return (
    <div className="flex flex-col gap-1 items-center">
      <Link href={'/product'}>Go Back</Link>
      <h2 className="font-medium text-xl">{product?.title}</h2>
      <p className="text-lg lining-nums">${product?.price} usd</p>
      <p>{product?.content || 'Description'}</p>
    </div>
  )
}