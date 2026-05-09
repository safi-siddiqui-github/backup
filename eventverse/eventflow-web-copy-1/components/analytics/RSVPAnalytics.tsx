"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  UserPlus,
  Users,
} from "lucide-react";
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
  XAxis,
  YAxis,
} from "recharts";

interface RSVPAnalyticsProps {
  eventId: string;
}

const RSVPAnalytics = ({ eventId }: RSVPAnalyticsProps) => {
  const rsvpStatusData = [
    { status: "Confirmed", count: 189, percentage: 76.2, color: "#22C55E" },
    { status: "Pending", count: 34, percentage: 13.7, color: "#F59E0B" },
    { status: "Declined", count: 18, percentage: 7.3, color: "#EF4444" },
    { status: "No Response", count: 7, percentage: 2.8, color: "#6B7280" },
  ];

  const dailyRSVPData = [
    { date: "Mar 1", confirmed: 15, declined: 2, pending: 8 },
    { date: "Mar 8", confirmed: 28, declined: 3, pending: 12 },
    { date: "Mar 15", confirmed: 45, declined: 5, pending: 18 },
    { date: "Mar 22", confirmed: 67, declined: 8, pending: 25 },
    { date: "Mar 29", confirmed: 89, declined: 12, pending: 30 },
    { date: "Apr 5", confirmed: 124, declined: 15, pending: 32 },
    { date: "Apr 12", confirmed: 156, declined: 16, pending: 34 },
    { date: "Today", confirmed: 189, declined: 18, pending: 34 },
  ];

  const dietaryPreferences = [
    { preference: "No Restrictions", count: 142, percentage: 75.1 },
    { preference: "Vegetarian", count: 28, percentage: 14.8 },
    { preference: "Vegan", count: 12, percentage: 6.3 },
    { preference: "Gluten-Free", count: 5, percentage: 2.6 },
    { preference: "Other", count: 2, percentage: 1.1 },
  ];

  const guestGroupAnalysis = [
    { group: "Singles", count: 45, avgPartySize: 1.0 },
    { group: "Couples", count: 67, avgPartySize: 2.0 },
    { group: "Families", count: 23, avgPartySize: 3.8 },
    { group: "Large Groups", count: 8, avgPartySize: 6.2 },
  ];

  const chartConfig = {
    confirmed: { label: "Confirmed", color: "#22C55E" },
    declined: { label: "Declined", color: "#EF4444" },
    pending: { label: "Pending", color: "#F59E0B" },
  };

  return (
    <div className="space-y-6">
      {/* RSVP Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">248</div>
                <div className="text-xs text-gray-600">Total Invited</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">189</div>
                <div className="text-xs text-gray-600">Confirmed</div>
                <Badge
                  variant="outline"
                  className="mt-1"
                >
                  76.2%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">34</div>
                <div className="text-xs text-gray-600">Pending</div>
                <Badge
                  variant="outline"
                  className="mt-1"
                >
                  13.7%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">18</div>
                <div className="text-xs text-gray-600">Declined</div>
                <Badge
                  variant="outline"
                  className="mt-1"
                >
                  7.3%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserPlus className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">2.8</div>
                <div className="text-xs text-gray-600">Avg Party Size</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">12</div>
                <div className="text-xs text-gray-600">Days to RSVP</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* RSVP Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>RSVP Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>
                  <Pie
                    data={rsvpStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {rsvpStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily RSVP Trend */}
        <Card>
          <CardHeader>
            <CardTitle>RSVP Response Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart data={dailyRSVPData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="confirmed"
                    stroke="var(--color-confirmed)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="declined"
                    stroke="var(--color-declined)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke="var(--color-pending)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Dietary Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Dietary Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dietaryPreferences.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <span className="font-medium">{item.preference}</span>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-48 rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-blue-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="min-w-16 text-sm text-gray-600">
                    {item.count} guests
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guest Group Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Group Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={guestGroupAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill="var(--color-confirmed)"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RSVPAnalytics;
