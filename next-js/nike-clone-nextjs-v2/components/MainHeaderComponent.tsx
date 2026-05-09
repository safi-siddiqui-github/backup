import { Images } from "@/utils/images";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SideBarButtonComponent from "./SideBarButtonComponent";
import SearchBarButtonComponent from "./SearchBarButtonComponent";

export default function MainHeaderComponent() {
  return (
    <header className="flex items-center justify-between pr-6 pl-4">

      <Link href={'/'} className="w-16 h-16 relative">
        <Image fill src={Images.logo} alt="nike-logo" className="object-contain" />
      </Link>

      <nav className="hidden sm:flex gap-4">
        <Link href={'/shop'} className="text-base font-medium">New & Featured</Link>
        <Link href={'/shop'} className="text-base font-medium">Men</Link>
        <Link href={'/shop'} className="text-base font-medium">Women</Link>
        <Link href={'/shop'} className="text-base font-medium">Kids</Link>
        <Link href={'/shop'} className="text-base font-medium">Sale</Link>
      </nav>

      <nav className="flex items-center gap-4">
        <SearchBarButtonComponent />

        <Link href={'/'}>
          <ShoppingBag className="size-6" />
        </Link>
        <Link href={'/'}>
          <Heart className="size-6" />
        </Link>

        <SideBarButtonComponent />
      </nav>

    </header>
  )
}