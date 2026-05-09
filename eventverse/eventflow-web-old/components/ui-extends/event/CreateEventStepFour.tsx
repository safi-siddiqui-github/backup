import {
  EventWithSubsTwo,
  findModulesWhereEventId,
  ModuleWithSubs,
  upsertEvent,
} from "@/actions/event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { eventStepFourFormSchema } from "@/lib/validation/event";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowBigLeft,
  Bell,
  Calendar,
  ChartBar,
  CircleCheckBig,
  Component,
  Eye,
  Link2,
  PartyPopper,
  ReceiptText,
  Rocket,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type EventFormType = z.infer<typeof eventStepFourFormSchema>;

export default function CreateEventStepFour(props: {
  event?: EventWithSubsTwo | null;
}) {
  //
  const event = props?.event ?? null;
  const [isLoading, setIsLoading] = useState(false);
  const [modules, setModules] = useState<ModuleWithSubs[]>([]);
  //
  const launchBlocks = useMemo(
    () => [
      {
        icon: Users,
        title: "Guest Analytics",
        description: "Track RSVPs, attendance, and engagement",
      },
      {
        icon: Calendar,
        title: "Event Timeline",
        description: "Monitor progress and key milestones",
      },
      {
        icon: Bell,
        title: "Smart Notifications",
        description: "Get alerts for important updates",
      },
      {
        icon: ChartBar,
        title: "Performance Insights",
        description: "Detailed reports and metrics",
      },
    ],
    [],
  );
  //
  const strategies = useMemo(
    () => [
      {
        title: "Save as draft",
        key: "DRAFT",
        description:
          "Save your event privately. You can continue editing and publish later",
        options: [
          "Private and editable",
          "No guest access",
          "Perfect for planning",
        ],
      },
      {
        title: "Soft Launch",
        key: "SOFT",
        description:
          "Launch to a small group first to test everything works perfectly",
        options: ["Limited audience", "Test functionality", "Gather feedback"],
      },
      {
        title: "Full Launch",
        key: "LAUNCH",
        description: "Make your event live and start inviting all your guests",
        options: [
          "Public or private listing",
          "Send invitations",
          "Full functionality",
        ],
      },
    ],
    [],
  );
  //
  const eventStepFourForm = useForm<EventFormType>({
    resolver: zodResolver(eventStepFourFormSchema),
    values: {
      launchStrategy: event?.launchStrategy ?? "NONE",
    },
  });
  //
  const findEventModulesFN = useCallback(async () => {
    const result = await findModulesWhereEventId(event?.id ?? 0);
    setModules(result);
  }, [event?.id]);
  //
  useEffect(() => {
    findEventModulesFN();
  }, [findEventModulesFN]);
  //
  const triggerCustomEvent = useCallback(() => {
    const event = new CustomEvent("eventFormSubmitted", {
      detail: {},
    });

    window.dispatchEvent(event);
  }, []);
  //
  const handleForm = useCallback(
    async (values: EventFormType) => {
      setIsLoading(true);
      //
      await upsertEvent({
        id: event?.id,
        ...values,
      });
      //
      triggerCustomEvent();
      setIsLoading(false);
    },
    [event?.id, triggerCustomEvent],
  );
  //
  const moveBack = useCallback(async () => {
    setIsLoading(true);
    //
    await upsertEvent({
      id: event?.id,
      step: 3,
    });
    //
    triggerCustomEvent();
    setIsLoading(false);
  }, [event?.id, triggerCustomEvent]);
  //
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <p className="">Ready to Launch?</p>
          <Rocket />
        </div>
        <p className="max-w-xl">
          Choose how you want to launch your amazing event
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <Badge>
            <PartyPopper />
            Event Summary
          </Badge>
          <CardTitle className="flex items-center gap-2">
            {event?.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-1">
          <p className="">Basics</p>
          <div className="flex items-center gap-2 text-sm">
            <Link2 />
            <p className="">Slug:</p>
            <p className="font-medium">{event?.slug}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Eye />
            <p className="">Visibility:</p>
            <p className="font-medium">
              {event?.isPublic ? "Public" : "Private"}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm">
              <ReceiptText />
              <p>Description:</p>
            </div>
            <CardDescription className="indent-8">
              {event?.description}
            </CardDescription>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <CircleCheckBig />
            Pre-Launch Readiness
          </CardTitle>

          <CardDescription className="">
            Everything looks great! Your event is ready to launch.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          {modules?.map((each) => (
            <div
              className="flex items-center justify-between"
              key={each.id}
            >
              <div className="flex items-center gap-2">
                <Component className="size-4" />
                {each?.category?.name}
              </div>

              <Badge>Completed</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <ChartBar />
            Post-Launch Monitoring
          </CardTitle>

          <CardDescription className="">
            Track your event&apos;s success with comprehensive analytics and
            insights
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {launchBlocks?.map((each, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-2">
                <each.icon />

                <div className="flex flex-col gap-1">
                  <CardTitle className="flex items-center gap-2">
                    {each?.title}
                  </CardTitle>

                  <CardDescription className="">
                    {each?.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Form {...eventStepFourForm}>
        <form
          onSubmit={eventStepFourForm.handleSubmit(handleForm)}
          className="flex flex-col gap-10"
        >
          <FormField
            control={eventStepFourForm.control}
            name="launchStrategy"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel className="text-xl font-semibold">
                  Choose you launch strategy
                </FormLabel>

                <FormMessage />

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-3"
                  >
                    {strategies?.map((each, index) => (
                      <FormItem
                        className="flex items-center gap-2"
                        key={index}
                      >
                        <FormLabel className="flex flex-1 flex-col">
                          <Card className="w-full">
                            <CardHeader>
                              <CardTitle className="flex flex-wrap items-center gap-2">
                                <Rocket />
                                <p className="flex-1">{each?.title}</p>

                                <FormControl>
                                  <RadioGroupItem value={each?.key} />
                                </FormControl>
                              </CardTitle>
                              <CardDescription>
                                {each?.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-col gap-1 font-normal">
                                {each?.options?.map((eachO) => (
                                  <p key={eachO}>{eachO}</p>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-wrap justify-between gap-1">
            <Button
              variant={"outline"}
              onClick={() => moveBack()}
              type="button"
              disabled={isLoading}
            >
              <ArrowBigLeft />
              Back to configuration
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
            >
              Launch
              <PartyPopper />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
