"use client";

import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import GlassEffectButtonComponent from "@/app/_private/(theme)/glass-effect/GlassEffectButtonComponent";
import GlassEffectCardComponent from "@/app/_private/(theme)/glass-effect/GlassEffectCardComponent";
import GlassEffectIconComponent from "@/app/_private/(theme)/glass-effect/GlassEffectIconComponent";
import { ModifyEventVenueFromFormToStore } from "@/app/api/web/auth/event-model/store/_private/lib";
import {
  WebEventCreateOneSchemaInfer,
  WebEventCreateVenueSchema,
  WebEventCreateVenueSchemaInfer,
} from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent, RHFDataType } from "@/lib/lib-react-hook-form";
import { cn } from "@/lib/lib-shadcn";
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
import { useEventStore } from "@/store/store-event";
import { useEventVenueStore } from "@/store/store-event-venue";
import { EventVenueModelAddressType } from "@/type/type-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { EditIcon, MapPinIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import {
  ShadcnAccordionContentComponent,
  ShadcnAccordionTriggerComponent,
} from "../../../../../../../_private/(shadcn)/ShadcnAccordianComponent";
import { WebEventVenueTypeAllAction } from "../../../_private/action";
import WebEventCreateErrorIndicatorComponent from "../../../_private/WebEventCreateErrorIndicatorComponent";

export default function WebEventCreateVenueComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateOneSchemaInfer>();
  const { event } = useEventStore();
  const { eventVenues, addEventVenue, updateEventVenue, removeEventVenue } =
    useEventVenueStore();

  const venueForm = useForm<WebEventCreateVenueSchemaInfer>({
    resolver: zodResolver(WebEventCreateVenueSchema),
    defaultValues: {
      name: "",
      venueType: "PHYSICAL",
      address: "",
      virtualLink: "",
      virtualLinkPass: "",
      // placeId: "",
      // latitude: "",
      // longitude: "",
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const venueTypeWatch = useWatch({
    control: venueForm?.control,
    name: "venueType",
  });

  const addressWatch = useWatch({
    control: venueForm?.control,
    name: "address",
  });

  const addressTypeMemo: EventVenueModelAddressType = useMemo(() => {
    return addressWatch ? JSON.parse(addressWatch) : {};
  }, [addressWatch]);

  useEffect(() => {
    venueForm?.setValue("name", addressTypeMemo?.displayName ?? "");
  }, [addressTypeMemo, venueForm]);

  const { data: eventVenueTypes } = useQuery({
    queryKey: ["event-venue-types"],
    queryFn: WebEventVenueTypeAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) =>
      res?.data?.eventVenueTypes?.map<RHFDataType>((item) => {
        const obj: RHFDataType = { value: item };

        switch (item) {
          case "PHYSICAL":
            obj.label = "Physical";
            break;

          case "VIRTUAL":
            obj.label = "Virtual";
            break;

          case "HYBRID":
            obj.label = "Hybrid";
            break;
        }

        return obj;
      }) ?? [],
  });

  const openDialogFN = () => {
    setDialogOpen(true);
  };

  const updateFN = (index?: number) => {
    setEditingIndex(index ?? null);
    const eventVenue = eventVenues?.at(index ?? 0);
    // venueForm.setValue("name", eventVenue?.name ?? "");
    venueForm.setValue("venueType", eventVenue?.venueType ?? "PHYSICAL");
    venueForm.setValue("address", eventVenue?.address ?? "");
    venueForm.setValue("virtualLink", eventVenue?.virtualLink ?? "");
    venueForm.setValue("virtualLinkPass", eventVenue?.virtualLinkPass ?? "");
    // venueForm.setValue("placeId", eventVenue?.placeId ?? "");
    // venueForm.setValue("latitude", eventVenue?.latitude ?? "");
    // venueForm.setValue("longitude", eventVenue?.longitude ?? "");
    setDialogOpen(true);
  };

  const errorNotify = useMemo(() => {
    const { eventVenues } = form?.formState?.errors ?? {};
    const obj = WebEventCreateErrorIndicatorComponent({
      children: eventVenues?.message,
    });

    if (eventVenues) {
      return obj;
    }
  }, [form.formState]);

  const saveFN = venueForm.handleSubmit(
    (data: WebEventCreateVenueSchemaInfer) => {
      const eventVenuesModified = ModifyEventVenueFromFormToStore([data]);

      if (editingIndex !== null) {
        updateEventVenue({
          id: editingIndex + 1,
          ...eventVenuesModified?.at(0),
        });
      } else {
        addEventVenue(eventVenuesModified?.at(0));
      }

      setDialogOpen(false);
      setEditingIndex(null);
    },
  );

  return (
    <div className="flex flex-col">
      <GlassEffectAccordionItemComponent
        accordianProps={{
          value: "venue",
        }}
      >
        <ShadcnAccordionTriggerComponent>
          <div className="flex items-center gap-2">
            <GlassEffectIconComponent>
              <MapPinIcon />
            </GlassEffectIconComponent>

            <p>Venue Location</p>

            <CardDescription className="hidden font-normal md:block">
              {event?.eventVenues?.at(0)?.name}
            </CardDescription>

            {errorNotify}
          </div>
        </ShadcnAccordionTriggerComponent>
        <ShadcnAccordionContentComponent className="px-1">
          <div
            className={cn("flex flex-col gap-4", {
              hidden: eventVenues?.length === 0,
            })}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardDescription>Add Multiple locations</CardDescription>

              <GlassEffectButtonComponent
                type="button"
                onClick={openDialogFN}
              >
                <PlusIcon />
                <span>Add Venue</span>
              </GlassEffectButtonComponent>
            </div>

            {eventVenues?.map((item, index) => (
              <GlassEffectCardComponent
                key={item.slug}
                // className="*:flex-row *:flex-wrap *:justify-between md:*:flex-nowrap"
                className="p-4"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-4">
                    <CardTitle>{item?.name}</CardTitle>
                    <Badge>{item?.venueType}</Badge>
                  </div>

                  {item?.venueType !== "PHYSICAL" && (
                    <>
                      <CardDescription>
                        Link: {item?.virtualLink}
                      </CardDescription>
                      <CardDescription>
                        Pass: {item?.virtualLinkPass}
                      </CardDescription>
                    </>
                  )}

                  {item?.venueType !== "VIRTUAL" && (
                    <>
                      <CardDescription>
                        Address: {item?.addressType?.formattedAddress}
                      </CardDescription>
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
                    onClick={() => removeEventVenue(item?.slug ?? undefined)}
                  >
                    <TrashIcon className="size-5" />
                  </Button>
                </div>
              </GlassEffectCardComponent>
            ))}
          </div>

          <GlassEffectCardComponent
            className={cn(
              "items-center py-10 text-center *:items-center md:py-10",
              {
                hidden: eventVenues?.length !== 0,
              },
            )}
          >
            <MapPinIcon className="size-10" />
            <div className="flex flex-col">
              <CardTitle className="text-xl">No Venues</CardTitle>
              <CardDescription>
                There are no locations for this event.
              </CardDescription>
            </div>

            <GlassEffectButtonComponent
              type="button"
              onClick={openDialogFN}
            >
              <PlusIcon />
              <span>Add Venues</span>
            </GlassEffectButtonComponent>
          </GlassEffectCardComponent>
        </ShadcnAccordionContentComponent>
      </GlassEffectAccordionItemComponent>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle>Add Venue</DialogTitle>
            <DialogDescription>Venue Details for this event</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {/* <RHFComponent
              form={venueForm}
              name="name"
              fieldType="input"
              label="Name"
              inputProps={{
                placeholder: "Venue Name",
                readOnly: true,
                className: "scale-0",
              }}
            /> */}
            <RHFComponent
              form={venueForm}
              name="venueType"
              fieldType="radio-group"
              label="Type"
              arrayData={eventVenueTypes}
            />

            {venueTypeWatch !== "VIRTUAL" && (
              <>
                <RHFComponent
                  form={venueForm}
                  name="address"
                  fieldType="map-autocomplete"
                  label="Location"
                  divProps={{
                    className: "h-96",
                  }}
                />
              </>
            )}

            {venueTypeWatch !== "PHYSICAL" && (
              <>
                <RHFComponent
                  form={venueForm}
                  name="virtualLink"
                  label="Meeting Link"
                  fieldType="input"
                  inputProps={{
                    placeholder: "https://zoom.us/my-link",
                  }}
                />
                <RHFComponent
                  form={venueForm}
                  name="virtualLinkPass"
                  label="Meeting ID / Password"
                  fieldType="input"
                  inputProps={{
                    placeholder: "Secure your meetups",
                  }}
                />
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
