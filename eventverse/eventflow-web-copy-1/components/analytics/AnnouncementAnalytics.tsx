"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bell,
  Eye,
  Megaphone,
  MessageSquare,
  Share2,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface AnnouncementAnalyticsProps {
  eventId: string;
}

const AnnouncementAnalytics = ({ eventId }: AnnouncementAnalyticsProps) => {
  const announcementOverview = {
    totalAnnouncements: 15,
    totalViews: 2847,
    totalEngagements: 567,
    avgViewRate: 76.3,
    avgEngagementRate: 19.9,
    activeNotifications: 3,
  };

  const announcementPerformance = [
    {
      title: "Welcome to Our Wedding!",
      views: 234,
      engagements: 89,
      type: "Welcome",
    },
    {
      title: "Dinner is Served",
      views: 189,
      engagements: 45,
      type: "Event Update",
    },
    {
      title: "Dance Floor is Open!",
      views: 167,
      engagements: 78,
      type: "Event Update",
    },
    {
      title: "Last Call for Photos",
      views: 145,
      engagements: 34,
      type: "Reminder",
    },
    {
      title: "Thank You Message",
      views: 198,
      engagements: 67,
      type: "Thank You",
    },
  ];

  const engagementTrend = [
    { hour: "14:00", views: 45, engagements: 12 },
    { hour: "15:00", views: 89, engagements: 23 },
    { hour: "16:00", views: 134, engagements: 34 },
    { hour: "17:00", views: 156, engagements: 41 },
    { hour: "18:00", views: 178, engagements: 48 },
    { hour: "19:00", views: 198, engagements: 52 },
    { hour: "20:00", views: 167, engagements: 39 },
    { hour: "21:00", views: 134, engagements: 28 },
  ];

  const chartConfig = {
    views: { label: "Views", color: "#3B82F6" },
    engagements: { label: "Engagements", color: "#10B981" },
  };

  return (
    <div className="space-y-6">
      {/* Announcement Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Megaphone className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">
                  {announcementOverview.totalAnnouncements}
                </div>
                <div className="text-xs text-gray-600">Total Announcements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">
                  {announcementOverview.totalViews}
                </div>
                <div className="text-xs text-gray-600">Total Views</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">
                  {announcementOverview.totalEngagements}
                </div>
                <div className="text-xs text-gray-600">Engagements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">
                  {announcementOverview.avgViewRate}%
                </div>
                <div className="text-xs text-gray-600">Avg View Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Share2 className="h-6 w-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">
                  {announcementOverview.avgEngagementRate}%
                </div>
                <div className="text-xs text-gray-600">Engagement Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">
                  {announcementOverview.activeNotifications}
                </div>
                <div className="text-xs text-gray-600">
                  Active Notifications
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Engagement Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Throughout Event</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart data={engagementTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="var(--color-views)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagements"
                    stroke="var(--color-engagements)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Announcement Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={announcementPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="title"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="views"
                    fill="var(--color-views)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Announcement Details */}
      <Card>
        <CardHeader>
          <CardTitle>Announcement Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcementPerformance.map((announcement, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div>
                  <div className="font-medium">{announcement.title}</div>
                  <Badge
                    variant="outline"
                    className="mt-1"
                  >
                    {announcement.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-medium">{announcement.views}</div>
                    <div className="text-xs text-gray-600">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">
                      {announcement.engagements}
                    </div>
                    <div className="text-xs text-gray-600">Engagements</div>
                  </div>
                  <Badge className="bg-blue-500 text-white">
                    {Math.round(
                      (announcement.engagements / announcement.views) * 100,
                    )}
                    % rate
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementAnalytics;
