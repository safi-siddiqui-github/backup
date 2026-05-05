"use client";

import { HeadingTwoComponent } from "@/app/_private/(shadcn)/TextComponent";
import GlassEffectButtonComponent from "@/app/_private/(theme)/glass-effect/GlassEffectButtonComponent";
import { useEventStore } from "@/store/store-event";
import {
  CameraIcon,
  FileTextIcon,
  PuzzleIcon,
  SettingsIcon,
} from "lucide-react";
import { useMemo } from "react";

export default function WebEventCreateHeadingComponent() {
  const { event } = useEventStore();
  const textHeading = useMemo(() => {
    switch (event?.step) {
      case 1:
        return "Essential Details";
        break;
      case 2:
        return "Event Photos";
        break;
      case 3:
        return "Features & Modules";
        break;
      case 4:
        return "Optional Details";
        break;

      default:
        return "Essential Details";
        break;
    }
  }, [event?.step]);

  const Icon = useMemo(() => {
    switch (event?.step) {
      case 1:
        return <FileTextIcon className="size-5" />;
        break;
      case 2:
        return <CameraIcon className="size-5" />;
        break;
      case 3:
        return <PuzzleIcon className="size-5" />;
        break;
      case 4:
        return <SettingsIcon className="size-5" />;
        break;

      default:
        break;
    }
  }, [event?.step]);

  return (
    <div className="flex items-center gap-2">
      {/* <WebButtonComponent size={"icon-lg"}>{Icon}</WebButtonComponent> */}
      <GlassEffectButtonComponent className="py-4">
        {Icon}
      </GlassEffectButtonComponent>
      <div className="flex flex-col">
        <HeadingTwoComponent>{textHeading}</HeadingTwoComponent>
        <p className="">Step {event?.step} of 4</p>
      </div>
    </div>
  );
}
