"use client";

import { Routes } from "@/lib/lib-routes";
import Link from "next/link";
import WebHeaderDropdownComponent from "./WebHeaderDropdownComponent"; 
export default function WebHeaderComponent2() {
  return (
    <div className="flex items-center justify-between p-4">
      <Link
        className="text-3xl font-bold tracking-wide"
        href={Routes?.web?.general?.home}
      >
        <p className="">EventVerse</p>
      </Link>

      <WebHeaderDropdownComponent />
    </div>
  );
}
