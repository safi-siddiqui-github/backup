"use client";

import { WebEventCreateOneSchemaInfer } from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent, RHFDataType } from "@/lib/lib-react-hook-form";
import { CardDescription } from "@/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Building2Icon, GlobeIcon, LockIcon, UserIcon } from "lucide-react";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
// import {
//   WebAccordionContentComponent,
//   WebAccordionItemComponent,
//   ShadcnAccordionTriggerComponent,
// } from "../../../../../../../_private/(shadcn)/ShadcnAccordianComponent";
import {
  ShadcnAccordionContentComponent,
  ShadcnAccordionTriggerComponent,
} from "@/app/_private/(shadcn)/ShadcnAccordianComponent";
import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import GlassEffectIconComponent from "@/app/_private/(theme)/glass-effect/GlassEffectIconComponent";
import { WebEventVisibilityAllAction } from "../../../_private/action";
import WebEventCreateErrorIndicatorComponent from "../../../_private/WebEventCreateErrorIndicatorComponent";

export default function WebEventCreateBasicInfoComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateOneSchemaInfer>();

  const nameWatch = useWatch({
    control: form.control,
    name: "name",
  });

  const { data: eventVisibilities = [] } = useQuery({
    queryKey: ["event-visibility"],
    queryFn: WebEventVisibilityAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) =>
      res?.data?.eventVisibilities?.map<RHFDataType>((item) => {
        const obj: RHFDataType = { value: item };

        switch (item) {
          case "PUBLIC":
            obj.label = (
              // <div className="text-ev-1 flex items-center gap-1">
              <div className="flex items-center gap-1">
                <GlobeIcon className="size-5" />
                <span>Public</span>
              </div>
            );
            obj.description = "(Available to everyone)";
            break;

          case "PRIVATE":
            obj.label = (
              // <div className="text-ev-1 flex items-center gap-1">
              <div className="flex items-center gap-1">
                <LockIcon className="size-5" />
                <span>Private</span>
              </div>
            );
            obj.description = "(Invite only)";
            break;

          case "ORGANIZATION":
            obj.label = (
              // <div className="text-ev-1 flex items-center gap-1">
              <div className="flex items-center gap-1">
                <Building2Icon className="size-5" />
                <span>Organization</span>
              </div>
            );
            obj.description = "(Members only)";
            break;
        }

        return obj;
      }) ?? [],
  });

  const errorNotify = useMemo(() => {
    const { name, visibility } = form?.formState?.errors ?? {};

    const obj = WebEventCreateErrorIndicatorComponent({
      children: name?.message ?? visibility?.message,
    });

    if (name || visibility) {
      return obj;
    }
  }, [form.formState]);

  return (
    <GlassEffectAccordionItemComponent
      accordianProps={{
        value: "basic",
      }}
    >
      <ShadcnAccordionTriggerComponent>
        <div className="flex items-center gap-2">
          {/* <WebIconComponent>
            <UserIcon className="size-5" />
          </WebIconComponent> */}
          <GlassEffectIconComponent>
            <UserIcon />
          </GlassEffectIconComponent>

          <p>Basic Information</p>

          <CardDescription className="hidden font-normal md:block">
            {nameWatch}
          </CardDescription>
          {errorNotify}
        </div>
      </ShadcnAccordionTriggerComponent>
      <ShadcnAccordionContentComponent className="px-1">
        <RHFComponent
          form={form}
          name="name"
          label="Event Name"
          fieldType="input"
          inputProps={{
            placeholder: "Summer Playful Event",
          }}
        />
        <RHFComponent
          form={form}
          name="visibility"
          label="Visibility"
          fieldType="radio-group"
          arrayData={eventVisibilities}
        />
      </ShadcnAccordionContentComponent>
    </GlassEffectAccordionItemComponent>
  );
}
