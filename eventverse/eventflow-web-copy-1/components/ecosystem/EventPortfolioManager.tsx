"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Calendar,
  DollarSign,
  Globe,
  MoreHorizontal,
  Plus,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const EventPortfolioManager = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalEvents: 24,
    activeEvents: 8,
    completedEvents: 16,
    totalRevenue: 125000,
    totalAttendees: 3420,
    avgSatisfaction: 4.7,
  });

  const [portfolioTrends, setPortfolioTrends] = useState([
    { month: "Jan", events: 3, revenue: 12000, attendees: 380 },
    { month: "Feb", events: 2, revenue: 8500, attendees: 220 },
    { month: "Mar", events: 4, revenue: 18000, attendees: 520 },
    { month: "Apr", events: 3, revenue: 15000, attendees: 410 },
    { month: "May", events: 5, revenue: 22000, attendees: 680 },
    { month: "Jun", events: 4, revenue: 19500, attendees: 590 },
  ]);

  const [eventSeries, setEventSeries] = useState([
    {
      id: 1,
      name: "Tech Talk Series",
      events: 12,
      nextEvent: "AI in Healthcare",
      nextDate: "2024-01-15",
      status: "active",
      avgAttendance: 85,
    },
    {
      id: 2,
      name: "Monthly Networking",
      events: 8,
      nextEvent: "Startup Showcase",
      nextDate: "2024-01-20",
      status: "active",
      avgAttendance: 92,
    },
    {
      id: 3,
      name: "Quarterly Reviews",
      events: 4,
      nextEvent: "Q1 2024 Review",
      nextDate: "2024-03-30",
      status: "scheduled",
      avgAttendance: 78,
    },
  ]);

  const chartConfig = {
    events: { label: "Events", color: "hsl(var(--chart-1))" },
    revenue: { label: "Revenue", color: "hsl(var(--chart-2))" },
    attendees: { label: "Attendees", color: "hsl(var(--chart-3))" },
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Portfolio</h1>
          <p className="mt-2 text-gray-600">
            Manage and analyze your entire event ecosystem
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Portfolio Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event Series
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">
                  {portfolioData.totalEvents}
                </div>
                <div className="text-xs text-gray-600">Total Events</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">
                  {portfolioData.activeEvents}
                </div>
                <div className="text-xs text-gray-600">Active Events</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">
                  ${portfolioData.totalRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">
                  {portfolioData.totalAttendees.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Total Attendees</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">
                  {portfolioData.avgSatisfaction}
                </div>
                <div className="text-xs text-gray-600">Avg. Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart className="h-6 w-6 text-indigo-600" />
              <div>
                <div className="text-xl font-bold">94%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="overview"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="series">Event Series</TabsTrigger>
          <TabsTrigger value="analytics">Cross-Event Analytics</TabsTrigger>
          <TabsTrigger value="resources">Resource Management</TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <LineChart data={portfolioTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="events"
                      stroke="var(--color-events)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="series"
          className="space-y-6"
        >
          <div className="grid gap-4">
            {eventSeries.map((series) => (
              <Card key={series.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{series.name}</h3>
                        <Badge
                          variant={
                            series.status === "active" ? "default" : "secondary"
                          }
                        >
                          {series.status}
                        </Badge>
                      </div>
                      <p className="mb-3 text-sm text-gray-600">
                        {series.events} events completed • Next:{" "}
                        {series.nextEvent} on {series.nextDate}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-gray-500">
                            Avg. Attendance:
                          </span>
                          <span className="ml-1 font-medium">
                            {series.avgAttendance}%
                          </span>
                        </div>
                        <Progress
                          value={series.avgAttendance}
                          className="h-2 w-32"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="analytics"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cross-Event Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="font-medium text-blue-900">
                      Best Performing Event Type
                    </h4>
                    <p className="mt-1 text-sm text-blue-700">
                      Networking events show 23% higher satisfaction rates
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4">
                    <h4 className="font-medium text-green-900">
                      Optimal Event Timing
                    </h4>
                    <p className="mt-1 text-sm text-green-700">
                      Thursday evenings generate 18% more registrations
                    </p>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4">
                    <h4 className="font-medium text-purple-900">
                      Resource Efficiency
                    </h4>
                    <p className="mt-1 text-sm text-purple-700">
                      Venue sharing reduces costs by 35% across your portfolio
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Venues</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={78}
                        className="h-2 w-24"
                      />
                      <span className="text-sm text-gray-600">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vendors</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={65}
                        className="h-2 w-24"
                      />
                      <span className="text-sm text-gray-600">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Equipment</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={82}
                        className="h-2 w-24"
                      />
                      <span className="text-sm text-gray-600">82%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Staff</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={71}
                        className="h-2 w-24"
                      />
                      <span className="text-sm text-gray-600">71%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="resources"
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Resource Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Resource Allocation Dashboard
                </h3>
                <p className="mb-4 text-gray-600">
                  Optimize resource allocation across your event portfolio
                </p>
                <Button>Configure Resource Management</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventPortfolioManager;
