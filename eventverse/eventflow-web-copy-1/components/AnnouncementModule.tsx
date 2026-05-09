"use client";

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
  Announcement,
  useAnnouncementStorage,
} from "@/hooks/useAnnouncementStorage";
import {
  ArrowLeft,
  BarChart3,
  Megaphone,
  MessageSquare,
  Plus,
} from "lucide-react";
import { useState } from "react";
import AnnouncementAnalytics from "./announcements/AnnouncementAnalytics";
import AnnouncementCreator from "./announcements/AnnouncementCreator";
import AnnouncementList from "./announcements/AnnouncementList";

interface AnnouncementModuleProps {
  eventId: string;
  onBack: () => void;
}

const AnnouncementModule = ({ eventId, onBack }: AnnouncementModuleProps) => {
  const [activeTab, setActiveTab] = useState("list");
  const [showCreator, setShowCreator] = useState(false);
  const {
    announcements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  } = useAnnouncementStorage(eventId);

  const handleCreateAnnouncement = (
    announcementData: Partial<Announcement>,
  ) => {
    createAnnouncement(announcementData);
    setShowCreator(false);
    setActiveTab("list");
  };

  const handleEditAnnouncement = (id: string, data: Announcement) => {
    updateAnnouncement(id, data);
  };

  const handleDeleteAnnouncement = (id: string) => {
    deleteAnnouncement(id);
  };

  const totalAnnouncements = announcements.length;
  const urgentAnnouncements = announcements.filter(
    (a) => a.priority === "high",
  ).length;
  const recentAnnouncements = announcements.filter((a) => {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(String(a?.timestamp)) > dayAgo;
  }).length;

  if (showCreator) {
    return (
      <AnnouncementCreator
        onBack={() => setShowCreator(false)}
        onSave={handleCreateAnnouncement}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                  <Megaphone className="h-6 w-6 text-blue-600" />
                  Event Announcements
                </h1>
                <p className="text-gray-600">
                  Communicate with your event attendees
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowCreator(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Announcements</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalAnnouncements}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Urgent Messages</p>
                  <p className="text-3xl font-bold text-red-600">
                    {urgentAnnouncements}
                  </p>
                </div>
                <Badge className="bg-red-500 text-white">High Priority</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sent Today</p>
                  <p className="text-3xl font-bold text-green-600">
                    {recentAnnouncements}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Announcement Management</CardTitle>
                <CardDescription>
                  Create, manage, and track your event announcements
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">
                  All Announcements ({totalAnnouncements})
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  Analytics & Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="list"
                className="mt-6"
              >
                <AnnouncementList
                  announcements={announcements}
                  onEdit={handleEditAnnouncement}
                  onDelete={handleDeleteAnnouncement}
                />
              </TabsContent>

              <TabsContent
                value="analytics"
                className="mt-6"
              >
                <AnnouncementAnalytics announcements={announcements} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementModule;
