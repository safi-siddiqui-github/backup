"use client";

import { ModuleWithSubsTwo, upsertModule } from "@/actions/module";
import LoaderSpin from "@/components/ui-extends/LoaderSpin";
import ScheduleDayComponent from "@/components/ui-extends/schedule/ScheduleDayComponent";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleMode } from "@/prisma/generated";
import { Calendar, Lectern } from "lucide-react";
import { useEffect, useState } from "react";
import ScheduleConference from "./ScheduleConference";
import ScheduleSimple from "./ScheduleSimple";

export default function ScheduleModule(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;
  const [tabValue, setTabValue] = useState<ScheduleMode>("SIMPLE");
  const [isLoading, setIsLoading] = useState(false);
  //
  useEffect(() => {
    setTabValue(moduleD?.scheduleMode ?? "SIMPLE");
  }, [moduleD?.scheduleMode]);
  //
  async function handleTabsChange(check: boolean) {
    setIsLoading(true);

    let value: ScheduleMode = "SIMPLE";
    if (check) {
      value = "CONFERENCE";
    }

    await upsertModule({
      id: moduleD?.id,
      scheduleMode: value,
    });
    setTabValue(value);
    setIsLoading(false);
  }
  //
  return (
    <div className="flex flex-col gap-10">
      {/*  */}

      <ScheduleDayComponent module={moduleD} />

      <Card>
        <CardContent className="flex flex-row flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar />
            <CardTitle className=""> Simple Event</CardTitle>
          </div>
          <Switch
            checked={tabValue === "CONFERENCE"}
            onCheckedChange={handleTabsChange}
          />
          <div className="flex items-center gap-2">
            <Lectern />
            <CardTitle className="">Conference Mode</CardTitle>
          </div>
          {isLoading ? <LoaderSpin /> : null}
        </CardContent>
      </Card>

      <Tabs
        value={tabValue ?? ""}
        // onValueChange={(value) => handleTabsChange(value as ScheduleMode)}
        className="gap-8"
      >
        <TabsList className="hidden h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
          <TabsTrigger value="SIMPLE">
            <Calendar /> Simple Event
            {isLoading ? <LoaderSpin /> : null}
          </TabsTrigger>
          <TabsTrigger value="CONFERENCE">
            {isLoading ? <LoaderSpin /> : null}
            <Lectern /> Conference Mode
          </TabsTrigger>
        </TabsList>
        <TabsContent value="SIMPLE">
          <ScheduleSimple module={moduleD} />
        </TabsContent>
        <TabsContent value="CONFERENCE">
          <ScheduleConference module={moduleD} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
