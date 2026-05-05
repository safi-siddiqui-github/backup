"use client";

import WebButtonComponent from "@/app/(web)/_private/WebButtonComponent";
import {
  ModifyEventModulesFromFormToStore,
  ModifyEventModulesFromStoreToForm,
} from "@/app/api/web/auth/event-model/store/_private/lib";
import {
  WebEventCreateThreeSchema,
  WebEventCreateThreeSchemaInfer,
} from "@/app/api/web/auth/event-model/store/_private/validation";
import { Routes } from "@/lib/lib-routes";
import { useEventStore } from "@/store/store-event";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import WebEventCreateModuleComponent from "./WebEventCreateModuleComponent";

export default function WebEventCreateStepThreeComponent() {
  return (
    <div className="flex flex-1 flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const { event, setEvent } = useEventStore();
  const initialRef = useRef(false);
  const router = useRouter();

  const moveBack = useCallback(() => {
    setEvent((event) => {
      if (event) {
        event.step = 2;
      }
    });

    router.push(Routes.web.general.eventsCreatePhotos);
  }, [router, setEvent]);

  const form = useForm({
    resolver: zodResolver(WebEventCreateThreeSchema),
    defaultValues: {
      eventModules: [],
    },
  });

  useEffect(() => {
    if (initialRef.current || !event || !event?.eventModuleActivations) return;

    const modified = ModifyEventModulesFromStoreToForm(
      event?.eventModuleActivations,
    );

    form?.setValue("eventModules", modified);

    initialRef.current = true;
  }, [form, event]);

  async function onSubmit(data: WebEventCreateThreeSchemaInfer) {
    const modified = ModifyEventModulesFromFormToStore(data?.eventModules);

    setEvent((event) => {
      if (event) {
        event.step = 4;
        event.eventModuleActivations = modified;
      }
    });

    router.push(Routes.web.general.eventsCreateOptional);
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-1 flex-col justify-between gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <WebEventCreateModuleComponent />
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <WebButtonComponent
            type="button"
            onClick={moveBack}
          >
            <ArrowLeftIcon />
            <span>Back to Photos</span>
          </WebButtonComponent>
          <WebButtonComponent type="submit">
            <span>Move To Optional</span>
            <ArrowRightIcon />
          </WebButtonComponent>
        </div>
      </form>
    </FormProvider>
  );
}
