"use client";

import {
  ShadcnAccordionContentComponent,
  ShadcnAccordionTriggerComponent,
} from "@/app/_private/(shadcn)/ShadcnAccordianComponent";
import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import GlassEffectButtonComponent from "@/app/_private/(theme)/glass-effect/GlassEffectButtonComponent";
import GlassEffectCardComponent from "@/app/_private/(theme)/glass-effect/GlassEffectCardComponent";
import GlassEffectIconComponent from "@/app/_private/(theme)/glass-effect/GlassEffectIconComponent";
import { ModifyEventDaysFromFormToStore } from "@/app/api/web/auth/event-model/store/_private/lib";
import {
  WebEventCreateDaySchema,
  WebEventCreateDaySchemaInfer,
  WebEventCreateOneSchemaInfer,
} from "@/app/api/web/auth/event-model/store/_private/validation";
import {
  LibDateFormatHelper,
  LibDateToISOFormatHelper,
  LibTimeFormatHelper,
} from "@/lib/lib-date";
import { RHFComponent, RHFDataType } from "@/lib/lib-react-hook-form";
import { cn } from "@/lib/lib-shadcn";
import { TimezoneRHFHelper } from "@/lib/lib-timezone";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/shadcn/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { useEventDayStore } from "@/store/store-event-day";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { addHours } from "date-fns";
import {
  CalendarIcon,
  EditIcon,
  MapPinIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import {
  WebEventDateTypeAllAction,
  WebEventRecurringEndAllAction,
  WebEventRecurringPatternAllAction,
} from "../../../_private/action";
import WebEventCreateErrorIndicatorComponent from "../../../_private/WebEventCreateErrorIndicatorComponent";

export default function WebEventCreateDayComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateOneSchemaInfer>();
  const { eventDays, addEventDay, updateEventDay, removeEventDay } =
    useEventDayStore();

  const errorNotify = useMemo(() => {
    const { eventDays } = form?.formState?.errors ?? {};

    const obj = WebEventCreateErrorIndicatorComponent({
      children: eventDays?.message,
    });

    if (eventDays) {
      return obj;
    }
  }, [form.formState]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const today = useMemo(() => {
    return new Date();
  }, []);

  const openDialogFN = () => {
    setDialogOpen(true);
  };

  const dayForm = useForm<WebEventCreateDaySchemaInfer>({
    resolver: zodResolver(WebEventCreateDaySchema),
    defaultValues: {
      eventDate: LibDateToISOFormatHelper(today),
      timezone: "",
      startTime: LibTimeFormatHelper(today),
      endTime: LibTimeFormatHelper(addHours(today, 1)),
      eventDateType: "SINGLE",
      eventRecurringPattern: "DAILY",
      eventRecurringEnd: "NEVER",
      recurringEndDate: LibDateToISOFormatHelper(today),
      recurringEndOccurrences: "",
    },
  });

  const updateFN = (index?: number) => {
    setEditingIndex(index ?? null);
    const eventDay = eventDays?.at(index ?? 0);

    dayForm.setValue(
      "eventDate",
      LibDateToISOFormatHelper(eventDay?.eventDate),
    );
    dayForm.setValue("timezone", eventDay?.timezone ?? "");
    dayForm.setValue("startTime", eventDay?.startTime ?? "");
    dayForm.setValue("endTime", eventDay?.endTime ?? "");
    dayForm.setValue("eventDateType", eventDay?.eventDateType ?? "SINGLE");
    dayForm.setValue(
      "eventRecurringPattern",
      eventDay?.eventRecurringPattern ?? "DAILY",
    );
    dayForm.setValue(
      "eventRecurringEnd",
      eventDay?.eventRecurringEnd ?? "NEVER",
    );
    dayForm.setValue(
      "recurringEndDate",
      LibDateToISOFormatHelper(eventDay?.recurringEndDate),
    );
    dayForm.setValue(
      "recurringEndOccurrences",
      eventDay?.recurringEndOccurrences
        ? String(eventDay?.recurringEndOccurrences)
        : undefined,
    );

    setDialogOpen(true);
  };

  const saveFN = dayForm.handleSubmit((data: WebEventCreateDaySchemaInfer) => {
    const modified = ModifyEventDaysFromFormToStore([data]);

    if (editingIndex !== null) {
      updateEventDay({
        id: editingIndex + 1,
        ...modified?.at(0),
      });
    } else {
      addEventDay(modified?.at(0));
    }

    setDialogOpen(false);
    setEditingIndex(null);
  });

  const timezones = useMemo(() => TimezoneRHFHelper(), []);

  const { data: eventDateTypes } = useQuery({
    queryKey: ["event-date-types"],
    queryFn: WebEventDateTypeAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) =>
      res?.data?.eventDateTypes?.map<RHFDataType>((item) => {
        const obj: RHFDataType = { value: item };

        switch (item) {
          case "SINGLE":
            obj.label = "Single";
            break;

          case "RECURRING":
            obj.label = "Recurring";
            break;
        }

        return obj;
      }) ?? [],
  });

  const { data: eventRecurringPatterns } = useQuery({
    queryKey: ["event-recurring-patterns"],
    queryFn: WebEventRecurringPatternAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) =>
      res?.data?.eventRecurringPatterns?.map<RHFDataType>((item) => {
        const obj: RHFDataType = { value: item };

        switch (item) {
          case "DAILY":
            obj.label = "Daily";
            obj.description = "(24 Hrs)";
            break;

          case "WEEKLY":
            obj.label = "Weekly";
            obj.description = "(7 Days)";
            break;

          case "MONTHLY":
            obj.label = "Monthly";
            obj.description = "(4 Weeks)";
            break;

          case "YEARLY":
            obj.label = "Yearly";
            obj.description = "(12 Months)";
            break;
        }

        return obj;
      }) ?? [],
  });

  const { data: eventRecurringEnds } = useQuery({
    queryKey: ["event-recurring-ends"],
    queryFn: WebEventRecurringEndAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) =>
      res?.data?.eventRecurringEnds?.map<RHFDataType>((item) => {
        const obj: RHFDataType = { value: item };

        switch (item) {
          case "NEVER":
            obj.label = "Never";
            break;

          case "DATE":
            obj.label = "On Date";
            break;

          case "OCCURRENCES":
            obj.label = "After X Occurrences";
            break;
        }

        return obj;
      }) ?? [],
  });

  const eventDateTypeWatch = useWatch({
    control: dayForm?.control,
    name: "eventDateType",
  });

  const eventRecurringEndWatch = useWatch({
    control: dayForm?.control,
    name: "eventRecurringEnd",
  });

  return (
    <div className="flex flex-col">
      <GlassEffectAccordionItemComponent
        accordianProps={{
          value: "days",
        }}
      >
        <ShadcnAccordionTriggerComponent>
          <div className="flex items-center gap-2">
            <GlassEffectIconComponent>
              <CalendarIcon />
            </GlassEffectIconComponent>
            <p>Date &amp; Time</p>
            <CardDescription className="hidden font-normal md:block">
              {LibDateFormatHelper(eventDays?.at(0)?.eventDate)}
            </CardDescription>
            {errorNotify}
          </div>
        </ShadcnAccordionTriggerComponent>
        <ShadcnAccordionContentComponent className="px-1">
          <div
            className={cn("flex flex-col gap-4", {
              hidden: eventDays?.length === 0,
            })}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardDescription>Add Multiple days</CardDescription>

              <GlassEffectButtonComponent
                type="button"
                onClick={openDialogFN}
              >
                <PlusIcon />
                <span>Add Days</span>
              </GlassEffectButtonComponent>
            </div>

            {eventDays?.map((item, index) => (
              <GlassEffectCardComponent
                key={item.slug}
                // className="p-4 *:flex-row *:flex-wrap *:justify-between md:*:flex-nowrap"
                className="p-4"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-4">
                    <CardTitle>
                      {LibDateFormatHelper(item?.eventDate)}
                    </CardTitle>
                    <Badge>{item?.eventDateType}</Badge>
                  </div>

                  <CardDescription>Timezone: {item?.timezone}</CardDescription>
                  <CardDescription>Start: {item?.startTime}</CardDescription>
                  <CardDescription>End: {item?.endTime}</CardDescription>

                  {item?.eventDateType === "RECURRING" && (
                    <>
                      <CardDescription>
                        Pattern: {item?.eventRecurringPattern}
                      </CardDescription>
                      <CardDescription>
                        End: {item?.eventRecurringEnd}
                      </CardDescription>

                      {item?.eventRecurringEnd === "DATE" && (
                        <CardDescription>
                          End Date:{" "}
                          {LibDateFormatHelper(item?.recurringEndDate)}
                        </CardDescription>
                      )}

                      {item?.eventRecurringEnd === "OCCURRENCES" && (
                        <CardDescription>
                          Occurrences: {item?.recurringEndOccurrences}
                        </CardDescription>
                      )}
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={"outline"}
                    size={"icon-sm"}
                    onClick={() => updateFN(index)}
                  >
                    <EditIcon className="size-5" />
                  </Button>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-sm"}
                    onClick={() => removeEventDay(item?.slug ?? undefined)}
                  >
                    <TrashIcon className="size-5" />
                  </Button>
                </div>
              </GlassEffectCardComponent>
            ))}
          </div>

          {/* <CardComponent
            className={cn(
              "bg-ev-1/4 dark:bg-ev-1/30 items-center py-10 text-center *:items-center md:py-10",
              {
                hidden: eventDays?.length !== 0,
              },
            )}
          > */}
          <GlassEffectCardComponent
            className={cn(
              "items-center py-10 text-center *:items-center md:py-10",
              {
                hidden: eventDays?.length !== 0,
              },
            )}
          >
            <MapPinIcon className="size-10" />
            <div className="flex flex-col">
              <CardTitle className="text-xl">No Days</CardTitle>
              <CardDescription>
                There are no days for this event.
              </CardDescription>
            </div>

            <GlassEffectButtonComponent
              type="button"
              onClick={openDialogFN}
            >
              <PlusIcon />
              <span>Add Days</span>
            </GlassEffectButtonComponent>
          </GlassEffectCardComponent>
        </ShadcnAccordionContentComponent>
      </GlassEffectAccordionItemComponent>
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Add Day</DialogTitle>
            <DialogDescription>Event Days for this event</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <RHFComponent
              form={dayForm}
              name="eventDate"
              label="Event Date"
              fieldType="date-calendar"
              inputProps={{
                placeholder: "Select Date",
              }}
            />

            <RHFComponent
              form={dayForm}
              name="timezone"
              label="Timezone"
              fieldType="combo-box"
              arrayData={timezones}
              inputProps={{
                placeholder: "Select Timezone",
              }}
            />

            <RHFComponent
              form={dayForm}
              name="startTime"
              label="Start Time"
              fieldType="input"
              inputProps={{
                type: "time",
              }}
            />

            <RHFComponent
              form={dayForm}
              name="endTime"
              label="End Time"
              fieldType="input"
              inputProps={{
                type: "time",
              }}
            />

            <RHFComponent
              form={dayForm}
              name="eventDateType"
              label="Type"
              fieldType="radio-group"
              arrayData={eventDateTypes}
            />

            {eventDateTypeWatch === "RECURRING" && (
              <>
                <RHFComponent
                  form={dayForm}
                  name="eventRecurringPattern"
                  label="Pattern"
                  fieldType="radio-group"
                  arrayData={eventRecurringPatterns}
                />

                <RHFComponent
                  form={dayForm}
                  name="eventRecurringEnd"
                  label="End"
                  fieldType="radio-group"
                  arrayData={eventRecurringEnds}
                />

                {eventRecurringEndWatch === "DATE" && (
                  <RHFComponent
                    form={dayForm}
                    name="recurringEndDate"
                    label="End Date"
                    fieldType="date-calendar"
                    inputProps={{
                      placeholder: "Select Date",
                    }}
                  />
                )}

                {eventRecurringEndWatch === "OCCURRENCES" && (
                  <RHFComponent
                    form={dayForm}
                    name="recurringEndOccurrences"
                    label="Occurrences"
                    fieldType="input"
                    inputProps={{
                      placeholder: "Enter Number",
                    }}
                  />
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              onClick={saveFN}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
