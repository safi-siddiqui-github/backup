import { formatISODate, formatPrice, formatProductDescription } from "@/sanity/helper/formats";
import { urlFor } from "@/sanity/lib/image";
import { getUserSingleOrder } from "@/sanity/query/order";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const { userId } = await auth();
  if (!userId) return redirect('/');

  const slug = (await params).slug;
  const order = await getUserSingleOrder(userId, slug);
  if (!order) notFound();

  const { products, amountDiscount, currency, orderNumber, totalPrice, orderDate, status } = order;
  const formatOrderNumber = `${orderNumber?.slice(0, 10)}...${orderNumber?.slice(-10)}`;

  return (
    <div className="flex flex-col p-5 md:p-10">

      <div className="flex flex-col gap-5 md:max-w-lg md:mx-auto">

        <div className="flex flex-col items-start gap-1">
          <p className="text-sm font-medium bg-black rounded px-2 py-1 text-white">Order Number</p>
          <p className="sm:hidden text-2xl tracking-tighter">{formatOrderNumber}</p>
          <p className="hidden sm:inline-flex text-2xl tracking-tighter">{orderNumber}</p>
          <p className="">{formatISODate(orderDate)}</p>
        </div>


        <div className="flex items-center w-full gap-2">
          <p className="text-sm font-medium bg-black rounded px-2 py-1 text-white">Total</p>
          <div className="border border-dashed flex-1"></div>
          <p className="lining-nums tracking-tight text-2xl font-medium">{formatPrice(totalPrice ?? 0)} {currency}</p>
        </div>

        <hr />

        <div className="flex flex-col items-start gap-2">
          <p className="text-sm font-medium bg-black rounded px-2 py-1 text-white">Items</p>
          {
            products?.map(({ product, quantity }) => (
              <div key={`product-order-${product?._id}-${crypto.randomUUID()}`} className="flex items-center gap-2 w-full">

                <div className="relative h-14 w-14 sm:h-24 sm:w-24">
                  <Image src={urlFor(product?.image || '').url()} alt={product?.name || 'Product Image'} fill priority className="object-contain" />
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <p className="">{product?.name} ({quantity})</p>
                    <div className="border border-dashed flex-1"></div>
                    <p className="lining-nums tracking-tight font-medium">{formatPrice((product?.price ?? 0) * (quantity ?? 0))} {currency}</p>
                  </div>

                  <div className="flex items-start gap-10">
                    <div className="hidden sm:flex flex-1">
                      <p className="sm:line-clamp-2 text-sm font-light">{formatProductDescription(product?.description)}</p>
                    </div>
                    <p className="lining-nums tracking-tight">{formatPrice(product?.price ?? 0)} x {quantity}</p>
                  </div>
                </div>

              </div>
            ))
          }

        </div>

        {
          amountDiscount != 0 && (
            <div className="flex items-center w-full gap-2">
              <p className="text-sm font-medium bg-black rounded px-2 py-1 text-white">Discount</p>
              <div className="border border-dashed flex-1"></div>
              <p className="lining-nums tracking-tight">{formatPrice(amountDiscount ?? 0)} {currency}</p>
            </div>
          )
        }



        <hr />

        <div className="flex items-center w-full gap-2">
          <p className="text-sm font-medium bg-black rounded px-2 py-1 text-white">Status</p>
          <div className="border border-dashed flex-1"></div>
          <p className="text-2xl font-semibold text-blue-700 uppercase">{status}</p>
        </div>

      </div>
    </div>
  )
}