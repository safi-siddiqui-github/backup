"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Client } from "../mockClients";
import { cn } from "@/lib/utils";
import StatusBadge from "../components/StatusBadge";
import OverviewTab from "./tabs/overview/OverviewTab";
import CommunicationsTab from "./tabs/communications/CommunicationsTab";
import BillingTab from "./tabs/billing/BillingTab";
import DocumentsTab from "./tabs/documents/DocumentsTab";
import TasksTab from "./tabs/tasks/TasksTab";
import ClientTimelineTab from "./tabs/timeline/ClientTimelineTab";
import EventProjectSelector from "./EventProjectSelector";

interface ClientDetailPageProps {
  client: Client;
  onBack: () => void;
  initialTab?: string;
}

export default function ClientDetailPage({ client, onBack, initialTab }: ClientDetailPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab || "overview");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Update tab when initialTab prop changes
  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, activeTab]);

  // Handle event/project selection
  const handleEventProjectSelect = (eventId: string | null, projectId: string | null) => {
    setSelectedEventId(eventId);
    setSelectedProjectId(projectId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Button>
      </div>

      {/* Title and Status */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {client.name}
          </h1>
          <p className="text-muted-foreground">
            Complete client management dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Event/Project Selector */}
          {client.events && client.events.length > 0 && (
            <EventProjectSelector
              events={client.events}
              selectedEventId={selectedEventId}
              selectedProjectId={selectedProjectId}
              onSelect={handleEventProjectSelect}
            />
          )}
        <StatusBadge status={client.status} type="client" className="px-3 py-1" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="*:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="communications"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Communications
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Timeline
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Billing
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Tasks
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="overview" className="mt-6">
          <OverviewTab client={client} />
        </TabsContent>

        <TabsContent value="communications" className="mt-6">
          <CommunicationsTab 
            client={client} 
            selectedEventId={selectedEventId}
            selectedProjectId={selectedProjectId}
          />
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <ClientTimelineTab 
            client={client}
            selectedEventId={selectedEventId}
            selectedProjectId={selectedProjectId}
          />
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            Contracts content will be displayed here
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <BillingTab 
            client={client}
            selectedEventId={selectedEventId}
            selectedProjectId={selectedProjectId}
          />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <DocumentsTab 
            client={client}
            selectedEventId={selectedEventId}
            selectedProjectId={selectedProjectId}
          />
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <TasksTab 
            client={client}
            selectedEventId={selectedEventId}
            selectedProjectId={selectedProjectId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

