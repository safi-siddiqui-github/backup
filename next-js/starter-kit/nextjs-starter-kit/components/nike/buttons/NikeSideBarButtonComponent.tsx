'use client';

import { NikeSidebarEventEmitter } from "@/lib/nike/events";
import { Menu, } from "lucide-react";

export default function NikeSideBarButtonComponent() {
  return (
    <button onClick={() => NikeSidebarEventEmitter.emit("openSidebar")}>
      <Menu className="size-6" />
    </button>
  )
}
