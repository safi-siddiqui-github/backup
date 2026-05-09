import SignupFormComponent from "@/components/authentication/SignupFormComponent";
import Link from "next/link";

export default function Page() {
  return (
    <div className=" py-5 flex flex-col gap-5 items-center">

      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-xl">Sign Up</h2>
        <Link href={'/authentication'} className="text-xs hover:underline">Go Back</Link>
      </div>

      <SignupFormComponent />

    </div>
  )
}