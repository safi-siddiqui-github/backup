'use client';

import { CreateProductAction } from "@/core/actions/ProductActions";
import { LoaderCircle } from "lucide-react";
import { useActionState } from "react";

export default function CreateProductComponent() {

  const [state, formAction, isPending] = useActionState(CreateProductAction, null)

  return (
    <form action={formAction} className="p-2 border rounded flex flex-col gap-2">
      <h2 className="text-lg underline text-center">Create</h2>

      {state?.message ? <p className="text-green-500">{state?.message}</p> : null}
      {state?.error ? <p className="text-red-500">{state?.error}</p> : null}

      <input name="title" type="text" placeholder="Title" className="outline-none" />
      <input name="description" type="text" placeholder="description" className="outline-none" />
      <input name="price" step="1" type="number" placeholder="Price" className="outline-none" />

      <button className="bg-black text-white py-1 rounded flex items-center justify-center" disabled={isPending}>
        {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Add'}
      </button>

    </form>
  )
}