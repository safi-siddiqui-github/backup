"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  FileText,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

interface ProjectTimelineProps {
  leadId: string;
  eventDate: string;
}

const ProjectTimeline = ({ leadId, eventDate }: ProjectTimelineProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(
    null,
  );

  const milestones = [
    {
      id: "1",
      title: "Contract Signed",
      description: "Initial contract and deposit received",
      date: "2024-01-25",
      status: "completed",
      progress: 100,
      type: "contract",
      tasks: [
        "Contract review and signing",
        "Deposit payment processing",
        "Welcome packet sent",
      ],
    },
    {
      id: "2",
      title: "Engagement Session",
      description: "Pre-wedding photography session",
      date: "2024-03-15",
      status: "in_progress",
      progress: 60,
      type: "session",
      tasks: [
        "Location scouting completed",
        "Session scheduled",
        "Equipment preparation needed",
      ],
    },
    {
      id: "3",
      title: "Final Planning Meeting",
      description: "Confirm all wedding day details",
      date: "2024-07-15",
      status: "upcoming",
      progress: 0,
      type: "meeting",
      tasks: [
        "Timeline review",
        "Shot list finalization",
        "Emergency contact exchange",
      ],
    },
    {
      id: "4",
      title: "Wedding Day",
      description: "Main event photography coverage",
      date: eventDate,
      status: "upcoming",
      progress: 0,
      type: "event",
      tasks: [
        "Equipment setup (6:00 AM)",
        "Getting ready photos (8:00 AM)",
        "Ceremony coverage (2:00 PM)",
        "Reception photography (6:00 PM)",
      ],
    },
    {
      id: "5",
      title: "Photo Editing",
      description: "Post-production and editing",
      date: "2024-08-30",
      status: "upcoming",
      progress: 0,
      type: "editing",
      tasks: [
        "Photo selection and culling",
        "Color correction and editing",
        "Album layout design",
      ],
    },
    {
      id: "6",
      title: "Delivery",
      description: "Final photo delivery and album",
      date: "2024-09-15",
      status: "upcoming",
      progress: 0,
      type: "delivery",
      tasks: [
        "Online gallery creation",
        "Album printing and binding",
        "Final delivery to client",
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-gray-100 text-gray-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FileText className="h-4 w-4" />;
      case "session":
        return <Camera className="h-4 w-4" />;
      case "meeting":
        return <Users className="h-4 w-4" />;
      case "event":
        return <Star className="h-4 w-4" />;
      case "editing":
        return <FileText className="h-4 w-4" />;
      case "delivery":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const completedMilestones = milestones.filter(
    (m) => m.status === "completed",
  ).length;
  const totalProgress = (completedMilestones / milestones.length) * 100;

  const daysUntilEvent = Math.ceil(
    (new Date(eventDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Overall Progress
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(totalProgress)}%
                </p>
              </div>
              <div className="h-16 w-16">
                <svg
                  className="h-16 w-16 -rotate-90 transform"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray={`${totalProgress}, 100`}
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Days Until Event
                </p>
                <p className="text-2xl font-bold">{daysUntilEvent}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Milestones</p>
                <p className="text-2xl font-bold">
                  {completedMilestones}/{milestones.length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className="relative"
              >
                {/* Timeline line */}
                {index < milestones.length - 1 && (
                  <div className="absolute top-12 left-4 h-16 w-0.5 bg-gray-200"></div>
                )}

                <div
                  className={`flex cursor-pointer gap-4 rounded-lg border p-4 transition-all ${
                    selectedMilestone === milestone.id
                      ? "bg-blue-50 ring-2 ring-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    setSelectedMilestone(
                      selectedMilestone === milestone.id ? null : milestone.id,
                    )
                  }
                >
                  {/* Timeline dot */}
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      milestone.status === "completed"
                        ? "bg-green-500 text-white"
                        : milestone.status === "in_progress"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {getTypeIcon(milestone.type)}
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{milestone.title}</h4>
                        <p className="text-sm text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {new Date(milestone.date).toLocaleDateString()}
                        </p>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>

                    {milestone.status === "in_progress" && (
                      <div className="mt-2">
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress
                          value={milestone.progress}
                          className="h-2"
                        />
                      </div>
                    )}

                    {selectedMilestone === milestone.id && (
                      <div className="mt-4 border-t pt-4">
                        <h5 className="mb-2 font-medium">Tasks:</h5>
                        <ul className="space-y-1">
                          {milestone.tasks.map((task, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              {milestone.status === "completed" ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : milestone.status === "in_progress" ? (
                                <Clock className="h-3 w-3 text-blue-600" />
                              ) : (
                                <div className="h-3 w-3 rounded-full border border-gray-300" />
                              )}
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones
              .filter(
                (m) => m.status === "upcoming" || m.status === "in_progress",
              )
              .slice(0, 3)
              .map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-orange-600">
                      {getTypeIcon(milestone.type)}
                    </div>
                    <div>
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-sm text-gray-600">
                        {Math.ceil(
                          (new Date(milestone.date).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days remaining
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {new Date(milestone.date).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button>Update Progress</Button>
        <Button variant="outline">Add Milestone</Button>
        <Button variant="outline">Schedule Meeting</Button>
      </div>
    </div>
  );
};

export default ProjectTimeline;
