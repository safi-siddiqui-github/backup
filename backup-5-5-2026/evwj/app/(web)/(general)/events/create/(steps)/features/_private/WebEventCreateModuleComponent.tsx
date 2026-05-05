"use client";

import { CardComponent } from "@/app/_private/(shadcn)/CardComponent";
import { WebEventCreateThreeSchemaInfer } from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent, RHFDataType } from "@/lib/lib-react-hook-form";
import { ResponseDataType } from "@/lib/lib-responses";
import { Badge } from "@/shadcn/ui/badge";
import { CardDescription, CardTitle } from "@/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BoxIcon } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { WebEventModuleAllAction } from "../../../_private/action";

export default function WebEventCreateModuleComponent() {
  return (
    <div className="flexflex-col flex">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateThreeSchemaInfer>();

  type CD = RHFDataType & {
    children?: RHFDataType[];
  };

  const { data: eventModules = [] } = useQuery({
    queryKey: ["event-modules"],
    queryFn: WebEventModuleAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) => res?.data?.eventModules ?? [],
  });

  const eventModulesArray = useMemo<CD[]>(() => {
    const list: CD[] = [];

    for (const item of eventModules) {
      if (item?.parentId !== null) continue;

      const subList: CD["children"] = [];

      for (const subItem of item?.children ?? []) {
        const childObj: RHFDataType = {
          // label: subItem?.name ?? "",
          // description: subItem?.description ?? "",
          // value: subItem?.slug ?? "",
          label: ChildEventModuleComponent(subItem),
          value: String(subItem?.id),
        };

        subList.push(childObj);
      }

      const parentObj: CD = {
        // label: item?.name ?? "",
        // description: item?.description ?? "",
        label: ParentEventModuleComponent(item),
        value: item?.slug ?? "",
        children: subList,
      };

      list.push(parentObj);
    }

    return list;
  }, [eventModules]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      {eventModulesArray?.map((item) => {
        return (
          <div
            key={item?.value}
            className="flex flex-col gap-4"
          >
            {item?.label}

            <CardComponent>
              <RHFComponent
                form={form}
                name="eventModules"
                // label="searchCategory"
                fieldType="checkbox-box"
                checkboxGroupProps={{
                  className: "md:grid-cols-2",
                }}
                arrayData={item?.children}
              />
            </CardComponent>
          </div>
        );
      })}
    </div>
  );
}

// function ParentEventModuleComponent(eventModule?: EventModuleModelType) {
function ParentEventModuleComponent(eventModule?: ResponseDataType["event"]) {
  if (!eventModule) return null;

  const { name, description } = eventModule ?? {};

  return (
    <div className="flex items-center gap-2">
      <BoxIcon />
      <div className="flex flex-col">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </div>
  );
}

function ChildEventModuleComponent(
  eventModule?: ResponseDataType["eventModule"],
) {
  if (!eventModule) return null;

  const { name, description, optionOne, optionTwo, optionThree, price } =
    eventModule ?? {};

  const priceModify = price === 0 ? "Free" : `${price} / Month`;

  return (
    <div className="group flex flex-col gap-2 font-normal">
      <div className="flex flex-col">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>

      <div className="flex h-0 flex-col gap-4 overflow-hidden opacity-0 transition-all group-hover:h-64 group-hover:opacity-100">
        <div className="flex flex-col gap-2">
          <CardTitle>Features</CardTitle>
          <div className="flex flex-col">
            <CardDescription>{optionOne}</CardDescription>
            <CardDescription>{optionTwo}</CardDescription>
            <CardDescription>{optionThree}</CardDescription>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle>Preview</CardTitle>
          <div className="bg-ev-1/20 h-32 w-full rounded-2xl" />
        </div>
      </div>

      <Badge>{priceModify}</Badge>
    </div>
  );
}
