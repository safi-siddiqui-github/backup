import { Routes } from "@/lib/lib-routes";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeSeeMoreComponent() {
  return (
    <div className="flex items-center justify-center">
      <Link
        href={Routes.web.general.events}
        className="flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-purple-600 hover:to-cyan-600 hover:text-base"
      >
        <span>See More Events</span>
        <ArrowRight />
      </Link>
      {/* <button className="group relative overflow-hidden rounded-full bg-linear-to-r from-purple-600 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:cursor-pointer hover:shadow-xl">
        <span className="relative z-10 flex items-center gap-2">
          See More Events
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button> */}
    </div>
  );
}
