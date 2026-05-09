"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Announcement } from "@/hooks/useAnnouncementStorage";
import { format } from "date-fns";
import {
  AlertTriangle,
  Calendar,
  Car,
  Clock,
  CloudRain,
  Edit,
  Eye,
  Info,
  Megaphone,
  MoreHorizontal,
  Search,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

interface AnnouncementListProps {
  announcements: Announcement[];
  onEdit: (id: string, data: Announcement) => void;
  onDelete: (id: string) => void;
}

const AnnouncementList = ({
  announcements,
  onEdit,
  onDelete,
}: AnnouncementListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return AlertTriangle;
      case "announcement":
        return Megaphone;
      case "schedule-change":
        return Clock;
      case "weather":
        return CloudRain;
      case "parking":
        return Car;
      case "safety":
        return Shield;
      default:
        return Info;
    }
  };

  const getTypeColor = (type: string, priority: string) => {
    if (type === "urgent" || priority === "high") {
      return "from-red-500 to-red-600";
    }
    switch (type) {
      case "announcement":
        return "from-blue-500 to-blue-600";
      case "schedule-change":
        return "from-orange-500 to-orange-600";
      case "weather":
        return "from-cyan-500 to-cyan-600";
      case "parking":
        return "from-purple-500 to-purple-600";
      case "safety":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-500 text-white",
      medium: "bg-orange-500 text-white",
      low: "bg-blue-500 text-white",
    };
    return (
      <Badge className={colors[priority as keyof typeof colors]}>
        {priority}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      sent: "bg-green-500 text-white",
      draft: "bg-gray-500 text-white",
      scheduled: "bg-blue-500 text-white",
    };
    return (
      <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
    );
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      announcement?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType =
      filterType === "all" || announcement.type === filterType;
    const matchesPriority =
      filterPriority === "all" || announcement.priority === filterPriority;

    return matchesSearch && matchesType && matchesPriority;
  });

  if (announcements.length === 0) {
    return (
      <div className="py-12 text-center">
        <Megaphone className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          No announcements yet
        </h3>
        <p className="text-gray-600">
          Create your first announcement to start communicating with attendees.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Select
          value={filterType}
          onValueChange={setFilterType}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="announcement">General</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="schedule-change">Schedule</SelectItem>
            <SelectItem value="weather">Weather</SelectItem>
            <SelectItem value="parking">Parking</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterPriority}
          onValueChange={setFilterPriority}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => {
          const TypeIcon = getTypeIcon(announcement?.type ?? "");
          const readRate =
            (announcement?.totalRecipients ?? 0) > 0
              ? Math.round(
                  ((announcement?.readCount ?? 0) /
                    (announcement?.totalRecipients ?? 0)) *
                    100,
                )
              : 0;

          return (
            <Card
              key={announcement.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-start gap-4">
                    <div
                      className={`h-12 w-12 bg-gradient-to-r ${getTypeColor(announcement?.type ?? "", announcement?.priority ?? "")} flex flex-shrink-0 items-center justify-center rounded-lg`}
                    >
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="truncate font-semibold text-gray-900">
                          {announcement.title}
                        </h3>
                        {getPriorityBadge(announcement?.priority ?? "")}
                        {getStatusBadge(announcement?.deliveryStatus ?? "")}
                      </div>

                      <p className="mb-3 line-clamp-2 text-gray-600">
                        {announcement.content}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(
                              String(announcement?.timestamp),
                              "MMM d, yyyy h:mm a",
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>
                            To:{" "}
                            {announcement.targetAudience === "all"
                              ? "All Attendees"
                              : announcement?.targetAudience?.toUpperCase()}
                          </span>
                        </div>
                        {announcement.deliveryStatus === "sent" && (
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>
                              {readRate}% read rate ({announcement.readCount}/
                              {announcement.totalRecipients})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          onEdit(announcement?.id ?? "", announcement)
                        }
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(announcement?.id ?? "")}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAnnouncements.length === 0 && announcements.length > 0 && (
        <div className="py-8 text-center">
          <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No matching announcements
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;
