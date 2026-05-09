"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function UpdateEventTrigger(props: { id: number }) {
  function triggerCustomEvent() {
    const event = new CustomEvent("createEventTrigger", {
      detail: { id: props.id },
    });

    window.dispatchEvent(event);
  }

  return (
    <Button
      variant={"outline"}
      onClick={triggerCustomEvent}
    >
      <Edit />
      Update Event
    </Button>
  );
}
