"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Disc2, Gift, Medal, Sparkles, UserCog, UserStar } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardHostingTab from "./DashboardHostingTab";

export default function DashboardTabs() {
  const [tabValue, setTabValue] = useState("");

  useEffect(() => {
    setTabValue(localStorage.getItem("dashboardTab") ?? "achievement");
  }, []);

  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardTab", value);
    setTabValue(value);
  }

  return (
    <Tabs
      value={tabValue}
      onValueChange={handleTabsChange}
      className="gap-8"
    >
      <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 md:py-1">
        <TabsTrigger value="achievement">
          <Medal /> Achievement
        </TabsTrigger>
        <TabsTrigger value="insight">
          <Sparkles /> Insights
        </TabsTrigger>
        <TabsTrigger value="milestone">
          <Disc2 /> Milestones
        </TabsTrigger>
        <TabsTrigger value="reward">
          <Gift /> Rewards
        </TabsTrigger>
        <TabsTrigger value="hosting">
          <UserCog /> Hosting
        </TabsTrigger>
        <TabsTrigger value="attending">
          <UserStar /> Attending
        </TabsTrigger>
      </TabsList>
      <TabsContent value="achievement">achievement</TabsContent>
      <TabsContent value="insight">insight</TabsContent>
      <TabsContent value="milestone">milestone</TabsContent>
      <TabsContent value="reward">reward</TabsContent>
      <TabsContent
        value="hosting"
        className=""
      >
        <DashboardHostingTab />
      </TabsContent>
      <TabsContent value="attending">attending</TabsContent>
    </Tabs>
  );
}
