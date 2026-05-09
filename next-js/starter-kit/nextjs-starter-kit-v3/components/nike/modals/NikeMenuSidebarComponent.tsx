'use client';

import { NikeSidebarEventEmitter } from "@/lib/nike/events";
import { CircleHelp, CircleX, Heart, Package, ShoppingBag, Store, User } from "lucide-react";
import Link from "next/link";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";

export default function NikeMenuSidebarComponent() {

  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = useCallback(() => { setShowSidebar(true); }, [])
  const closeSidebar = useCallback(() => { setShowSidebar(false); }, [])

  useEffect(() => {
    if (NikeSidebarEventEmitter) {
      NikeSidebarEventEmitter.on("openSidebar", openSidebar);
      return () => {
        NikeSidebarEventEmitter.off("openSidebar", openSidebar
        )
      };
    }
  }, [openSidebar]);

  return (
    <aside
      className={`absolute z-10 top-0 right-0 w-full h-full backdrop-blur-sm items-start justify-end overflow-y-scroll scrollbar ${showSidebar ? 'flex' : 'hidden'}`}
      onClick={closeSidebar}
    >

      <div
        className="bg-white p-6 flex flex-col gap-6 md:gap-10 w-full max-w-64 md:max-w-96 rounded-bl shadow-2xl"
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
      >

        <div className="flex flex-col gap-4">

          <div className="flex justify-end">
            <button onClick={closeSidebar}>
              <CircleX className="size-6" />
            </button>
          </div>

          <div className="flex flex-col items-start gap-1">
            <Link href={'/nike'} className="text-xl font-medium">New & Featured</Link>
            <Link href={'/nike'} className="text-xl font-medium">Men</Link>
            <Link href={'/nike'} className="text-xl font-medium">Women</Link>
            <Link href={'/nike'} className="text-xl font-medium">Kids</Link>
            <Link href={'/nike'} className="text-xl font-medium">Sale</Link>
          </div>

        </div>

        <div className="flex flex-col gap-2">

          <p className="">
            <span className="tracking-tight">Become a Nike Member for the best products, inspiration and stories in sport.</span>
            &nbsp;
            <Link href={'/nike'} className="undeline font-medium">Learn more</Link>
          </p>

          <div className="flex gap-2">
            <Link href={'/nike'} className="bg-black rounded px-4 py-1 text-white font-medium">
              Join Us
            </Link>

            <Link href={'/nike'} className="border shadow rounded px-4 py-1">
              Sign In
            </Link>
          </div>

        </div>

        <div className="flex flex-col items-start gap-2">

          <Link href={'/nike'} className="flex gap-2 items-center">
            <CircleHelp className="size-6" />
            <span className="text-lg">Help</span>
          </Link>

          <Link href={'/nike'} className="flex gap-2 items-center">
            <ShoppingBag className="size-6" />
            <span className="text-lg">Bag</span>
          </Link>

          <Link href={'/nike'} className="flex gap-2 items-center">
            <Heart className="size-6" />
            <span className="text-lg">Favourites</span>
          </Link>

          <Link href={'/nike'} className="flex gap-2 items-center">
            <Package className="size-6" />
            <span className="text-lg">Orders</span>
          </Link>

          <Link href={'/nike'} className="flex gap-2 items-center">
            <User className="size-6" />
            <span className="text-lg">Profile</span>
          </Link>

          <Link href={'/nike'} className="flex gap-2 items-center">
            <Store className="size-6" />
            <span className="text-lg">Find a store</span>
          </Link>

        </div>
      </div>

    </aside>
  )
}