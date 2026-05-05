"use client";

import { ShadcnAccordionSingleComponent } from "@/app/_private/(shadcn)/ShadcnAccordianComponent";
import GlassEffectButtonComponent from "@/app/_private/(theme)/glass-effect/GlassEffectButtonComponent";
import {
  ModifyEventCategoryAssignmentFromFormToStore,
  ModifyEventCategoryAssignmentFromStoreToForm,
  ModifyEventDaysFromStoreToForm,
  ModifyEventVenueFromStoreToForm,
} from "@/app/api/web/auth/event-model/store/_private/lib";
import {
  WebEventCreateDateArraySchema,
  WebEventCreateOneSchema,
  WebEventCreateOneSchemaInfer,
  WebEventCreateVenueArraySchema,
} from "@/app/api/web/auth/event-model/store/_private/validation";
import { ResponseDataType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { useEventStore } from "@/store/store-event";
import { useEventDayStore } from "@/store/store-event-day";
import { useEventVenueStore } from "@/store/store-event-venue";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import WebEventCreateBasicInfoComponent from "./WebEventCreateBasicInfoComponent";
import WebEventCreateCategoryComponent from "./WebEventCreateCategoryComponent";
import WebEventCreateDayComponent from "./WebEventCreateDayComponent";
import WebEventCreateDescriptionComponent from "./WebEventCreateDescriptionComponent";
import WebEventCreateVenueComponent from "./WebEventCreateVenueComponent";

export default function WebEventCreateStepOneComponent() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const { event, setEvent } = useEventStore();
  const { eventDays } = useEventDayStore();
  const { eventVenues } = useEventVenueStore();

  const initializedRef = useRef(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(WebEventCreateOneSchema),
    defaultValues: {
      name: "",
      visibility: "PUBLIC",
      description: "",
      searchCategory: "",
      eventCategoryAssignments: [],
      eventDays: [],
      eventVenues: [],
    },
  });

  useEffect(() => {
    if (
      initializedRef.current ||
      !event ||
      !event?.name ||
      !event?.visibility ||
      !event?.description ||
      !event?.eventCategoryAssignments
    )
      return;

    form?.setValue("name", event?.name);
    form?.setValue("visibility", event?.visibility);
    form?.setValue("description", String(event?.description));

    if (Array.isArray(event?.eventCategoryAssignments)) {
      const modified = ModifyEventCategoryAssignmentFromStoreToForm(
        event?.eventCategoryAssignments,
      );

      if (modified && modified?.length > 0) {
        form?.setValue("eventCategoryAssignments", modified);
      }
    }

    initializedRef.current = true;
  }, [event, form]);

  async function onSubmit(data: WebEventCreateOneSchemaInfer) {
    const { name, visibility, description, eventCategoryAssignments } = data;

    const eventDaysModified = ModifyEventDaysFromStoreToForm(eventDays);

    const checkEventDays = WebEventCreateDateArraySchema.safeParse({
      eventDays: eventDaysModified,
    });

    if (!checkEventDays.success) {
      form.setError("eventDays", {
        message: checkEventDays?.error?.issues?.[0]?.message,
        type: "custom",
      });
      return;
    }

    const eventVenuesModified = ModifyEventVenueFromStoreToForm(eventVenues);

    const checkEventVenues = WebEventCreateVenueArraySchema.safeParse({
      eventVenues: eventVenuesModified,
    });

    if (!checkEventVenues.success) {
      form.setError("eventVenues", {
        message: checkEventVenues?.error?.issues?.[0]?.message,
        type: "custom",
      });
      return;
    }

    const modifiedCategories = ModifyEventCategoryAssignmentFromFormToStore(
      eventCategoryAssignments,
    );

    setEvent((event) => {
      if (event) {
        event.step = 2;
        event.name = name;
        event.visibility = visibility as ResponseDataType["eventVisibility"];
        event.description = description;
        event.eventCategoryAssignments = modifiedCategories;
      }
    });

    router.push(Routes.web.general.eventsCreatePhotos);
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-1 flex-col justify-between gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ShadcnAccordionSingleComponent
          defaultValue={"basic"}
          className="flex flex-col gap-4"
        >
          <WebEventCreateBasicInfoComponent />
          <WebEventCreateDescriptionComponent />
          <WebEventCreateDayComponent />
          <WebEventCreateVenueComponent />
          <WebEventCreateCategoryComponent />
        </ShadcnAccordionSingleComponent>

        <div className="flex justify-end">
          <GlassEffectButtonComponent type="submit">
            <span>Move To Event Photos</span>
            <ArrowRightIcon />
          </GlassEffectButtonComponent>
        </div>
      </form>
    </FormProvider>
  );
}
