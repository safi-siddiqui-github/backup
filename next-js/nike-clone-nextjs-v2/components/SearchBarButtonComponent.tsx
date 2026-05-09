'use client';

import { SearchBarEventEmitter } from "@/utils/events";
import { Search } from "lucide-react";

export default function SearchBarButtonComponent() {
  return (
    <button onClick={() => SearchBarEventEmitter.emit("openSearchBar")}>
      <Search className="size-6" />
    </button>
  )
}
