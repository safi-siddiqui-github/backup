"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CreateEventTrigger() {
  function triggerCustomEvent() {
    const event = new CustomEvent("createEventTrigger", {
      detail: { id: 0 },
    });

    window.dispatchEvent(event);
  }

  return (
    <Button
      variant={"outline"}
      onClick={triggerCustomEvent}
    >
      <Plus />
      Create Event
    </Button>
  );
}
