'use client';

import { SignoutAction } from "@/actions/authentication";
import { LoaderCircle } from "lucide-react";
import { useActionState } from "react";

export default function SignoutComponent() {

  const [, formAction, isPending] = useActionState(SignoutAction, null);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2"
    >
      <button
        type="submit"
        className="bg-black text-white rounded py-1 flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Log Out'}
      </button>

    </form>
  )
}