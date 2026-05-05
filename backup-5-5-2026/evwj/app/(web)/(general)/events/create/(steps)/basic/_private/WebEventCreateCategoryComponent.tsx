"use client";

import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import GlassEffectIconComponent from "@/app/_private/(theme)/glass-effect/GlassEffectIconComponent";
import { WebEventCreateOneSchemaInfer } from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent, RHFDataType } from "@/lib/lib-react-hook-form";
import { CardDescription } from "@/shadcn/ui/card";
import { useEventStore } from "@/store/store-event";
import { useQuery } from "@tanstack/react-query";
import { BoxIcon, SearchIcon } from "lucide-react";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDebounce } from "use-debounce";
import {
  ShadcnAccordionContentComponent,
  ShadcnAccordionTriggerComponent,
} from "../../../../../../../_private/(shadcn)/ShadcnAccordianComponent";
import { WebEventCategoriesAllAction } from "../../../_private/action";
import WebEventCreateErrorIndicatorComponent from "../../../_private/WebEventCreateErrorIndicatorComponent";

export default function WebEventCreateCategoryComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateOneSchemaInfer>();
  const { event } = useEventStore();

  const errorNotify = useMemo(() => {
    const { eventCategoryAssignments } = form?.formState?.errors ?? {};

    const obj = WebEventCreateErrorIndicatorComponent({
      children: eventCategoryAssignments?.message,
    });

    if (eventCategoryAssignments) {
      return obj;
    }
  }, [form.formState]);

  const eventCategoriesWatch = useWatch({
    control: form?.control,
    name: "eventCategoryAssignments",
  });

  const searchCategoryWatch = useWatch({
    control: form?.control,
    name: "searchCategory",
  });

  const [searchCategoryValue] = useDebounce(searchCategoryWatch, 1000);

  const { data: eventCategories } = useQuery({
    queryKey: ["event-categories"],
    queryFn: WebEventCategoriesAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) =>
      res?.data?.eventCategories?.map<RHFDataType>((item) => ({
        label: item?.name,
        // value: item?.slug ?? "unknown",
        value: String(item?.id ?? 0),
      })) ?? [],
  });

  const categoriesSelected = useMemo<RHFDataType[]>(
    () =>
      eventCategories?.filter(
        ({ value }) => value && eventCategoriesWatch?.includes(value),
      ) ?? [],
    [eventCategories, eventCategoriesWatch],
  );

  const categoriesUnselected = useMemo<RHFDataType[]>(
    () =>
      eventCategories
        ?.filter(({ value }) => value && !eventCategoriesWatch?.includes(value))
        ?.filter(
          ({ value }) =>
            !searchCategoryValue ||
            value?.toLowerCase().includes(searchCategoryValue.toLowerCase()),
        ) ?? [],
    [eventCategories, eventCategoriesWatch, searchCategoryValue],
  );

  return (
    <GlassEffectAccordionItemComponent
      accordianProps={{
        value: "category",
      }}
    >
      <ShadcnAccordionTriggerComponent>
        <div className="flex items-center gap-2">
          <GlassEffectIconComponent>
            <BoxIcon />
          </GlassEffectIconComponent>
          <p>Event Categories</p>

          <CardDescription className="hidden font-normal md:block">
            {event?.eventCategoryAssignments?.length ?? 0} Selected
          </CardDescription>

          {errorNotify}
        </div>
      </ShadcnAccordionTriggerComponent>
      <ShadcnAccordionContentComponent className="px-1">
        <RHFComponent
          form={form}
          name="searchCategory"
          // label="searchCategory"
          fieldType="input-group"
          inputProps={{
            placeholder: "Search for category",
          }}
          inputGroupAddonContent={
            <>
              <SearchIcon />
            </>
          }
        />

        <p className="">Selected</p>

        <RHFComponent
          form={form}
          name="eventCategoryAssignments"
          // label="searchCategory"
          fieldType="checkbox-box"
          arrayData={categoriesSelected}
          checkboxGroupProps={{
            className: "flex! flex-wrap! *:flex-1! *:min-w-max",
          }}
        />

        <hr />

        <p className="">Select categories</p>

        <RHFComponent
          form={form}
          name="eventCategoryAssignments"
          // label="searchCategory"
          fieldType="checkbox-box"
          arrayData={categoriesUnselected}
          checkboxGroupProps={{
            className: "flex! flex-wrap! *:flex-1! *:min-w-max",
          }}
        />
      </ShadcnAccordionContentComponent>
    </GlassEffectAccordionItemComponent>
  );
}
