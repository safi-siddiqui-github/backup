"use client";

import { ModuleWithSubsTwo } from "@/actions/module";
import { useEffect, useState } from "react";

import FormBuilder from "@/components/ui-extends/form-builder/FormBuilder";
import FormPreview from "@/components/ui-extends/form-builder/FormPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookText, Eye } from "lucide-react";

export default function RsvpFormBuilder(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;
  const [tabValue, setTabValue] = useState("");
  //
  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardRsvpFormTab", value);
    setTabValue(value);
  }
  //
  useEffect(() => {
    setTabValue(localStorage.getItem("dashboardRsvpFormTab") ?? "builder");
  }, []);
  //
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <p className="text-xl font-medium">RSVP Form Builder</p>
        <p className="">Design your perfect guest response form</p>
      </div>

      <Tabs
        value={tabValue}
        onValueChange={handleTabsChange}
        className="gap-8"
      >
        <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
          <TabsTrigger value="builder">
            <BookText /> Form Builder
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye /> Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="builder">
          <FormBuilder module={moduleD} />
        </TabsContent>
        <TabsContent value="preview">
          <FormPreview module={moduleD} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
