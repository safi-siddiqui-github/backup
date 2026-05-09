import { NikeIconConstants } from "@/lib/nike/constants";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NikeSideBarButtonComponent from "../buttons/NikeSideBarButtonComponent";
import NikeSearchBarButtonComponent from "../buttons/NikeSearchBarButtonComponent";

export default function NikeMainHeaderComponent() {
  return (
    <header className="flex items-center justify-between pr-6 pl-4">

      <Link href={'/nike'} className="w-16 h-16 relative">
        <Image fill src={NikeIconConstants.nikeLogo} alt="nike-logo" className="object-contain" />
      </Link>

      <nav className="hidden sm:flex gap-4">
        <Link href={'/nike/shop'} className="text-base font-medium">New & Featured</Link>
        <Link href={'/nike/shop'} className="text-base font-medium">Men</Link>
        <Link href={'/nike/shop'} className="text-base font-medium">Women</Link>
        <Link href={'/nike/shop'} className="text-base font-medium">Kids</Link>
        <Link href={'/nike/shop'} className="text-base font-medium">Sale</Link>
      </nav>

      <nav className="flex items-center gap-4">
        <NikeSearchBarButtonComponent />
        <Link href={'/nike/cart'}>
          <ShoppingBag className="size-6" />
        </Link>
        <Link href={'/nike/favourites'}>
          <Heart className="size-6" />
        </Link>
        <NikeSideBarButtonComponent />
      </nav>

    </header>
  )
}