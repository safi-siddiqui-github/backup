"use client";

import { ModuleWithSubsTwo } from "@/actions/module";
import ConferenceCalendar from "@/components/ui-extends/schedule/ConferenceCalendar";
import ConferenceOverview from "@/components/ui-extends/schedule/ConferenceOverview";
import ConferenceSession from "@/components/ui-extends/schedule/ConferenceSession";
import ConferenceTrack from "@/components/ui-extends/schedule/ConferenceTrack";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bolt,
  BookText,
  Calendar,
  Download,
  Mic,
  Package,
  Theater,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ScheduleConference(props: {
  module: ModuleWithSubsTwo;
}) {
  const moduleD = props?.module;
  const [tabValue, setTabValue] = useState("");
  //
  useEffect(() => {
    setTabValue(
      localStorage.getItem("dashboardScheduleConferenceTab") ?? "overview",
    );
  }, []);
  //
  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardScheduleConferenceTab", value);
    setTabValue(value);
  }
  //
  return (
    <div className="flex flex-col gap-10">
      <Tabs
        value={tabValue}
        onValueChange={handleTabsChange}
        className="gap-8"
      >
        <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
          <TabsTrigger value="overview">
            <Theater /> Overview
          </TabsTrigger>
          <TabsTrigger value="track">
            <Package /> Tracks
          </TabsTrigger>
          <TabsTrigger value="session">
            <Mic /> Sessions
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar /> Calendar
          </TabsTrigger>
          <TabsTrigger value="tool">
            <Bolt /> Bulk Tool
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <ConferenceOverview module={moduleD} />
        </TabsContent>
        <TabsContent value="track">
          <ConferenceTrack module={moduleD} />
        </TabsContent>
        <TabsContent value="session">
          <ConferenceSession module={moduleD} />
        </TabsContent>
        <TabsContent value="calendar">
          <ConferenceCalendar module={moduleD} />
        </TabsContent>
        <TabsContent value="tool">
          <div className="flex flex-wrap gap-2">
            <Button>
              <Upload />
              Import CSV
            </Button>
            <Button variant={"outline"}>
              <BookText />
              Use Template
            </Button>
            <Button variant={"outline"}>
              <Download />
              CSV Template
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
