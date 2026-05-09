import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { CircleUserRound, Plus } from "lucide-react";
import Link from "next/link";

export default function HeaderComponent() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-white px-8 py-4">
      {/*  */}
      <Link
        href={Routes.home}
        className="text-xl font-semibold"
      >
        EventVerse
      </Link>

      {/*  */}
      <div className="hidden gap-5 font-medium tracking-tight md:flex">
        <Link href={Routes.home}>Home</Link>
        <Link href={Routes.home}>Create Event</Link>
        <Link href={Routes.events}>Discover Events</Link>
        <Link href={Routes.home}>About</Link>
        <Link href={Routes.contact}>Contact</Link>
      </div>

      {/*  */}
      <div className="flex flex-wrap gap-2">
        <Button 
          className="bg-purple-600 hover:bg-purple-700 rounded-full"
          asChild
        >
          <Link href={Routes.home}>
            <Plus />
            Create Event
          </Link>
        </Button>

        <Button
          asChild
          variant={"outline"}
        >
          <Link href={Routes.login}>
            <CircleUserRound />
            Log In
          </Link>
        </Button>
      </div>
    </div>
  );
}
