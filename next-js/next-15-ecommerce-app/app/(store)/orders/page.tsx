import { formatISODate, formatPrice } from "@/sanity/helper/formats";
import { getUserOrders } from "@/sanity/query/order";
import { auth } from "@clerk/nextjs/server"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) return redirect('/');

  const orders = await getUserOrders(userId);

  return (
    <div className="flex flex-col gap-5 p-2 sm:p-5 lg:px-10 ">
      <h2 className="text-xl font-medium">Orders</h2>

      <div className="grid grid-cols-1 gap-5">
        {
          orders?.map(({ _id, orderNumber, orderDate, status, products, currency, totalPrice, amountDiscount }) => {
            const formatOrderNumber = `${orderNumber?.slice(0, 10)}...${orderNumber?.slice(-10)}`;
            return (
              <div key={_id} className="flex flex-col p-5 gap-2 border rounded-md shadow">

                <div className="flex flex-row items-center justify-between font-light">
                  <Link href={`/orders/${orderNumber}`} className="hidden sm:inline-block hover:underline decoration-black/30">{orderNumber}</Link>
                  <Link href={`/orders/${orderNumber}`} className="sm:hidden hover:underline decoration-black/30">{formatOrderNumber}</Link>
                  <p className="text-sm font-medium bg-black text-white px-2 py-1 rounded">{status}</p>
                </div>
                <hr />

                <div className="flex flex-col gap-2">
                  <p className="text-2xl tracking-wide font-light">Items</p>
                  {
                    products?.map(({ product, quantity, }) => (
                      <div key={`product-inline-${product?._id}-${crypto.randomUUID()}`} className="flex items-center gap-2">
                        <p className="">{product?.name} ({quantity})</p>
                        <div className="border border-dashed flex-1"></div>
                        <p className="lining-nums tracking-tight">{formatPrice((product?.price ?? 0) * (quantity ?? 0))} {currency}</p>
                      </div>
                    ))
                  }
                  {
                    amountDiscount != 0 && (
                      <div className="flex items-center gap-2">
                        <p className="">Discount</p>
                        <div className="border border-dashed flex-1"></div>
                        <p className="lining-nums tracking-tight">{formatPrice(amountDiscount ?? 0)} {currency}</p>
                      </div>
                    )
                  }
                </div>

                <hr />
                <div className="flex flex-row justify-between items-center">
                  <p className="font-light">{formatISODate(orderDate)}</p>
                  <p className="text-2xl lining-nums tracking-tight font-medium">{formatPrice(totalPrice ?? 0)} {currency}</p>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}