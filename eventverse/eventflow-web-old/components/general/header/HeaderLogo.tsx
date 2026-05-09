import { Routes } from "@/lib/routes";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <div className="flex flex-col">
      <Link
        href={Routes.home}
        className="text-xl font-bold"
      >
        EventFlow
      </Link>
      <p className="">Your all-in-one event management platform</p>
    </div>
  );
}
