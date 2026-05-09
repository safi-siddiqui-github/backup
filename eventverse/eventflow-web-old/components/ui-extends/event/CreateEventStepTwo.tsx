import {
  EventWithSubsTwo,
  findModuleCategories,
  findModulesWhereEventId,
  ModuleCategoryWithSubs,
  upsertEvent,
  upsertModules,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { eventStepTwoFormSchema } from "@/lib/validation/event";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Brain,
  BrainCircuit,
  Component,
  Info,
  Sparkle,
  WandSparkles,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type EventFormType = z.infer<typeof eventStepTwoFormSchema>;

export default function CreateEventStepTwo(props: {
  event?: EventWithSubsTwo | null;
}) {
  //
  const event = props?.event ?? null;
  const [isLoading, setIsLoading] = useState(false);
  const [moduleCategories, setModuleCategories] = useState<
    ModuleCategoryWithSubs[]
  >([]);
  //
  const [selectedModuleCategoryIds, setSelectedModuleCategoryIds] = useState<
    number[]
  >([]);
  //
  const eventStepTwoForm = useForm<EventFormType>({
    resolver: zodResolver(eventStepTwoFormSchema),
    values: {
      moduleCategoryIds: selectedModuleCategoryIds,
    },
  });
  //
  const moduleCategoryIds = eventStepTwoForm.watch("moduleCategoryIds");
  //
  const findModuleCategoriesFN = useCallback(async () => {
    const result = await findModuleCategories();
    setModuleCategories(result);
  }, []);
  //
  const findEventModulesFN = useCallback(async () => {
    const modules = await findModulesWhereEventId(event?.id ?? 0);
    const ids = modules?.map(({ categoryId }) => categoryId ?? 0);
    setSelectedModuleCategoryIds(ids);
  }, [event?.id]);
  //
  useEffect(() => {
    findModuleCategoriesFN();
    findEventModulesFN();
  }, [findModuleCategoriesFN, findEventModulesFN]);
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
      await upsertModules({
        eventId: event?.id ?? 0,
        moduleCategoryIds: values?.moduleCategoryIds ?? [],
      });
      //
      await upsertEvent({
        id: event?.id,
        step: 3,
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
      step: 1,
    });
    //
    triggerCustomEvent();
    setIsLoading(false);
  }, [event?.id, triggerCustomEvent]);
  //
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-xl font-semibold">Choose your event features</p>
          <p className="">Select modules to customize your event experience</p>
        </div>

        <div className="flex flex-col">
          <p className="text-2xl font-bold lining-nums">$0/month</p>
          <p className="text-sm">{moduleCategoryIds?.length} module selected</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-wrap justify-between gap-2">
            <div className="flex flex-col gap-1">
              <CardTitle className="flex items-center gap-2">
                <Brain />
                Smart Module Recommendations
              </CardTitle>
              <CardDescription>
                Based on your wedding with 50 expected guests
              </CardDescription>
            </div>
            <CardAction>
              <Badge>
                <WandSparkles />
                AI Powered
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <Button>
              <Zap />
              Get Smart Recommendations
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit />
              Smart Pricing
            </CardTitle>
            <CardDescription>Base price</CardDescription>
            <CardAction>
              <Badge>
                <Zap />
                AI Optimized
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">$35/month</p>
          </CardContent>
          <CardFooter>
            <Button variant={"ghost"}>
              <Info />
              Why this price
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Form {...eventStepTwoForm}>
        <form
          onSubmit={eventStepTwoForm.handleSubmit(handleForm)}
          className="flex flex-col gap-10"
        >
          <FormField
            control={eventStepTwoForm.control}
            name="moduleCategoryIds"
            render={() => (
              <FormItem className="flex flex-1 flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-xl md:text-2xl md:font-semibold">
                    <Component className="size-5" />
                    Event Modules
                  </FormLabel>
                  <FormMessage />
                </div>

                {moduleCategories.map((category) => (
                  <div
                    className="flex flex-col gap-4"
                    key={category.id}
                  >
                    <div className="flex flex-col">
                      <p className="text-xl font-medium">{category.name}</p>
                      <FormDescription>{category.description}</FormDescription>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {category.subCategories?.map((item) => (
                        <FormField
                          key={item.id}
                          control={eventStepTwoForm.control}
                          name="moduleCategoryIds"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className=""
                              >
                                <FormControl className="hidden">
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>

                                <FormLabel className="">
                                  <Card className="w-full">
                                    <CardHeader>
                                      <CardTitle className="flex flex-wrap items-center gap-2">
                                        <Sparkle />
                                        <p className="flex-1">{item.name}</p>
                                      </CardTitle>
                                      <CardDescription>
                                        {item.description}
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                      <div className="flex flex-col text-sm">
                                        <p className="">{item?.optionOne}</p>
                                        <p className="">{item?.optionTwo}</p>
                                        <p className="">{item?.optionThree}</p>
                                      </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                      <p className="font-semibold">
                                        {item?.price === 0
                                          ? "Free"
                                          : `$${item?.price}/mo`}
                                      </p>

                                      <Button
                                        type="button"
                                        variant={
                                          field.value?.includes(item.id)
                                            ? "default"
                                            : "outline"
                                        }
                                      >
                                        {field.value?.includes(item.id)
                                          ? "Selected"
                                          : "Select"}
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
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
              Back to basics
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
            >
              Proceed to configuration
              <ArrowBigRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
