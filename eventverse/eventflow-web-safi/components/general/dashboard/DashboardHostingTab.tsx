"use client";

import { deleteEvent, EventWithSubs, findEvents } from "@/actions/event";
import LoaderSpin from "@/components/ui-extends/LoaderSpin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Routes } from "@/lib/routes";
import {
  CalendarArrowUp,
  CalendarCheck,
  CalendarClock,
  CalendarFold,
  Globe,
  Shield,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import UpdateEventTrigger from "../event/UpdateEventTrigger";

export default function DashboardHostingTab() {
  const [tabValue, setTabValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventWithSubs[]>([]);
  //
  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardHostingTab", value);
    setTabValue(value);
  }
  //
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    const events = await findEvents();
    setEvents(events);
    setIsLoading(false);
  }, []);
  //
  const deleteEventFN = useCallback(
    async (id: number) => {
      setIsLoading(true);
      await deleteEvent(id);
      await fetchEvents();
      setIsLoading(false);
    },
    [fetchEvents],
  );
  //
  useEffect(() => {
    setTabValue(localStorage.getItem("dashboardHostingTab") ?? "upcoming");
    fetchEvents();
  }, [fetchEvents]);
  //
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <p className="font-medium md:text-2xl md:font-medium">
          Events I Am Hosting &quot;15&quot;
        </p>
        <Input placeholder="Search for events..." />
        {isLoading ? <LoaderSpin /> : null}
      </div>

      <Tabs
        value={tabValue}
        onValueChange={handleTabsChange}
        className="gap-8"
      >
        <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
          <TabsTrigger value="upcoming">
            <CalendarClock /> Upcoming
          </TabsTrigger>
          <TabsTrigger value="ongoing">
            <CalendarArrowUp /> Ongoing
          </TabsTrigger>
          <TabsTrigger value="past">
            <CalendarCheck /> Past
          </TabsTrigger>
          <TabsTrigger value="draft">
            <CalendarFold /> Drafts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">upcoming</TabsContent>
        <TabsContent value="ongoing">ongoing</TabsContent>
        <TabsContent value="past">past</TabsContent>
        <TabsContent
          value="draft"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {events?.map((each, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-wrap justify-between gap-2 md:flex-nowrap">
                <div className="flex flex-col gap-2">
                  <CardTitle>{each?.name}</CardTitle>
                  <CardDescription>{each?.slug}</CardDescription>
                </div>
                <CardAction>
                  <Badge>{each?.category?.name ?? "Category"}</Badge>
                  {/* <UpdateEventTrigger id={each.id} /> */}
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  {each?.isPublic ? (
                    <>
                      <Globe className="size-4" />
                      Public
                    </>
                  ) : (
                    <>
                      <Shield className="size-4" />
                      Private
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <UpdateEventTrigger id={each.id} />

                <div className="flex gap-2">
                  <Button asChild>
                    <Link href={`${Routes.dashboardEvent}/${each?.slug}`}>
                      Details
                    </Link>
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => deleteEventFN(each?.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
