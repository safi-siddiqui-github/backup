"use client";

import { ShadcnAccordionSingleComponent } from "@/app/_private/(shadcn)/ShadcnAccordianComponent";
import GlassEffectButtonComponent from "@/app/_private/(theme)/glass-effect/GlassEffectButtonComponent";
import {
  ModifyEventFaqsFromStoreToForm,
  ModifyEventFeaturesFromFormToStore,
  ModifyEventFeaturesFromStoreToForm,
  ModifyEventGuestsFromStoreToForm,
} from "@/app/api/web/auth/event-model/store/_private/lib";
import {
  WebEventCreateFaqArraySchema,
  WebEventCreateFourSchema,
  WebEventCreateFourSchemaInfer,
  WebEventCreateGuestArraySchema,
} from "@/app/api/web/auth/event-model/store/_private/validation";
import { ResponseDataType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { useEventStore } from "@/store/store-event";
import { useEventFaqStore } from "@/store/store-event-faq";
import { useEventGuestStore } from "@/store/store-event-guest";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import WebEventCreateAgeComponent from "./WebEventCreateAgeComponent";
import WebEventCreateButtonComponent from "./WebEventCreateButtonComponent";
import WebEventCreateFaqComponent from "./WebEventCreateFaqComponent";
import WebEventCreateFeatureComponent from "./WebEventCreateFeatureComponent";
import WebEventCreateGuestComponent from "./WebEventCreateGuestComponent";

export default function WebEventCreateStepFourComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const { event, setEvent } = useEventStore();
  const { eventGuests } = useEventGuestStore();
  const { eventFaqs } = useEventFaqStore();
  const intialRef = useRef(false);
  const router = useRouter();

  const moveBack = useCallback(() => {
    setEvent((event) => {
      if (event) {
        event.step = 3;
      }
    });

    router.push(Routes.web.general.eventsCreateFeatures);
  }, [router, setEvent]);

  const form = useForm({
    resolver: zodResolver(WebEventCreateFourSchema),
    defaultValues: {
      eventFeatureType: "NONE",
      ageRestriction: "ALL",
      eventFaqs: [],
      eventGuests: [],
    },
  });

  useEffect(() => {
    if (
      intialRef.current ||
      !event ||
      !event?.eventFeatures ||
      !event?.ageRestriction
    )
      return;

    form?.setValue("ageRestriction", event?.ageRestriction);

    if (Array.isArray(event.eventFeatures)) {
      const eventFeatureType = ModifyEventFeaturesFromStoreToForm(
        event.eventFeatures,
      );

      if (eventFeatureType) {
        form?.setValue("eventFeatureType", eventFeatureType);
      }
    }

    intialRef.current = true;
  }, [event, form]);

  async function onSubmit(data: WebEventCreateFourSchemaInfer) {
    const { eventFeatureType, ageRestriction } = data;

    const eventFeatureTypeModified =
      ModifyEventFeaturesFromFormToStore(eventFeatureType);

    const eventGuestsModified = ModifyEventGuestsFromStoreToForm(eventGuests);

    const checkEventGuests = WebEventCreateGuestArraySchema.safeParse({
      eventGuests: eventGuestsModified,
    });

    if (!checkEventGuests.success) {
      form.setError("eventGuests", {
        message: checkEventGuests?.error?.issues?.[0]?.message,
        type: "custom",
      });
      return;
    }

    const eventFaqsModified = ModifyEventFaqsFromStoreToForm(eventFaqs);

    const checkEventFaqs = WebEventCreateFaqArraySchema.safeParse({
      eventFaqs: eventFaqsModified,
    });

    if (!checkEventFaqs.success) {
      form.setError("eventFaqs", {
        message: checkEventFaqs?.error?.issues?.[0]?.message,
        type: "custom",
      });
      return;
    }

    setEvent((event) => {
      if (event) {
        event.eventFeatures = eventFeatureTypeModified;

        event.ageRestriction =
          ageRestriction as ResponseDataType["eventAgeRestriction"];
      }
    });
  }

  return (
    <>
      <FormProvider {...form}>
        <form
          className="flex flex-1 flex-col justify-between gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ShadcnAccordionSingleComponent
            defaultValue={"feature"}
            className="flex flex-col gap-4"
          >
            <WebEventCreateFeatureComponent />
            <WebEventCreateAgeComponent />
            <WebEventCreateGuestComponent />
            <WebEventCreateFaqComponent />
          </ShadcnAccordionSingleComponent>

          <div className="flex flex-wrap justify-between gap-2">
            <GlassEffectButtonComponent
              type="button"
              onClick={moveBack}
            >
              <ArrowLeftIcon />
              <span>Back to Features</span>
            </GlassEffectButtonComponent>
            <WebEventCreateButtonComponent />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
