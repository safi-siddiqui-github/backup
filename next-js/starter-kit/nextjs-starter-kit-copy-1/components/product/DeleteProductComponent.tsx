'use client';

import DeleteProductAction from "@/actions/product/DeleteProductAction";
import { Delete, LoaderCircle } from "lucide-react";
import { useActionState } from "react";

export default function DeleteProductComponent({ id }: { id: string | number }) {

  const [state, formAction, isPending] = useActionState(DeleteProductAction, null)

  return (
    <form action={formAction} className="" title="Remove">
      {state?.error ? <p className="text-red-500">{state?.error}</p> : null}
      <input type="hidden" name="id" defaultValue={id} />
      <button className="" disabled={isPending}>
        {isPending ? <LoaderCircle className="animate-spin" /> : <Delete />}
      </button>
    </form>
  )
}