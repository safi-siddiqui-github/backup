"use client";

import { useState } from "react";
import { Check, ChevronDown, Calendar, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VendorEvent } from "./VendorListView";
import { cn } from "@/lib/utils";

interface EventProjectSelectorProps {
  events: VendorEvent[];
  selectedEventId: string | null;
  selectedProjectId: string | null;
  onSelect: (eventId: string | null, projectId: string | null) => void;
}

export default function EventProjectSelector({
  events,
  selectedEventId,
  selectedProjectId,
  onSelect,
}: EventProjectSelectorProps) {
  const [open, setOpen] = useState(false);

  // Find selected event and project
  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const selectedProject = selectedEvent?.projects.find(
    (p) => p.id === selectedProjectId
  );

  // Get display text
  const getDisplayText = () => {
    if (!selectedEventId) {
      return "All Events & Projects";
    }
    if (!selectedProjectId) {
      return selectedEvent?.name || "Select Event";
    }
    return `${selectedEvent?.name} - ${selectedProject?.name}`;
  };

  // Handle selection
  const handleSelect = (eventId: string | null, projectId: string | null) => {
    onSelect(eventId, projectId);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[250px] justify-between bg-white dark:bg-slate-800"
        >
          <span className="truncate">{getDisplayText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuLabel>Select Event & Project</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* All Events & Projects Option */}
        <DropdownMenuItem
          onClick={() => handleSelect(null, null)}
          className="cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-medium">All Events & Projects</span>
            {!selectedEventId && !selectedProjectId && (
              <Check className="h-4 w-4 text-blue-600" />
            )}
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Events with Projects */}
        {events.map((event) => (
          <DropdownMenuSub key={event.id}>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <div className="flex items-center gap-2 w-full">
                <Calendar className="h-4 w-4 text-purple-600" />
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-medium truncate">{event.name}</span>
                    <Badge 
                      variant={event.status === "completed" || event.status === "cancelled" ? "secondary" : "default"}
                      className="text-xs shrink-0"
                    >
                      {event.status === "completed" || event.status === "cancelled" ? "Archived" : "Active"}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {event.projects.length} project
                    {event.projects.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-[250px]">
              {/* All Projects in this Event */}
              <DropdownMenuItem
                onClick={() => handleSelect(event.id, null)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">All Projects</span>
                  {selectedEventId === event.id && !selectedProjectId && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Individual Projects */}
              {event.projects.map((project) => (
                <DropdownMenuItem
                  key={project.id}
                  onClick={() => handleSelect(event.id, project.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FolderOpen className="h-4 w-4 text-blue-600 shrink-0" />
                      <div className="flex flex-col items-start flex-1 min-w-0">
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-sm truncate">{project.name}</span>
                          <Badge 
                            variant={project.status === "completed" || project.status === "cancelled" ? "secondary" : "default"}
                            className="text-xs shrink-0"
                          >
                            {project.status === "completed" || project.status === "cancelled" ? "Archived" : "Active"}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    {selectedProjectId === project.id && (
                      <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

