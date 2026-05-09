"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Calendar,
  Camera,
  CheckCircle,
  DollarSign,
  Download,
  Filter,
  Gamepad2,
  Globe,
  Layout,
  Megaphone,
  MessageSquare,
  Star,
  Target,
  Ticket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Import individual analytics components
import AnnouncementAnalytics from "./AnnouncementAnalytics";
import BudgetAnalytics from "./BudgetAnalytics";
import GamesAnalytics from "./GamesAnalytics";
import MediaAnalytics from "./MediaAnalytics";
import RSVPAnalytics from "./RSVPAnalytics";
import ScheduleAnalytics from "./ScheduleAnalytics";
import SeatingAnalytics from "./SeatingAnalytics";
import SurveyAnalytics from "./SurveyAnalytics";
import TicketingAnalytics from "./TicketingAnalytics";

interface AnalyticsIntelligenceHubProps {
  eventId: string;
}

const AnalyticsIntelligenceHub = ({
  eventId,
}: AnalyticsIntelligenceHubProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Executive metrics aggregating all modules
  const executiveMetrics = {
    totalRevenue: 247500,
    totalAttendees: 1247,
    overallEngagement: 94.3,
    moduleUtilization: 87.5,
    eventEfficiency: 92.1,
    predictedROI: 340,
  };

  const modulePerformance = [
    {
      module: "RSVP",
      icon: Users,
      score: 94,
      revenue: 0,
      engagement: 89,
      efficiency: 96,
      status: "excellent",
      insights: "98% response rate, dietary preferences well managed",
    },
    {
      module: "Ticketing",
      icon: Ticket,
      score: 91,
      revenue: 24750,
      engagement: 78,
      efficiency: 88,
      status: "excellent",
      insights:
        "Strong early bird sales, VIP tier performing above expectations",
    },
    {
      module: "Budget",
      icon: DollarSign,
      score: 88,
      revenue: 0,
      engagement: 92,
      efficiency: 85,
      status: "good",
      insights: "15% under budget, vendor relationships optimized",
    },
    {
      module: "Seating",
      icon: Layout,
      score: 87,
      revenue: 0,
      engagement: 85,
      efficiency: 90,
      status: "good",
      insights: "92% preference satisfaction, zone utilization balanced",
    },
    {
      module: "Media",
      icon: Camera,
      score: 93,
      revenue: 0,
      engagement: 96,
      efficiency: 91,
      status: "excellent",
      insights: "1,247 photos uploaded, viral potential detected",
    },
    {
      module: "Schedule",
      icon: Calendar,
      score: 85,
      revenue: 0,
      engagement: 87,
      efficiency: 83,
      status: "good",
      insights: "83% on-time performance, buffer time optimized",
    },
    {
      module: "Announcements",
      icon: Megaphone,
      score: 89,
      revenue: 0,
      engagement: 94,
      efficiency: 84,
      status: "good",
      insights: "76% view rate, engagement peaks during key moments",
    },
    {
      module: "Games",
      icon: Gamepad2,
      score: 92,
      revenue: 0,
      engagement: 98,
      efficiency: 87,
      status: "excellent",
      insights: "3x higher photo sharing among game participants",
    },
    {
      module: "Survey",
      icon: MessageSquare,
      score: 90,
      revenue: 0,
      engagement: 85,
      efficiency: 88,
      status: "excellent",
      insights: "High completion rates, valuable feedback collected",
    },
  ];

  const realtimeAlerts = [
    {
      type: "success",
      message: "VIP ticket sales surge detected (+45% in last hour)",
      timestamp: "2 minutes ago",
      action: "Consider dynamic pricing",
    },
    {
      type: "warning",
      message: "Schedule running 8 minutes behind in Track A",
      timestamp: "5 minutes ago",
      action: "Adjust buffer times",
    },
    {
      type: "info",
      message: "Photo upload rate exceeding storage projections",
      timestamp: "12 minutes ago",
      action: "Monitor capacity",
    },
  ];

  const chartConfig = {
    score: { label: "Performance Score", color: "#3B82F6" },
    engagement: { label: "Engagement", color: "#10B981" },
    efficiency: { label: "Efficiency", color: "#F59E0B" },
  };

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 shadow-2xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Analytics Intelligence Hub
                </h1>
                <p className="text-purple-100">
                  Comprehensive Module Analytics & Business Intelligence
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold text-black">
                <Star className="mr-1 h-3 w-3" />
                PREMIUM
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Suite
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Executive KPI Dashboard */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card className="border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    ${(executiveMetrics.totalRevenue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm opacity-90">Total Revenue</div>
                </div>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-2 flex items-center text-green-100">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span className="text-xs">+23.5% vs forecast</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {executiveMetrics.totalAttendees.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90">Total Attendees</div>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-2 flex items-center text-blue-100">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span className="text-xs">+12.3% vs planned</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {executiveMetrics.overallEngagement}%
                  </div>
                  <div className="text-sm opacity-90">Engagement</div>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-2 flex items-center text-purple-100">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span className="text-xs">Excellent performance</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {executiveMetrics.moduleUtilization}%
                  </div>
                  <div className="text-sm opacity-90">Module Utilization</div>
                </div>
                <BarChart3 className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-2 flex items-center text-orange-100">
                <CheckCircle className="mr-1 h-3 w-3" />
                <span className="text-xs">Optimal coverage</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {executiveMetrics.eventEfficiency}%
                  </div>
                  <div className="text-sm opacity-90">Event Efficiency</div>
                </div>
                <Target className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-2 flex items-center text-indigo-100">
                <Zap className="mr-1 h-3 w-3" />
                <span className="text-xs">High performance</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-teal-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {executiveMetrics.predictedROI}%
                  </div>
                  <div className="text-sm opacity-90">Predicted ROI</div>
                </div>
                <Globe className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-2 flex items-center text-teal-100">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span className="text-xs">Above industry avg</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Alerts */}
        <Card className="mb-6 bg-white/95 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Real-time Intelligence Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {realtimeAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`rounded-lg border-l-4 p-3 ${
                    alert.type === "success"
                      ? "border-green-500 bg-green-50"
                      : alert.type === "warning"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-800">
                        {alert.message}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">Recommended Action:</span>{" "}
                        {alert.action}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {alert.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 grid w-full grid-cols-5 bg-white/90 backdrop-blur-sm lg:grid-cols-10">
            <TabsTrigger
              value="overview"
              className="text-xs"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="rsvp"
              className="text-xs"
            >
              RSVP
            </TabsTrigger>
            <TabsTrigger
              value="ticketing"
              className="text-xs"
            >
              Ticketing
            </TabsTrigger>
            <TabsTrigger
              value="budget"
              className="text-xs"
            >
              Budget
            </TabsTrigger>
            <TabsTrigger
              value="seating"
              className="text-xs"
            >
              Seating
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="text-xs"
            >
              Media
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="text-xs"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="text-xs"
            >
              Announcements
            </TabsTrigger>
            <TabsTrigger
              value="games"
              className="text-xs"
            >
              Games
            </TabsTrigger>
            <TabsTrigger
              value="survey"
              className="text-xs"
            >
              Survey
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Module Performance Grid */}
              <Card className="bg-white/95 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Module Performance Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <BarChart data={modulePerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="module"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="score"
                          fill="var(--color-score)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Revenue Distribution */}
              <Card className="bg-white/95 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Revenue by Module</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <RechartsPieChart>
                        <Pie
                          data={modulePerformance.filter((m) => m.revenue > 0)}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="revenue"
                          label={({ module, revenue }) =>
                            `${module}: $${(revenue / 1000).toFixed(0)}K`
                          }
                        >
                          {modulePerformance
                            .filter((m) => m.revenue > 0)
                            .map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                        </Pie>
                        <ChartTooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Module Performance Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modulePerformance.map((module, index) => (
                <Card
                  key={index}
                  className="cursor-pointer bg-white/95 shadow-xl backdrop-blur-sm transition-shadow hover:shadow-2xl"
                  onClick={() => setActiveTab(module.module.toLowerCase())}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <module.icon className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-lg">
                          {module.module}
                        </CardTitle>
                      </div>
                      <Badge
                        className={
                          module.status === "excellent"
                            ? "bg-green-500"
                            : module.status === "good"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }
                      >
                        {module.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-600">Engagement</div>
                          <div className="font-semibold">
                            {module.engagement}%
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Efficiency</div>
                          <div className="font-semibold">
                            {module.efficiency}%
                          </div>
                        </div>
                      </div>
                      {module.revenue > 0 && (
                        <div className="border-t pt-2">
                          <div className="text-sm text-gray-600">Revenue</div>
                          <div className="font-bold text-green-600">
                            ${module.revenue.toLocaleString()}
                          </div>
                        </div>
                      )}
                      <div className="border-t pt-2">
                        <div className="text-xs text-gray-600">
                          {module.insights}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rsvp">
            <RSVPAnalytics eventId={eventId} />
          </TabsContent>

          <TabsContent value="ticketing">
            <TicketingAnalytics eventId={eventId} />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetAnalytics eventId={eventId} />
          </TabsContent>

          <TabsContent value="seating">
            <SeatingAnalytics eventId={eventId} />
          </TabsContent>

          <TabsContent value="media">
            <MediaAnalytics eventId={eventId} />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleAnalytics eventId={eventId} />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementAnalytics eventId={eventId} />
          </TabsContent>

          <TabsContent value="games">
            <GamesAnalytics eventId={eventId} />
          </TabsContent>

          <TabsContent value="survey">
            <SurveyAnalytics eventId={eventId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsIntelligenceHub;
