"use client";

import WebButtonComponent from "@/app/(web)/_private/WebButtonComponent";
import {
  WebEventCreateTwoSchema,
  WebEventCreateTwoSchemaInfer,
} from "@/app/api/web/auth/event-model/store/_private/validation";
import { Routes } from "@/lib/lib-routes";
import { useEventStore } from "@/store/store-event";
import { useEventAssetStore } from "@/store/store-event-asset";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import WebEventCreateImageComponent from "./WebEventCreateImageComponent";

export default function WebEventCreateStepTwoComponent() {
  return (
    <div className="flex flex-1 flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const { setEvent } = useEventStore();
  const { eventAssets } = useEventAssetStore();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(WebEventCreateTwoSchema),
    defaultValues: {
      photos: [],
    },
  });

  async function onSubmit(data: WebEventCreateTwoSchemaInfer) {
    const total = eventAssets?.length ?? 0;

    if (total > 10) {
      form.setError("photos", { message: "Maximum limit is 10" });
      return;
    }

    setEvent((event) => {
      if (event) {
        event.step = 3;
      }
    });

    router.push(Routes.web.general.eventsCreateFeatures);
  }

  const moveBack = useCallback(() => {
    setEvent((event) => {
      if (event) {
        event.step = 1;
      }
    });

    router.push(Routes.web.general.eventsCreateBasic);
  }, [router, setEvent]);

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-1 flex-col justify-between gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <WebEventCreateImageComponent />
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <WebButtonComponent
            type="button"
            onClick={moveBack}
          >
            <ArrowLeftIcon />
            <span>Back to Basic Info</span>
          </WebButtonComponent>
          <WebButtonComponent type="submit">
            <span>Move To Features</span>
            <ArrowRightIcon />
          </WebButtonComponent>
        </div>
      </form>
    </FormProvider>
  );
}
