"use client";

import { sidebarData } from "@/lib/data";
import { Triangle } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

type Props = {};

export default function Sidebar(props: Props) {
  const pathname = usePathname();

  return (
    <div className="w-18 sm:w-28 h-screen top-0 py-10 px-2 sm:px-6 border bg-background border-border flex flex-col items-center justify-start gap-10">
      <Triangle />

      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-fit flex flex-col gap-4 items-center justify-center">
          {sidebarData.map((each, index) => (
            <TooltipProvider key={`sidebar-item-${index}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant={
                      pathname?.includes(each.link) ? "default" : "ghost"
                    }
                  >
                    <Link href={each.link} className="">
                      <each.icon className="" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{each.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <UserButton />
      </div>
    </div>
  );
}
