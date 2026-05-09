import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { Calendar } from "lucide-react";
import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import HeaderLogo from "./HeaderLogo";

export default async function HeaderGeneral() {
  return (
    <div className="fixed z-10 flex w-full flex-col bg-black/70 backdrop-blur-lg lg:px-8 2xl:items-center">
      <header className="flex flex-wrap items-center justify-between gap-4 p-4 2xl:container">
        <nav className="text-white">
          <HeaderLogo />
        </nav>

        <nav className="flex flex-wrap items-center gap-4">
          <Button
            variant={"outline"}
            asChild
          >
            <Link href={Routes.home}>
              <Calendar className="size-4" />
              Discover Events
            </Link>
          </Button>

          <HeaderAuth />
        </nav>
      </header>
    </div>
  );
}
