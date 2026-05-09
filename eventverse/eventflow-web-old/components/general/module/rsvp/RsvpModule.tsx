"use client";

import { ModuleWithSubsTwo } from "@/actions/module";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookText,
  BookUser,
  CircleCheck,
  CircleX,
  Download,
  Hourglass,
  LayoutDashboard,
  Mail,
  Settings,
  Upload,
  UserPlus,
  Users2,
} from "lucide-react";
import { useEffect, useState } from "react";
import RsvpFormBuilder from "./RsvpFormBuilder";
import RsvpGuestGroup from "./RsvpGuestGroup";
import RsvpGuestList from "./RsvpGuestList";
import RsvpGuestSetting from "./RsvpGuestSetting";

export default function RsvpModule(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;
  const [tabValue, setTabValue] = useState("");
  //
  useEffect(() => {
    setTabValue(localStorage.getItem("dashboardRsvpTab") ?? "dashboard");
  }, []);
  //
  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardRsvpTab", value);
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
          <TabsTrigger value="dashboard">
            <LayoutDashboard /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="form-builder">
            <BookText /> Form Builder
          </TabsTrigger>
          <TabsTrigger value="guest-group">
            <BookUser /> Guest Groups
          </TabsTrigger>
          <TabsTrigger value="guest-list">
            <Users2 /> Guest List
          </TabsTrigger>
          <TabsTrigger value="setting">
            <Settings /> Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap items-center gap-4">
              <Card className="flex-1">
                <CardContent>
                  <CardDescription>Total Invited</CardDescription>
                  <p className="text-2xl font-bold">3</p>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardContent>
                  <CardDescription>Attending</CardDescription>
                  <p className="text-2xl font-bold text-green-700">1</p>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardContent>
                  <CardDescription>Pending</CardDescription>
                  <p className="text-2xl font-bold text-orange-700">1</p>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardContent>
                  <CardDescription>Declined</CardDescription>
                  <p className="text-2xl font-bold text-red-700">1</p>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardContent>
                  <CardDescription>Response Rate</CardDescription>
                  <p className="text-2xl font-bold text-indigo-700">75%</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button
                  variant={"outline"}
                  className="flex h-fit flex-1 flex-col"
                >
                  <UserPlus />
                  Add Guests
                </Button>
                <Button
                  variant={"outline"}
                  className="flex h-fit flex-1 flex-col"
                >
                  <Upload />
                  Import CSV
                </Button>
                <Button
                  variant={"outline"}
                  className="flex h-fit flex-1 flex-col"
                >
                  <Mail />
                  Send Invites
                </Button>
                <Button
                  variant={"outline"}
                  className="flex h-fit flex-1 flex-col"
                >
                  <Download />
                  Export List
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest RSVP responses</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CircleX />
                    <div className="flex flex-col">
                      <p className="font-medium">Emma Davis</p>
                      <CardDescription>11/12/2025</CardDescription>
                    </div>
                  </div>
                  <Badge variant={"destructive"}>Declined</Badge>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Hourglass />
                    <div className="flex flex-col">
                      <p className="font-medium">John Doe</p>
                      <CardDescription>11/12/2025</CardDescription>
                    </div>
                  </div>
                  <Badge variant={"outline"}>Pending</Badge>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <div className="flex flex-col">
                      <p className="font-medium">Jack Doe</p>
                      <CardDescription>11/12/2025</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-600">Accepted</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="form-builder">
          <RsvpFormBuilder module={moduleD} />
        </TabsContent>
        <TabsContent value="guest-group">
          <RsvpGuestGroup module={moduleD} />
        </TabsContent>
        <TabsContent value="guest-list">
          <RsvpGuestList module={moduleD} />
        </TabsContent>
        <TabsContent value="setting">
          <RsvpGuestSetting module={moduleD} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
