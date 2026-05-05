import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/lib-routes";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function HomeEmptyComponent() {
  return (
    <div className="flex flex-col items-center justify-between gap-2 p-4 md:p-6">
      <Calendar className="size-10 text-current" />
      <p className="text-2xl font-semibold">No Events Found</p>
      <p className="max-w-xs text-center text-sm font-medium tracking-tight text-current/50">
        There are no events in this category for the selected time period. Try a
        different filter or check back later.
      </p>
      <Link href={Routes.web.general.events}>
        <Button className="rounded-full bg-gray-700 hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-200">
          Show All Events
        </Button>
      </Link>
    </div>
  );
}
