'use client';

import Loader from "@/components/store/main/loader";
import ProductCardOneCartButton from "@/components/store/product/productCardOneCartButton";
import { formatPrice, formatProductDescription } from "@/sanity/helper/formats";
import { urlFor } from "@/sanity/lib/image";
import { createCheckoutSession, CreateCheckoutSessionMetaData } from "@/stripe/helpers";
import useCartStore, { CartItem } from "@/zustand/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";

export default function Page() {

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { items, getGroupedItems, getTotalPrice, getTotalItemCount, removeItem } = useCartStore();
  const [groupedItems, setGroupedItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);

  const removeItemFN = ({ _id, quantity }: { _id: string, quantity: number }): void => {
    for (let i = 0; i < quantity; i++) {
      removeItem(_id);
    }
  };

  const handleCheckout = async () => {
    setLoading(true)
    if (!isSignedIn) {
      setLoading(false)
      return;
    }
    try {
      const metaData: CreateCheckoutSessionMetaData = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? 'Test Name',
        customerEmail: user?.primaryEmailAddress?.emailAddress ?? 'Test Email',
        customerClerkId: user?.id ?? 'Test ID',
      }

      await createCheckoutSession(groupedItems, metaData);

    } catch (error) {
      console.error('Error handling checkout', error);
    }
    setLoading(false)
  }

  useEffect(() => {
    setGroupedItems(getGroupedItems());
    setTotalPrice(getTotalPrice());
    setTotalItemCount(getTotalItemCount());
  }, [items, getGroupedItems, getTotalPrice, getTotalItemCount]);

  return (
    <div className="flex flex-col gap-5 p-5">

      <h2 className="text-xl font-medium">
        Cart
      </h2>

      <div className="flex flex-col lg:flex-row lg:items-start gap-5">

        <div className="grid grid-cols-1 gap-5 lg:flex-1">
          {
            groupedItems?.map(({ product, quantity }) => {
              const { _id, name, slug, image, price, description } = product;

              return (
                <div key={_id} className="flex flex-col sm:flex-row gap-2 border p-2 rounded-md">

                  <div className="relative h-44 sm:w-44">
                    <Image src={urlFor(image || '').url()} alt={name || 'Product Image'} fill priority className="object-contain" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:flex-1 sm:justify-between md:pr-5">

                    <div className="flex flex-col sm:flex-1">
                      <Link className="text-lg font-medium sm:text-2xl" href={`/product/${slug?.current}`}>{name}</Link>
                      <p className="lining-nums font-medium">${price}</p>
                      <div className="hidden sm:block sm:mt-1">
                        <p className="text-sm tracking-tight line-clamp-5 font-light">{formatProductDescription(description)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap sm:flex-col gap-1 sm:justify-center sm:flex-1">
                      <ProductCardOneCartButton product={product} />
                      <button onClick={() => removeItemFN({ _id, quantity })} className="flex items-end gap-1 border p-1 rounded">
                        <span className="text-sm">Remove</span>
                        <CiTrash />
                      </button>
                    </div>

                    <div className="flex items-center justify-between flex-wrap sm:flex-col gap-1 sm:justify-between">
                      <p>P: {price} x {quantity}</p>
                      <p className="text-2xl font-medium lining-nums tracking-tighter">{formatPrice((price ?? 0) * quantity)}</p>
                    </div>

                  </div>

                </div>
              )
            })
          }
        </div>

        <Link href={'#cart-summary'} className="bg-black p-2 text-white font-medium sticky bottom-0 left-0 rounded text-center lg:hidden">
          <p>Cart Summary</p>
        </Link>

        <div className="flex flex-col gap-2 lg:w-64 xl:w-80 2xl:W-96 lg:border lg:rounded lg:p-5 lg:sticky lg:top-5" id="cart-summary">

          <div className="flex flex-col">
            {
              groupedItems?.map(({ product, quantity }) => {
                const { _id, name, price } = product;

                return (
                  <div key={`cart-${_id}`} className="flex flex-row justify-between items-center gap-4">
                    <p>{name} ({quantity})</p>

                    <div className="border border-dashed flex-1"></div>

                    <p className="">{formatPrice((price ?? 0) * quantity)}</p>
                  </div>
                )
              })
            }
          </div>

          <hr />

          <div className="flex items-center justify-between py-2">
            <p className=" text-xl font-light">Total ({totalItemCount})</p>
            <p className="text-2xl lining-nums tracking-tighter font-medium">{formatPrice(totalPrice)}</p>
          </div>

          {
            isSignedIn
              ? (
                isLoading ? (
                  <Loader />
                ) : (
                  <button onClick={handleCheckout} disabled={isLoading} className="bg-blue-700 disabled:bg-gray-500 text-white text-center py-2 rounded font-medium">
                    Proceed to Checkout
                  </button>
                )
              )
              : (
                <SignInButton mode="modal">
                  <button onClick={() => { }} className="bg-blue-700 text-white text-center py-2 rounded font-medium">
                    Sign In to checkout
                  </button>
                </SignInButton>
              )
          }

        </div>

      </div>

    </div >

  )
}