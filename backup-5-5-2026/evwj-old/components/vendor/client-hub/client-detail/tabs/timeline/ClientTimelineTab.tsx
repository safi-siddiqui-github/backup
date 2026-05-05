"use client";

import { useMemo } from "react";
import { Client } from "../../../mockClients";
import ClientTimeline from "./ClientTimeline";

interface ClientTimelineTabProps {
  client: Client;
  selectedEventId?: string | null;
  selectedProjectId?: string | null;
}

export default function ClientTimelineTab({ client, selectedEventId, selectedProjectId }: ClientTimelineTabProps) {
  // Get all projects from all events
  const allProjects = useMemo(() => {
    if (!client.events) return [];
    return client.events.flatMap((event) =>
      event.projects.map((project) => ({
        ...project,
        eventId: event.id,
        eventName: event.name,
      }))
    );
  }, [client.events]);

  // Get the selected project data based on selectedProjectId or selectedEventId
  const selectedProjectData = useMemo(() => {
    // If a specific project is selected, use it
    if (selectedProjectId) {
      return allProjects.find((p) => p.id === selectedProjectId);
    }
    
    // If an event is selected, show the first project in that event
    if (selectedEventId) {
      const eventProjects = allProjects.filter((p) => p.eventId === selectedEventId);
      return eventProjects[0];
    }
    
    // Otherwise, show the first project from all events
    return allProjects[0];
  }, [allProjects, selectedEventId, selectedProjectId]);

  if (!selectedProjectData) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No projects found for this client.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
        <div>
          <h3 className="text-lg font-semibold">Project Timeline</h3>
          <p className="text-sm text-muted-foreground">
            Track service delivery milestones and progress
          {selectedProjectData?.eventName && (
            <span className="ml-1">- {selectedProjectData.eventName}</span>
          )}
        </p>
      </div>

      {/* Timeline */}
        <ClientTimeline
          project={selectedProjectData}
          clientId={client.id}
          clientName={client.name}
        />
    </div>
  );
}

