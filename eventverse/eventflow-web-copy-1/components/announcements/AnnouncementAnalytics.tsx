"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Announcement } from "@/hooks/useAnnouncementStorage";
import { format, subDays } from "date-fns";
import { Eye, MessageSquare, TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AnnouncementAnalyticsProps {
  announcements: Announcement[];
}

const AnnouncementAnalytics = ({
  announcements,
}: AnnouncementAnalyticsProps) => {
  // Calculate metrics
  const totalAnnouncements = announcements.length;
  const totalRecipients = announcements.reduce(
    (sum, a) => sum + (a?.totalRecipients ?? 0),
    0,
  );
  const totalReads = announcements.reduce(
    (sum, a) => sum + (a.readCount ?? 0),
    0,
  );
  const averageReadRate =
    totalRecipients > 0 ? Math.round((totalReads / totalRecipients) * 100) : 0;

  // Type distribution
  const typeData = announcements.reduce(
    (acc, announcement) => {
      acc[announcement?.type ?? "announcement"] =
        (acc[announcement?.type ?? "announcement"] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = Object.entries(typeData).map(([type, count]) => ({
    name: type.replace("-", " "),
    value: count,
    percentage: Math.round((count / totalAnnouncements) * 100),
  }));

  // Priority distribution
  const priorityData = announcements.reduce(
    (acc, announcement) => {
      acc[announcement?.priority ?? "low"] =
        (acc[announcement?.priority ?? "low"] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const priorityChartData = Object.entries(priorityData).map(
    ([priority, count]) => ({
      priority,
      count,
      percentage: Math.round((count / totalAnnouncements) * 100),
    }),
  );

  // Weekly activity
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayAnnouncements = announcements.filter(
      (a) =>
        format(a?.timestamp ?? "", "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    );
    return {
      date: format(date, "MMM dd"),
      announcements: dayAnnouncements.length,
      reads: dayAnnouncements.reduce((sum, a) => sum + (a.readCount ?? 0), 0),
    };
  });

  const colors = [
    "#3B82F6",
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#8B5CF6",
    "#F97316",
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sent</p>
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
                <p className="text-sm text-gray-600">Total Recipients</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalRecipients}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reads</p>
                <p className="text-3xl font-bold text-gray-900">{totalReads}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Read Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {averageReadRate}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Activity Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Over Time</CardTitle>
            <CardDescription>
              Announcements sent and read in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="announcements"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Sent"
                />
                <Line
                  type="monotone"
                  dataKey="reads"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Reads"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Announcement Types</CardTitle>
            <CardDescription>
              Distribution of announcement types sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Levels</CardTitle>
            <CardDescription>
              Breakdown of announcement priorities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={priorityChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#3B82F6"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>
              Performance of your latest announcements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.slice(0, 5).map((announcement) => {
                const readRate =
                  (announcement?.totalRecipients ?? 0) > 0
                    ? Math.round(
                        ((announcement?.readCount ?? 0) /
                          (announcement?.totalRecipients ?? 0)) *
                          100,
                      )
                    : 0;

                return (
                  <div
                    key={announcement.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-medium text-gray-900">
                        {announcement.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          className={
                            announcement.priority === "high"
                              ? "bg-red-500 text-white"
                              : announcement.priority === "medium"
                                ? "bg-orange-500 text-white"
                                : "bg-blue-500 text-white"
                          }
                        >
                          {announcement.priority}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {format(announcement?.timestamp ?? "", "MMM d")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {readRate}%
                      </p>
                      <p className="text-xs text-gray-500">read rate</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementAnalytics;
