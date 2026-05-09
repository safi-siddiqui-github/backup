"use client";

import { ArrowLeft, Plus, Triangle, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { User } from "@/lib/generated/prisma";
import CreateWebinar from "./create-webinar";

type Props = {
  user: User;
};

export default function Header(props: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-full px-4 pt-10 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background">
      {pathname?.includes("pipeline") ? (
        <Button
          variant={"outline"}
          onClick={() => router.push("/webinar")}
          className="bg-primary/10 border border-border rounded-xl"
        >
          <ArrowLeft />
          Back to webinars
        </Button>
      ) : (
        <div className="px-4 py-2 flex justify-center font-bold items-center rounded-xl bg-background border border-border text-primary capitalize">
          {pathname?.split("/")[1]}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-6">
        <Button variant={"outline"}>
          <Zap className="" />
        </Button>

        <CreateWebinar />
      </div>
    </div>
  );
}
