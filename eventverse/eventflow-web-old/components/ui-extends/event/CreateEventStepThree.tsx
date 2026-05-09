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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { eventStepThreeFormSchema } from "@/lib/validation/event";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Clock,
  Component,
  Settings,
  TriangleAlert,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type EventFormType = z.infer<typeof eventStepThreeFormSchema>;

export default function CreateEventStepThree(props: {
  event?: EventWithSubsTwo | null;
}) {
  //
  const event = props?.event ?? null;
  const [isLoading, setIsLoading] = useState(false);
  const [modules, setModules] = useState<ModuleWithSubs[]>([]);
  //
  const eventStepThreeForm = useForm<EventFormType>({
    resolver: zodResolver(eventStepThreeFormSchema),
    values: {},
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
  const handleForm = useCallback(async () => {
    setIsLoading(true);
    //
    await upsertEvent({
      id: event?.id,
      step: 4,
    });
    //
    triggerCustomEvent();
    setIsLoading(false);
  }, [event?.id, triggerCustomEvent]);
  //
  const moveBack = useCallback(async () => {
    setIsLoading(true);
    //
    await upsertEvent({
      id: event?.id,
      step: 2,
    });
    //
    triggerCustomEvent();
    setIsLoading(false);
  }, [event?.id, triggerCustomEvent]);
  //
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <Badge>
          <Settings />
          Event Configuration
        </Badge>

        <p className="text-xl font-semibold">Review your module setup</p>
        <p className="max-w-xl">
          Here&apos;s the current status of your selected modules. Don&apos;t
          worry - you can configure everything in detail after creating your
          event.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-wrap justify-between gap-2">
            <CardTitle className="flex items-center gap-2">
              <Component />
              Module Configuration Status
            </CardTitle>

            <CardAction>
              <CardDescription className="flex items-center gap-2">
                <Settings className="size-4" />
                <p className="">0 of {modules?.length} modules configured</p>
              </CardDescription>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 text-center">
            <div className="flex flex-1 flex-col">
              <p className="text-lg font-semibold">0</p>
              <p className="">Completed</p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-lg font-semibold">3</p>
              <p className="">Needs Setup</p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-lg font-semibold">0</p>
              <p className="">Optional</p>
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={1} />
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-2">
          {modules?.map((each) => (
            <Card key={each.id}>
              <CardHeader className="flex flex-wrap justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <CardTitle className="flex items-center gap-2">
                    <TriangleAlert />
                    {each?.category?.name}
                    <Badge variant={"destructive"}>Needs Setup</Badge>
                  </CardTitle>

                  <CardDescription>
                    {each?.category?.description}
                  </CardDescription>
                </div>

                <CardAction className="">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" /> 5 min
                  </div>
                </CardAction>
              </CardHeader>
              <CardFooter className="">
                <p className="">Next steps:</p>
                &nbsp;
                <p className="text-sm">{each?.category?.optionOne}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Form {...eventStepThreeForm}>
        <form
          onSubmit={eventStepThreeForm.handleSubmit(handleForm)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-wrap justify-between gap-1">
            <Button
              variant={"outline"}
              onClick={() => moveBack()}
              type="button"
              disabled={isLoading}
            >
              <ArrowBigLeft />
              Back to features
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
            >
              Continue to Launch
              <ArrowBigRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
