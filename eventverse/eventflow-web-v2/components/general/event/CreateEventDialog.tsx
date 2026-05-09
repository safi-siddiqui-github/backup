"use client";

import { EventWithSubsTwo, findEvent, upsertEvent } from "@/actions/event";
import CreateEventStepFour from "@/components/ui-extends/event/CreateEventStepFour";
import CreateEventStepOne from "@/components/ui-extends/event/CreateEventStepOne";
import CreateEventStepThree from "@/components/ui-extends/event/CreateEventStepThree";
import CreateEventStepTwo from "@/components/ui-extends/event/CreateEventStepTwo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Loader, Sparkles, Zap } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function CreateEventDialog() {
  const [eventSlug, setEventSlug] = useState<string>("");
  const [event, setEvent] = useState<EventWithSubsTwo | null>(null);
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const triggerRef = useRef<HTMLButtonElement>(null);
  //
  const formBlocks = useMemo(
    () => [
      {
        step: 1,
        title: "Event Basics",
        description: "What, when and where",
      },
      {
        step: 2,
        title: "Features",
        description: "Choose functionality",
      },
      {
        step: 3,
        title: "Configuration",
        description: "Fine-tune settings",
      },
      {
        step: 4,
        title: "Launch",
        description: "Review and publish",
      },
    ],
    [],
  );
  //
  const handleSimpleEvent = useCallback(
    async (e: Event) => {
      setIsLoading(true);
      triggerRef.current?.click();

      const customEvent = e as CustomEvent;
      const { id }: { id?: number } = customEvent.detail;

      if (user.isLoaded) {
        const event = await upsertEvent({
          id,
          hostId: user?.user?.id,
        });

        setEventSlug(event?.slug);
      }

      setIsLoading(false);
    },
    [user.isLoaded, user?.user?.id],
  );
  //
  useEffect(() => {
    window.addEventListener("createEventTrigger", handleSimpleEvent);
    return () =>
      window.removeEventListener("createEventTrigger", handleSimpleEvent);
  }, [handleSimpleEvent]);
  //
  const findEventFN = useCallback(async () => {
    setIsLoading(true);
    const eventLT = await findEvent(eventSlug);
    setEvent(eventLT);
    setIsLoading(false);
  }, [eventSlug]);
  //
  useEffect(() => {
    findEventFN();
  }, [eventSlug, findEventFN]);
  //
  useEffect(() => {
    setFormStep(event?.step ?? 1);
  }, [event]);
  //
  const handleProgress = useCallback((): number => {
    switch (formStep) {
      case 1:
        return 25;
        break;
      case 2:
        return 50;
        break;
      case 3:
        return 75;
        break;
      case 4:
        return 100;
        break;

      default:
        return 0;
        break;
    }
  }, [formStep]);
  //
  useEffect(() => {
    window.addEventListener("eventFormSubmitted", findEventFN);
    return () => {
      window.removeEventListener("eventFormSubmitted", findEventFN);
    };
  }, [findEventFN]);
  //
  return (
    <Dialog>
      <DialogTrigger
        ref={triggerRef}
        className="hidden"
      ></DialogTrigger>
      <DialogContent className="h-fit max-h-full w-full !max-w-4xl overflow-auto">
        <DialogHeader className="">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles /> Create Amazing Event
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Switch />
              <Zap />
              <p className="">Quick Create</p>
            </div>

            <Progress value={handleProgress()} />

            <DialogDescription>Step {formStep} of 4</DialogDescription>
          </div>

          <Button variant={"outline"}>Save Draft</Button>
        </div>

        <div className="relative flex flex-col gap-8">
          {isLoading ? (
            <div className="absolute top-0 left-0 z-10 flex h-full w-full items-start justify-center bg-black/5 py-5">
              <Loader className="animate-spin" />
            </div>
          ) : null}

          <Tabs
            value={String(formStep)}
            className="gap-8"
          >
            <TabsList className="grid h-fit w-full grid-cols-1 md:grid-cols-4">
              {formBlocks?.map((each, index) => (
                <TabsTrigger
                  value={String(each.step ?? 1)}
                  key={index}
                  className={cn("flex flex-col items-center rounded-lg p-4", {
                    // "bg-zinc-50 text-zinc-500": each?.step !== formStep,
                    // "border-purple-500 bg-purple-50 text-purple-500":
                    //   each?.step === formStep,
                    // "border-green-500 bg-green-50 text-green-500":
                    //   each?.step < formStep,
                  })}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border text-xl">
                    {each?.step}
                  </div>
                  <p className="font-medium">{each?.title}</p>
                  <p className="text-sm">{each?.description}</p>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="1">
              <CreateEventStepOne event={event} />
            </TabsContent>

            <TabsContent value="2">
              <CreateEventStepTwo event={event} />
            </TabsContent>

            <TabsContent value="3">
              <CreateEventStepThree event={event} />
            </TabsContent>

            <TabsContent value="4">
              <CreateEventStepFour event={event} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
