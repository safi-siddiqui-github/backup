import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Form from 'next/form'
import { IoBagOutline } from "react-icons/io5";
import { currentUser } from "@clerk/nextjs/server";
import { getAllCategories } from "@/sanity/query/category";
import HeaderCartButton from "./headerCartButton";

export default async function MainHeader() {

  const user = await currentUser();
  const categories = await getAllCategories();

  return (
    <header className="flex flex-col sm:flex-row gap-3 sm:gap-5 p-2 sm:py-3 sm:px-5 border-b">

      <Link href={'/'} className="text-xl font-medium tracking-tight">Shop</Link>

      <Form action="/search" className="flex flex-col sm:flex-1">
        <input type="text" name="query" className="border rounded p-2 text-sm w-full" placeholder="Search..." />
      </Form>

      <div className="flex gap-2 items-center justify-center text-sm font-medium">
        {categories?.map(({ title, slug, _id }) => (<Link key={_id} href={`/category/${slug?.current}`}>{title}</Link>))}
      </div>

      <div className="flex items-center justify-center gap-3">

        <div className="flex gap-2 items-center justify-center">
          <HeaderCartButton />
          {
            user && (
              <Link href={'/orders'} className="flex items-center border rounded px-2 py-1 font-medium gap-2 shadow">
                <span>Orders</span>
                <IoBagOutline className="size-6 " />
              </Link>
            )
          }
        </div>

        <div className="flex gap-2 items-center justify-center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

      </div>

    </header>
  )
}