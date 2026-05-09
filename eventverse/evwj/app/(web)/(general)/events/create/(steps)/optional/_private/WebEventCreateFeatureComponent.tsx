"use client";

import WebBackgroundComponent from "@/app/(web)/_private/WebBackgroundComponent";
import WebIconComponent from "@/app/(web)/_private/WebIconComponent";
import { CardComponent } from "@/app/_private/(shadcn)/CardComponent";
import {
  ShadcnAccordionContentComponent,
  ShadcnAccordionTriggerComponent,
} from "@/app/_private/(shadcn)/ShadcnAccordianComponent";
import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import { WebEventCreateFourSchemaInfer } from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent, RHFDataType } from "@/lib/lib-react-hook-form";
import { Badge } from "@/shadcn/ui/badge";
import { CardDescription, CardTitle } from "@/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar1Icon,
  CalendarDaysIcon,
  CalendarIcon,
  CircleCheckIcon,
  CircleQuestionMark,
  EyeIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { WebEventFeatureTypeAllAction } from "../../../_private/action";

export default function WebEventCreateFeatureComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateFourSchemaInfer>();

  const eventFeatureTypeWatch = useWatch({
    control: form?.control,
    name: "eventFeatureType",
  });

  const { data: eventFeatureTypes = [] } = useQuery({
    queryKey: ["event-feature-types"],
    queryFn: WebEventFeatureTypeAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) =>
      res?.data?.eventFeatureTypes?.map<RHFDataType>((item) => {
        const obj: RHFDataType = { value: item };

        switch (item) {
          case "NONE":
            obj.label = (
              <div className="flex items-center gap-1">
                <CircleQuestionMark className="size-5" />
                <p>Maybe Later</p>
              </div>
            );
            obj.description = "Feature my event later";
            break;

          case "SINGLE_WEEK":
            obj.label = (
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-1">
                  <Calendar1Icon className="size-5" />
                  <span>Single Week</span>
                </div>
                <Badge>$35.00</Badge>
              </div>
            );
            obj.description = "Feature your event for a single week";

            break;
          case "EVERY_WEEK":
            obj.label = (
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
                <div className="flex flex-wrap items-center gap-1">
                  <CalendarDaysIcon className="size-5" />
                  <span>Every Week Until End</span>
                </div>
                <Badge className="">$35 + $29.99/week</Badge>
              </div>
            );
            obj.description =
              "Feature your event every week until the event ends";
            break;
        }

        return obj;
      }) ?? [],
  });

  const featureOptions = useMemo(
    () => [
      {
        icon: TrendingUpIcon,
        title: "Increased Visibility",
        description: "Your event will be more visible to potential attendees.",
      },
      {
        icon: EyeIcon,
        title: "More Exposure",
        description: "Reach up to 3x more potential attendees.",
      },
      {
        icon: UsersIcon,
        title: "More Attendees",
        description: "Featured events are more likely to draw attendees.",
      },
      {
        icon: CalendarIcon,
        title: "Priority Placement",
        description: "Stand out from the crowd with priority placement.",
      },
    ],
    [],
  );

  const featureSelectedOptionCard = useMemo(() => {
    switch (eventFeatureTypeWatch) {
      case "NONE":
        return {
          price: "Decide Later",
          description: "Deciding...",
        };
        break;
      case "SINGLE_WEEK":
        return {
          price: "$35.00",
          description: "Premium Event",
        };
        break;

      case "EVERY_WEEK":
        return {
          price: "$35.00 + $29.99/week",
          description: "Business Event",
        };

        break;

      default:
        break;
    }
  }, [eventFeatureTypeWatch]);

  return (
    <GlassEffectAccordionItemComponent
      accordianProps={{
        value: "feature",
      }}
    >
      <ShadcnAccordionTriggerComponent>
        <div className="flex items-center gap-2">
          <WebIconComponent>
            <SparklesIcon className="size-5" />
          </WebIconComponent>
          <p>Feature Event</p>
          <CardDescription className="hidden font-normal md:block">
            Feature Event
          </CardDescription>
        </div>
      </ShadcnAccordionTriggerComponent>
      <ShadcnAccordionContentComponent className="px-1">
        <CardComponent className="bg-ev-1/5 dark:bg-ev-1/30 hidden md:flex">
          <div className="flex items-center gap-1">
            <CircleCheckIcon className="size-4" />
            <CardTitle>Why Feature Your Event?</CardTitle>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureOptions.map((item, index) => (
              <CardComponent key={index}>
                <div className="flex items-center gap-2">
                  <WebIconComponent>
                    <item.icon className="size-5" />
                  </WebIconComponent>
                  <div className="flex flex-col">
                    <CardTitle>{item?.title}</CardTitle>
                    <CardDescription>{item?.description}</CardDescription>
                  </div>
                </div>
              </CardComponent>
            ))}
          </div>
        </CardComponent>

        <RHFComponent
          form={form}
          name="eventFeatureType"
          fieldType="radio-box"
          arrayData={eventFeatureTypes}
          radioGroupProps={{
            className: "grid grid-cols-1 xl:grid-cols-3",
          }}
        />

        <WebBackgroundComponent className="flex-wrap items-center justify-around rounded-md py-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <CardTitle>Total Cost</CardTitle>
            <CardTitle className="text-3xl">
              {featureSelectedOptionCard?.price}
            </CardTitle>
          </div>
          <Badge variant={"secondary"}>
            {featureSelectedOptionCard?.description}
          </Badge>
        </WebBackgroundComponent>
      </ShadcnAccordionContentComponent>
    </GlassEffectAccordionItemComponent>
  );
}
