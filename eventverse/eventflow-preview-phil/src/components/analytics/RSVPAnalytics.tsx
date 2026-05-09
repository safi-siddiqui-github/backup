
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, Clock, AlertCircle, UserPlus, Calendar, TrendingUp, Mail, MousePointer, MessageSquare, MapPin, Utensils, Share2, Target, Brain, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface RSVPAnalyticsProps {
  eventId: string;
}

const RSVPAnalytics = ({ eventId }: RSVPAnalyticsProps) => {
  const rsvpStatusData = [
    { status: "Confirmed", count: 189, percentage: 76.2, color: "#22C55E" },
    { status: "Pending", count: 34, percentage: 13.7, color: "#F59E0B" },
    { status: "Declined", count: 18, percentage: 7.3, color: "#EF4444" },
    { status: "No Response", count: 7, percentage: 2.8, color: "#6B7280" }
  ];

  const dailyRSVPData = [
    { date: "Mar 1", confirmed: 15, declined: 2, pending: 8 },
    { date: "Mar 8", confirmed: 28, declined: 3, pending: 12 },
    { date: "Mar 15", confirmed: 45, declined: 5, pending: 18 },
    { date: "Mar 22", confirmed: 67, declined: 8, pending: 25 },
    { date: "Mar 29", confirmed: 89, declined: 12, pending: 30 },
    { date: "Apr 5", confirmed: 124, declined: 15, pending: 32 },
    { date: "Apr 12", confirmed: 156, declined: 16, pending: 34 },
    { date: "Today", confirmed: 189, declined: 18, pending: 34 }
  ];

  // Invitation Delivery Analytics
  const invitationDelivery = [
    { channel: "Email", sent: 200, delivered: 196, opened: 178, clicked: 142, responded: 121, rate: 61.7 },
    { channel: "SMS", sent: 48, delivered: 48, opened: 46, clicked: 38, responded: 35, rate: 72.9 }
  ];

  // Response Pattern Analysis
  const responsePatterns = {
    avgTimeToRespond: "3.2 days",
    peakResponseDay: "Monday",
    peakResponseHour: "7 PM",
    earlyResponders: 89,
    lateResponders: 67,
    lastMinuteResponders: 33
  };

  // Guest Engagement Scoring
  const engagementScores = [
    { segment: "High Engagement", count: 67, percentage: 35.4, avgScore: 9.2, color: "#22C55E" },
    { segment: "Medium Engagement", count: 89, percentage: 47.1, avgScore: 6.8, color: "#3B82F6" },
    { segment: "Low Engagement", count: 33, percentage: 17.5, avgScore: 3.4, color: "#F59E0B" }
  ];

  // Decline Reason Analysis
  const declineReasons = [
    { reason: "Schedule Conflict", count: 8, percentage: 44.4 },
    { reason: "Location Too Far", count: 4, percentage: 22.2 },
    { reason: "Cost/Budget", count: 3, percentage: 16.7 },
    { reason: "Health/Personal", count: 2, percentage: 11.1 },
    { reason: "Other", count: 1, percentage: 5.6 }
  ];

  // Geographic Distribution
  const geographicData = [
    { region: "Local (<10 mi)", count: 142, percentage: 75.1, travelTime: "15 min" },
    { region: "Regional (10-50 mi)", count: 32, percentage: 16.9, travelTime: "45 min" },
    { region: "Long Distance (>50 mi)", count: 15, percentage: 7.9, travelTime: "2+ hrs" }
  ];

  const dietaryPreferences = [
    { preference: "No Restrictions", count: 142, percentage: 75.1, allergies: [] as string[] },
    { preference: "Vegetarian", count: 28, percentage: 14.8, allergies: ["Eggs (3)", "Dairy (2)"] },
    { preference: "Vegan", count: 12, percentage: 6.3, allergies: [] as string[] },
    { preference: "Gluten-Free", count: 5, percentage: 2.6, allergies: ["Celiac (3)", "Sensitivity (2)"] },
    { preference: "Kosher", count: 3, percentage: 1.6, allergies: [] as string[] },
    { preference: "Halal", count: 2, percentage: 1.1, allergies: [] as string[] },
    { preference: "Nut Allergy", count: 7, percentage: 3.7, allergies: ["Peanuts (4)", "Tree Nuts (3)"] }
  ];

  // Social Network Analysis
  const socialClusters = [
    { cluster: "Work Colleagues", size: 45, connections: 127, centralPerson: "John Smith", density: 0.85 },
    { cluster: "College Friends", size: 38, connections: 89, centralPerson: "Sarah Johnson", density: 0.72 },
    { cluster: "Family", size: 32, connections: 78, centralPerson: "Mary Davis", density: 0.91 },
    { cluster: "Sports Team", size: 28, connections: 56, centralPerson: "Mike Wilson", density: 0.68 },
    { cluster: "Neighbors", size: 18, connections: 34, centralPerson: "Lisa Brown", density: 0.74 }
  ];

  // Reminder Campaign Analytics
  const reminderPerformance = [
    { reminder: "Initial Invite", sent: 248, responseRate: 45.2, timeFrame: "Week 1" },
    { reminder: "First Reminder", sent: 136, responseRate: 23.5, timeFrame: "Week 3" },
    { reminder: "Second Reminder", sent: 78, responseRate: 15.4, timeFrame: "Week 5" },
    { reminder: "Final Reminder", sent: 34, responseRate: 11.8, timeFrame: "Week 7" }
  ];

  // Predictive Analytics
  const predictions = {
    finalExpectedAttendees: 205,
    confidence: 87,
    expectedNoShows: 12,
    lastMinuteRSVPs: 8,
    potentialCancellations: 6
  };

  const guestGroupAnalysis = [
    { group: "Singles", count: 45, avgPartySize: 1.0 },
    { group: "Couples", count: 67, avgPartySize: 2.0 },
    { group: "Families", count: 23, avgPartySize: 3.8 },
    { group: "Large Groups", count: 8, avgPartySize: 6.2 }
  ];

  // Plus-One Analysis
  const plusOneData = {
    invited: 189,
    withPlusOne: 89,
    plusOneRate: 47.1,
    plusOneConfirmed: 67,
    plusOnePending: 22
  };

  // Demographic Segmentation
  const demographicSegments = [
    { segment: "18-25", count: 23, responseRate: 65.2, avgResponseTime: "4.2 days" },
    { segment: "26-35", count: 67, responseRate: 82.1, avgResponseTime: "2.8 days" },
    { segment: "36-50", count: 58, responseRate: 87.9, avgResponseTime: "2.1 days" },
    { segment: "51+", count: 41, responseRate: 92.7, avgResponseTime: "1.8 days" }
  ];

  const chartConfig = {
    confirmed: { label: "Confirmed", color: "#22C55E" },
    declined: { label: "Declined", color: "#EF4444" },
    pending: { label: "Pending", color: "#F59E0B" },
    delivered: { label: "Delivered", color: "#3B82F6" },
    opened: { label: "Opened", color: "#8B5CF6" },
    clicked: { label: "Clicked", color: "#10B981" },
    responded: { label: "Responded", color: "#22C55E" }
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Predictive Insights */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-600 border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="text-2xl font-bold">{predictions.finalExpectedAttendees}</div>
              <div className="text-sm opacity-90">Expected Final Attendees</div>
              <Badge className="mt-1 bg-white/20">{predictions.confidence}% confidence</Badge>
            </div>
            <div>
              <div className="text-2xl font-bold">{predictions.expectedNoShows}</div>
              <div className="text-sm opacity-90">Predicted No-Shows</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{predictions.lastMinuteRSVPs}</div>
              <div className="text-sm opacity-90">Last-Minute RSVPs</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{predictions.potentialCancellations}</div>
              <div className="text-sm opacity-90">Risk of Cancellation</div>
            </div>
            <div>
              <div className="text-2xl font-bold">93%</div>
              <div className="text-sm opacity-90">Attendance Probability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* RSVP Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-600" />
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
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="text-xl font-bold">189</div>
                    <div className="text-xs text-gray-600">Confirmed</div>
                    <Badge variant="outline" className="mt-1">76.2%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                  <div>
                    <div className="text-xl font-bold">34</div>
                    <div className="text-xs text-gray-600">Pending</div>
                    <Badge variant="outline" className="mt-1">13.7%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <div className="text-xl font-bold">18</div>
                    <div className="text-xs text-gray-600">Declined</div>
                    <Badge variant="outline" className="mt-1">7.3%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <UserPlus className="w-6 h-6 text-purple-600" />
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
                  <Calendar className="w-6 h-6 text-orange-600" />
                  <div>
                    <div className="text-xl font-bold">{responsePatterns.avgTimeToRespond}</div>
                    <div className="text-xs text-gray-600">Avg Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* RSVP Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>RSVP Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={rsvpStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percentage }) => `${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {rsvpStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
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
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyRSVPData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="confirmed" stroke="var(--color-confirmed)" strokeWidth={2} />
                      <Line type="monotone" dataKey="declined" stroke="var(--color-declined)" strokeWidth={2} />
                      <Line type="monotone" dataKey="pending" stroke="var(--color-pending)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Guest Group Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Group Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={guestGroupAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-confirmed)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6 mt-6">
          {/* Engagement Scoring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Guest Engagement Scoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementScores.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: segment.color }} />
                      <div>
                        <div className="font-medium">{segment.segment}</div>
                        <div className="text-sm text-gray-600">{segment.count} guests ({segment.percentage}%)</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{segment.avgScore}</div>
                      <div className="text-sm text-gray-600">Avg Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Network Clusters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Social Network Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {socialClusters.map((cluster, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{cluster.cluster}</div>
                      <Badge>{cluster.size} people</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">{cluster.connections}</span> connections
                      </div>
                      <div>
                        <span className="font-medium">{(cluster.density * 100).toFixed(0)}%</span> density
                      </div>
                      <div>
                        Central: {cluster.centralPerson}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plus-One Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Plus-One Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{plusOneData.invited}</div>
                  <div className="text-sm text-gray-600">Total Invites</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{plusOneData.withPlusOne}</div>
                  <div className="text-sm text-gray-600">With Plus-One</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{plusOneData.plusOneRate}%</div>
                  <div className="text-sm text-gray-600">Plus-One Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{plusOneData.plusOneConfirmed}</div>
                  <div className="text-sm text-gray-600">Confirmed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{plusOneData.plusOnePending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6 mt-6">
          {/* Invitation Delivery Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Invitation Delivery & Engagement Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invitationDelivery.map((channel, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{channel.channel}</span>
                      <Badge>{channel.rate}% response rate</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{channel.sent}</div>
                        <div className="text-gray-600">Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{channel.delivered}</div>
                        <div className="text-gray-600">Delivered</div>
                        <div className="text-gray-500">{((channel.delivered/channel.sent)*100).toFixed(1)}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600">{channel.opened}</div>
                        <div className="text-gray-600">Opened</div>
                        <div className="text-gray-500">{((channel.opened/channel.delivered)*100).toFixed(1)}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-orange-600">{channel.clicked}</div>
                        <div className="text-gray-600">Clicked</div>
                        <div className="text-gray-500">{((channel.clicked/channel.opened)*100).toFixed(1)}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{channel.responded}</div>
                        <div className="text-gray-600">Responded</div>
                        <div className="text-gray-500">{((channel.responded/channel.clicked)*100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reminder Campaign Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Reminder Campaign Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reminderPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="reminder" angle={-15} textAnchor="end" height={80} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="responseRate" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Response Timing Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Response Timing Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{responsePatterns.earlyResponders}</div>
                  <div className="text-sm text-gray-600">Early Responders</div>
                  <div className="text-xs text-gray-500 mt-1">Within 24 hours</div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{responsePatterns.lateResponders}</div>
                  <div className="text-sm text-gray-600">Late Responders</div>
                  <div className="text-xs text-gray-500 mt-1">After 7 days</div>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{responsePatterns.lastMinuteResponders}</div>
                  <div className="text-sm text-gray-600">Last Minute</div>
                  <div className="text-xs text-gray-500 mt-1">Within 48h of deadline</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-700">
                  <strong>Peak Response Patterns:</strong>
                  <div className="mt-2 space-y-1">
                    <div>• Best day: <span className="font-medium">{responsePatterns.peakResponseDay}</span></div>
                    <div>• Best hour: <span className="font-medium">{responsePatterns.peakResponseHour}</span></div>
                    <div>• Average response time: <span className="font-medium">{responsePatterns.avgTimeToRespond}</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6 mt-6">
          {/* Demographic Segmentation */}
          <Card>
            <CardHeader>
              <CardTitle>Age-Based Response Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demographicSegments.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">{segment.segment} years old</div>
                      <div className="text-sm text-gray-600">{segment.count} guests</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{segment.responseRate}%</div>
                      <div className="text-xs text-gray-600">Response Rate</div>
                      <div className="text-xs text-gray-500 mt-1">Avg: {segment.avgResponseTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <div className="font-medium">{location.region}</div>
                      <div className="text-sm text-gray-600">{location.count} guests ({location.percentage}%)</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{location.travelTime}</Badge>
                      <div className="text-xs text-gray-500 mt-1">Estimated travel</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dietary Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5" />
                Dietary Preferences & Allergies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dietaryPreferences.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.preference}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.count} guests</Badge>
                        <span className="text-sm text-gray-600">{item.percentage}%</span>
                      </div>
                    </div>
                    {item.allergies.length > 0 && (
                      <div className="text-xs text-red-600 mt-1">
                        Allergies: {item.allergies.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          {/* Decline Reasons */}
          <Card>
            <CardHeader>
              <CardTitle>Decline Reason Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {declineReasons.map((reason, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                    <span className="font-medium text-gray-700">{reason.reason}</span>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-white">{reason.count} people</Badge>
                      <span className="text-sm text-gray-600">{reason.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-700">
                  <strong className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Actionable Insights:
                  </strong>
                  <ul className="mt-2 space-y-1 ml-6 list-disc">
                    <li>Consider offering virtual attendance for long-distance guests</li>
                    <li>Schedule conflicts are primary concern - validate date choice</li>
                    <li>Location accessibility matters - provide transportation options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI-Powered Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Strong Email Performance</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Email channel showing 61.7% response rate. Continue with email-first strategy.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">SMS Outperforming</div>
                      <div className="text-sm text-gray-600 mt-1">
                        SMS showing 72.9% response rate. Consider expanding SMS reminders for pending guests.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Follow-up Opportunity</div>
                      <div className="text-sm text-gray-600 mt-1">
                        34 guests still pending. Send personalized reminder on Monday at 7 PM for optimal engagement.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Demographic Insights</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Younger guests (18-25) showing slower response times. Consider social media engagement tactics.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RSVPAnalytics;
