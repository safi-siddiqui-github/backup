"use client";

import WebIconComponent from "@/app/(web)/_private/WebIconComponent";
import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import { WebEventCreateFourSchemaInfer } from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent, RHFDataType } from "@/lib/lib-react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { OctagonMinusIcon } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  ShadcnAccordionContentComponent,
  ShadcnAccordionTriggerComponent,
} from "../../../../../../../_private/(shadcn)/ShadcnAccordianComponent";
import { WebEventAgeRestrictionAllAction } from "../../../_private/action";
import WebEventCreateErrorIndicatorComponent from "../../../_private/WebEventCreateErrorIndicatorComponent";

export default function WebEventCreateAgeComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateFourSchemaInfer>();

  const { data: eventAgeRestrictions } = useQuery({
    queryKey: ["event-age-restrictions"],
    queryFn: WebEventAgeRestrictionAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) =>
      res?.data?.eventAgeRestrictions?.map<RHFDataType>((item) => {
        const obj: RHFDataType = { value: item };

        switch (item) {
          case "ALL":
            obj.label = "All Ages Welcome";
            obj.description = "No Age Restriction";
            break;

          case "FAMILY":
            obj.label = "Family Friendly";
            obj.description = "Children must be with an adult";
            break;

          case "KIDS":
            obj.label = "Kids Event (Under 12)";
            obj.description = "Designed for children under 12";
            break;

          case "TEENS":
            obj.label = "13+ Teenagers & Adults";
            obj.description = "Open to teens and adults";
            break;

          case "ADULTS":
            obj.label = "18+ Adults Only";
            obj.description = "Strictly for adults 18 and older";
            break;

          case "ADULTS21":
            obj.label = "21+ Adults Only";
            obj.description = "Open to teens and adults";
            break;
        }

        return obj;
      }) ?? [],
  });

  const errorNotify = useMemo(() => {
    const { ageRestriction } = form?.formState?.errors ?? {};

    const obj = WebEventCreateErrorIndicatorComponent({
      children: ageRestriction?.message,
    });

    if (ageRestriction) {
      return obj;
    }
  }, [form.formState]);

  return (
    <GlassEffectAccordionItemComponent
      accordianProps={{
        value: "age",
      }}
    >
      <ShadcnAccordionTriggerComponent>
        <div className="flex items-center gap-2">
          <WebIconComponent>
            <OctagonMinusIcon className="size-5" />
          </WebIconComponent>
          <p>Age Restriction</p>
          {errorNotify}
        </div>
      </ShadcnAccordionTriggerComponent>
      <ShadcnAccordionContentComponent className="px-1">
        <RHFComponent
          form={form}
          name="ageRestriction"
          label="Select age type for event"
          fieldType="radio-box"
          arrayData={eventAgeRestrictions}
          radioGroupProps={{
            className: "grid grid-cols-1 md:grid-cols-3",
          }}
        />
      </ShadcnAccordionContentComponent>
    </GlassEffectAccordionItemComponent>
  );
}
