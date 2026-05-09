'use client';

import { SidebarEventEmitter } from "@/utils/events";
import { Menu } from "lucide-react";

export default function SideBarButtonComponent() {
  return (
    <button onClick={() => SidebarEventEmitter.emit("openSidebar")}>
      <Menu className="size-6" />
    </button>
  )
}
