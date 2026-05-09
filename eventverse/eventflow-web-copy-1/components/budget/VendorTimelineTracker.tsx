"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VendorProfile } from "@/types/budget";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
} from "lucide-react";
import { useState } from "react";
import type { VendorContract, VendorMilestone } from "./VendorManagementHub";

interface VendorTimelineTrackerProps {
  milestones: VendorMilestone[];
  contracts: VendorContract[];
  vendors: VendorProfile[];
}

const VendorTimelineTracker = ({
  milestones,
  contracts,
  vendors,
}: VendorTimelineTrackerProps) => {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter milestones
  const filteredMilestones = milestones.filter((milestone) => {
    const matchesPriority =
      priorityFilter === "all" || milestone.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || milestone.status === statusFilter;
    return matchesPriority && matchesStatus;
  });

  // Sort milestones by date
  const sortedMilestones = [...filteredMilestones].sort(
    (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
  );

  // Group milestones by date for calendar view
  const milestonesByDate = sortedMilestones.reduce(
    (acc, milestone) => {
      const dateKey = milestone.dueDate.toDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(milestone);
      return acc;
    },
    {} as Record<string, VendorMilestone[]>,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (milestone: VendorMilestone) => {
    const isOverdue =
      milestone.dueDate < new Date() && milestone.status !== "completed";

    if (milestone.status === "completed") {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (isOverdue) {
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    } else {
      return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const isOverdue = (milestone: VendorMilestone) => {
    return milestone.dueDate < new Date() && milestone.status !== "completed";
  };

  // Get upcoming milestones (next 7 days)
  const upcomingMilestones = sortedMilestones.filter((milestone) => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return (
      milestone.dueDate >= today &&
      milestone.dueDate <= nextWeek &&
      milestone.status !== "completed"
    );
  });

  // Get overdue milestones
  const overdueMilestones = sortedMilestones.filter(isOverdue);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Milestones</p>
                <p className="text-2xl font-bold">{milestones.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold">
                  {upcomingMilestones.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold">{overdueMilestones.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">
                  {milestones.filter((m) => m.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={priorityFilter}
                onValueChange={setPriorityFilter}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List View
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("calendar")}
              >
                Calendar View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Urgent Alerts */}
      {(upcomingMilestones.length > 0 || overdueMilestones.length > 0) && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {overdueMilestones.length > 0 && (
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  Overdue Items
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {overdueMilestones.slice(0, 3).map((milestone) => {
                    const vendor = vendors.find(
                      (v) => v.id === milestone.vendorId,
                    );
                    return (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {milestone.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {vendor?.name}
                          </p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          {Math.ceil(
                            (new Date().getTime() -
                              milestone.dueDate.getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          days late
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {upcomingMilestones.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Clock className="h-5 w-5" />
                  Upcoming This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {upcomingMilestones.slice(0, 3).map((milestone) => {
                    const vendor = vendors.find(
                      (v) => v.id === milestone.vendorId,
                    );
                    return (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {milestone.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {vendor?.name}
                          </p>
                        </div>
                        <span className="text-xs text-gray-600">
                          {milestone.dueDate.toLocaleDateString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Timeline Content */}
      {viewMode === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedMilestones.map((milestone) => {
                const vendor = vendors.find((v) => v.id === milestone.vendorId);
                const contract = contracts.find(
                  (c) => c.id === milestone.contractId,
                );

                return (
                  <div
                    key={milestone.id}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <div className="mt-1 flex-shrink-0">
                      {getStatusIcon(milestone)}
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-gray-600">
                            {vendor?.name} • {vendor?.category}
                          </p>
                          <p className="mt-1 text-sm text-gray-700">
                            {milestone.description}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge
                            className={getPriorityColor(milestone.priority)}
                          >
                            <Flag className="mr-1 h-3 w-3" />
                            {milestone.priority}
                          </Badge>
                          <Badge
                            className={getStatusColor(
                              isOverdue(milestone)
                                ? "overdue"
                                : milestone.status,
                            )}
                          >
                            {isOverdue(milestone)
                              ? "overdue"
                              : milestone.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Due: {milestone.dueDate.toLocaleDateString()}
                        </span>
                        {contract && (
                          <span className="text-sm font-medium">
                            Contract: ${contract.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Calendar View</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {selectedMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <Calendar className="mx-auto mb-2 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">Calendar view coming soon</p>
              <p className="text-sm text-gray-400">
                Use list view to see all milestones
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VendorTimelineTracker;
