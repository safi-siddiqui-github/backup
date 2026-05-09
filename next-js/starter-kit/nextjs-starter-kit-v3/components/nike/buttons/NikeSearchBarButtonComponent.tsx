'use client';

import { NikeSearchBarEventEmitter } from "@/lib/nike/events";
import { Search } from "lucide-react";

export default function NikeSearchBarButtonComponent() {
  return (
    <button onClick={() => NikeSearchBarEventEmitter.emit("openSearchBar")}>
      <Search className="size-6" />
    </button>
  )
}
