import {
  CategoryWithSubs,
  EventWithSubsTwo,
  findCategories,
  findVenueTypes,
  upsertEvent,
} from "@/actions/event";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { eventStepOneFormSchema } from "@/lib/validation/event";
import { VenueType } from "@/prisma/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowBigRight,
  CalendarDays,
  MapPin,
  Search,
  Sparkle,
  Wand,
  WandSparkles,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import z from "zod";

type EventFormType = z.infer<typeof eventStepOneFormSchema>;

export default function CreateEventStepOne(props: {
  event?: EventWithSubsTwo | null;
}) {
  //
  const event = props?.event ?? null;
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryWithSubs[]>([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [debounceSearchCategory] = useDebounce(searchCategory, 1000);
  const [venueTypes, setvenueTypes] = useState<VenueType[]>([]);
  //
  const eventStepOneForm = useForm<EventFormType>({
    resolver: zodResolver(eventStepOneFormSchema),
    values: {
      name: event?.name ?? "",
      slug: event?.slug ?? "",
      description: event?.description ?? "",
      isPublic: event?.isPublic ?? false,
      categoryId: String(event?.categoryId ?? ""),
      //
      isVenueEnabled: event?.isVenueEnabled ?? false,
      venueName: event?.venueName ?? "",
      venueType: event?.venueType ?? "NONE",
      venueAddress: event?.venueAddress ?? "",
      venueLink: event?.venueLink ?? "",
      venueCapacity: String(event?.venueCapacity ?? ""),
      venueFeature: event?.venueFeature ?? "",
    },
  });
  //
  const isVenueEnabled = eventStepOneForm.watch("isVenueEnabled");
  const venueType = eventStepOneForm.watch("venueType");
  //
  const findCategoriesFN = useCallback(async () => {
    const result = await findCategories(debounceSearchCategory);
    setCategories(result);
  }, [debounceSearchCategory]);
  //
  const findVenueTypesFN = useCallback(async () => {
    const result = await findVenueTypes();
    setvenueTypes(result);
  }, []);
  //
  useEffect(() => {
    findCategoriesFN();
    findVenueTypesFN();
  }, [findCategoriesFN, findVenueTypesFN]);
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
        step: 2,
        ...values,
      });
      //
      triggerCustomEvent();
      //
      setIsLoading(false);
    },
    [event?.id, triggerCustomEvent],
  );
  //
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center text-center text-purple-500">
        <CalendarDays className="size-10" />
        <p className="text-xl font-semibold">Event Basics</p>
        <p className="">Lets start with the fundamentals of your event</p>
      </div>

      <Form {...eventStepOneForm}>
        <form
          onSubmit={eventStepOneForm.handleSubmit(handleForm)}
          className="flex flex-col gap-10"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={eventStepOneForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col items-start">
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Event"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={eventStepOneForm.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col items-start">
                  <FormLabel>Event Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="event-slug-pretty"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={eventStepOneForm.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-start gap-2">
                  <FormLabel>Is Event Public</FormLabel>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={eventStepOneForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="My Event Description"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={eventStepOneForm.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel className="">
                  <Search className="size-5" />
                  Event Type
                </FormLabel>
                <Input
                  placeholder="My Event Type"
                  onChange={(e) => setSearchCategory(e.target.value)}
                />
                <FormMessage />

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col"
                  >
                    <Accordion
                      type="single"
                      collapsible
                    >
                      {categories?.map((each, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className=""
                        >
                          <AccordionTrigger>
                            {each.name} ({each.subCategories?.length})
                          </AccordionTrigger>
                          <AccordionContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {each.subCategories?.map((eachC) => (
                              <FormItem
                                className="flex items-center gap-2"
                                key={eachC?.id}
                              >
                                <FormLabel className="flex flex-1 flex-col">
                                  <Card className="w-full">
                                    <CardHeader>
                                      <CardTitle className="flex flex-wrap items-center gap-2">
                                        <Sparkle />
                                        <p className="flex-1">{eachC.name}</p>

                                        <FormControl>
                                          <RadioGroupItem
                                            value={String(eachC.id)}
                                          />
                                        </FormControl>
                                      </CardTitle>
                                      <CardDescription>
                                        {eachC.description}
                                      </CardDescription>
                                    </CardHeader>
                                  </Card>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <WandSparkles />
              <p className="text-xl font-semibold">AI Theme Generator</p>

              <Badge variant={"default"}>Beta</Badge>
            </div>

            <FormItem className="">
              <FormLabel>Describe your ideal theme</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg: Elegant winter wedding with gold accents"
                  className="truncate"
                />
              </FormControl>
            </FormItem>

            <Button
              variant={"outline"}
              className="w-fit"
              type="button"
            >
              <Wand />
              Generate
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <MapPin />
                <p className="text-xl font-semibold">Venue Details</p>
              </div>

              <FormField
                control={eventStepOneForm.control}
                name="isVenueEnabled"
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={eventStepOneForm.control}
                name="venueName"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col items-start">
                    <FormLabel>Venue Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Venue Name"
                        disabled={!isVenueEnabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={eventStepOneForm.control}
                name="venueType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!isVenueEnabled}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {venueTypes.map((each, index) => (
                          <SelectItem
                            key={index}
                            value={each}
                          >
                            {each}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {venueType === "PHYSICAL" || venueType === "HYBRID" ? (
                <FormField
                  control={eventStepOneForm.control}
                  name="venueAddress"
                  key="venueAddress"
                  render={({ field }) => (
                    <FormItem className="col-span-full flex flex-1 flex-col items-start">
                      <FormLabel>Venue Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Complete Venue Address"
                          disabled={!isVenueEnabled}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}

              {venueType === "VIRTUAL" || venueType === "HYBRID" ? (
                <FormField
                  control={eventStepOneForm.control}
                  name="venueLink"
                  key="venueLink"
                  render={({ field }) => (
                    <FormItem className="col-span-full flex flex-1 flex-col items-start">
                      <FormLabel>Venue Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Complete Venue Link"
                          disabled={!isVenueEnabled}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}

              <FormField
                control={eventStepOneForm.control}
                name="venueCapacity"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col items-start">
                    <FormLabel>Venue Capacity (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: 150"
                        disabled={!isVenueEnabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={eventStepOneForm.control}
                name="venueFeature"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col items-start">
                    <FormLabel>Venue Features (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: Parking, Wifi, Kitchen"
                        disabled={!isVenueEnabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
            >
              Proceed to features
              <ArrowBigRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
