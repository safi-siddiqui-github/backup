import { Waitlist } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Link href={'/sign-in'}>Login</Link>
      <Waitlist />
    </div>
  );
}
