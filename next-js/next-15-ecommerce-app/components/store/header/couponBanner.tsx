import { formatISODate } from "@/sanity/helper/formats";
import { COUPON_CODE, getActiveSale } from "@/sanity/query/sale"

export default async function CouponBanner() {

  const sale = await getActiveSale(COUPON_CODE.HAPPY20);

  return (
    <div className="flex items-center justify-center gap-10 p-2 bg-black text-white">
      <div className="flex gap-1">
        <p className="">{sale?.title}</p>
        <p className="lining-nums">{sale?.discountAmount}%</p>
        <p className="font-medium"> - {sale?.couponCode}</p>
      </div>

      <div className="hidden md:flex gap-1">
        <p className="">From {formatISODate(sale?.validFrom)}</p>
        <p className=""> - Till {formatISODate(sale?.validUntil)}</p>
      </div>
    </div>
  )
}