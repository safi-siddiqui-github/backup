'use client';

import { Product } from "@/sanity.types";
import useCartStore from "@/zustand/store";
import { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

interface ProductCardOneCartButtonProps {
  product: Product,
}

export default function ProductCardOneCartButton({ product }: ProductCardOneCartButtonProps) {

  const { addItem, removeItem, getItemCount, items } = useCartStore();
  const [itemCount, setItemCount] = useState<number>(0);
  const [stockCount, setStockCount] = useState<number>(0);
  const { _id, stock, } = product;
  const outOfStock = stock == 0 ? true : false;

  const addItemFN = () => {
    // Dont Exceed Stock
    return itemCount < stockCount ? addItem(product) : null;
  }

  const removeItemFN = () => {
    // Dont Fall Below Zero
    return itemCount > 0 ? removeItem(_id) : null;
  }

  // Sync state only on the client
  useEffect(() => {
    setItemCount(getItemCount(_id));
    setStockCount(stock ?? 0);
  }, [items, getItemCount, stock, _id]);

  return (
    <div className="flex items-center gap-2">

      <div className="flex items-center gap-1">
        <button onClick={addItemFN} disabled={outOfStock}>
          <CiSquarePlus className="size-8" />
        </button>
        <button onClick={removeItemFN} disabled={outOfStock}>
          <CiSquareMinus className="size-8" />
        </button>
      </div>

      {
        outOfStock
          ? <p className="">Out Of Stock</p>
          : <p className="lining-nums font-medium text-lg">{itemCount != 0 && `${itemCount} items`}</p>
      }

    </div>
  )
}