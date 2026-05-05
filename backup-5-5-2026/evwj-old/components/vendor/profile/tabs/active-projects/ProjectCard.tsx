"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  Calendar,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Project } from "./types";
import { getStatusColor } from "./utils";
import { useActivityNavigationStore } from "@/lib/activity-navigation-store";
import { mockClients } from "@/components/vendor/client-hub/mockClients";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const { setNavigationTarget } = useActivityNavigationStore();

  // Find client by name (with flexible matching)
  const findClientByName = (name: string) => {
    // First try exact match
    let client = mockClients.find((client) => client.name === name);
    
    // If no exact match, try partial match (e.g., "Sarah & Michael Johnson" matches "Sarah Johnson")
    if (!client) {
      client = mockClients.find((client) => {
        const clientNameLower = client.name.toLowerCase();
        const searchNameLower = name.toLowerCase();
        return clientNameLower.includes(searchNameLower) || searchNameLower.includes(clientNameLower);
      });
    }
    
    return client;
  };

  const navigateToClient = (initialTab: string) => {
    const client = findClientByName(project.clientName);
    if (client) {
      // Set navigation target first
      setNavigationTarget({
        type: "client",
        clientId: client.id,
        initialTab: initialTab,
      });
      // Navigate to vendor portal (client-hub tab will be activated automatically)
      router.push("/vendor");
    }
  };

  const handleMessageClient = () => {
    navigateToClient("communications");
  };

  const handleUpdateTimeline = () => {
    navigateToClient("timeline");
  };

  const handleViewContract = () => {
    navigateToClient("documents");
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        {/* Project Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white break-words">
                {project.clientName}
              </h3>
              {project.newMessages && (
                <Badge
                  variant="destructive"
                  className="bg-red-500 text-white shrink-0"
                >
                  {project.newMessages} new
                </Badge>
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
              {project.eventType} • Event Date: {project.eventDate}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end sm:justify-start gap-2 shrink-0">
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              ${project.totalValue.toLocaleString()}
            </p>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="mt-6 space-y-4">

          {/* Overall Progress */}
          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                Overall Progress  -  Current Stage: {project.currentStage}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 shrink-0">
                {project.overallProgress}% Complete 
              </p>
            </div>
            <Progress 
              value={project.overallProgress} 
              className="bg-gray-200 dark:bg-gray-700 [&>div]:bg-blue-600" 
            />
          </div>
        </div>

        {/* Next Task */}
        <div className="mt-4 rounded-lg bg-gray-50 p-3 sm:p-4 dark:bg-gray-900/50">
          <div className="flex items-center gap-2 sm:gap-3">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white break-words">
                Next: {project.nextTask}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Due: {project.nextTaskDue}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 shrink-0" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full sm:w-auto"
            onClick={handleMessageClient}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Client
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full sm:w-auto"
            onClick={handleUpdateTimeline}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Update Timeline
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full sm:w-auto"
            onClick={handleViewContract}
          >
            <FileText className="mr-2 h-4 w-4" />
            View Contract
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

