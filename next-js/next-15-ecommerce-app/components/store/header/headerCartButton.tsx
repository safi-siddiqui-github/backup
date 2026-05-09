'use client';

import useCartStore from "@/zustand/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function HeaderCartButton() {

  const { getTotalItemCount, items } = useCartStore();
  const [totalCount, setTotalCount] = useState<number | null>(0);

  useEffect(() => {
    setTotalCount(getTotalItemCount());
  }, [items, getTotalItemCount]);

  return (
    <Link href={'/cart'} className="flex items-center border rounded px-2 py-1 font-medium gap-2 shadow">
      <span>Cart {totalCount != 0 ? totalCount : null}</span>
      <IoCartOutline className="size-7 " />
    </Link>
  )
}