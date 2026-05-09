"use client";
import { ModuleWithSubsTwo } from "@/actions/module";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Calendar,
  Eye,
  MapPin,
  Pen,
  PenLine,
  Presentation,
} from "lucide-react";
import { useEffect, useState } from "react";
import SeatingCanvas from "./SeatingCanvas";
import SeatingLayout from "./SeatingLayout";
import SeatingPreview from "./SeatingPreview";

enum SeatingLayoutEnum {
  SEATING = "SEATING",
  LAYOUT = "LAYOUT",
  PREVIEW = "PREVIEW",
}

export default function SeatingArrangement(props: {
  module: ModuleWithSubsTwo;
}) {
  //
  const moduleD = props?.module;
  const [tabValue, setTabValue] = useState<string>(SeatingLayoutEnum.SEATING);
  //
  useEffect(() => {
    setTabValue(
      localStorage.getItem("dashboardSeatingArrangementTab") ??
        SeatingLayoutEnum.SEATING,
    );
  }, []);
  //
  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardSeatingArrangementTab", value);
    setTabValue(value);
  }
  //
  return (
    <div className="flex flex-col gap-10">
      {/*  */}

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/*  */}
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="main">
            <SelectTrigger className="">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">
                <MapPin /> Main Reception Hall
              </SelectItem>
              <SelectSeparator />

              <SelectItem value="add">
                <MapPin /> Add Location
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="">/</p>

          <Select defaultValue="main">
            <SelectTrigger className="">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">
                <Building /> Main Floor
              </SelectItem>
              <SelectSeparator />

              <SelectItem value="add">
                <Building /> Add Section
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="">/</p>

          <Select defaultValue="main">
            <SelectTrigger className="">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">
                <Calendar /> Dinner Setup
              </SelectItem>
              <SelectSeparator />

              <SelectItem value="add">
                <Calendar /> Add Arrangement
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/*  */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant={"outline"}>
            <PenLine />
            Vendor Presets
          </Button>
        </div>
      </div>

      <Tabs
        value={tabValue}
        onValueChange={handleTabsChange}
        className="gap-8"
      >
        <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
          <TabsTrigger value="SEATING">
            <Presentation /> Seating
          </TabsTrigger>
          <TabsTrigger value="LAYOUT">
            <Pen /> Layout
          </TabsTrigger>
          <TabsTrigger value="PREVIEW">
            <Eye /> Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="SEATING">
          <SeatingCanvas module={moduleD} />
        </TabsContent>
        <TabsContent value="LAYOUT">
          <SeatingLayout module={moduleD} />
        </TabsContent>
        <TabsContent value="PREVIEW">
          <SeatingPreview module={moduleD} />
        </TabsContent>
      </Tabs>

      {/*  */}
    </div>
  );
}
