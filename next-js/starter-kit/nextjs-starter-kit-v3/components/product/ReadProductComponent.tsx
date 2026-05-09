import Link from "next/link";
import DeleteProductComponent from "./DeleteProductComponent";
import { ReadProductAction } from "@/actions/product";

export default async function ReadProductComponent() {

  const products = await ReadProductAction();

  return (
    <div className="flex flex-col gap-1">
      {
        products?.map(({ id, title,  }) => (
          <div key={id} className="flex items-center justify-between">
            <Link key={id} href={`/product/${id}`} className="text-lg">{title}</Link>
            <DeleteProductComponent id={id}/>
          </div>
        ))
      }
    </div>
  )
}