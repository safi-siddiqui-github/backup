"use client";

import ProgressComponent from "@/app/_private/(shadcn)/ProgressComponent";
import GlassEffectCardComponent from "@/app/_private/(theme)/glass-effect/GlassEffectCardComponent";
import { cn } from "@/lib/lib-shadcn";
import { useEventStore } from "@/store/store-event";
import { useMemo } from "react";

export default function WebEventCreateProgressComponent() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:hidden">
        <MobileStepComponent />
      </div>
      <div className="hidden flex-col md:flex">
        <TabletStepComponent />
      </div>
    </div>
  );
}

function MobileStepComponent() {
  const { event } = useEventStore();
  return (
    <GlassEffectCardComponent className="p-4">
      <InlineProgressComponent />
      <div
        className={cn(
          "flex items-center justify-between text-white/50 *:flex *:size-12 *:items-center *:justify-center *:rounded-full *:border *:border-current *:text-2xl *:font-semibold *:shadow-lg",
          {
            // "*:nth-1:text-ev-1 *:nth-1:bg-ev-1/10 *:nth-1:border-ev-1 *:nth-1:border-2":
            //   event?.step == 1,
            // "*:nth-2:text-ev-1 *:nth-2:bg-ev-1/10 *:nth-2:border-ev-1 *:nth-2:border-2":
            //   event?.step == 2,
            // "*:nth-3:text-ev-1 *:nth-3:bg-ev-1/10 *:nth-3:border-ev-1 *:nth-3:border-2":
            //   event?.step == 3,
            // "*:nth-4:text-ev-1 *:nth-4:bg-ev-1/10 *:nth-4:border-ev-1 *:nth-4:border-2":
            //   event?.step == 4,
            "*:nth-1:border-2 *:nth-1:border-current *:nth-1:text-white":
              event?.step == 1,
            "*:nth-2:border-2 *:nth-2:border-current *:nth-2:text-white":
              event?.step == 2,
            "*:nth-3:border-2 *:nth-3:border-current *:nth-3:text-white":
              event?.step == 3,
            "*:nth-4:border-2 *:nth-4:border-current *:nth-4:text-white":
              event?.step == 4,
          },
        )}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </GlassEffectCardComponent>
  );
}

function TabletStepComponent() {
  const { event } = useEventStore();
  return (
    <GlassEffectCardComponent className="p-4">
      <InlineProgressComponent />
      <div
        className={cn(
          "flex items-center gap-1 text-white/50 *:flex *:items-center *:gap-1.5 *:*:nth-1:flex *:*:nth-1:size-10 *:*:nth-1:items-center *:*:nth-1:justify-center *:*:nth-1:rounded-full *:*:nth-1:border *:*:nth-1:text-lg *:*:nth-1:font-medium *:*:nth-2:flex *:*:nth-2:flex-col *:*:nth-2:*:nth-2:text-xs *:*:nth-2:*:nth-1:font-medium lg:gap-4 lg:*:gap-2",
          {
            // "*:nth-1:text-ev-1 *:nth-1:*:nth-1:border-2 *:nth-1:*:nth-1:border-current *:nth-1:*:nth-1:bg-current/10":
            //   event?.step === 1,
            // "*:nth-3:text-ev-1 *:nth-3:*:nth-1:border-2 *:nth-3:*:nth-1:border-current *:nth-3:*:nth-1:bg-current/10":
            //   event?.step === 2,
            // "*:nth-5:text-ev-1 *:nth-5:*:nth-1:border-2 *:nth-5:*:nth-1:border-current *:nth-5:*:nth-1:bg-current/10":
            //   event?.step === 3,
            // "*:nth-7:text-ev-1 *:nth-7:*:nth-1:border-2 *:nth-7:*:nth-1:border-current *:nth-7:*:nth-1:bg-current/10":
            //   event?.step === 4,
            "*:nth-1:*:nth-1:border-2 *:nth-1:*:nth-1:border-current *:nth-1:*:nth-1:bg-current/10 *:nth-1:text-white":
              event?.step === 1,
            "*:nth-3:text-white *:nth-3:*:nth-1:border-2 *:nth-3:*:nth-1:border-current *:nth-3:*:nth-1:bg-current/10":
              event?.step === 2,
            "*:nth-5:text-white *:nth-5:*:nth-1:border-2 *:nth-5:*:nth-1:border-current *:nth-5:*:nth-1:bg-current/10":
              event?.step === 3,
            "*:nth-7:text-white *:nth-7:*:nth-1:border-2 *:nth-7:*:nth-1:border-current *:nth-7:*:nth-1:bg-current/10":
              event?.step === 4,
          },
        )}
      >
        <div>
          <div>1</div>
          <div>
            <p>Essential Details</p>
            <p>In Progress</p>
          </div>
        </div>
        <hr className="flex-1" />
        <div>
          <div>2</div>
          <div>
            <p>Event Photos</p>
            <p>Optional</p>
          </div>
        </div>
        <hr className="flex-1" />
        <div>
          <div>3</div>
          <div>
            <p>Features & Modules</p>
            <p>Optional</p>
          </div>
        </div>
        <hr className="flex-1" />
        <div>
          <div>4</div>
          <div>
            <p>Optional Details</p>
            <p>Optional</p>
          </div>
        </div>
      </div>
    </GlassEffectCardComponent>
  );
}

function InlineProgressComponent() {
  const { event } = useEventStore();
  const progressValue = useMemo(() => {
    switch (event?.step) {
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 75;
      case 4:
        return 100;
      default:
        return 0;
    }
  }, [event?.step]);

  return <ProgressComponent progressValue={progressValue} />;
}
