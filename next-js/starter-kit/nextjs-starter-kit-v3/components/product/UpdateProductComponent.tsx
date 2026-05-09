'use client';

import { UpdateProductAction } from "@/actions/product";
import { LoaderCircle } from "lucide-react";
import { useActionState } from "react";

export default function UpdateProductComponent(
  { product }: {
    product: {
      id: number;
      title: string;
      content: string | null;
      price: number | null;
      isPublished: boolean;
      ownerId: number | null;
    }
  }) {

  const [state, formAction, isPending] = useActionState(UpdateProductAction, null)

  return (
    <form action={formAction} className="p-2 border rounded flex flex-col gap-2">
      <h2 className="text-lg underline text-center">Update</h2>

      {state?.message ? <p className="text-green-500">{state?.message}</p> : null}
      {state?.error ? <p className="text-red-500">{state?.error}</p> : null}

      <input type="hidden" name="id" defaultValue={product?.id} />
      <input name="title" defaultValue={product?.title} type="text" placeholder="Title" className="outline-none" />
      <input name="content" defaultValue={product?.content || ''} type="text" placeholder="Content" className="outline-none" />
      <input name="price" defaultValue={product?.price || ''} type="number" placeholder="price" className="outline-none" />

      <button className="bg-black text-white py-1 rounded flex items-center justify-center" disabled={isPending}>
        {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Update'}
      </button>

    </form>
  )
}