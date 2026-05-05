"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Routes } from "@/lib/lib-routes";
import { cn } from "@/lib/utils";
import { Calendar, ChevronRight, MapPin, Share2 } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import EventDetailCheckoutSectionComponent from "./EventDetailCheckoutSectionComponent";
import EventDetailDescriptionSectionComponent from "./EventDetailDescriptionSectionComponent";
import EventDetailLocationSectionComponent from "./EventDetailLocationSectionComponent";
import EventDetailOrganizerSectionComponent from "./EventDetailOrganizerSectionComponent";

type TabType = "about" | "location" | "organizer" | "faqs" | "gallery";

type PropType = {
  slug: string;
};

export default function EventDetailDataSectionComponent(props: PropType) {
  //
  const tabItems = useMemo(
    () => [
      {
        name: "About",
        key: "about",
      },
      {
        name: "Location",
        key: "location",
      },
      {
        name: "Organizer",
        key: "organizer",
      },
      {
        name: "FAQS",
        key: "faqs",
      },
      {
        name: "Gallery",
        key: "gallery",
      },
    ],
    [],
  );
  //
  const [tabValue, setTabValue] = useState<TabType>("about");
  const slug = props.slug;
  //
  const { theme } = useTheme();
  //
  return (
    <div className="flex flex-col gap-4 py-10">
      {/*  */}

      {/*  */}
      <div className="flex flex-wrap justify-between gap-6">
        {/*  */}

        {/*  */}
        <Tabs
          value={tabValue}
          onValueChange={(value) => setTabValue(value as TabType)}
          className="h-full"
        >
          <TabsList className="h-full flex-wrap gap-2 bg-transparent">
            {/*  */}

            {/*  */}
            {tabItems?.map((item, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={item.key}
                  asChild
                  className=""
                  // className={cn(
                  //   "text-foreground rounded-full px-4 py-2 shadow",
                  //   {
                  //     " text-background": tabValue === item.key,
                  //     // "!bg-purple-500": theme === "dark",
                  //   },
                  // )}
                >
                  <Button
                    variant={tabValue === item.key ? "default" : "secondary"}
                    className={cn("rounded-full px-4 py-2", {
                      "bg-primary! text-background":
                        tabValue === item.key && theme == "light",
                    })}
                  >
                    {item.name}
                  </Button>
                </TabsTrigger>
              );
            })}
            {/*  */}

            {/*  */}
          </TabsList>
          {/*  */}

          {/*  */}
        </Tabs>
        {/*  */}

        {/*  */}
        <div className="flex gap-2">
          {/*  */}

          {/*  */}
          <Button
            size={"icon"}
            variant={"outline"}
            className=""
          >
            <FaHeart />
          </Button>
          {/*  */}

          {/*  */}
          <Button
            size={"icon"}
            variant={"outline"}
            className=""
          >
            <Share2 />
          </Button>
          {/*  */}

          {/*  */}
        </div>
        {/*  */}

        {/*  */}
      </div>
      {/*  */}

      {/*  */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/*  */}

        {/*  */}
        <div className="flex flex-col gap-4 lg:flex-1">
          {/*  */}

          {/*  */}
          <Tabs value={tabValue}>
            {/*  */}
            <TabsContent value="about">
              {/*  */}
              <EventDetailDescriptionSectionComponent />
              {/*  */}
            </TabsContent>
            {/*  */}
            <TabsContent value="location">
              {/*  */}
              <EventDetailLocationSectionComponent />
              {/*  */}
            </TabsContent>
            {/*  */}
            <TabsContent value="organizer">
              {/*  */}
              <EventDetailOrganizerSectionComponent />
              {/*  */}
            </TabsContent>
          </Tabs>
          {/*  */}

          {/*  */}
        </div>
        {/*  */}

        {/*  */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-10 lg:max-w-sm lg:flex-1">
          {/*  */}

          {/*  */}
          <Card className="rounded-md !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
            {/*  */}

            {/*  */}
            <CardContent>
              {/*  */}

              {/*  */}
              <div className="flex flex-col gap-4">
                {/*  */}

                {/*  */}
                <div className="flex items-center gap-2">
                  <Calendar />
                  <p className="font-medium">Friday 11 June, 11:50 AM</p>
                </div>
                {/*  */}

                {/*  */}
                <div className="flex items-center gap-2">
                  <MapPin />
                  <p className="font-medium">Central Park, New York</p>
                </div>
                {/*  */}

                {/*  */}
                <EventDetailCheckoutSectionComponent slug={slug} />
                {/*  */}

                {/*  */}
              </div>
              {/*  */}

              {/*  */}
            </CardContent>
            {/*  */}

            {/*  */}
            <Separator />
            {/*  */}

            {/*  */}
            <CardContent>
              {/*  */}

              {/*  */}
              <div className="flex flex-col gap-4">
                {/*  */}

                {/*  */}
                <p className="">
                  <span className="font-medium">Refund Policy: </span>
                  <span>Refunds available up to 7 days before the event.</span>
                </p>
                {/*  */}

                {/*  */}
                <Link
                  href={`${Routes.web.general.eventDetail}/${slug}`}
                  className="text-primary flex items-center gap-2 font-medium"
                >
                  <span>Terms &amp; Condition</span>
                  <ChevronRight />
                </Link>
                {/*  */}

                {/*  */}
              </div>
              {/*  */}

              {/*  */}
            </CardContent>
            {/*  */}

            {/*  */}
          </Card>
          {/*  */}

          {/*  */}
        </div>
        {/*  */}

        {/*  */}
      </div>
      {/*  */}

      {/*  */}
    </div>
  );
}
