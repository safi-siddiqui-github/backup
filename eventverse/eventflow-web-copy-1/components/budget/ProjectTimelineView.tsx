"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { VendorProfile } from "@/types/budget";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  User,
} from "lucide-react";
import type { VendorContract, VendorMilestone } from "./VendorManagementHub";

interface ProjectTimelineViewProps {
  vendor: VendorProfile;
  contracts: VendorContract[];
  milestones: VendorMilestone[];
}

// Mock service delivery stages that would come from ServiceDeliveryManager
const serviceStages = [
  {
    id: "1",
    name: "Initial Consultation",
    description:
      "Meet with clients to understand their vision and requirements",
    duration: 7,
    status: "completed" as const,
    completedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Menu Planning & Tasting",
    description: "Design custom menu and conduct tasting session",
    duration: 14,
    status: "in_progress" as const,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    progress: 60,
  },
  {
    id: "3",
    name: "Contract & Planning",
    description: "Finalize contract and detailed event planning",
    duration: 21,
    status: "pending" as const,
    estimatedStart: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    name: "Final Preparations",
    description: "Final confirmations and event preparation",
    duration: 14,
    status: "pending" as const,
    estimatedStart: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    name: "Event Execution",
    description: "Setup, service, and cleanup on event day",
    duration: 1,
    status: "pending" as const,
    estimatedStart: new Date(Date.now() + 44 * 24 * 60 * 60 * 1000),
  },
];

const ProjectTimelineView = ({
  vendor,
  contracts,
  milestones,
}: ProjectTimelineViewProps) => {
  const activeContract = contracts.find((c) => c.status === "active");

  // Calculate overall progress
  const completedStages = serviceStages.filter(
    (s) => s.status === "completed",
  ).length;
  const inProgressStages = serviceStages.filter(
    (s) => s.status === "in_progress",
  );
  const totalProgress =
    completedStages +
    (inProgressStages.length > 0 ? inProgressStages[0].progress / 100 : 0);
  const overallProgress = (totalProgress / serviceStages.length) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Current Engagement: Wedding Catering Package
          </CardTitle>
          <CardDescription>
            {activeContract && (
              <span>
                Contract Value: ${activeContract.value.toLocaleString()} • Est.
                Completion: {activeContract.completionDate.toLocaleDateString()}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">
                  {Math.round(overallProgress)}% Complete
                </span>
              </div>
              <Progress
                value={overallProgress}
                className="h-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-medium">{completedStages}</div>
                <div className="text-gray-600">Stages Complete</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium">
                  {inProgressStages.length}
                </div>
                <div className="text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium">
                  {serviceStages.length -
                    completedStages -
                    inProgressStages.length}
                </div>
                <div className="text-gray-600">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Service Delivery Timeline</CardTitle>
          <CardDescription>
            Track progress through vendor-defined service stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceStages.map((stage, index) => (
              <div
                key={stage.id}
                className="flex items-start gap-4 rounded-lg border p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                  {getStatusIcon(stage.status)}
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium">{stage.name}</h4>
                    <Badge className={getStatusColor(stage.status)}>
                      {stage.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <p className="mb-3 text-sm text-gray-600">
                    {stage.description}
                  </p>

                  {stage.status === "in_progress" && stage.progress && (
                    <div className="mb-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium">Progress</span>
                        <span className="text-xs text-gray-600">
                          {stage.progress}%
                        </span>
                      </div>
                      <Progress
                        value={stage.progress}
                        className="h-1"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {stage.status === "completed" && stage.completedDate ? (
                        <span>
                          Completed: {stage.completedDate.toLocaleDateString()}
                        </span>
                      ) : stage.status === "in_progress" && stage.startDate ? (
                        <span>
                          Started: {stage.startDate.toLocaleDateString()}
                        </span>
                      ) : stage.estimatedStart ? (
                        <span>
                          Est. Start:{" "}
                          {stage.estimatedStart.toLocaleDateString()}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {stage.duration} day{stage.duration !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {index < serviceStages.length - 1 && (
                  <ArrowRight className="mt-2 h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Related Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contract Milestones
          </CardTitle>
          <CardDescription>
            Payment and delivery milestones linked to service stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between rounded border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{milestone.title}</p>
                  <p className="text-xs text-gray-600">
                    {milestone.description}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      milestone.status === "completed" ? "default" : "outline"
                    }
                  >
                    {milestone.status}
                  </Badge>
                  <p className="mt-1 text-xs text-gray-500">
                    Due: {milestone.dueDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectTimelineView;
