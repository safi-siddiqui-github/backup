import SignoutComponent from "@/components/authentication/SignoutComponent";
import { GetSession } from "@/lib/session";
import Link from "next/link";

export default async function Page() {

  const session = await GetSession();

  return (
    <div className="p-5 flex flex-col gap-5">

      <div className="flex flex-col items-start border-b">
        <Link href={'/'} className="text-xs hover:underline">Go Back</Link>
        <h2 className="text-xl">Authentication App</h2>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <p className="">Auth Status</p>
        {
          session
            ? (
              <div className="flex flex-col gap-1">
                <p className=" text-center">
                  {JSON.stringify(session, null, 2)}
                </p>
                <SignoutComponent />
              </div>
            )
            : 'Not Signed Up'
        }
      </div>

      <div className="flex gap-2">
        <Link href={'/authentication/signup'}>Sign Up</Link>
        <Link href={'/authentication/signin'}>Sign In</Link>
      </div>
    </div>
  )
}