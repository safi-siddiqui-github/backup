'use client';

import SignupAction from "@/actions/authentication/SignupAction";
import { LoaderCircle } from "lucide-react";
import { useActionState } from "react";

export default function SignupFormComponent() {

  const [state, formAction, isPending] = useActionState(SignupAction, null);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2"
    >

      <div className="flex flex-col">
        <input
          name="name"
          type="text"
          placeholder="John Doe"
          className={`border rounded px-2 py-1 ${state?.errors?.name ? 'border-red-500' : null}`}
          defaultValue={state?.old?.name}
        />
        {
          state?.errors?.name
            ? <p className="text-red-500">{state.errors.name}</p>
            : null
        }
      </div>

      <div className="flex flex-col">
        <input
          name="email"
          type="email"
          placeholder="john@gmail.com"
          className={`border rounded px-2 py-1 ${state?.errors?.email ? 'border-red-500' : null}`}
          defaultValue={state?.old?.email}
        />
        {
          state?.errors?.email
            ? <p className="text-red-500">{state.errors.email}</p>
            : null
        }
      </div>

      <div className="flex flex-col">
        <input
          name="password"
          type="password"
          placeholder="********"
          className={`border rounded px-2 py-1 ${state?.errors?.password ? 'border-red-500' : null}`}
        />
        {
          state?.errors?.password
            ? <p className="text-red-500">{state.errors.password}</p>
            : null
        }
      </div>

      <button
        type="submit"
        className="bg-black text-white rounded py-1 flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Submit'}
      </button>

    </form>
  )
}