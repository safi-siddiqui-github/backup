import SigninFormComponent from "@/components/authentication/SigninFormComponent";
import Link from "next/link";

export default function Page() {
  return (
    <div className=" py-5 flex flex-col gap-5 items-center">

      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-xl">Sign In</h2>
        <Link href={'/authentication'} className="text-xs hover:underline">Go Back</Link>
      </div>

      <SigninFormComponent />

    </div>
  )
}